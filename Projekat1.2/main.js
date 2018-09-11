$(document).ready(function(){
    $("#navbarIcon").click(function(){
        $("nav>ul").toggleClass("toggleNav");
    });
    $("#arrow").click(function(){
        $("li>ul").toggleClass("toggleNav");
    });

});

