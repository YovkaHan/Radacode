$(function() {

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};
});

(function($){
	require('script!../../node_modules/jquery-placeholder/jquery.placeholder.js');
	$(document).ready( function() { // $(window).ready --IE8
		if($('html').hasClass('no-placeholder')) {
			$('input').placeholder();
		}
	});
})(jQuery);