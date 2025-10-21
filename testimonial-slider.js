// Testimonial Slider Functionality
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
const prevBtn = document.querySelector('.testimonial-nav-button.prev');
const nextBtn = document.querySelector('.testimonial-nav-button.next');
const sliderContainer = document.querySelector('.testimonial-slider');
const testimonialTrack = document.querySelector('.testimonial-track');

let currentIndex = 1; // Start at index 1 since second card has 'active' class
const totalCards = testimonialCards.length;

function updateSlider() {
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    testimonialCards.forEach((card, index) => {
      if (index === currentIndex) {
        card.style.transform = 'translate3d(0, 0, 0) scale(1)';
        card.style.opacity = '1';
        card.style.zIndex = '10';
      } else {
        card.style.transform = 'translate3d(0, 0, -100px) scale(0.95)';
        card.style.opacity = '0';
        card.style.zIndex = '1';
      }
    });
  } else {
    // Desktop: Circular carousel layout
    const radius = 450;
    const angleStep = (2 * Math.PI) / totalCards;
    
    testimonialCards.forEach((card, index) => {
      const position = (index - currentIndex + totalCards) % totalCards;
      const angle = position * angleStep;
      
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius - radius;
      const scale = 0.7 + (Math.cos(angle) * 0.3);
      const opacity = 0.3 + (Math.cos(angle) * 0.7);
      
      const zIndex = Math.round(50 + z);
      
      card.style.transform = `translate3d(${x}px, 0, ${z}px) scale(${scale})`;
      card.style.opacity = opacity;
      card.style.zIndex = zIndex;
    });
  }

  // Update dots
  testimonialDots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
  
  // Update active class on cards
  testimonialCards.forEach((card, index) => {
    card.classList.toggle('active', index === currentIndex);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalCards;
  updateSlider();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + totalCards) % totalCards;
  updateSlider();
}

// Auto-play functionality
let autoPlayInterval;
let isAutoPlaying = true;

function startAutoPlay() {
  if (isAutoPlaying) {
    autoPlayInterval = setInterval(() => {
      nextSlide();
    }, 3000);
  }
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

function resumeAutoPlay() {
  stopAutoPlay();
  startAutoPlay();
}

// Stop auto-play on hover
sliderContainer.addEventListener('mouseenter', () => {
  isAutoPlaying = false;
  stopAutoPlay();
});

sliderContainer.addEventListener('mouseleave', () => {
  isAutoPlaying = true;
  resumeAutoPlay();
});

// Navigation button events
if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => {
    stopAutoPlay();
    prevSlide();
    if (isAutoPlaying) resumeAutoPlay();
  });

  nextBtn.addEventListener('click', () => {
    stopAutoPlay();
    nextSlide();
    if (isAutoPlaying) resumeAutoPlay();
  });
}

// Dots navigation
testimonialDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    stopAutoPlay();
    currentIndex = index;
    updateSlider();
    if (isAutoPlaying) resumeAutoPlay();
  });
});

// Card click navigation
testimonialCards.forEach((card, index) => {
  card.addEventListener('click', () => {
    stopAutoPlay();
    currentIndex = index;
    updateSlider();
    if (isAutoPlaying) resumeAutoPlay();
  });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    stopAutoPlay();
    prevSlide();
    if (isAutoPlaying) resumeAutoPlay();
  }
  if (e.key === 'ArrowRight') {
    stopAutoPlay();
    nextSlide();
    if (isAutoPlaying) resumeAutoPlay();
  }
});

// Mouse drag functionality for desktop
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;

testimonialTrack.addEventListener('mousedown', (e) => {
  if (window.innerWidth > 768) {
    isDragging = true;
    startPos = e.clientX;
    stopAutoPlay();
  }
});

testimonialTrack.addEventListener('mousemove', (e) => {
  if (!isDragging || window.innerWidth <= 768) return;
  currentTranslate = e.clientX - startPos;
});

testimonialTrack.addEventListener('mouseup', (e) => {
  if (!isDragging || window.innerWidth <= 768) return;
  
  isDragging = false;
  const movedBy = currentTranslate;
  
  if (movedBy < -50) {
    nextSlide();
  } else if (movedBy > 50) {
    prevSlide();
  }
  
  currentTranslate = 0;
  if (isAutoPlaying) resumeAutoPlay();
});

testimonialTrack.addEventListener('mouseleave', () => {
  if (isDragging && window.innerWidth > 768) {
    isDragging = false;
    currentTranslate = 0;
    if (isAutoPlaying) resumeAutoPlay();
  }
});

// Update on window resize
window.addEventListener('resize', () => {
  updateSlider();
});

// Initialize
updateSlider();
startAutoPlay();