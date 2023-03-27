import $ from "jquery";

export default function (container) {
  const ul = $("<ul>").appendTo(container);

  let html = "";

  for (let i = 0; i < 20; i++) {
    html += `<li>news ${i}</li>`;
  }

  ul.html(html);
}
