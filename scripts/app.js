// Automatic user creation (remove login requirement)
function createDefaultUser() {
    const defaultUser = {
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@university.edu',
        role: 'student',
        courses: ['CS101', 'MATH201', 'ENG101'],
        lastLogin: new Date().toISOString()
    };
    
    setStorageData('currentUser', defaultUser);
    return defaultUser;
}

// Initialize application without authentication
function initApp() {
    // Create or get current user
    let user = getStorageData('currentUser');
    if (!user) {
        user = createDefaultUser();
    }
    
    // Initialize the rest of the application
    initializeData();
    loadProfile();
    loadForums();
    setupForumSearch();
    loadCalendar();
    loadDocuments();
    setupNavigation();
    
    // Initialize other components if they exist
    if (typeof loadProjects === 'function') loadProjects();
    if (typeof initChat === 'function') initChat();
    if (typeof loadAnalytics === 'function') loadAnalytics();
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
