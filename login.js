// Open Login Modal
function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

// Close Login Modal
function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

// Open Create Account Modal
function openCreateAccountModal() {
    document.getElementById('createAccountModal').style.display = 'block';
    closeLoginModal();
}

// Close Create Account Modal
function closeCreateAccountModal() {
    document.getElementById('createAccountModal').style.display = 'none';
}

// Open Forgot Password Modal
function openForgotPasswordModal() {
    document.getElementById('forgotPasswordModal').style.display = 'block';
    closeLoginModal();
}

// Close Forgot Password Modal
function closeForgotPasswordModal() {
    document.getElementById('forgotPasswordModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    let modal = document.getElementById("loginModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const mobileOrEmail = document.getElementById('mobileOrEmail').value;
    const password = document.getElementById('password').value;

    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData && (userData.email === mobileOrEmail || userData.phone === mobileOrEmail) && userData.password === password) {
        alert(`Welcome, ${userData.name}!`);
        window.location.href = "index.html";
        closeLoginModal();
    } else {
        alert('Email or phone not registered. Please create an account.');
    }
});

document.getElementById('createAccountForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('createPassword').value;

    // Retrieve user data from localStorage
    const existingUserData = JSON.parse(localStorage.getItem('userData'));

    if (existingUserData && (existingUserData.email === email || existingUserData.phone === phone)) {
        alert('Account already exists. Please log in.');
        closeCreateAccountModal();
        openLoginModal();
    } else {
        // Save user data to localStorage
        const userData = { name, email, phone, password };
        localStorage.setItem('userData', JSON.stringify(userData));

        alert(`Account created for ${name}. You can now log in.`);
        closeCreateAccountModal();
        openLoginModal();
    }
});

document.getElementById('forgotPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('forgotName').value;
    const mobileOrEmail = document.getElementById('forgotMobileOrEmail').value;
    const newPassword = document.getElementById('newPassword').value;

    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData && userData.name === name && (userData.email === mobileOrEmail || userData.phone === mobileOrEmail)) {
        // Update password
        userData.password = newPassword;
        localStorage.setItem('userData', JSON.stringify(userData));

        alert('Password updated successfully. You can now log in.');
        closeForgotPasswordModal();
        openLoginModal();
    } else {
        alert('No account found with the provided details.');
    }
});

function togglePasswordVisibility(id) {
    const passwordField = document.getElementById(id);
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
    } else {
        passwordField.type = 'password';
    }
}
