// Dashboard functionality
function initDashboard() {
    // Load user data
    const userData = getStorageData('currentUser') || getStorageData('profile');
    if (userData) {
        document.getElementById('userName').textContent = `${userData.firstName} ${userData.lastName}`;
        document.getElementById('userRole').textContent = userData.role.charAt(0).toUpperCase() + userData.role.slice(1);
        document.getElementById('userAvatar').textContent = userData.firstName.charAt(0) + userData.lastName.charAt(0);
        document.getElementById('welcomeName').textContent = userData.firstName;
    }

    // Navigation
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
                    document.getElementById('pageTitle').textContent = this.textContent.trim();
                    
                    // Load section-specific data
                    loadSectionData(targetId);
                }
            });
        });
    });

    // Load initial section data
    loadSectionData('dashboard');
}

function loadSectionData(sectionId) {
    switch(sectionId) {
        case 'dashboard':
            loadDashboardData();
            break;
        case 'profile':
            loadProfile();
            break;
        case 'forums':
            loadForums();
            break;
        case 'calendar':
            loadCalendar();
            break;
        case 'projects':
            loadProjects();
            break;
        case 'documents':
            loadDocuments();
            break;
        case 'chat':
            initChat();
            break;
        case 'analytics':
            loadAnalytics();
            break;
    }
}

function loadDashboardData() {
    // This would load real data in a real application
    console.log("Loading dashboard data...");
    
    // Simulate loading courses
    const courses = getStorageData('courses') || [
        { code: 'CS101', name: 'Introduction to Programming', progress: 75 },
        { code: 'MATH201', name: 'Calculus I', progress: 60 },
        { code: 'ENG101', name: 'Composition', progress: 85 }
    ];
    
    // Simulate loading upcoming deadlines
    const deadlines = getStorageData('deadlines') || [
        { title: 'CS101 Assignment Due', course: 'CS101', date: '2023-09-15' },
        { title: 'Math Quiz', course: 'MATH201', date: '
