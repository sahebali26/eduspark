
        // Theme Toggle Functionality
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle.querySelector('i');
        
        // Check for saved theme or prefer-color-scheme
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Set initial theme
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.className = 'fas fa-sun';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.className = 'fas fa-moon';
        }
        
        // Toggle theme
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'light') {
                document.documentElement.setAttribute('data-theme', 'dark');
                themeIcon.className = 'fas fa-sun';
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                themeIcon.className = 'fas fa-moon';
                localStorage.setItem('theme', 'light');
            }
        });

        // Content Protection
        document.addEventListener('DOMContentLoaded', function() {
            const images = document.querySelectorAll('.paper-image img');
            const overlay = document.querySelector('.screenshot-overlay');
            
            images.forEach(img => {
                // Disable right-click (context menu) for desktop and long-press for mobile
                img.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    showOverlay();
                });
                
                // Disable drag
                img.addEventListener('dragstart', (e) => {
                    e.preventDefault();
                });
                
                // Disable copy
                img.addEventListener('copy', (e) => {
                    e.preventDefault();
                    showOverlay();
                });

                // Disable touch hold (long-press) on mobile
                img.addEventListener('touchstart', (e) => {
                    let touchTimeout;
                    touchTimeout = setTimeout(() => {
                        e.preventDefault();
                        showOverlay();
                    }, 500); // Assume long-press after 500ms
                    img.addEventListener('touchend', () => clearTimeout(touchTimeout));
                });
            });

            function showOverlay() {
                overlay.style.display = 'flex';
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 3000);
            }
            
            // Scroll to last page functionality
            document.getElementById('scrollToLastBtn').addEventListener('click', function() {
                const lastImage = document.querySelector('.paper-image:last-child');
                lastImage.scrollIntoView({ behavior: 'smooth' });
            });
        });

      

        // Alert on page load
        window.onload = function () {
            alert("Screenshots are not allowed to protect content.⚠️");
        };
 