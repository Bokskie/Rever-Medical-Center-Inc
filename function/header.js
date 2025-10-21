document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('mobile-menu-icon');
    const navbar = document.querySelector('.header-navbar');
    const header = document.querySelector('.header');

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', function() {
            navbar.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }

    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        // Close mobile menu if click is outside
        if (navbar && menuIcon && navbar.classList.contains('active')) {
            if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
                navbar.classList.remove('active');
                menuIcon.querySelector('i').classList.replace('fa-times', 'fa-bars');
            }
        }
    });
});