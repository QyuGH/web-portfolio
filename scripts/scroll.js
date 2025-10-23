// This file contains JavaScript functionality for the scroll effects of the portfolio website

// 1. SCROLL NAVIGATION EFFECT
document.addEventListener("DOMContentLoaded", () => {
  // Get all links that start with #
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Get the href attribute
      const targetId = this.getAttribute("href");

      // Only proceed if it's a valid section id (not just #)
      if (targetId && targetId !== "#") {
        e.preventDefault();

        // Find the target section
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          // Get header height to offset scroll position
          const header = document.querySelector(".header");
          const headerHeight = header ? header.offsetHeight : 0;

          // Calculate target position (section top - header height - small padding)
          const targetPosition = targetSection.offsetTop - headerHeight - 20;

          // Smooth scroll to target
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          // Close mobile menu if open
          const navWrapper = document.querySelector(".nav-wrapper");
          const overlay = document.querySelector(".overlay");

          if (navWrapper && navWrapper.classList.contains("nav-open")) {
            navWrapper.classList.remove("nav-open");
            if (overlay) {
              overlay.classList.remove("active");
            }
          }
        }
      }
    });
  });

  // Add active state to nav links based on scroll position
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

  // Throttle scroll event for better performance
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
      highlightNavOnScroll();
    });
  });

  // Initial check on page load
  highlightNavOnScroll();
});

// 2. HEADER SCROLL ANIMATION
const header = document.querySelector(".header");
let headerLastScrollY = window.scrollY;

function handleHeaderScroll() {
  const currentScrollY = window.scrollY;

  // Add 'scrolled' class when user scrolls down more than 50px
  if (currentScrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  headerLastScrollY = currentScrollY;
}

// Listen to scroll events with throttling for better performance
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

// Initialize on page load
handleHeaderScroll();


// 3. SCROLL ANIMATION UTILITY
let scrollLastY = window.scrollY;
let scrollIsDown = true;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  scrollIsDown = currentScrollY > scrollLastY;
  scrollLastY = currentScrollY;
});


// 4. TOOLS SECTION ANIMATION
document.addEventListener("DOMContentLoaded", function () {
  const toolCards = document.querySelectorAll(".tool-icon-container");

  const toolObserverOptions = {
    threshold: 0.2,
    rootMargin: "0px",
  };

  const toolObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && scrollIsDown) {
        entry.target.classList.add("tool-visible");
        toolObserver.unobserve(entry.target);
      }
    });
  };

  const toolObserver = new IntersectionObserver(toolObserverCallback, toolObserverOptions);

  toolCards.forEach((card) => {
    toolObserver.observe(card);
  });
});


// 5. PROJECTS SECTION ANIMATION
document.addEventListener("DOMContentLoaded", function () {
  const projectCards = document.querySelectorAll(".project-card");

  const projectObserverOptions = {
    threshold: 0.2,
    rootMargin: "0px",
  };

  const projectObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && scrollIsDown) {
        entry.target.classList.add("project-visible");
        projectObserver.unobserve(entry.target);
      }
    });
  };

  const projectObserver = new IntersectionObserver(projectObserverCallback, projectObserverOptions);

  projectCards.forEach((card) => {
    projectObserver.observe(card);
  });
});


// 6. CONTACT SECTION ANIMATION
document.addEventListener("DOMContentLoaded", function () {
  const contactElements = document.querySelectorAll(".contact-icon-container, .email-box");

  const contactObserverOptions = {
    threshold: 0.2,
    rootMargin: "0px",
  };

  const contactObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && scrollIsDown) {
        entry.target.classList.add("contact-visible");
        contactObserver.unobserve(entry.target);
      }
    });
  };

  const contactObserver = new IntersectionObserver(contactObserverCallback, contactObserverOptions);

  contactElements.forEach((element) => {
    contactObserver.observe(element);
  });
});


/* 7. ANIMATED EFFECTS OF HERO SECTION */
document.addEventListener('DOMContentLoaded', () => {
  const heroContents = document.querySelector('.hero-contents');
  const heroImgContainer = document.querySelector('.hero-img-container');
  
  // Small delay to ensure smooth animation start
  setTimeout(() => {
    if (heroContents) {
      heroContents.classList.add('fade-in-active');
    }
    
    // Stagger the image animation slightly for a cascading effect
    setTimeout(() => {
      if (heroImgContainer) {
        heroImgContainer.classList.add('fade-in-active');
      }
    }, 200); 
  }, 100); 
});

// END OF FILE