// Profile management
function loadProfile() {
    const profile = getStorageData('profile');
    if (profile) {
        document.getElementById('firstName').value = profile.firstName;
        document.getElementById('lastName').value = profile.lastName;
        document.getElementById('email').value = profile.email;
        document.getElementById('role').value = profile.role;
        
        // Update profile display
        document.getElementById('profileName').textContent = `${profile.firstName} ${profile.lastName}`;
        document.getElementById('profileRole').textContent = profile.role.charAt(0).toUpperCase() + profile.role.slice(1);
        document.getElementById('avatarInitials').textContent = 
            profile.firstName.charAt(0) + profile.lastName.charAt(0);
    }
}

function saveProfile(e) {
    e.preventDefault();
    
    const profile = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        role: document.getElementById('role').value
    };
    
    setStorageData('profile', profile);
    
    // Update profile display
    document.getElementById('profileName').textContent = `${profile.firstName} ${profile.lastName}`;
    document.getElementById('profileRole').textContent = profile.role.charAt(0).toUpperCase() + profile.role.slice(1);
    document.getElementById('avatarInitials').textContent = 
        profile.firstName.charAt(0) + profile.lastName.charAt(0);
    
    // Show success message
    const alert = document.getElementById('profileAlert');
    alert.classList.remove('hidden');
    setTimeout(() => {
        alert.classList.add('hidden');
    }, 3000);
}

// Initialize profile form
document.getElementById('profileForm').addEventListener('submit', saveProfile);
