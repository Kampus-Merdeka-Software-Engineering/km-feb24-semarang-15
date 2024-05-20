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
