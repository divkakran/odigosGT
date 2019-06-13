	$('.openbtn').on('click', function(event){  
		$('.sidepanel').toggleClass('is-visible');
		if ($('.sidepanel').is(":visible")) 
		console.log(($('#mysidepanel').hasClass("overlay")));
		
		$('body').addClass('backdrop');
		$('body').append("<div class='overlay'></div>").fadeIn('slow'); 
	});
	$('.closebtnOnLink').on('click', function(event){
		$('body').removeClass('backdrop');
		$('body .overlay').remove();
	});

function openNav() {
	document.getElementById("mySidepanel").style.width = "320px";
}
function closeNav() {
	document.getElementById("mySidepanel").style.width = "0";
}
