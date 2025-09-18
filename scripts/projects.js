// Projects and Seminar Scheduling functionality
function loadProjects() {
    const projects = getStorageData('projects') || getDefaultProjects();
    const projectsSection = document.getElementById('projects');
    
    if (!projectsSection) return;
    
    projectsSection.innerHTML = `
        <h2>Projects & Seminar Scheduling</h2>
        
        <div class="projects-filters">
            <select id="projectFilter">
                <option value="all">All Projects</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="my">My Projects</option>
            </select>
            <button class="btn-primary" id="createProjectBtn">Create New Project</button>
        </div>
        
        <div class="projects-list" id="projectsList">
            <!-- Projects will be loaded here -->
        </div>
        
        <div class="modal" id="projectModal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h3>Create New Project</h3>
                <form id="projectForm">
                    <div class="form-group">
                        <label for="projectTitle">Project Title</label>
                        <input type="text" id="projectTitle" required>
                    </div>
                    <div class="form-group">
                        <label for="projectDescription">Description</label>
                        <textarea id="projectDescription" rows="4" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="projectCourse">Course</label>
                        <select id="projectCourse" required>
                            <option value="">Select Course</option>
                            <option value="CS101">CS101 - Introduction to Programming</option>
                            <option value="MATH201">MATH201 - Calculus I</option>
                            <option value="ENG101">ENG101 - Composition</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="projectDeadline">Deadline</label>
                        <input type="datetime-local" id="projectDeadline" required>
                    </div>
                    <div class="form-group">
                        <label for="projectTeam">Team Members (comma separated)</label>
                        <input type="text" id="projectTeam" placeholder="email1, email2, email3">
                    </div>
                    <button type="submit" class="btn-primary">Create Project</button>
                </form>
            </div>
        </div>
    `;
    
    renderProjects(projects);
    setupProjectEvents();
}

function getDefaultProjects() {
    const user = getStorageData('currentUser');
    return [
        {
            id: 1,
            title: 'Web Application Development',
            description: 'Create a full-stack web application using React and Node.js',
            course: 'CS101',
            createdBy: user.email,
            deadline: '2023-10-15T23:59',
            status: 'active',
            team: ['student1@university.edu', 'student2@university.edu'],
            submissions: []
        },
        {
            id: 2,
            title: 'Calculus Problem Set',
            description: 'Complete problem set on derivatives and integrals',
            course: 'MATH201',
            createdBy: 'professor@university.edu',
            deadline: '2023-09-20T23:59',
            status: 'active',
            team: [],
            submissions: []
        },
        {
            id: 3,
            title: 'Research Paper',
            description: 'Write a 10-page research paper on a topic of your choice',
            course: 'ENG101',
            createdBy: 'professor@university.edu',
            deadline: '2023-08-30T23:59',
            status: 'completed',
            team: [],
            submissions: [
                {
                    student: 'student1@university.edu',
                    file: 'research_paper.pdf',
                    submittedAt: '2023-08-29T14:30',
                    grade: 'A-',
                    feedback: 'Well researched and written. Good job!'
                }
            ]
        }
    ];
}

