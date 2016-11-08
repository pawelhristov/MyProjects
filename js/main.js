function responsiveMobileMenu() {
	$('.nav').each(function() {



		// $(this).children('ul').addClass('nav-menu'); // mark main menu list


		var $style = $(this).attr('nav-menu-style'); // get menu style
		if (typeof $style == 'undefined' || $style == false) {
			$(this).addClass('web'); // set web style if style is not defined
		} else {
			$(this).addClass($style);
		}


		/* 	width of menu list (non-toggled) */

		var $width = 0;
		$(this).find('ul li').each(function() {
			$width += $(this).outerWidth();
		});

		// if modern browser

		if ($.support.leadingWhitespace) {
			// $(this).css('max-width', $width * 1.2 + 'px');
		}
		// 
		else {
			$(this).css('width', $width * 1.2 + 'px');
		}

	});
}

function getMobileMenu() {

	/* 	build toggled dropdown menu list */

	$('.nav').each(function() {
		var menutitle = $(this).attr("nav-menu-title");
		if (menutitle == "") {
			menutitle = "";
		} else if (menutitle == undefined) {
			menutitle = "";
		}
		var $menulist = $(this).children('.nav-menu').html();
		var $menucontrols = "<div class='nav-toggled-controls'><div class='nav-toggled-title'>" + menutitle + "</div><div class='nav-button'><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span></div></div>";
		$(this).prepend("<div class='nav-toggled nav-closed'>" + $menucontrols + "<ul>" + $menulist + "</ul></div>");

	});
}

function adaptMenu() {

	/* 	toggle menu on resize */

	$('.nav').each(function() {
		// var $width = $(this).css('max-width');
		// $width = $width.replace('px', ''); 
		var $width = 768;
		if ($(this).parent().width() < $width * 1.05) {
			$(this).children('.nav-menu').hide(0);
			$(this).children('.nav-toggled').show(0);
		} else {
			$(this).children('.nav-menu').show(0);
			$(this).children('.nav-toggled').hide(0);
		}
	});

}

function send(name,email,message)
{
	var xmlhttp;

	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
  		xmlhttp=new XMLHttpRequest();
  	} else {// code for IE6, IE5
  		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  	}
  	
	xmlhttp.onreadystatechange= function() {
  		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
    		var response = $.parseJSON(xmlhttp.response);
    	
    		if(response.success == 1) {
				$('.success-message').addClass('show');
    		}
    		$("#contact-form").addClass('hide');
    		$("#contact-form input").prop('disabled', false);
    		$('#contact-form input[type="text"]').val('');
    		$("#contact-form textarea").val('');
    	}
  	}
	xmlhttp.open("POST","service.php",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("from="+name+"&email="+email+"&message="+message);
}

function isEmail(email) {
	var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   	if(!regex.test(email)) {
		return false;
   	} else {
   		return true;
   }
}

$(function() {

	responsiveMobileMenu();
	getMobileMenu();
	adaptMenu();

	/* slide down mobile menu on click */

	$('.nav-toggled, .nav-toggled .nav-button').click(function() {
		if ($(this).is(".nav-closed")) {
			$(this).find('> ul').stop().show(300);
			$(this).removeClass("nav-closed");
		} else {
			$(this).find(' > ul').stop().hide(300);
			$(this).addClass("nav-closed");
		}

	});

	$('#contact-form').submit(function() {
    	var name = $('#contact-form input[name="full_name"]').val();
    	var email = $('#contact-form input[name="email"]').val();
    	var message = $('#contact-form textarea').val();
    	var sendValid = true;
    	if (name.length < 3) {
    		sendValid = false;
    		$('.error-name').addClass('show');
    	} else {
    		$('.error-name').removeClass('show');
    	}
    	if (message.length < 3) {
    		sendValid = false;
    		$('.error-question').addClass('show');
    	} else {
    		$('.error-question').removeClass('show');
    	}
    	if (!isEmail(email)) {
    		sendValid = false;
    		$('.error-email').addClass('show');
    	} else {
    		$('.error-email').removeClass('show');
    	}
    	if (sendValid) {
    		$("#contact-form input").prop('disabled', true);
    		send(name,email,message);
    		
    	}

    	return false;
    });
});
/* 	hide mobile menu on resize */
$(window).resize(function() {
	adaptMenu();
});

$(document).ready(function() {
	//test for touch events support and if not supported, attach .no-touch class to the HTML tag.
	if (!("ontouchstart" in document.documentElement)) {
		document.documentElement.className += " no-touch";
	} else {
		document.documentElement.className += " touch";
	}


	var $submenus = $('.nav.yoga .nav-menu li > ul');
	$submenus.hide();
	if ($('html').hasClass('no-touch')) {
		$submenus.parent().hover(function() {
			$(this).find('> ul').slideToggle('fast');
		});
	} else {
		$submenus.parent().click(function(e) {
			
			$(this).find('> ul').slideToggle('fast');
			e.preventDefault();
			e.stopPropagation();
		});
	}

	$submenus.parent().addClass('has-children');


	var $submenusSm = $('.nav.yoga .nav-toggled li > ul');
	$submenusSm.hide();
	$submenusSm.parent().children('a').addClass('toggle-sm');
	$submenusSm.parent().on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).find('> ul').slideToggle();
		$(this).children('a').toggleClass('open');
	});
});