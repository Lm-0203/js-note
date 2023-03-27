import $ from 'jquery';
import now from './now.js';

$("<h1>").text('dashboard').appendTo(document.body);

now($("<div>").appendTo(document.body));
