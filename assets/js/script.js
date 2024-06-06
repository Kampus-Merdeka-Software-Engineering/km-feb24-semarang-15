// hamburger menu
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links li a");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("show");

      const icon = hamburger.querySelector("i");
      if (icon.classList.contains("fa-bars")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });

    navItems.forEach((item) => {
      item.addEventListener("click", function () {
        navLinks.classList.remove("show");

        const icon = hamburger.querySelector("i");
        if (icon.classList.contains("fa-times")) {
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      });
    });
  } else {
    console.error("Hamburger or nav-links element not found.");
  }
});

// form email
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(email);
}

function validateForm() {
  const email = document.getElementById("email").value;
  if (!validateEmail(email)) {
    alert("Silakan masukkan email yang valid.");
    return false;
  }

  const name = document.getElementById("name").value;
  const feedback = document.getElementById("feedback").value;

  if (name === "" || feedback === "") {
    alert("Semua field harus diisi.");
    return false;
  }

  alert("Terima kasih atas feedback Anda!");
  return true;
}

// button for back to top
const backToTopButton = document.getElementById("backToTop");

// Menambahkan event listener untuk scroll
window.addEventListener("scroll", () => {
  // Jika pengguna menggulir ke bawah lebih dari 300px, tampilkan tombol
  if (window.scrollY > 300) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
});

// Menambahkan event listener untuk klik pada tombol
backToTopButton.addEventListener("click", (event) => {
  event.preventDefault();
  // Gulir ke atas dengan mulus
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// slide
const swiperEl = document.querySelector("swiper-container");
Object.assign(swiperEl, {
  slidesPerView: 1,
  spaceBetween: 10,
  pagination: {
    clickable: true,
    dynamicBullets: true,
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  },
});
swiperEl.initialize();
