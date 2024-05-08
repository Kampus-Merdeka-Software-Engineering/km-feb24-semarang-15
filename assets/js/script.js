// hamburger menu
const menuToggle = document.querySelector(".menu-toggle input");
const nav = document.querySelector("nav");

menuToggle.addEventListener("click", function () {
  nav.classList.toggle("slide");
});

// const menuToggle = document.querySelector(".menu-toggle input");
// const navMenu = document.querySelector("nav");

// menuToggle.addEventListener("click", function () {
//   menuToggle.classList.toggle("slide");
//   navMenu.classList.toggle("hidden");
// });

// window.addEventListener("click", function (e) {
//   if (e.target != menuToggle && e.target != navMenu) {
//     menuToggle.classList.remove(".menu-toggle input");
//     navMenu.classList.add("hidden");
//   }
// });

// add class when nav scroll
document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
    var nav = document.querySelector("nav");
    if (window.scrollY > 450) {
      nav.classList.add("sticky");
    } else {
      nav.classList.remove("sticky");
    }
  });
});

// Buka dan baca file JSON
fetch("dataset-superstore.json")
  .then((response) => response.json())
  .then((data) => {
    // Ambil nilai yang Anda butuhkan dari file JSON
    const salesValue = data[0].Sales; // Mengambil nilai Sales dari data pertama
    const profitValue = data[1].Profit; // Mengambil nilai Profit dari data kedua

    // Perbarui nilai tag <p> dengan nilai yang diperoleh
    document.getElementById("salesValue").innerText = salesValue;
    document.getElementById("profitValue").innerText = profitValue;
    document.getElementById("salesValue_1").innerText = salesValue;
    document.getElementById("profitValue_2").innerText = profitValue;
  })
  .catch((error) => console.error("Error reading JSON:", error));
