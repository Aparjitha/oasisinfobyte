function togglePassword(fieldId) {
    var field = document.getElementById(fieldId);
    if (field.type === "password") {
        field.type = "text";
    } else {
        field.type = "password";
    }
}

var loginButton = document.getElementById("loginbtn");
var loginform = document.getElementById("login");
var registerButton = document.getElementById("registerbtn");
var registerform = document.getElementById("register");
var successmes = document.getElementById("successmes");
var signinbtn = document.querySelector('.login-con .submit');
var lgusername = document.getElementById('login-username');
var lgPassword = document.getElementById('login-password');

function login() {
    loginform.style.left = "4px";
    registerform.style.right = "-520px";
    loginButton.className += " white-btn";
    registerButton.className = "button";
    loginform.style.opacity = 1;
    registerform.style.opacity = 0;
}

function register() {
    loginform.style.left = "-510px";
    registerform.style.right = "5px";
    loginButton.className = "button";
    registerButton.className += " white-btn";
    loginform.style.opacity = 0;
    registerform.style.opacity = 1;
}

function checkLoginFields() {
    signinbtn.disabled = !lgusername.value || !lgPassword.value;
}

lgusername.addEventListener('input', checkLoginFields);
lgPassword.addEventListener('input', checkLoginFields);

checkLoginFields();

function registerUser() {
    var firstName = document.getElementById('register-firstname').value;
    var lastName = document.getElementById('register-lastname').value;
    var email = document.getElementById('register-email').value;
    var password = document.getElementById('register-password').value;

    if (firstName && lastName && email && password) {
        var user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        };

        localStorage.setItem(email, JSON.stringify(user));
        alert("Registration successful!");
        login();
    } else {
        alert("Please fill in all fields.");
    }
}

function signIn() {
    var username = document.getElementById('login-username').value;
    var password = document.getElementById('login-password').value;
    var storedUser = localStorage.getItem(username);

    if (storedUser) {
        var user = JSON.parse(storedUser);
        if (user.password === password) {
            alert("Login successful!");
            document.getElementById('login').style.display = 'none';
            document.getElementById('register').style.display = 'none';
            successmes.style.display = 'flex';
        } else {
            alert("Invalid password.");
            loginform.style.display = 'block';
            registerform.style.display = 'none';
            successmes.style.display = 'none';
        }
    } else {
        alert("User not found.");
        loginform.style.display = 'block';
        registerform.style.display = 'block';
        successmes.style.display = 'none';
    }
}

function forgotPassword() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('register').style.display = 'none';
    document.getElementById('forgot').style.display = 'block';
    document.getElementById('successmes').style.display = 'none';
}

function resetPassword() {
    var usernameOrEmail = document.getElementById('forgot-username').value;
    var newPassword = document.getElementById('forgot-password').value;
    var storedUser = localStorage.getItem(usernameOrEmail);

    if (storedUser) {
        var user = JSON.parse(storedUser);
        user.password = newPassword;
        localStorage.setItem(usernameOrEmail, JSON.stringify(user));
        alert("Password reset successful!");
    } else {
        alert("User not found.");
    }

    document.getElementById('login').style.display = 'block';
    document.getElementById('register').style.display = 'none';
    document.getElementById('forgot').style.display = 'none';
    document.getElementById('successmes').style.display = 'none';
}

function showLogin() {
    document.getElementById('register').style.right = '-520px';
    document.getElementById('login').style.left = '10px';
}

function showRegister() {
    document.getElementById('login').style.left = '-520px';
    document.getElementById('register').style.right = '10px';
}

function togglePasswordVisibility(id) {
    var passwordField = document.getElementById(id);
    if (passwordField.type === "password") {
        passwordField.type = "text";
    } else {
        passwordField.type = "password";
    }
}