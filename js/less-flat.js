/*
	(function() {
	  if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
	    var msViewportStyle = document.createElement("style");
	    msViewportStyle.appendChild(
	      document.createTextNode("@-ms-viewport{width:auto!important}")
	    );
	    document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
	  }
	})();
*/

(function($, _) {

	$(function() {
		
		$("a").click(function(e) {
			var
				a = $(this);
			return !(/\#$/.test(a.attr("href")) || a.hasClass("disabled"));
		});
		
	});
    
}(jQuery));
