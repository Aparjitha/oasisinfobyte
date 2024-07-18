document.addEventListener('DOMContentLoaded', function() {
    const confirmBtn = document.getElementById('confirm-btn');
    const successMessage = document.getElementById('success-message');
    const okBtn = document.getElementById('ok-btn');
    const form = document.querySelector('.row form'); 
    confirmBtn.addEventListener('click', function(event) {
        event.preventDefault(); 
        successMessage.style.display = 'block';
    });
    okBtn.addEventListener('click', function() {
        successMessage.style.display = 'none';
        form.style.display = 'block';
    });
});
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
};

ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});