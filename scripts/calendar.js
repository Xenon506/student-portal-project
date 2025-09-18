// Calendar management
function loadCalendar() {
    const events = getStorageData('events') || [];
    const calendar = document.getElementById('calendarView');
    
    // Clear existing calendar cells (except headers)
    while (calendar.children.length > 7) {
        calendar.removeChild(calendar.lastChild);
    }
    
    // Generate calendar days (simplified for September 2023)
    // First day of September 2023 is Friday (index 5)
    const firstDay = 5;
    const daysInMonth = 30;
    
    // Add empty cells for days before the first
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-cell';
        calendar.appendChild(emptyCell);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement('div');
        cell.className = 'calendar-cell';
        cell.innerHTML = `<strong>${day}</strong>`;
        
        // Add events for this day
        const dateStr = `2023-09-${day.toString().padStart(2, '0')}`;
        const dayEvents = events.filter(event => event.date === dateStr);
        
        dayEvents.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.className = 'event';
            eventElement.textContent = event.title;
            cell.appendChild(eventElement);
        });
        
        calendar.appendChild(cell);
    }
}

function addEvent(e) {
    e.preventDefault();
    
    const title = document.getElementById('eventTitle').value;
    const date = document.getElementById('eventDate').value;
    const description = document.getElementById('eventDescription').value;
    
    if (!title || !date) return;
    
    const events = getStorageData('events') || [];
    const newEvent = {
        id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1,
        title,
        date,
        description
    };
    
    events.push(newEvent);
    setStorageData('events', events);
    
    loadCalendar();
    document.getElementById('eventForm').reset();
}

// Initialize event form
document.getElementById('eventForm').addEventListener('submit', addEvent);
