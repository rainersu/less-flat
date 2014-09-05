!function(a) {
    a(function() {
        var b = a("<span />").prependTo(a(".col").each(function() {
            var b = a(this);
            b.attr("title", b.prop("className"));
        })), c = function() {
            b.each(function() {
                var b = a(this), c = b.parent();
                b.text(c.css("width"));
            });
        };
        a(window).bind("resize", function() {
            c();
        }), c();
    });
}(jQuery);