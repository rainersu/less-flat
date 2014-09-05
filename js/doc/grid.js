
(function($, _) {

    $(function() {
        
        var
            aColSpan = $('<span />').prependTo($('.col').each(function() {
                var 
                    o = $(this);
                o.attr('title', o.prop('className'));
            })),
            fColSpan = function() {
                aColSpan.each(function() {
                    var 
                        o = $(this),
                        p = o.parent();
                    o.text(p.css('width'));
                });
            };
        $(window).bind("resize", function() {
			fColSpan();
		});
		
		fColSpan();
        
    });
    
}(jQuery));
