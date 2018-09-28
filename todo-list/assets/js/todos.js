
/**
 * We have a problem here when we create new elements, 
 * if we use $("li").on("click", func), it will set
 * listeners only on the currently existing elements,
 * but, when we create new elements, there will 
 * be no listeners for them.
 * 
 * Instead, we set an listener on the ul element, and the second 
 * argument is the element that we want to fire the "click" event.
 * So, every li inside the ul, should now fire the click event.
 * Both existing and future elements.
 * The same logic is for the span listener.
 * 
 */


$("ul").on("click", "li", function() {
    $(this).toggleClass("done");
});

$("ul").on("click", "span", function(event) {
    console.log("tst");
    event.stopPropagation();
    $(this).parent().fadeOut(500, function() {
        $(this).remove();
    });
});

$("input").keypress(function(event) {
    var key = event.which;

    if (key === 13) {
        $("ul").append("<li><span><i class='fas fa-trash'></i></span>" + $(this).val() + "</li>");
        $(this).val("");
    }
});

$(".fa-plus").click(function() {
    $("input").fadeToggle(0.5);
});