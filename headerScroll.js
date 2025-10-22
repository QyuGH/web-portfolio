// Header Scroll Animation
// Add this to your existing script.js or create a new file

const header = document.querySelector('.header');
let lastScrollY = window.scrollY;

function handleHeaderScroll() {
  const currentScrollY = window.scrollY;
  
  // Add 'scrolled' class when user scrolls down more than 50px
  if (currentScrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  lastScrollY = currentScrollY;
}

// Listen to scroll events with throttling for better performance
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleHeaderScroll();
      ticking = false;
    });
    ticking = true;
  }
});

// Initialize on page load
handleHeaderScroll();