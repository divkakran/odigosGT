// Slide Media
$(document).ready(function(){
  $('.media-logo').slick({
	  slidesToShow: 5,
	  slidesToScroll: 1,
	  autoplay: true,
	  autoplaySpeed: 4000,
	  arrows: false,
	  dots: false,
	  pauseOnHover: true,
	  responsive: [{		 
		  breakpoint: 767,
		  settings: {
			  slidesToShow: 2
		  }
	  }, {
		  breakpoint: 480,
		  settings: {
			  slidesToShow: 1.7
		  }
	  }]
	});
	$(document).ready(function(){
		$('.combo-banner').slick({
			slidesToShow: 3.3,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 3000,
			arrows: false,
			dots: true,
			pauseOnHover: true,
			responsive: [{		 
				breakpoint: 767,
				settings: {
					slidesToShow: 2
				}
			}, {
				breakpoint: 480,
				settings: {
					slidesToShow: 1
				}
			}]
		});
	});
	$(document).ready(function(){
		$('.guide-pic').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 5000,
			arrows: true,
			dots: true,
			pauseOnHover: true,
			responsive: [{		 
				breakpoint: 767,
				settings: {
					slidesToShow: 1
				}
			}, {
				breakpoint: 480,
				settings: {
					slidesToShow: 1
				}
			}]
		});
	});
	$(document).ready(function(){
		$('.other-packages').slick({
			slidesToShow: 4,
			slidesToScroll: 4,
			autoplay: true,
			autoplaySpeed: 5000,
			arrows: false,
			dots: true,
			pauseOnHover: true,
			responsive: [{		 
			breakpoint: 991,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 2
			}
			}, {
			breakpoint: 767,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			}
			}, {
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
			}]
		});
	});
  	$('.closebtn').on('click', function(event){
	  $('body').removeClass('backdrop');
	  $('body .overlay').remove();
	});
	$('.closebtnOnLink').on('click', function(event){
	  $('body').removeClass('backdrop');
	  $('body .overlay').remove();
  });
  $(window).scroll(function() {
	if ($(this).scrollTop() > 80 && window.location.pathname!="/easy-booking"){
		$('header').addClass("sticky");
		$('body').addClass("stick_body");	 
	}
	else{
		$('header').removeClass("sticky");
		$('body').removeClass("stick_body");
	}
 });
});
// tooltip
$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip();
});

function openNav() {
	document.getElementById("mySidepanel").style.width = "320px";
}
function closeNav() {
	document.getElementById("mySidepanel").style.width = "0";
}  

// dropdown

