// Smooth Scroll for Navigation Links
// Add this to your script.js

document.addEventListener('DOMContentLoaded', () => {
  // Get all links that start with #
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Get the href attribute
      const targetId = this.getAttribute('href');
      
      // Only proceed if it's a valid section id (not just #)
      if (targetId && targetId !== '#') {
        e.preventDefault();
        
        // Find the target section
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          // Get header height to offset scroll position
          const header = document.querySelector('.header');
          const headerHeight = header ? header.offsetHeight : 0;
          
          // Calculate target position (section top - header height - small padding)
          const targetPosition = targetSection.offsetTop - headerHeight - 20;
          
          // Smooth scroll to target
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          const navWrapper = document.querySelector('.nav-wrapper');
          const overlay = document.querySelector('.overlay');
          
          if (navWrapper && navWrapper.classList.contains('nav-open')) {
            navWrapper.classList.remove('nav-open');
            if (overlay) {
              overlay.classList.remove('active');
            }
          }
        }
      }
    });
  });
  
  // Optional: Add active state to nav links based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-btn-container .link');
  
  function highlightNavOnScroll() {
    const scrollY = window.scrollY;
    const header = document.querySelector('.header');
    const headerHeight = header ? header.offsetHeight : 0;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }
  
  // Throttle scroll event for better performance
  let scrollTimeout;
  window.addEventListener('scroll', () => {
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

//Scroll animation for tool section
