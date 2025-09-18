// Navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Show corresponding section
            const targetId = link.getAttribute('href').substring(1);
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                    
                    // Refresh section data when shown
                    if (targetId === 'forums') {
                        loadForums();
                        setupForumSearch();
                    }
                    else if (targetId === 'calendar') loadCalendar();
                    else if (targetId === 'documents') loadDocuments();
                }
            });
        });
    });
    
    // Logout functionality
    document.getElementById('logout').addEventListener('click', (e) => {
        e.preventDefault();
        alert('Logout functionality would be implemented in a real application');
    });
}

// Initialize application
function initApp() {
    initializeData();
    loadProfile();
    loadForums();
    setupForumSearch();
    loadCalendar();
    loadDocuments();
    setupNavigation();
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
