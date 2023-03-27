import $ from "jquery";
import news from "./news";
import now from "home/now";

$("<h1>").text("Title Page").appendTo(document.body);

news($("<div>").appendTo(document.body));

now($("<div>").appendTo(document.body));

