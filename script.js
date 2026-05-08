
const header = document.querySelector("#site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("#nav-menu");
const navLinks = [...document.querySelectorAll(".nav-links a")];
const sections = [...document.querySelectorAll("main section[id]")];
const revealItems = document.querySelectorAll(".reveal");
const backToTop = document.querySelector(".back-to-top");

const closeMenu = () => {
  menuToggle?.classList.remove("is-open");
  navMenu?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Open navigation menu");
};

const updateHeaderState = () => {
  const isScrolled = window.scrollY > 8;
  header?.classList.toggle("scrolled", isScrolled);
  backToTop?.classList.toggle("is-visible", window.scrollY > 560);
};

const setActiveNavLink = () => {
  const offset = window.innerHeight * 0.32;
  let activeId = sections[0]?.id;

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    if (window.scrollY + offset >= sectionTop) {
      activeId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeId}`;
    link.classList.toggle("active", isActive);
  });
};

menuToggle?.addEventListener("click", () => {
  const willOpen = !navMenu.classList.contains("is-open");
  menuToggle.classList.toggle("is-open", willOpen);
  navMenu.classList.toggle("is-open", willOpen);
  menuToggle.setAttribute("aria-expanded", String(willOpen));
  menuToggle.setAttribute("aria-label", willOpen ? "Close navigation menu" : "Open navigation menu");
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14, rootMargin: "0px 0px -60px 0px" },
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 6, 5) * 55}ms`;
  revealObserver.observe(item);
});

window.addEventListener("scroll", () => {
  updateHeaderState();
  setActiveNavLink();
}, { passive: true });

window.addEventListener("resize", () => {
  if (window.innerWidth > 920) {
    closeMenu();
  }
});

updateHeaderState();
setActiveNavLink();
