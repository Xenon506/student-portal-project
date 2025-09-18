// Real-Time Chat functionality
function initChat() {
    const chatSection = document.getElementById('chat');
    
    if (!chatSection) return;
    
    chatSection.innerHTML = `
        <h2>Real-Time Chat</h2>
        
        <div class="chat-container">
            <div class="chat-sidebar">
                <h3>Conversations</h3>
                <div class="chat-filters">
                    <button class="filter-btn active" data-filter="all">All</button>
                    <button class="filter-btn" data-filter="course">Course</button>
                    <button class="filter-btn" data-filter="direct">Direct</button>
                </div>
                <ul class="chat-list" id="chatList">
                    <!-- Chats will be loaded here -->
                </ul>
            </div>
            
            <div class="chat-main">
                <div class="chat-header">
                    <h3 id="currentChatName">Select a conversation</h3>
                </div>
                <div class="chat-messages" id="chatMessages">
                    <p class="no-chat-selected">Please select a conversation to start chatting</p>
                </div>
                <div class="chat-input">
                    <input type="text" id="messageInput" placeholder="Type your message..." disabled>
                    <button id="sendMessageBtn" disabled>Send</button>
                </div>
            </div>
        </div>
    `;
    
    loadChats();
    setupChatEvents();
}

function loadChats() {
    const chats = getStorageData('chats') || getDefaultChats();
    const chatList = document.getElementById('chatList');
    
    if (!chatList) return;
    
    chatList.innerHTML = '';
    
    chats.forEach(chat => {
        const chatItem = document.createElement('li');
        chatItem.className = `chat-item ${chat.unread ? 'unread' : ''}`;
        chatItem.setAttribute('data-id', chat.id);
        chatItem.setAttribute('data-type', chat.type);
        
        chatItem.innerHTML = `
            <div class="chat-avatar">${getInitials(chat.name)}</div>
            <div class="chat-info">
                <h4>${chat.name}</h4>
                <p>${chat.lastMessage || 'No messages yet'}</p>
            </div>
            <div class="chat-meta">
                <span class="chat-time">${chat.lastMessageTime ? formatTime(chat.lastMessageTime) : ''}</span>
                ${chat.unread ? '<span class="chat-badge"></span>' : ''}
            </div>
        `;
        
        chatList.appendChild(chatItem);
    });
}

function getDefaultChats() {
    const user = getStorageData('currentUser');
    return [
        {
            id: 1,
            name: 'CS101 - Introduction to Programming',
            type: 'course',
            participants: ['professor@university.edu', 'ta@university.edu', 'student1@university.edu', 'student2@university.edu'],
            lastMessage: 'Does anyone have questions about the assignment?',
            lastMessageTime: '2023-09-10T14:30:00',
            unread: true,
            messages: [
                {
                    sender: 'professor@university.edu',
                    content: 'Welcome to the CS101 course chat!',
                    timestamp: '2023-09-01T10:00:00'
                },
                {
                    sender: 'ta@university.edu',
                    content: 'Feel free to ask any questions here.',
                    timestamp: '2023-09-01T10:05:00'
                },
                {
                    sender: 'professor@university.edu',
                    content: 'The assignment is due next Friday.',
                    timestamp: '2023-09-08T15:20:00'
                },
                {
                    sender: 'ta@university.edu',
                    content: 'Does anyone have questions about the assignment?',
                    timestamp: '2023-09-10T14:30:00'
                }
            ]
        },
        {
            id: 2,
            name: 'MATH201 - Calculus I',
            type: 'course',
            participants: ['mathprof@university.edu', 'student1@university.edu', 'student2@university.edu', 'student3@university.edu'],
            lastMessage: 'Remember the quiz tomorrow!',
            lastMessageTime: '2023-09-09T16:45:00',
            unread: false,
            messages: [
                {
                    sender: 'mathprof@university.edu',
                    content: 'Welcome to the Calculus I chat.',
                    timestamp: '2023-09-01T11:30:00'
                },
                {
                    sender: 'mathprof@university.edu',
                    content: 'Remember the quiz tomorrow!',
                    timestamp: '2023-09-09T16:45:00'
                }
            ]
        },
        {
            id: 3,
            name: 'Professor Johnson',
            type: 'direct',
            participants: ['professor@university.edu', user.email],
            lastMessage: 'I submitted my assignment.',
            lastMessageTime: '2023-09-07T13:20:00',
            unread: false,
            messages: [
                {
                    sender: user.email,
                    content: 'Hello Professor, I have a question about the project.',
                    timestamp: '2023-09-05T14:15:00'
                },
                {
                    sender: 'professor@university.edu',
                    content: 'Sure, what would you like to know?',
                    timestamp: '2023-09-05T14:30:00'
                },
                {
                    sender: user.email,
                    content: 'I submitted my assignment.',
                    timestamp: '2023-09-07T13:20:00'
                }
            ]
        }
    ];
}

