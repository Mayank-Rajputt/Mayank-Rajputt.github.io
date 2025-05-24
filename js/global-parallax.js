// portfolio-project/js/global-parallax.js

document.addEventListener('DOMContentLoaded', () => {
    const globalBgElement = document.getElementById('global-animated-bg');
    // Optional: Select the main content wrapper if you want to apply a counter-parallax to it
    // const pageContentContainer = document.querySelector('.page-content-container');

    if (!globalBgElement) {
        // console.log('Global animated background element not found for parallax effect.');
        return;
    }

    // Define sensitivity for parallax effect (smaller numbers = more movement)
    // These should correspond to the layers defined in main.css for #global-animated-bg
    const sensitivityLayer1 = 25; // For ::before pseudo-element (nebulae)
    const sensitivityLayer2 = 50;  // For ::after pseudo-element (stars)

    // Optional: Sensitivity for moving the actual page content slightly
    // const contentSensitivity = 80;
    // const maxContentOffset = 10; // Max pixels the content can move

    // Store the initial (default) positions from CSS in case they are not 50% or 0px
    // For simplicity, we'll assume the JS will always calculate from a virtual center or edge.
    // The CSS variables in main.css already have default fallback values.

    const handleMouseMove = (e) => {
        // Calculate mouse position relative to the center of the viewport
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        // Calculate offsets for background layers
        // The 'calc(DEFAULT% + ...)' structure allows CSS defaults to be respected
        // and JS adds the parallax offset.

        // Layer 1 (::before - nebulae) - Assuming 3 gradient stops
        const offsetX1_L1 = deltaX / sensitivityLayer1;
        const offsetY1_L1 = deltaY / sensitivityLayer1;
        globalBgElement.style.setProperty('--global-bg1-x', `calc(50% + ${offsetX1_L1}px)`);
        globalBgElement.style.setProperty('--global-bg1-y', `calc(50% + ${offsetY1_L1}px)`);

        const offsetX2_L1 = deltaX / (sensitivityLayer1 * 1.2); // Slightly different movement
        const offsetY2_L1 = deltaY / (sensitivityLayer1 * 1.2);
        globalBgElement.style.setProperty('--global-bg1-x2', `calc(20% + ${offsetX2_L1}px)`);
        globalBgElement.style.setProperty('--global-bg1-y2', `calc(80% + ${offsetY2_L1}px)`);

        const offsetX3_L1 = deltaX / (sensitivityLayer1 * 1.5); // Even more different
        const offsetY3_L1 = deltaY / (sensitivityLayer1 * 1.5);
        globalBgElement.style.setProperty('--global-bg1-x3', `calc(80% + ${offsetX3_L1}px)`);
        globalBgElement.style.setProperty('--global-bg1-y3', `calc(30% + ${offsetY3_L1}px)`);


        // Layer 2 (::after - stars) - Assuming 2 gradient stops for star patterns
        const offsetX1_L2 = deltaX / sensitivityLayer2;
        const offsetY1_L2 = deltaY / sensitivityLayer2;
        globalBgElement.style.setProperty('--global-bg2-x', `${offsetX1_L2}px`); // Starts at 0px default
        globalBgElement.style.setProperty('--global-bg2-y', `${offsetY1_L2}px`); // Starts at 0px default

        const offsetX2_L2 = deltaX / (sensitivityLayer2 * 1.3);
        const offsetY2_L2 = deltaY / (sensitivityLayer2 * 1.3);
        globalBgElement.style.setProperty('--global-bg2-x2', `calc(25px + ${offsetX2_L2}px)`); // Starts at 25px default
        globalBgElement.style.setProperty('--global-bg2-y2', `calc(25px + ${offsetY2_L2}px)`); // Starts at 25px default

        // Optional: Move the entire .page-content-container slightly in the opposite direction
        // if (pageContentContainer) {
        //     const contentOffsetX = Math.max(-maxContentOffset, Math.min(maxContentOffset, -deltaX / contentSensitivity));
        //     const contentOffsetY = Math.max(-maxContentOffset, Math.min(maxContentOffset, -deltaY / contentSensitivity));
        //     pageContentContainer.style.transform = `translate(${contentOffsetX}px, ${contentOffsetY}px)`;
        // }
    };

    // Add mousemove event listener to the window for a global effect
    window.addEventListener('mousemove', handleMouseMove);

    // Optional: Reset on mouse leave from window (might not be desired for a persistent background)
    // window.addEventListener('mouseleave', () => {
    //     // Reset background positions to default centers/origins defined in CSS fallbacks
    //     globalBgElement.style.removeProperty('--global-bg1-x');
    //     globalBgElement.style.removeProperty('--global-bg1-y');
    //     // ... and so on for all variables
    //     // Or set them back to their explicit defaults:
    //     // globalBgElement.style.setProperty('--global-bg1-x', `50%`);

    //     if (pageContentContainer) {
    //         pageContentContainer.style.transform = 'translate(0px, 0px)';
    //     }
    // });

    console.log('Global parallax background effect initialized.');
});
