// portfolio-project/js/navigation.js

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenuButton = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu-items');
    const mainHeader = document.getElementById('main-header');
    const menuIcon = hamburgerMenuButton ? hamburgerMenuButton.querySelector('.icon-menu') : null;
    const closeIcon = hamburgerMenuButton ? hamburgerMenuButton.querySelector('.icon-close') : null;

    // --- HAMBURGER MENU TOGGLE ---
    if (hamburgerMenuButton && navMenu && menuIcon && closeIcon) {
        hamburgerMenuButton.addEventListener('click', () => {
            // Toggle 'active' class on the navigation menu
            navMenu.classList.toggle('active');

            // Toggle 'active' class on the hamburger button itself (for icon change or other styling)
            hamburgerMenuButton.classList.toggle('active');

            // Update ARIA attribute for accessibility
            const isExpanded = navMenu.classList.contains('active');
            hamburgerMenuButton.setAttribute('aria-expanded', isExpanded);

            // Toggle icons
            if (isExpanded) {
                menuIcon.style.display = 'none';
                closeIcon.style.display = 'block'; // Or 'inline-block'
            } else {
                menuIcon.style.display = 'block'; // Or 'inline-block'
                closeIcon.style.display = 'none';
            }
        });

        // Optional: Close mobile menu when a nav link is clicked
        // Useful for SPAs or if sections are on the same page, less so for multi-page
        // navMenu.querySelectorAll('.nav-link').forEach(link => {
        //     link.addEventListener('click', () => {
        //         if (navMenu.classList.contains('active')) {
        //             navMenu.classList.remove('active');
        //             hamburgerMenuButton.classList.remove('active');
        //             hamburgerMenuButton.setAttribute('aria-expanded', 'false');
        //             menuIcon.style.display = 'block';
        //             closeIcon.style.display = 'none';
        //         }
        //     });
        // });

    } else {
        if (!hamburgerMenuButton) console.warn('Hamburger menu button not found.');
        if (!navMenu) console.warn('Navigation menu container not found.');
        if (!menuIcon) console.warn('Menu icon not found.');
        if (!closeIcon) console.warn('Close icon not found.');
    }


    // --- STICKY NAVBAR SCROLLED EFFECT ---
    if (mainHeader) {
        const scrollThreshold = 50; // Pixels to scroll before adding 'scrolled' class

        const handleScroll = () => {
            if (window.scrollY > scrollThreshold) {
                mainHeader.classList.add('scrolled');
            } else {
                mainHeader.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Call it once on load in case the page is already scrolled (e.g., after a refresh)
        handleScroll();
    } else {
        console.warn('Main header element not found for sticky effect.');
    }

    // --- ACTIVE NAV LINK HIGHLIGHTING (for multi-page sites) ---
    // This logic identifies the current page and adds an 'active' class to the corresponding nav link.
    // The 'active' class is already set in the HTML for `index.html`.
    // For other pages, this script would dynamically set it.
    const currentPagePath = window.location.pathname;
    const navLinks = navMenu ? navMenu.querySelectorAll('.nav-link') : [];

    navLinks.forEach(link => {
        // Remove 'active' from all links first (in case of back/forward navigation issues)
        link.classList.remove('active');
        // For index.html, its href is typically "/" or "/index.html"
        // For other pages, it's like "/pages/about.html"
        const linkPath = new URL(link.href).pathname;

        if (currentPagePath === linkPath || (currentPagePath === '/' && linkPath.endsWith('index.html'))) {
            link.classList.add('active');
        }
        // Special case for the root path if nav link is just "index.html"
        if (currentPagePath === '/' && link.getAttribute('href') === 'index.html') {
             link.classList.add('active');
        }
    });
     // Ensure the "Home" link on index.html specifically remains active if it's the current page.
    if (currentPagePath === '/' || currentPagePath.endsWith('index.html')) {
        const homeLink = navMenu ? navMenu.querySelector('a[href="index.html"]') : null;
        if (homeLink) {
            // Clear active from others first
            navLinks.forEach(l => l.classList.remove('active'));
            homeLink.classList.add('active');
        }
    }


    console.log('Navigation script loaded.');
});
