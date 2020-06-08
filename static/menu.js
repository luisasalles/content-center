$(document).ready(function() {
    function resizeNav() {
        $(".menu").css({
            "height": window.innerHeight
        });
        var radius = Math.sqrt(Math.pow(window.innerHeight, 2) + Math.pow(window.innerWidth, 2));
        var diameter = radius * 2;
        $(".nav-layer").width(diameter);
        $(".nav-layer").height(diameter);
        $(".nav-layer").css({
            "margin-top": -radius,
            "margin-left": -radius
        });
    }
    $(".nav-toggle").click(function() {
        $(".nav-toggle, .nav-layer, .menu").toggleClass("open");
    });
    $(window).resize(resizeNav);
    resizeNav();

});