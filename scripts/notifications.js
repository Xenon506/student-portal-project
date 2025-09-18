// Notification Engine functionality
function initNotifications() {
    // Check for new notifications every 30 seconds
    setInterval(checkForNewNotifications, 30000);
    
    // Set up notification permission
    if ('Notification' in window) {
        Notification.requestPermission();
    }
}

function checkForNewNotifications() {
    // In a real app, this would check with a server
    // For demo purposes, we'll randomly generate notifications
    
    if (Math.random() > 0.7) {
        const notifications = [
            {
                title: 'New Assignment',
                message: 'A new assignment has been posted in CS101',
                type: 'assignment'
            },
            {
                title: 'Grade Posted',
                message: 'Your submission has been graded
