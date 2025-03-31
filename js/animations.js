// js/animations.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Scroll-Triggered Animations using Intersection Observer ---

    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class based on data attribute or element type
                const target = entry.target;
                let animationClass = 'fade-in'; // Default animation

                // Assign specific animations based on element or data-attribute
                if (target.hasAttribute('data-animation')) {
                    animationClass = target.getAttribute('data-animation');
                } else if (target.classList.contains('section-title')) {
                    animationClass = 'fade-in'; // Titles just fade
                } else if (target.matches('.about-image, .about-text, .skill-card, .project-card, .contact-container')) {
                     animationClass = 'slide-up'; // Slide up common elements
                }
                // Add more specific rules here if needed

                target.classList.add(animationClass);

                // Stop observing the element after animation is applied
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    // Select elements to animate
    // Add more selectors as needed for different elements/animations
    const elementsToAnimate = document.querySelectorAll(
        '.section-title, .about-image, .about-text, .skill-card, .project-card, .contact-container, .hero-content > *:not(#particles-js):not(.scroll-down-indicator)' // Animate hero content elements too
        // Example using data-attribute: '[data-animation]'
    );

    // Observe each element
    elementsToAnimate.forEach(el => {
        animationObserver.observe(el);
    });

}); // End DOMContentLoaded