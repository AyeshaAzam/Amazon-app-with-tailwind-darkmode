const checkbox = document.querySelector("#toggle");
console.log("what is in checkbox", checkbox);
const html = document.querySelector("html");
console.log("what is in html", html);

const toggleDarkMode = function () {
  checkbox.checked ? html.classList.add("dark") : html.classList.remove("dark");
};

toggleDarkMode();
checkbox.addEventListener("click", toggleDarkMode);

// just for testing and the below code works:
// window.onload = function () {
//   const checkBox = document.getElementById("toggle");
//   console.log("what is in checkbox", checkBox);
//   const html = document.querySelector("html");
//   checkBox.checked = true;
//   checkBox.onchange = function () {
//     html.style.display = this.checked ? "block" : console.log("Working....");
//   };
//   checkBox.onchange();
// };