function setupChatEvents() {
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterChats(filter);
        });
    });
    
    // Chat item selection
    document.addEventListener('click', function(e) {
        const chatItem = e.target.closest('.chat-item');
        if (chatItem) {
            const chatId = parseInt(chatItem.getAttribute('data-id'));
            selectChat(chatId);
        }
    });
    
    // Send message button
    document.getElementById('sendMessageBtn').addEventListener('click', sendMessage);
    
    // Enter key in message input
    document.getElementById('messageInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

function filterChats(filter) {
    const chatItems = document.querySelectorAll('.chat-item');
    
    chatItems.forEach(item => {
        if (filter === 'all') {
            item.style.display = 'flex';
        } else {
            const type = item.getAttribute('data-type');
            item.style.display = type === filter ? 'flex' : 'none';
        }
    });
}

function selectChat(chatId) {
    const chats = getStorageData('chats') || getDefaultChats();
    const chat = chats.find(c => c.id === chatId);
    const user = getStorageData('currentUser');
    
    if (!chat) return;
    
    // Update UI
    document.getElementById('currentChatName').textContent = chat.name;
    document.getElementById('messageInput').disabled = false;
    document.getElementById('sendMessageBtn').disabled = false;
    
    // Display messages
    const messagesContainer = document.getElementById('chatMessages');
    messagesContainer.innerHTML = '';
    
    chat.messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.sender === user.email ? 'sent' : 'received'}`;
        
        messageElement.innerHTML = `
            <div class="message-content">
                <p>${message.content}</p>
                <span class="message-time">${formatTime(message.timestamp)}</span>
            </div>
        `;
        
        messagesContainer.appendChild(messageElement);
    });
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Mark as read
    chat.unread = false;
    setStorageData('chats', chats);
    loadChats(); // Refresh chat list
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    const currentChatName = document.getElementById('currentChatName').textContent;
    
    if (!message) return;
    
    const chats = getStorageData('chats') || getDefaultChats();
    const chat = chats.find(c => c.name === currentChatName);
    const user = getStorageData('currentUser');
    
    if (!chat) return;
    
    // Add new message
    const newMessage = {
        sender: user.email,
        content: message,
        timestamp: new Date().toISOString()
    };
    
    chat.messages.push(newMessage);
    chat.lastMessage = message;
    chat.lastMessageTime = newMessage.timestamp;
    
    // Update storage
    setStorageData('chats', chats);
    
    // Update UI
    const messagesContainer = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    messageElement.className = 'message sent';
    
    messageElement.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
            <span class="message-time">${formatTime(newMessage.timestamp)}</span>
        </div>
    `;
    
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Clear input
    input.value = '';
    
    // Simulate response for demo purposes
    if (Math.random() > 0.5) {
        simulateResponse(chat, user);
    }
}

function simulateResponse(chat, user) {
    setTimeout(() => {
        const responses = [
            "Thanks for your message!",
            "I'll get back to you soon.",
            "That's a good question.",
            "Let me check on that.",
            "I appreciate your input."
        ];
        
        const response = responses[Math.floor(Math.random() * responses.length)];
        const botEmail = chat.participants.find(p => p !== user.email);
        
        const newMessage = {
            sender: botEmail,
            content: response,
            timestamp: new Date().toISOString()
        };
        
        chat.messages.push(newMessage);
        chat.lastMessage = response;
        chat.lastMessageTime = newMessage.timestamp;
        
        setStorageData('chats', chats);
        
        // Update UI
        const messagesContainer = document.getElementById('chatMessages');
        const messageElement = document.createElement('div');
        messageElement.className = 'message received';
        
        messageElement.innerHTML = `
            <div class="message-content">
                <p>${response}</p>
                <span class="message-time">${formatTime(newMessage.timestamp)}</span>
            </div>
        `;
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1000 + Math.random() * 2000);
}

function getInitials(name) {
    return name.split(' ')
        .map(part => part.charAt(0))
        .join('')
        .toUpperCase();
}

function formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Initialize chat when DOM is loaded
if (document.getElementById('chat')) {
    document.addEventListener('DOMContentLoaded', initChat);
}
