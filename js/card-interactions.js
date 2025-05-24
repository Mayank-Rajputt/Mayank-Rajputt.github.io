// portfolio-project/js/card-interactions.js

document.addEventListener('DOMContentLoaded', () => {
    const tiltableCards = document.querySelectorAll('.project-card, .skill-item, .skill-item-icon-based');

    if (tiltableCards.length === 0) {
        // console.log('No cards found for 3D tilt and interactive border effect.');
        return;
    }

    tiltableCards.forEach(card => {
        const maxTilt = 10; // Max tilt angle in degrees for the card itself
        const maxBorderAngleOffset = 30; // Max degrees the border light will shift from mouse angle
        const perspectiveValue = parseInt(getComputedStyle(card.parentElement).perspective) || 2000;
        const scaleOnHover = 1.03;
        const popOutZ = 15;

        // Store initial CSS variable for border angle if set, otherwise default to 0
        // This is for the continuous CSS animation of the border if any
        let baseBorderAngle = parseFloat(getComputedStyle(card).getPropertyValue('--border-angle')) || 0;


        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const cardWidth = rect.width;
            const cardHeight = rect.height;

            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const rotateY = (mouseX / cardWidth - 0.5) * 2 * maxTilt;
            const rotateX = -(mouseY / cardHeight - 0.5) * 2 * maxTilt;

            card.style.transform = `perspective(${perspectiveValue}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scaleOnHover}) translateZ(${popOutZ}px)`;

            // Calculate angle for the border light to follow the mouse
            const centerX = cardWidth / 2;
            const centerY = cardHeight / 2;
            const deltaX = mouseX - centerX;
            const deltaY = mouseY - centerY;

            // Angle in radians, then convert to degrees. Add 90deg to adjust origin.
            let mouseAngleDeg = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;
            if (mouseAngleDeg < 0) {
                mouseAngleDeg += 360; // Normalize to 0-360
            }

            // Update the CSS custom property for the conic-gradient 'from' angle
            // This makes the "brightest" part of the conic gradient point towards the mouse
            card.style.setProperty('--mouse-angle-on-card', `${mouseAngleDeg}deg`);

            // Update CSS variables for image tilt if you're using them directly in CSS
            card.style.setProperty('--image-rotate-x', `${rotateX * 0.5}deg`); // Example: image tilts less
            card.style.setProperty('--image-rotate-y', `${rotateY * 0.5}deg`);


            // Optional: Make inner elements react with more depth
            card.querySelectorAll('[data-depth]').forEach(el => {
                const depth = parseFloat(el.dataset.depth) || 0;
                const elTranslateX = -rotateY * depth * 0.5;
                const elTranslateY = rotateX * depth * 0.5;
                const baseZ = parseFloat(el.dataset.baseZ || '10'); // Get baseZ from data attribute
                el.style.transform = `translateX(${elTranslateX}px) translateY(${elTranslateY}px) translateZ(calc(${baseZ}px + ${depth * 15}px))`;
            });
        });

        card.addEventListener('mouseenter', () => {
            // If there's a continuous CSS animation for border rotation, we might want to pause it
            // or let the JS control take over smoothly.
            // For now, JS will directly set --mouse-angle-on-card.
            // The CSS :hover::before rule can still activate opacity/filter changes.
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(${perspectiveValue}px) rotateX(0deg) rotateY(0deg) scale(1) translateZ(0px)`;

            // Reset mouse angle for border, or let it default via CSS animation
            // card.style.removeProperty('--mouse-angle-on-card'); // This would let CSS animation take back over
            // For a smooth transition back to a default animated state, ensure the CSS animation uses a different variable
            // or the hover state in CSS for ::before simply enables opacity and blinking.
            // The current CSS for ::before on hover enables opacity and a blink animation.
            // The conic gradient 'from' angle is var(--mouse-angle-on-card, 90deg).
            // If we remove --mouse-angle-on-card, it falls back to 90deg (or its CSS animation if it had one for this var).

            // Let's ensure the CSS animation for border rotation on ::before (if any) resumes.
            // The current @keyframes animateBorderAngle animates --border-angle, not --mouse-angle-on-card.
            // So, just resetting the tilt is fine. The ::before element's hover state in CSS handles its appearance.

            card.style.removeProperty('--image-rotate-x');
            card.style.removeProperty('--image-rotate-y');

            card.querySelectorAll('[data-depth]').forEach(el => {
                const baseZ = el.dataset.baseZ || '10px';
                el.style.transform = `translateX(0px) translateY(0px) translateZ(${baseZ})`;
            });
        });

        // Store base Z for elements with data-depth to reset correctly if set in CSS
        card.querySelectorAll('[data-depth]').forEach(el => {
            // Naive way to get translateZ from computed style, may need refinement
            // This is tricky because computedStyle.transform gives a matrix.
            // Better to set base translateZ in CSS and read it if needed, or just reset to a known value.
            // For now, assume CSS sets the base translateZ like: .skill-icon-large { transform: translateZ(30px); }
            // The reset in mouseleave should ideally put it back to that.
            // We added data-base-z in a previous version, let's stick to that for reset.
            const currentTransform = getComputedStyle(el).transform;
            if (currentTransform && currentTransform !== 'none') {
                const matrix = new WebKitCSSMatrix(currentTransform);
                el.dataset.baseZ = `${matrix.m43}px`;
            } else {
                el.dataset.baseZ = '0px'; // Default if no transform initially
            }
        });
    });

    console.log('Interactive 3D card tilt and border effects initialized.');
});
