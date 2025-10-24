// Scroll Effects for Portfolio Website

// 1. SCROLL NAVIGATION EFFECT
document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling to target section
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId !== "#") {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          const header = document.querySelector(".header");
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = targetSection.offsetTop - headerHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          const navWrapper = document.querySelector(".nav-wrapper");
          const overlay = document.querySelector(".overlay");
          if (navWrapper && navWrapper.classList.contains("nav-open")) {
            navWrapper.classList.remove("nav-open");
            if (overlay) overlay.classList.remove("active");
          }
        }
      }
    });
  });

  // Highlight active nav link on scroll
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-btn-container .link");

  function highlightNavOnScroll() {
    const scrollY = window.scrollY;
    const header = document.querySelector(".header");
    const headerHeight = header ? header.offsetHeight : 0;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navItems.forEach((item) => {
          item.classList.remove("active");
          if (item.getAttribute("href") === `#${sectionId}`) {
            item.classList.add("active");
          }
        });
      }
    });
  }

  // Throttle scroll performance
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    if (scrollTimeout) window.cancelAnimationFrame(scrollTimeout);
    scrollTimeout = window.requestAnimationFrame(() => highlightNavOnScroll());
  });

  highlightNavOnScroll();
});

// 2. HEADER SCROLL ANIMATION
const header = document.querySelector(".header");
let headerLastScrollY = window.scrollY;

// Add/remove header style on scroll
function handleHeaderScroll() {
  const currentScrollY = window.scrollY;
  if (currentScrollY > 50) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
  headerLastScrollY = currentScrollY;
}

// Optimize header scroll listener
let headerTicking = false;
window.addEventListener("scroll", () => {
  if (!headerTicking) {
    window.requestAnimationFrame(() => {
      handleHeaderScroll();
      headerTicking = false;
    });
    headerTicking = true;
  }
});
handleHeaderScroll();

// 3. SCROLL DIRECTION TRACKER
let scrollLastY = window.scrollY;
let scrollIsDown = true;

// Detect scroll direction
window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  scrollIsDown = currentScrollY > scrollLastY;
  scrollLastY = currentScrollY;
});

// 4. TOOLS SECTION ANIMATION
document.addEventListener("DOMContentLoaded", () => {
  // Animate tool cards when visible
  const toolCards = document.querySelectorAll(".tool-icon-container");
  const toolObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && scrollIsDown) {
          entry.target.classList.add("tool-visible");
          toolObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px" }
  );

  toolCards.forEach((card) => toolObserver.observe(card));
});

// 5. PROJECTS SECTION ANIMATION
document.addEventListener("DOMContentLoaded", () => {
  // Animate project cards when visible
  const projectCards = document.querySelectorAll(".project-card");
  const projectObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && scrollIsDown) {
          entry.target.classList.add("project-visible");
          projectObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px" }
  );

  projectCards.forEach((card) => projectObserver.observe(card));
});

// 6. CONTACT SECTION ANIMATION
document.addEventListener("DOMContentLoaded", () => {
  // Animate contact icons and email when visible
  const contactElements = document.querySelectorAll(
    ".contact-icon-container, .email-box"
  );
  const contactObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && scrollIsDown) {
          entry.target.classList.add("contact-visible");
          contactObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px" }
  );

  contactElements.forEach((element) => contactObserver.observe(element));
});

// 7. HERO SECTION ANIMATION
document.addEventListener("DOMContentLoaded", () => {
  // Trigger hero section fade-in
  const heroContents = document.querySelector(".hero-contents");
  const heroImgContainer = document.querySelector(".hero-img-container");

  setTimeout(() => {
    if (heroContents) heroContents.classList.add("fade-in-active");
    setTimeout(() => {
      if (heroImgContainer) heroImgContainer.classList.add("fade-in-active");
    }, 200);
  }, 100);
});

// END OF FILE
