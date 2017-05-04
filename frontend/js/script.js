(function(){
	document.addEventListener("DOMContentLoaded", function(e) { 
		$('.wrapper').css('min-height', 'calc(100vh - '+$('footer').outerHeight()+'px)');
	
		var pows = $('.pows');
		Queue(pows,100);
		
		function Queue(arr,t){
			arr.shift = [].shift;
			var elem = arr.shift();
			var start = Date.now();
			var over = t || 500;
			var timer = setInterval(function() {
				var timePassed = Date.now() - start;
					if (timePassed > over) {
						$(elem).animate({
							opacity: 1
						}, 500)
						Queue(arr);
						clearInterval(timer); 
					  }
			}, 100);	
		}
	});
	
	/* BURGER MENU */
	$(document).ready(function(){
		$('#nav-icon').click(function(){
			$('#menu_burger').css('height', $(window).height()+'px'); // menu_burger height
			
			if($('#menu_burger').hasClass('closed')) {
				$('#menu_burger').removeClass('z_m100');
				$('#menu_burger').animate({
						opacity: 1.0
					}, 400);
				$('#menu_burger ul').animate({
						marginTop: '120px'
					}, {
						duration: 400,
						specialEasing: {
						  width: "linear",
						  height: "easeOutBounce"
						},
						complete: function(){
							$('#menu_burger').removeClass('closed');
							$('#menu_burger').addClass('opened');
						}
					});
			}else {
				$.when(
					$('#menu_burger').animate({
							opacity: 0.0
						}, 400),
					$('#menu_burger ul').animate({
						marginTop: '0px'
						}, 500)
				).done(function(){
					$('#menu_burger').removeClass('opened');
					$('#menu_burger').addClass('closed');
					$('#menu_burger').addClass('z_m100');
				})
			}
			
			$(this).toggleClass('open');
		});
	});
})()