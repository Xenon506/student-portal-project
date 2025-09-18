// Forum management
function loadForums() {
    const threads = getStorageData('threads') || [];
    const forumList = document.getElementById('forumList');
    forumList.innerHTML = '';
    
    threads.forEach(thread => {
        const threadElement = document.createElement('div');
        threadElement.className = 'forum-thread';
        threadElement.innerHTML = `
            <div class="forum-header">
                <strong>${thread.title}</strong>
                <span>By ${thread.author} on ${thread.date}</span>
            </div>
            <div class="forum-body">
                <p>${thread.content}</p>
                ${thread.replies.length > 0 ? 
                    `<p><strong>${thread.replies.length} reply(s)</strong></p>` : 
                    ''}
            </div>
        `;
        forumList.appendChild(threadElement);
    });
}

function createThread(e) {
    e.preventDefault();
    
    const title = document.getElementById('threadTitle').value;
    const content = document.getElementById('threadContent').value;
    const profile = getStorageData('profile');
    
    if (!title || !content) return;
    
    const threads = getStorageData('threads') || [];
    const newThread = {
        id: threads.length > 0 ? Math.max(...threads.map(t => t.id)) + 1 : 1,
        title,
        content,
        author: `${profile.firstName} ${profile.lastName}`,
        date: new Date().toISOString().split('T')[0],
        replies: []
    };
    
    threads.push(newThread);
    setStorageData('threads', threads);
    
    loadForums();
    document.getElementById('threadForm').reset();
}

// Search functionality for forums
function setupForumSearch() {
    document.getElementById('searchForums').addEventListener('input', (e) => {
        // Simple search implementation
        const searchTerm = e.target.value.toLowerCase();
        const threads = document.querySelectorAll('.forum-thread');
        
        threads.forEach(thread => {
            const title = thread.querySelector('.forum-header strong').textContent.toLowerCase();
            const content = thread.querySelector('.forum-body p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || content.includes(searchTerm)) {
                thread.style.display = 'block';
            } else {
                thread.style.display = 'none';
            }
        });
    });
}

// Initialize forum form
document.getElementById('threadForm').addEventListener('submit', createThread);
