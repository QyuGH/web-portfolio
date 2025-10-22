// Hero Section Fade-In Animation
// Add this to your script.js

// Wait for DOM to be fully loaded
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
    }, 200); // 200ms delay for image after content starts
  }, 100); // Initial 100ms delay for page load
});