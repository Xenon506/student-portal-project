// Authentication functionality
function initAuth() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;
            
            // Simple validation
            if (!email || !password || !role) {
                alert('Please fill all fields');
                return;
            }
            
            // Check if it's an institutional email
            if (!email.endsWith('.edu')) {
                alert('Please use your institutional email address');
                return;
            }
            
            // Simulate authentication (in a real app, this would call an API)
            simulateLogin(email, password, role);
        });
    }
}

function simulateLogin(email, password, role) {
    // Show loading state
    const submitBtn = document.querySelector('#loginForm button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Signing in...';
    submitBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Create user data based on role
        const nameParts = email.split('@')[0].split('.');
        const firstName = capitalize(nameParts[0]);
        const lastName = nameParts.length > 1 ? capitalize(nameParts[1]) : 'User';
        
        const userData = {
            firstName,
            lastName,
            email,
            role,
            courses: getDefaultCourses(role),
            lastLogin: new Date().toISOString()
        };
        
        // Store user data
        setStorageData('currentUser', userData);
        
        // Store authentication token (simulated)
        const authToken = simulateJWTToken(userData);
        setStorageData('authToken', authToken);
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    }, 1500);
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getDefaultCourses(role) {
    const commonCourses = ['CS101', 'MATH201', 'ENG101'];
    
    switch(role) {
        case 'student':
            return commonCourses;
        case 'faculty':
            return ['CS101', 'CS301', 'CS405'];
        case 'admin':
            return ['ALL_COURSES'];
        case 'ta':
            return ['CS101', 'CS301'];
        default:
            return commonCourses;
    }
}

function simulateJWTToken(userData) {
    // In a real app, this would be a proper JWT from the server
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
        sub: userData.email,
        role: userData.role,
        exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    }));
    const signature = 'simulated-signature';
    
    return `${header}.${payload}.${signature}`;
}

function checkAuth() {
    const authToken = getStorageData('authToken');
    const currentUser = getStorageData('currentUser');
    
    if (!authToken || !currentUser) {
        // Redirect to login if not authenticated
        if (!window.location.href.includes('index.html')) {
            window.location.href = 'index.html';
        }
        return false;
    }
    
    // Check if token is expired (simulated)
    const tokenParts = authToken.split('.');
    if (tokenParts.length === 3) {
        try {
            const payload = JSON.parse(atob(tokenParts[1]));
            if (payload.exp < Date.now()) {
                // Token expired
                localStorage.removeItem('authToken');
                localStorage.removeItem('currentUser');
                window.location.href = 'index.html';
                return false;
            }
        } catch (e) {
            // Invalid token
            localStorage.removeItem('authToken');
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
            return false;
        }
    }
    
    return true;
}

// Initialize authentication when DOM is loaded
document.addEventListener('DOMContentLoaded', initAuth);
