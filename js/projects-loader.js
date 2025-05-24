// portfolio-project/js/projects-loader.js

document.addEventListener('DOMContentLoaded', () => {
    // Ensure projectsData is available (should be loaded before this script)
    if (typeof projectsData === 'undefined' || !Array.isArray(projectsData)) {
        console.error('Error: projectsData is not defined or not an array. Make sure projects-data.js is loaded correctly.');
        return;
    }

    const featuredProjectsGrid = document.getElementById('featured-projects-grid');
    const allProjectsGrid = document.getElementById('all-projects-grid'); // This ID will be on projects.html

    const MAX_FEATURED_PROJECTS = 3; // Max number of projects to show on the home page
    const NUM_COLOR_SCHEMES = 5; // Number of --color-card-accent-X variables defined in main.css

    /**
     * Creates the HTML for a single project card.
     * @param {object} project - The project data object.
     * @param {number} index - The index of the project, used for color scheme cycling.
     * @returns {HTMLElement} - The created project card element.
     */
    function createProjectCard(project, index) {
        const card = document.createElement('div');
        card.className = 'project-card'; // This class gets the 3D tilt and glassmorphism
        card.setAttribute('data-project-id', project.id);

        // Assign a color scheme based on index (cycles through 1 to NUM_COLOR_SCHEMES)
        const colorSchemeIndex = (index % NUM_COLOR_SCHEMES) + 1;
        card.setAttribute('data-color-scheme', colorSchemeIndex.toString());

        // --- IMAGE PATH CORRECTION ---
        let thumbnailPath = project.thumbnail;
        // Check if the current page is inside the 'pages' directory
        if (window.location.pathname.includes('/pages/')) {
            // If yes, and if the path doesn't already start with '../' or is an absolute URL, prepend '../'
            if (thumbnailPath && !thumbnailPath.startsWith('../') && !thumbnailPath.startsWith('http://') && !thumbnailPath.startsWith('https://')) {
                thumbnailPath = '../' + thumbnailPath;
            }
        }
        // --- END OF IMAGE PATH CORRECTION ---

        const imageContainer = document.createElement('div');
        imageContainer.className = 'project-image-container';
        const image = document.createElement('img');
        // Use the corrected thumbnailPath
        image.src = thumbnailPath || `https://placehold.co/600x400/CCCCCC/757575?text=${encodeURIComponent(project.title.substring(0,10))}`;
        image.alt = `${project.title} Thumbnail`;
        image.className = 'project-image';
        image.onerror = function() {
            this.onerror = null; // Prevent infinite loop if placeholder also fails
            // Adjust onerror placeholder path if current page is in /pages/
            let placeholderPath = `https://placehold.co/600x400/CCCCCC/757575?text=${encodeURIComponent(project.title.substring(0,15))}`;
            this.src = placeholderPath;
            this.alt = `${project.title} - Image not found`;
        };
        imageContainer.appendChild(image);

        // Content area
        const content = document.createElement('div');
        content.className = 'project-card-content';

        const title = document.createElement('h3');
        title.className = 'project-title'; // CSS will use data-color-scheme on parent card to color this
        title.textContent = project.title;

        // Optional: Tags
        if (project.tags && project.tags.length > 0) {
            const tagsContainer = document.createElement('div');
            tagsContainer.className = 'project-tags';
            project.tags.forEach(tagText => {
                const tag = document.createElement('span');
                tag.className = 'tag';
                tag.textContent = tagText;
                tagsContainer.appendChild(tag);
            });
            content.appendChild(tagsContainer);
        }

        const description = document.createElement('p');
        description.className = 'project-description';
        description.textContent = project.description;

        content.appendChild(title);
        content.appendChild(description);


        // Actions (buttons)
        const actions = document.createElement('div');
        actions.className = 'project-card-actions';

        if (project.liveLink && project.liveLink !== '#') {
            const liveButton = document.createElement('a');
            liveButton.href = project.liveLink;
            liveButton.className = 'btn btn-primary project-link'; // This will get colored by data-color-scheme
            liveButton.textContent = 'View Live';
            liveButton.target = '_blank';
            liveButton.rel = 'noopener noreferrer';
            actions.appendChild(liveButton);
        }

        if (project.sourceLink && project.sourceLink !== '#') {
            const sourceButton = document.createElement('a');
            sourceButton.href = project.sourceLink;
            sourceButton.className = 'btn btn-secondary project-link'; // Secondary button style
            sourceButton.textContent = 'Source Code';
            sourceButton.target = '_blank';
            sourceButton.rel = 'noopener noreferrer';
            actions.appendChild(sourceButton);
        }

        card.appendChild(imageContainer);
        card.appendChild(content);
        if (actions.children.length > 0) {
            card.appendChild(actions);
        }

        return card;
    }

    /**
     * Renders projects into the specified grid container.
     * @param {HTMLElement} gridContainer - The container to append project cards to.
     * @param {Array<object>} projectsToRender - Array of project objects to render.
     */
    function renderProjects(gridContainer, projectsToRender) {
        if (!gridContainer) {
            return;
        }
        gridContainer.innerHTML = ''; // Clear existing content (e.g., "Loading projects...")
        if (projectsToRender.length === 0) {
            gridContainer.innerHTML = '<p class="text-center text-muted">No projects to display at the moment.</p>';
            return;
        }
        projectsToRender.forEach((project, index) => {
            // Pass the index to createProjectCard for color scheme cycling
            const projectCardElement = createProjectCard(project, index);
            gridContainer.appendChild(projectCardElement);
        });

        // After rendering new cards, re-initialize card interactions if they are not live
        // This is important if card-interactions.js runs only once on initial DOMContentLoaded
        if (typeof window.initializeCardTiltInteractions === 'function') {
            window.initializeCardTiltInteractions();
        } else if (typeof cardInteractionsInit === 'function') { // Fallback if you named it differently
            cardInteractionsInit();
        }
    }

    // --- LOAD FEATURED PROJECTS (for Home Page) ---
    if (featuredProjectsGrid) {
        const featured = projectsData.filter(p => p.featured === true).slice(0, MAX_FEATURED_PROJECTS);
        if (featured.length > 0) {
            renderProjects(featuredProjectsGrid, featured);
        } else if (projectsData.length > 0) {
            const fallbackFeatured = projectsData.slice(0, MAX_FEATURED_PROJECTS);
            renderProjects(featuredProjectsGrid, fallbackFeatured);
        } else {
            featuredProjectsGrid.innerHTML = '<p class="text-center text-muted">Exciting projects coming soon!</p>';
        }
    }

    // --- LOAD ALL PROJECTS (for Projects Page) ---
    if (allProjectsGrid) {
        renderProjects(allProjectsGrid, projectsData);
    }

    console.log('Projects loader script executed.');
});
