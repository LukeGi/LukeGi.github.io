const copyFunc = ev => {
  let el = ev.srcElement;
  if (navigator.clipboard) {
    let old = el.textContent;
    navigator.clipboard.writeText(old);
    el.textContent = "Copied To Clipboard";
    el.addEventListener("mouseleave", () => {
      el.textContent = old;
      el.addEventListener(copyFunc);
    });
    el.removeEventListener(copyFunc);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("main > ul > li").forEach(el => {
    el.addEventListener("click", copyFunc);
  });
});
