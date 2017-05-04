(function(){
	document.addEventListener("DOMContentLoaded", function(e) { 
		$('.wrapper').css('min-height', 'calc(100vh - '+$('footer').outerHeight()+'px)');
	
		var pows = $('.pows');
		Queue(pows);
		
		function Queue(arr){
			arr.shift = [].shift;
			var elem = arr.shift();
			$.when($(elem).animate({
					opacity: 1
				}, 500)
			).done(function(){
				if(arr.length){
					Queue(arr);
				}
			})
		}
	});
})()