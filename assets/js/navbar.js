// JavaScript to handle scroll and change active class
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");
const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - nav.offsetHeight;
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });

  // Change navbar background color when scrolling down
  if (window.pageYOffset > 550) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

// sidebar
const body = document.querySelector("body"),
  sidebar = body.querySelector("nav"),
  toggle = body.querySelector(".toggle"),
  modeSwitch = body.querySelector(".toggle-switch"),
  modeText = body.querySelector(".mode-text");

toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

document.addEventListener("DOMContentLoaded", function () {
  const btn = document.querySelector(".hamburger .nav-hamburger");
  const sidebar = document.querySelector(".sidebar");
  const hamburger = document.querySelector(".hamburger");

  btn.addEventListener("click", function () {
    sidebar.classList.toggle("open");
    sidebar.classList.toggle("close");
    hamburger.classList.toggle("open");
  });
});

modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    modeText.innerText = "Light mode";
  } else {
    modeText.innerText = "Dark mode";
  }
});
