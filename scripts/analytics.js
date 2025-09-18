// Analytics Dashboard functionality
function loadAnalytics() {
    const analyticsSection = document.getElementById('analytics');
    
    if (!analyticsSection) return;
    
    analyticsSection.innerHTML = `
        <h2>Analytics Dashboard</h2>
        
        <div class="analytics-filters">
            <select id="timeFilter">
                <option value="7">Last 7 days</option>
                <option value="30" selected>Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="365">Last year</option>
            </select>
            <select id="courseFilter">
                <option value="all">All Courses</option>
                <option value="CS101">CS101</option>
                <option value="MATH201">MATH201</option>
                <option value="ENG101">ENG101</option>
            </select>
        </div>
        
        <div class="analytics-grid">
            <div class="chart-container">
                <div class="chart-header">
                    <h3>Course Engagement</h3>
                    <button class="btn-secondary">Export</button>
                </div>
                <div class="chart-placeholder" id="engagementChart">
                    <p>Course engagement chart will be displayed here</p>
                </div>
            </div>
            
            <div class="chart-container">
                <div class="chart-header">
                    <h3>Assignment Completion</h3>
                    <button class="btn-secondary">Export</button>
                </div>
                <div class="chart-placeholder" id="completionChart">
                    <p>Assignment completion chart will be displayed here</p>
                </div>
            </div>
            
            <div class="chart-container">
                <div class="chart-header">
                    <h3>Forum Activity</h3>
                    <button class="btn-secondary">Export</button>
                </div>
                <div class="chart-placeholder" id="forumChart">
                    <p>Forum activity chart will be displayed here</p>
                </div>
            </div>
            
            <div class="chart-container">
                <div class="chart-header">
                    <h3>Grade Distribution</h3>
                    <button class="btn-secondary">Export</button>
                </div>
                <div class="chart-placeholder" id="gradeChart">
                    <p>Grade distribution chart will be displayed here</p>
                </div>
            </div>
        </div>
        
        <div class="analytics-table">
            <h3>Detailed Analytics</h3>
            <table>
                <thead>
                    <tr>
                        <th>Course</th>
                        <th>Assignments Completed</th>
                        <th>Average Grade</th>
                        <th>Forum Posts</th>
                        <th>Time Spent</th>
                    </tr>
                </thead>
                <tbody id="analyticsTableBody">
                    <!-- Analytics data will be loaded here -->
                </tbody>
            </table>
        </div>
    `;
    
    loadAnalyticsData();
    setupAnalyticsEvents();
}

function loadAnalyticsData() {
    const analyticsData = getStorageData('analytics') || generateAnalyticsData();
    const tableBody = document.getElementById('analyticsTableBody');
    
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    analyticsData.forEach(course => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${course.name}</td>
            <td>${course.assignmentsCompleted}/${course.totalAssignments}</td>
            <td>${course.averageGrade}%</td>
            <td>${course.forumPosts}</td>
            <td>${course.timeSpent} hours</td>
        `;
        tableBody.appendChild(row);
    });
}

function generateAnalyticsData() {
    return [
        {
            name: 'CS101 - Introduction to Programming',
            assignmentsCompleted: 8,
            totalAssignments: 10,
            averageGrade: 87,
            forumPosts: 24,
            timeSpent: 42
        },
        {
            name: 'MATH201 - Calculus I',
            assignmentsCompleted: 6,
            totalAssignments: 8,
            averageGrade: 92,
            forumPosts: 12,
            timeSpent: 38
        },
        {
            name: 'ENG101 - Composition',
            assignmentsCompleted: 5,
            totalAssignments: 7,
            averageGrade: 78,
            forumPosts: 8,
            timeSpent: 29
        }
    ];
}

function setupAnalyticsEvents() {
    // Filter changes
    document.getElementById('timeFilter').addEventListener('change', loadAnalyticsData);
    document.getElementById('courseFilter').addEventListener('change', loadAnalyticsData);
    
    // Export buttons
    document.querySelectorAll('.chart-header .btn-secondary').forEach(btn => {
        btn.addEventListener('click', function() {
            const chartTitle = this.closest('.chart-header').querySelector('h3').textContent;
            alert(`Exporting ${chartTitle} data...`);
        });
    });
}

// Initialize analytics when DOM is loaded
if (document.getElementById('analytics')) {
    document.addEventListener('DOMContentLoaded', loadAnalytics);
}
