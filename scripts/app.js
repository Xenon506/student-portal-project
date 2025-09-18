// Main application initialization
function initializeData() {
    // Initialize default data if not exists
    if (!getStorageData('profile')) {
        setStorageData('profile', {
            firstName: 'John',
            lastName: 'Doe',
            email: 'demo@university.edu',
            role: 'student'
        });
    }

    if (!getStorageData('threads')) {
        setStorageData('threads', [
            {
                id: 1,
                title: 'Welcome to the Portal!',
                content: 'This is the first discussion thread. Feel free to introduce yourself!',
                author: 'Admin',
                date: '2023-09-01',
                replies: [
                    { author: 'Jane Smith', content: 'Excited to be here!', date: '2023-09-02' }
                ]
            }
        ]);
    }

    if (!getStorageData('events')) {
        setStorageData('events', [
            { id: 1, title: 'Semester Begins', date: '2023-09-01', description: 'First day of classes' }
        ]);
    }

    if (!getStorageData('documents')) {
        setStorageData('documents', [
            { id: 1, title: 'Course Syllabus', category: 'lecture', filename: 'syllabus.pdf', uploadDate: '2023-09-01' }
        ]);
    }
}

// Navigation
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding section
            const targetId = this.getAttribute('href').substring(1);
            contentSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                    
                    // Load section-specific data
                    loadSectionData(targetId);
                }
            });
        });
    });
}

function loadSectionData(sectionId) {
    switch(sectionId) {
        case 'profile':
            if (typeof loadProfile === 'function') loadProfile();
            break;
        case 'forums':
            if (typeof loadForums === 'function') loadForums();
            break;
        case 'calendar':
            if (typeof loadCalendar === 'function') loadCalendar();
            break;
        case 'projects':
            if (typeof loadProjects === 'function') loadProjects();
            break;
        case 'documents':
            if (typeof loadDocuments === 'function') loadDocuments();
            break;
        case 'chat':
            if (typeof initChat === 'function') initChat();
            break;
        case 'analytics':
            if (typeof loadAnalytics === 'function') loadAnalytics();
            break;
    }
}

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

// Initialize application
function initApp() {
    // Create or get current user
    let user = getStorageData('currentUser');
    if (!user) {
        user = createDefaultUser();
    }
    
    // Initialize the rest of the application
    initializeData();
    
    // Load initial section data
    const activeSection = document.querySelector('.content-section.active');
    if (activeSection) {
        loadSectionData(activeSection.id);
    }
    
    // Setup navigation
    setupNavigation();
    
    // Load profile to update UI
    if (typeof loadProfile === 'function') loadProfile();
    
    console.log('Application initialized successfully');
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
