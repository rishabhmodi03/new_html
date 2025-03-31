// js/main.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Constants ---
    const header = document.querySelector('.site-header');
    const themeToggleButton = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const scrollToTopButton = document.getElementById('scroll-to-top');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]'); // Select only internal links
    const currentYearSpan = document.getElementById('current-year');

    // --- Initializations ---

    // 1. Set Initial Theme (from localStorage or system preference)
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            themeToggleButton.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.setAttribute('data-theme', 'light');
            themeToggleButton.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon
            localStorage.setItem('theme', 'light');
        }
    }

    // Check stored theme, then system preference, otherwise default to light
    let initialTheme = 'light';
    if (currentTheme) {
        initialTheme = currentTheme;
    } else if (prefersDark.matches) {
        initialTheme = 'dark';
    }
    applyTheme(initialTheme);

    // 2. Initialize Particles.js (Using a default config, replace with your specific config if needed)
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#ffffff" }, // Adjust color if needed
                "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 }, "image": { "src": "img/github.svg", "width": 100, "height": 100 } },
                "opacity": { "value": 0.5, "random": false, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } },
                "size": { "value": 3, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } },
                "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 }, // Adjust line color if needed
                "move": { "enable": true, "speed": 4, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                "modes": {
                    "grab": { "distance": 400, "line_linked": { "opacity": 1 } },
                    "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 },
                    "repulse": { "distance": 150, "duration": 0.4 }, // Reduced distance
                    "push": { "particles_nb": 4 },
                    "remove": { "particles_nb": 2 }
                }
            },
            "retina_detect": true
        });
    }

    // 3. Initialize Typed.js
    if (document.getElementById('typed')) {
        var typed = new Typed('#typed', {
            strings: [
                'Chartered Accountant Aspirant',
                'JavaScript Developer',
                'Python Programmer',
                'LLM Researcher'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            smartBackspace: true // Improves backspacing behavior
        });
    }

    // 4. Initialize Tilt.js for project cards
    if (typeof VanillaTilt !== 'undefined') { // Check if library loaded
         VanillaTilt.init(document.querySelectorAll(".project-card:not(.placeholder)"), { // Exclude placeholder
            max: 10,   // Reduced tilt effect slightly
            speed: 200,
            glare: true,
            "max-glare": 0.25 // Reduced glare slightly
        });
    }

    // 5. Update Current Year in Footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Event Listeners ---

    // 1. Sticky Header & Scroll-to-Top Button Visibility
    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 50) { // Add 'scrolled' class after scrolling down 50px
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll-to-Top Button
        if (window.scrollY > 300) { // Show button after scrolling 300px
            scrollToTopButton.classList.add('visible');
        } else {
            scrollToTopButton.classList.remove('visible');
        }

        // Active Nav Link Highlighting (call function)
        updateActiveNavLink();
    });

    // 2. Theme Toggle Button Click
    themeToggleButton.addEventListener('click', () => {
        const newTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    // 3. Scroll-to-Top Button Click
    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scroll to top
        });
    });

     // 4. Mobile Menu Toggle Click
     mobileMenuToggle.addEventListener('click', () => {
         mainNav.classList.toggle('active');
         // Optional: Change hamburger icon to 'X' when active
         const icon = mobileMenuToggle.querySelector('i');
         if (mainNav.classList.contains('active')) {
             icon.classList.remove('fa-bars');
             icon.classList.add('fa-times');
             // Optional: Prevent body scroll when mobile menu is open
             // document.body.style.overflow = 'hidden';
         } else {
             icon.classList.remove('fa-times');
             icon.classList.add('fa-bars');
             // Optional: Restore body scroll
             // document.body.style.overflow = '';
         }
     });

     // 5. Close Mobile Menu When a Link is Clicked
     navLinks.forEach(link => {
         link.addEventListener('click', () => {
             if (mainNav.classList.contains('active')) {
                 mainNav.classList.remove('active');
                 const icon = mobileMenuToggle.querySelector('i');
                 icon.classList.remove('fa-times');
                 icon.classList.add('fa-bars');
                 // document.body.style.overflow = ''; // Restore scroll
             }
         });
     });

    // --- Helper Functions ---

    // Function to update active navigation link based on scroll position
    function updateActiveNavLink() {
        let currentSection = '';
        const sections = document.querySelectorAll('section[id]'); // Get all sections with an ID

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjust offset based on header height + some buffer
            const offset = header.clientHeight + 50;

            if (window.scrollY >= sectionTop - offset && window.scrollY < sectionTop + sectionHeight - offset) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active'); // Remove active class from all links
            // Check if the link's href matches the current section ID
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active'); // Add active class to the matching link
            }
        });

         // Handle edge case: if scrolled to the very top, highlight 'Home'
         if (window.scrollY < sections[0].offsetTop - header.clientHeight - 50) {
              navLinks.forEach(link => link.classList.remove('active'));
              const homeLink = document.querySelector('.main-nav a[href="#home"]');
              if(homeLink) homeLink.classList.add('active');
         }
    }

     // Initial call to set active link on page load
     updateActiveNavLink();

}); // End DOMContentLoaded