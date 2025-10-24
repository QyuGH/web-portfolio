// Initialize EmailJS with your public key
(function() {
    emailjs.init("oGsSBUwIoX1BGGZkj");
})();

// ============================================
// 📬 MODAL FUNCTIONS
// ============================================

const modal = document.getElementById('email-modal');
const modalTitle = document.querySelector('.modal-title');
const modalMessage = document.querySelector('.modal-message');
const modalCloseBtn = document.querySelector('.modal-close-btn');

/**
 * Shows the modal with appropriate state (success or error)
 */
function showModal(type, title, message) {
    // Set modal content
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    
    // Remove any existing state classes
    modal.classList.remove('success', 'error');
    
    // Add the appropriate state class
    modal.classList.add(type);
    
    // Show the modal with a small delay for animation
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

/**
 * Hides the modal
 */
function hideModal() {
    modal.classList.remove('active');
    
    // Re-enable body scroll
    document.body.style.overflow = '';
}

// Close modal when clicking the close button
modalCloseBtn.addEventListener('click', hideModal);

// Close modal when clicking outside (on the overlay)
modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        hideModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.classList.contains('active')) {
        hideModal();
    }
});

// ============================================
// 📧 FORM SUBMISSION HANDLER
// ============================================

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const submitBtn = this.querySelector('.send-btn');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Send the email using EmailJS
    emailjs.sendForm('service_jnl65w4', 'template_ao3f0s3', this)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Show success modal
            showModal(
                'success',
                'Message Sent!',
                'Thank you for reaching out! I\'ll get back to you as soon as possible.'
            );
            
            // Reset the form
            document.getElementById('contact-form').reset();
            
            // Re-enable button
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
            
        }, function(error) {
            console.log('FAILED...', error);
            
            // Show error modal
            showModal(
                'error',
                'Oops! Something Went Wrong',
                'Failed to send your message. Please try again or contact me directly via my social media accounts.'
            );
            
            // Re-enable button
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        });
});