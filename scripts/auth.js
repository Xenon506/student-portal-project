// Remove or comment out this checkAuth() function
/*
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
*/
