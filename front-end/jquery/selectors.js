

/**
 * Select all divs and give them a purple background;
 * Select the divs with class "highlight" and make them 200px wide;
 * Select the div  with id "third"  and give it a orange border;
 * Bonus: Select the first div only and change its font color to pink;
 */

$("div").css("backgroundColor", "purple");
$("div.highlight").css("width", "200px");
$("#third").css("border", "2px solid orange");
$("div:nth-of-type(1)").css("color", "pink");