        // Disable right-click, drag, and copy on images
        document.addEventListener('DOMContentLoaded', function() {
            const images = document.querySelectorAll('.paper-image img');
            
            images.forEach(img => {
                // Disable right-click
                img.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    alert('Right-click is disabled to protect content.');
                });
                
                // Disable drag
                img.addEventListener('dragstart', (e) => {
                    e.preventDefault();
                });
                
                // Disable copy
                img.addEventListener('copy', (e) => {
                    e.preventDefault();
                    alert('Copying content is disabled.');
                });
            });
            
            // Scroll to last page functionality
            document.getElementById('scrollToLastBtn').addEventListener('click', function() {
                const lastImage = document.querySelector('.paper-image:last-child');
                lastImage.scrollIntoView({ behavior: 'smooth' });
            });
            
            
        });
