// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Hide loader after page loads
    setTimeout(function() {
        document.querySelector('.loader').classList.add('hidden');
    }, 1500);

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navRight = document.querySelector('.nav-right');
    
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        navRight.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-bars');
        this.querySelector('i').classList.toggle('fa-times');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navRight.classList.contains('active') && 
            !navRight.contains(e.target) && 
            e.target !== mobileMenuBtn && 
            !mobileMenuBtn.contains(e.target)) {
            navRight.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        }
    });

    // Dropdown menu functionality for mobile - FIXED VERSION
    const dropdowns = document.querySelectorAll('.dropdown > a');

    dropdowns.forEach(dropdownToggle => {
        dropdownToggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                const dropdown = this.parentElement;
                dropdown.classList.toggle('active');
                
                // Close other dropdowns when opening a new one
                document.querySelectorAll('.dropdown').forEach(otherDropdown => {
                    if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                        otherDropdown.classList.remove('active');
                    }
                });
            }
        });
    });

    // Close dropdowns when clicking elsewhere on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992) {
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }
    });

            // Theme toggle functionality
            const themeToggle = document.querySelector('.theme-toggle');
            const themeIcon = themeToggle.querySelector('i');
            
            // Check for saved theme preference or respect OS preference
            if (localStorage.getItem('theme') === 'dark' || 
                (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'))) {
                document.documentElement.setAttribute('data-theme', 'dark');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
            
            themeToggle.addEventListener('click', function() {
                if (document.documentElement.getAttribute('data-theme') === 'dark') {
                    document.documentElement.removeAttribute('data-theme');
                    localStorage.setItem('theme', 'light');
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                } else {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                }
            });

            // Testimonial slider
            const testimonials = document.querySelectorAll('.testimonial');
            const dots = document.querySelectorAll('.slider-dot');
            let currentTestimonial = 0;
            
            function showTestimonial(index) {
                testimonials.forEach(testimonial => testimonial.classList.remove('active'));
                dots.forEach(dot => dot.classList.remove('active'));
                
                testimonials[index].classList.add('active');
                dots[index].classList.add('active');
                currentTestimonial = index;
            }
            
            dots.forEach(dot => {
                dot.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    showTestimonial(index);
                });
            });
            
            // Auto-rotate testimonials
            setInterval(() => {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                showTestimonial(currentTestimonial);
            }, 5000);

            // Animate on scroll
            const animatedElements = document.querySelectorAll('.animate-on-scroll');
            
            function checkScroll() {
                animatedElements.forEach(element => {
                    const elementPosition = element.getBoundingClientRect().top;
                    const screenPosition = window.innerHeight / 1.3;
                    
                    if (elementPosition < screenPosition) {
                        element.classList.add('animated');
                    }
                });
            }
            
            // Initial check and then on scroll
            checkScroll();
            window.addEventListener('scroll', checkScroll);

            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 70,
                            behavior: 'smooth'
                        });
                        
                        // Close mobile menu if open
                        if (navRight.classList.contains('active')) {
                            navRight.classList.remove('active');
                            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                        }
                    }
                });
            });

            // Header scroll effect
            const header = document.querySelector('.transparent-header');
            window.addEventListener('scroll', function() {
                if (window.scrollY > 100) {
                    header.style.padding = '5px 0';
                    header.style.boxShadow = '0 2px 10px var(--shadow-color)';
                } else {
                    header.style.padding = '10px 0';
                    header.style.boxShadow = '0 2px 10px var(--shadow-color)';
                }
            });
        });


        // Feedback Form Submission
let url = 'https://script.google.com/macros/s/AKfycbybC-cwOD-6sWk-PpPqZIqNJuMOtC0rV3QD3SFKlGSOiNOItASsGNWNQie1DMDHqP2l/exec';
let form = document.querySelector('#feedback-form');
let button = form.querySelector('.btn'); // your submit button

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let d = new FormData(form);

    // ✅ show spinner
    const originalText = button.textContent;
    button.disabled = true;
    button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending...`;

    fetch(url, {
        method: "POST",
        body: d
    })
    .then((res) => res.text()) // if backend returns plain text
    .then((finalRes) => {
        console.log(finalRes);

        // ✅ Clear the form fields
        form.reset();

        // ✅ restore button
        button.disabled = false;
        button.textContent = originalText;

        // ✅ Show success message
        let msg = document.createElement("p");
        msg.innerText = "✅ Feedback submitted successfully!";
        msg.style.color = "green";
        msg.style.marginTop = "10px";

        let oldMsg = document.querySelector(".success-msg");
        if (oldMsg) oldMsg.remove();

        msg.classList.add("success-msg");
        form.appendChild(msg);

        setTimeout(() => msg.remove(), 3000);
    })
    .catch(err => {
        console.error("Error:", err);

        // ✅ restore button on error
        button.disabled = false;
        button.textContent = originalText;

        alert("❌ Something went wrong. Try again.");
    });
});
    