// Data storage functions
function getStorageData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

function setStorageData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Initialize default data if not exists
function initializeData() {
    if (!getStorageData('profile')) {
        setStorageData('profile', {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
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
            },
            {
                id: 2,
                title: 'Assignment Questions',
                content: 'Does anyone have questions about the latest assignment?',
                author: 'Professor Johnson',
                date: '2023-09-05',
                replies: []
            }
        ]);
    }

    if (!getStorageData('events')) {
        setStorageData('events', [
            { id: 1, title: 'Semester Begins', date: '2023-09-01', description: 'First day of classes' },
            { id: 2, title: 'Assignment Due', date: '2023-09-15', description: 'Submit your first assignment' }
        ]);
    }

    if (!getStorageData('documents')) {
        setStorageData('documents', [
            { id: 1, title: 'Course Syllabus', category: 'lecture', filename: 'syllabus.pdf', uploadDate: '2023-09-01' },
            { id: 2, title: 'Week 1 Lecture Notes', category: 'lecture', filename: 'week1_notes.pdf', uploadDate: '2023-09-02' }
        ]);
    }
}
