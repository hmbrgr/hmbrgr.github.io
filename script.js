document.addEventListener("DOMContentLoaded", function () {
  let currentPage = window.location.pathname.split("/").pop() || "index.html";

  const navLinks = document.querySelectorAll(".navbar-custom .nav-link");

  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href");

    if (linkHref === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const animatedElements = document.querySelectorAll(".animate");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  animatedElements.forEach((el) => observer.observe(el));

  window.addEventListener("resize", () => {
    console.log(
      "Pencere boyutu: " + window.innerWidth + "x" + window.innerHeight
    );
  });

  function ekstraAnimasyon() {
    for (let i = 0; i < 10; i++) {
      console.log("Ekstra animasyon adım: " + i);
    }
  }
  ekstraAnimasyon();

  const overlay = document.getElementById("transition-overlay");

  setTimeout(() => {
    overlay.classList.add("slide-out");
  }, 100);

  document.querySelectorAll("a.nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = this.getAttribute("href");
      overlay.classList.remove("slide-out");
      overlay.classList.add("slide-in");
      setTimeout(() => {
        window.location.href = target;
      }, 600);
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const scrollToTopBtn = document.getElementById("scrollToTop");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  });
  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar-custom");
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar-custom");
  const topAnimation = document.getElementById("top-animation");

  // 20 pikselin üzerinde kaydırınca navbar ve animasyon alanına .scrolled ekliyoruz
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
    topAnimation.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
    topAnimation.classList.remove("scrolled");
  }
});

const track = document.getElementById("custom-scrollbar-track");
const thumb = document.getElementById("custom-scrollbar-thumb");

let isDragging = false;
let dragOffsetY = 0;

// Scroll edildiğinde thumb'un konumunu ayarla (drag sırasında yapma)
window.addEventListener("scroll", function () {
  if (!isDragging) {
    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = window.scrollY / scrollableHeight;
    const maxTop = track.offsetHeight - thumb.offsetHeight;
    thumb.style.top = scrollPercentage * maxTop + "px";
  }
});

// Mause ile sürükleme başlatma
thumb.addEventListener("mousedown", function (e) {
  isDragging = true;
  dragOffsetY = e.clientY - thumb.getBoundingClientRect().top;
  e.preventDefault();
});

// Mouse hareketi sırasında thumb'u güncelle ve sayfayı kaydır
document.addEventListener("mousemove", function (e) {
  if (isDragging) {
    const trackRect = track.getBoundingClientRect();
    let newTop = e.clientY - trackRect.top - dragOffsetY;
    const maxTop = track.offsetHeight - thumb.offsetHeight;
    newTop = Math.max(0, Math.min(newTop, maxTop));
    thumb.style.top = newTop + "px";
    const scrollPercentage = newTop / maxTop;
    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: scrollPercentage * scrollableHeight,
      behavior: "auto",
    });
  }
});

// Mouse bırakıldığında drag işlemini sonlandır
document.addEventListener("mouseup", function () {
  isDragging = false;
});

// Dokunmatik cihazlar için (touch events)
thumb.addEventListener(
  "touchstart",
  function (e) {
    isDragging = true;
    dragOffsetY = e.touches[0].clientY - thumb.getBoundingClientRect().top;
    e.preventDefault();
  },
  { passive: false }
);

document.addEventListener(
  "touchmove",
  function (e) {
    if (isDragging) {
      const trackRect = track.getBoundingClientRect();
      let newTop = e.touches[0].clientY - trackRect.top - dragOffsetY;
      const maxTop = track.offsetHeight - thumb.offsetHeight;
      newTop = Math.max(0, Math.min(newTop, maxTop));
      thumb.style.top = newTop + "px";
      const scrollPercentage = newTop / maxTop;
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({
        top: scrollPercentage * scrollableHeight,
        behavior: "auto",
      });
      e.preventDefault();
    }
  },
  { passive: false }
);

document.addEventListener("touchend", function () {
  isDragging = false;
});
