document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-right');
    
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        navMenu.classList.toggle('show');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && e.target !== mobileMenuBtn) {
            navMenu.classList.remove('show');
            document.body.classList.remove('no-scroll');
        }
    });
    
    // Mobile Dropdown Menus
    const dropdownToggles = document.querySelectorAll('.dropdown > a');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdownMenu = this.nextElementSibling;
                const chevron = this.querySelector('i');
                
                // Close other dropdowns first
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    if (menu !== dropdownMenu) {
                        menu.classList.remove('show');
                        const otherChevron = menu.previousElementSibling.querySelector('i');
                        if (otherChevron) otherChevron.classList.remove('rotate');
                    }
                });
                
                // Toggle current dropdown
                dropdownMenu.classList.toggle('show');
                chevron.classList.toggle('rotate');
            }
        });
    });
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentTestimonial = 0;
    let autoSlideInterval;
    
    function showTestimonial(index) {
        // Wrap around if at ends
        if (index >= testimonials.length) index = 0;
        if (index < 0) index = testimonials.length - 1;
        
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        testimonials[index].classList.add('active');
        currentTestimonial = index;
        
        // Reset auto-slide timer
        resetAutoSlide();
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            showTestimonial(currentTestimonial + 1);
        }, 5000);
    }
    
    prevBtn.addEventListener('click', function() {
        showTestimonial(currentTestimonial - 1);
    });
    
    nextBtn.addEventListener('click', function() {
        showTestimonial(currentTestimonial + 1);
    });
    
    // Start auto-sliding
    resetAutoSlide();
    
    // Pause auto-slide when hovering over slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', resetAutoSlide);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('show');
                document.body.classList.remove('no-scroll');
            }
        });
    });
    
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && validateEmail(email)) {
                // Here you would typically send the email to your server
                alert('Thank you for subscribing! We will keep you updated.');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
                emailInput.focus();
            }
        });
    }
    
    // Email validation helper
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
     

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


});