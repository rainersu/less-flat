!function($) {
    $(function() {
        $("a").click(function() {
            var a = $(this);
            return !(/\#$/.test(a.attr("href")) || a.hasClass("disabled"));
        });
    });
}(jQuery);