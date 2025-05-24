
const projectsData = [
    {
        id: 'proj-001',
        title: 'HR Dashboard Data Analysis using Power BI',
        description: 'Designed a Power BI dashboard focused on analyzing why employees leave the organization (attrition analysis).',
        thumbnail: 'assets/images/projects/project.png', 
        sourceLink: 'https://github.com/Mayank-Rajputt/HR-DASHBOARD', // Replace with actual source link
        tags: ['PowerBI', 'MS Excel', 'Dashboard', 'Pivot Table', 'KPIs', 'Data Cleaning'],
        featured: true // true if this project should appear in "Featured Projects" on the home page
    },
    {
        id: 'proj-002',
        title: 'Sales Forcasting Project using Power BI - DAX',
        description: 'Used data modeling, DAX, and mapping to visualize key metrics like revenue, profit, and product performance.',
        thumbnail: 'assets/images/projects/project2.png', // Replace with actual path
        liveLink: '#',
        sourceLink: 'https://github.com/Mayank-Rajputt/SuperStore-Sales-Dashboard',
        tags: ['PowerBI', 'DAX-Quaries', 'Data Visualization', 'API Integration'],
        featured: true
    },
    {
        id: 'proj-004',
        title: 'Car Price Prediction - Data Preprocessing & Exploration',
        description: 'This project is focused on data preprocessing and exploratory analysis for a car price prediction dataset. It includes techniques to handle missing values, perform encoding, and prepare the data for machine learning tasks.',
        thumbnail: 'assets/images/projects/projectt1.png', // Replace with actual path
        liveLink: '#',
        sourceLink: 'https://github.com/Mayank-Rajputt/Car-Price-Preprocessing',
        tags: ['Pandas', 'Matplotlib', 'Seaborn', 'sklitlearn'],
        featured: true
    },
    
    {
        id: 'proj-005',
        title: 'Portfolio Website V1',
        description: 'An earlier version of my personal portfolio, showcasing foundational web development skills. This project helped solidify my understanding of core HTML and CSS concepts.',
        thumbnail: 'assets/images/projects/projecttt.png', 
        liveLink: null,
        sourceLink: null, // Example: No source link
        tags: ['HTML', 'CSS', 'Early Work'],
        featured: false
    }
    // Add more project objects here as needed
];

// To make projectsData available to other scripts, ensure this file is loaded before them.
// For example, in index.html:
// <script src="js/data/projects-data.js"></script>
// <script src="js/projects-loader.js"></script>
// No explicit export is needed if scripts are loaded in order in the HTML.
