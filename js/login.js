const form = document.getElementById('loginForm');
const error = document.getElementById('error');

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    const username = usernameInput.value;
    const password = passwordInput.value;
    
    if (username === ADMIN_USER && password === ADMIN_PASS) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        
        // UX ENHANCEMENT: Provide immediate button loading feedback before redirecting
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerText = 'Logging in...';
        }
        window.location.href = 'admin.html';
    } else {
        error.textContent = 'Invalid username or password';
        error.classList.add('show');
        
        // UX ENHANCEMENT: Triggers a shake animation on the error element if defined in your CSS
        error.classList.remove('shake');
        void error.offsetWidth; // Tricks the browser into resetting the CSS animation
        error.classList.add('shake');
        
        // UX ENHANCEMENT: Clear the password field and put visual focus back on it
        passwordInput.value = '';
        passwordInput.focus();
    }
});

// UX ENHANCEMENT: Clears the error message automatically when the user starts re-typing
const clearErrorOnInput = () => {
    if (error.classList.contains('show')) {
        error.classList.remove('show', 'shake');
    }
};

document.getElementById('username').addEventListener('input', clearErrorOnInput);
document.getElementById('password').addEventListener('input', clearErrorOnInput);
