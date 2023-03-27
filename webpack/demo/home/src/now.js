import $ from "jquery";

export default function (container) {
  const p = $("<p>").appendTo(container).text(new Date().toLocaleDateString());
  setInterval(() => {
    p.text(new Date().toLocaleTimeString());
  }, 1000);
}