function renderProjects(projects) {
    const projectsList = document.getElementById('projectsList');
    if (!projectsList) return;
    
    const filterValue = document.getElementById('projectFilter').value;
    const user = getStorageData('currentUser');
    
    let filteredProjects = projects;
    
    if (filterValue === 'active') {
        filteredProjects = projects.filter(p => p.status === 'active');
    } else if (filterValue === 'completed') {
        filteredProjects = projects.filter(p => p.status === 'completed');
    } else if (filterValue === 'my') {
        filteredProjects = projects.filter(p => 
            p.createdBy === user.email || p.team.includes(user.email)
        );
    }
    
    projectsList.innerHTML = '';
    
    if (filteredProjects.length === 0) {
        projectsList.innerHTML = '<p class="no-projects">No projects found.</p>';
        return;
    }
    
    filteredProjects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'project-card';
        projectElement.innerHTML = `
            <div class="project-header">
                <h3>${project.title}</h3>
                <span class="project-status ${project.status}">${project.status}</span>
            </div>
            <div class="project-course">${project.course}</div>
            <p class="project-description">${project.description}</p>
            <div class="project-details">
                <div class="project-deadline">
                    <strong>Deadline:</strong> ${formatDateTime(project.deadline)}
                </div>
                <div class="project-team">
                    <strong>Team:</strong> ${project.team.length > 0 ? project.team.join(', ') : 'Individual'}
                </div>
            </div>
            <div class="project-actions">
                ${project.status === 'active' ? `
                    <button class="btn-primary view-project" data-id="${project.id}">View Details</button>
                    ${user.role === 'student' ? `
                        <button class="btn-secondary submit-project" data-id="${project.id}">Submit Work</button>
                    ` : ''}
                ` : `
                    <button class="btn-secondary view-project" data-id="${project.id}">View Results</button>
                `}
            </div>
        `;
        projectsList.appendChild(projectElement);
    });
}

function setupProjectEvents() {
    // Filter change
    document.getElementById('projectFilter').addEventListener('change', () => {
        const projects = getStorageData('projects') || getDefaultProjects();
        renderProjects(projects);
    });
    
    // Create project button
    document.getElementById('createProjectBtn').addEventListener('click', () => {
        document.getElementById('projectModal').style.display = 'block';
    });
    
    // Close modal
    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('projectModal').style.display = 'none';
    });
    
    // Project form submission
    document.getElementById('projectForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('projectTitle').value;
        const description = document.getElementById('projectDescription').value;
        const course = document.getElementById('projectCourse').value;
        const deadline = document.getElementById('projectDeadline').value;
        const team = document.getElementById('projectTeam').value.split(',').map(email => email.trim());
        
        const user = getStorageData('currentUser');
        const projects = getStorageData('projects') || getDefaultProjects();
        
        const newProject = {
            id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1,
            title,
            description,
            course,
            createdBy: user.email,
            deadline,
            status: 'active',
            team,
            submissions: []
        };
        
        projects.push(newProject);
        setStorageData('projects', projects);
        
        document.getElementById('projectModal').style.display = 'none';
        this.reset();
        
        renderProjects(projects);
        
        // Create notification
        createNotification(
            'New Project Created',
            `You created a new project: ${title}`,
            'project'
        );
    });
    
    // View project buttons (delegation)
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('view-project')) {
            const projectId = parseInt(e.target.getAttribute('data-id'));
            viewProjectDetails(projectId);
        }
        
        if (e.target.classList.contains('submit-project')) {
            const projectId = parseInt(e.target.getAttribute('data-id'));
            submitProjectWork(projectId);
        }
    });
}

function viewProjectDetails(projectId) {
    const projects = getStorageData('projects') || getDefaultProjects();
    const project = projects.find(p => p.id === projectId);
    
    if (!project) return;
    
    // In a real app, this would open a detailed view modal
    alert(`Project: ${project.title}\nCourse: ${project.course}\nStatus: ${project.status}\nDeadline: ${formatDateTime(project.deadline)}`);
}

function submitProjectWork(projectId) {
    const projects = getStorageData('projects') || getDefaultProjects();
    const project = projects.find(p => p.id === projectId);
    const user = getStorageData('currentUser');
    
    if (!project) return;
    
    const fileName = prompt('Enter the name of your submission file:');
    if (!fileName) return;
    
    const submission = {
        student: user.email,
        file: fileName,
        submittedAt: new Date().toISOString(),
        grade: null,
        feedback: null
    };
    
    project.submissions.push(submission);
    setStorageData('projects', projects);
    
    alert('Submission recorded successfully!');
    
    // Create notification
    createNotification(
        'Project Submission',
        `You submitted work for: ${project.title}`,
        'submission'
    );
}

function formatDateTime(dateTimeStr) {
    const date = new Date(dateTimeStr);
    return date.toLocaleString();
}

// Initialize projects when DOM is loaded
if (document.getElementById('projects')) {
    document.addEventListener('DOMContentLoaded', loadProjects);
}
