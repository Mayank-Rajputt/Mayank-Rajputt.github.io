// portfolio-project/js/animations.js

document.addEventListener('DOMContentLoaded', () => {
    // --- SCROLL-TRIGGERED ANIMATIONS ---

    // Select all elements you want to animate on scroll
    // Add a common class like 'animate-on-scroll' to these elements in your HTML
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

    if (elementsToAnimate.length === 0) {
        // console.log('No elements found with .animate-on-scroll class for animations.');
        return;
    }

    // Intersection Observer options
    const observerOptions = {
        root: null, // Use the browser viewport as the root
        rootMargin: '0px', // No margin
        threshold: 0.1 // Trigger when 10% of the element is visible
                       // Adjust threshold: 0 (as soon as 1px is visible) to 1.0 (100% visible)
    };

    // Callback function for the Intersection Observer
    const animationCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Element is now visible in the viewport
                entry.target.classList.add('visible');

                // Optional: Add specific animation classes based on data attributes
                // e.g., <div class="animate-on-scroll" data-animation="fade-in-up">
                const animationType = entry.target.dataset.animation;
                if (animationType) {
                    entry.target.classList.add(animationType);
                }

                // Optional: Unobserve the element after it has been animated once
                // to prevent re-animation on subsequent scrolls.
                observer.unobserve(entry.target);
            } else {
                // Element is not visible (optional: remove class if you want re-animation)
                 entry.target.classList.remove('visible');
                 if (entry.target.dataset.animation) {
                     entry.target.classList.remove(entry.target.dataset.animation);
                 }
            }
        });
    };

    // Create a new Intersection Observer
    const observer = new IntersectionObserver(animationCallback, observerOptions);

    // Observe each targeted element
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

    console.log('Scroll animation script loaded and observers attached.');

    // --- OTHER UI ANIMATIONS (Example: Smooth scroll for anchor links if not handled by CSS) ---
    // Note: CSS `scroll-behavior: smooth;` on <html> is often sufficient.
    // This is a JS alternative or for more complex scenarios.

     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
         anchor.addEventListener('click', function (e) {
             const hrefAttribute = this.getAttribute('href');
             // Ensure it's a valid internal link and not just "#" or an empty href
             if (hrefAttribute && hrefAttribute.length > 1 && hrefAttribute.startsWith('#')) {
                 const targetElement = document.querySelector(hrefAttribute);
                 if (targetElement) {
                     e.preventDefault();
                     targetElement.scrollIntoView({
                         behavior: 'smooth'
                     });
                 }
             }
         });
     });

});
