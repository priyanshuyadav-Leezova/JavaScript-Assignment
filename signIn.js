const emailInp = document.getElementById('siEmail');
const passInp = document.getElementById('siPass');
const loginBtn = document.getElementById('loginBtn');
const icon = document.getElementById('togglePassword');
let password = document.getElementById('siPass');

icon.addEventListener('click', function () {
    if (password.type === "password") {
        password.type = "text";
        icon.classList.add("fa-eye");
        icon.classList.remove("fa-eye-slash");
    }
    else {
        password.type = "password";
        icon.classList.add("fa-eye-slash");
        icon.classList.remove("fa-eye");
    }
});

function checkEmail() {
    const val = emailInp.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (val.length > 0 && !emailRegex.test(val)) {
        document.getElementById('siEmailErr').innerText = "Enter a valid email address.";
        return false;
    }
    document.getElementById('siEmailErr').innerText = "";
    return emailRegex.test(val);
}

function validateSignIn() {
    const email = emailInp.value.trim();
    const pass = passInp.value;
    loginBtn.disabled = !(checkEmail() && pass.length > 0);
}

loginBtn.addEventListener('click', () => {
    const savedData = localStorage.getItem('registeredUser');
    if (savedData) {
        const user = JSON.parse(savedData);
        if (emailInp.value === user.email && passInp.value === user.password) {
            window.location.href = "welcome.html";
        } else {
            document.getElementById('siPassErr').innerText = "Invalid email or password!";
        }
    } else {
        alert("No account found. Please sign up first.");
    }
});

emailInp.addEventListener('input', validateSignIn);
passInp.addEventListener('input', validateSignIn);
