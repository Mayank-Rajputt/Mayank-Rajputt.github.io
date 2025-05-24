// portfolio-project/js/app.js

document.addEventListener('DOMContentLoaded', () => {
    const introOverlay = document.getElementById('intro-overlay');
    const mainPageContent = document.getElementById('main-page-content');
    const INTRO_DURATION = 3500; // Total duration for intro in milliseconds (e.g., 3.5 seconds)
    const NUM_SPARKS = 50; // Number of sparks to generate

    // --- INTRO ANIMATION ---
    function createSpark() {
        if (!introOverlay) return null;

        const spark = document.createElement('div');
        spark.classList.add('spark');

        // Random size for sparks
        const size = Math.random() * 8 + 2; // Sparks between 2px and 10px
        spark.style.width = `${size}px`;
        spark.style.height = `${size}px`;

        // Position sparks randomly around the center, or a specific origin
        // For a central burst effect:
        spark.style.left = `calc(50% - ${size / 2}px)`;
        spark.style.top = `calc(50% - ${size / 2}px)`;

        // Random end translation for the burst effect (CSS variables for animation)
        const angle = Math.random() * 360; // Random angle
        const distance = Math.random() * 150 + 50; // Random distance (50 to 200px)
        const tx = Math.cos(angle * Math.PI / 180) * distance;
        const ty = Math.sin(angle * Math.PI / 180) * distance;
        spark.style.setProperty('--tx', `${tx}px`);
        spark.style.setProperty('--ty', `${ty}px`);

        // Random animation duration and delay
        const duration = Math.random() * 1.5 + 0.5; // 0.5s to 2s
        const delay = Math.random() * 0.5; // Up to 0.5s delay
        spark.style.animationDuration = `${duration}s`;
        spark.style.animationDelay = `${delay}s`;

        introOverlay.appendChild(spark);
        return spark;
    }

    function startIntroAnimation() {
        if (!introOverlay || !mainPageContent) {
            if (mainPageContent) { // If intro overlay is missing, just show content
                mainPageContent.classList.add('main-content-visible');
                mainPageContent.classList.remove('hidden-initially');
            }
            return;
        }

        mainPageContent.classList.add('hidden-initially'); // Ensure content is hidden

        for (let i = 0; i < NUM_SPARKS; i++) {
            const sparkElement = createSpark();
            if (sparkElement) {
                // Trigger animation by adding class after a tiny delay to ensure styles are applied
                setTimeout(() => sparkElement.classList.add('animate'), 10);
            }
        }

        // Hide intro and show main content after specified duration
        setTimeout(() => {
            introOverlay.classList.add('hidden');
            mainPageContent.classList.add('main-content-visible');
            mainPageContent.classList.remove('hidden-initially');

            // Optional: Remove sparks from DOM after animation to clean up
            setTimeout(() => {
                const sparks = introOverlay.querySelectorAll('.spark');
                sparks.forEach(s => s.remove());
            }, 1000); // Allow fade out transition of overlay to complete

        }, INTRO_DURATION);
    }

    // Start the intro animation on page load
    startIntroAnimation();


    // --- THEME TOGGLER --- (Existing code from previous steps)
    const themeToggleButton = document.getElementById('theme-toggle-button');
    const htmlElement = document.documentElement;
    const sunIcon = themeToggleButton ? themeToggleButton.querySelector('.icon-sun') : null;
    const moonIcon = themeToggleButton ? themeToggleButton.querySelector('.icon-moon') : null;

    const applyTheme = (theme) => {
        htmlElement.setAttribute('data-theme', theme);
        if (sunIcon && moonIcon) {
            if (theme === 'dark') {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'inline-block';
            } else {
                sunIcon.style.display = 'inline-block';
                moonIcon.style.display = 'none';
            }
        }
        try {
            localStorage.setItem('portfolioTheme', theme);
        } catch (e) {
            console.warn('LocalStorage is not available. Theme preference will not be saved.');
        }
    };

    let currentTheme;
    try {
        currentTheme = localStorage.getItem('portfolioTheme');
    } catch (e) {
        currentTheme = null;
        console.warn('LocalStorage is not available. Theme preference cannot be retrieved.');
    }

    if (!currentTheme) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            currentTheme = 'dark';
        } else {
            currentTheme = 'light';
        }
    }
    applyTheme(currentTheme);

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            const newTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    } else {
        console.warn('Theme toggle button not found.');
    }

    console.log('App initialized with intro.');
});
