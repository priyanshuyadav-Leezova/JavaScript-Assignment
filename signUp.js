const inputs = document.querySelectorAll('input');
const regBtn = document.getElementById('regBtn');
const signupForm = document.getElementById('signupForm');
const toggleIcons = document.querySelectorAll('.toggleIcon');



toggleIcons.forEach(icon => {
    icon.addEventListener('click', function() {
        
        const targetId = this.getAttribute('dataTarget');
        const passwordField = document.getElementById(targetId);

        
        if (passwordField.type === "password") {
            passwordField.type = "text";
            this.classList.replace("fa-eye-slash", "fa-eye");
        } else {
            passwordField.type = "password";
            this.classList.replace("fa-eye", "fa-eye-slash");
        }
    });
});


    function validateField(input) {
        const val = input.value;
        const id = input.id;
        const errorElement = document.getElementById(id.replace('Inp', 'Err'));
        let message = "";
        let isValid = false;

        switch (id) {
            case "nameInp":
                const nameRegex = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
                if (val.startsWith(" ")) {
                    message = "Spaces not allowed.";
                } else if (!/^[a-zA-Z\s]*$/.test(val)) {
                    message = "Numbers/Symbols not allowed!";
                } else if (val.trim().length > 0 && val.trim().length < 3) {
                    message = "Min 3 letters required.";
                } else if (val.trim().length >= 3 && nameRegex.test(val)) {
                    isValid = true;
                }
                break;

            case "emailInp":
                const emailRegex = /^[a-azA-Z0-9](?:[a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9.-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/;
                
                 if (val.length > 0 && !emailRegex.test(val)) {
                    message = "Enter  valid email address.";
                } else {
                    isValid = true;
                }
                break;

            case "phoneInp":
                const phoneRegex = /^[6-9]\d{9}$/;
                    if (val[0] < '6' || val[0] > '9') {
                        message = "Must start with 6 to 9.";
                    } else if (val.length > 0 && !phoneRegex.test(val) ) {
                        message = "Must be exactly 10 digits.";
                    } else {
                        isValid = true; 
                }
                break;

            case "dobInp":
                if (val) {
                    const age = new Date().getFullYear() - new Date(val).getFullYear();
                    if (age > 100) message = "Invalid Age.";
                    if (age < 18) message = "You must be 18+ years old.";
                    else isValid = true;
                }
                break;

            case "passInp":
                const passRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
                if (val.length > 0 && !passRegex.test(val)) {
                    message = "Need 8+ chars, 1 Uppercase, 1 Special.";
                } else {
                    isValid = true;
                }
                break;

            case "confirmInp":
                const passVal = document.getElementById('passInp').value;
                if (val.length > 0 && val !== passVal) {
                    message = "Passwords do not match.";
                } else if (val === passVal && val !== "") {
                    isValid = true;
                }
                break;

            case "addressInp":
                const addressVal = document.getElementById('addressInp').value;;
                if (addressVal.trim().length > 100) {
                    message = "Max 100 Characters allow";}
                    else {
                    isValid = true;
                }
        }

        errorElement.innerText = message;
        return isValid;
    }

    function updateForm() {
        let allValid = true;
        
        inputs.forEach(input => {
            const result = validateField(input);
            if (!result) allValid = false;
        });
        regBtn.disabled = !allValid;
    }

    inputs.forEach(input => {
        input.addEventListener('input', updateForm);
        input.addEventListener('focus', updateForm);
    });

    regBtn.addEventListener('click', (e) => {
        e.preventDefault(); 
        
        const userData = {
            name: document.getElementById('nameInp').value,
            email: document.getElementById('emailInp').value,
            password: document.getElementById('passInp').value 
        };

        localStorage.setItem('registeredUser', JSON.stringify(userData));
        signupForm.reset();
        regBtn.disabled = true;
        alert("Account created successfully!");
        window.location.href = "signIn.html";
    });

