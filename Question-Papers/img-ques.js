document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.paper-image img');
    const overlay = document.createElement('div');
    
    // Create an overlay to obscure content when screenshot is suspected
    overlay.className = 'screenshot-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0, 0, 0, 0.95)';
    overlay.style.color = 'white';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '9999';
    overlay.style.display = 'none';
    overlay.style.fontSize = '20px';
    overlay.style.textAlign = 'center';
    overlay.style.padding = '20px';
    overlay.innerText = 'Screenshots are not allowed to protect content. Please contact us for authorized use.';
    document.body.appendChild(overlay);

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


   
    

    // Scroll to last page functionality
    document.getElementById('scrollToLastBtn').addEventListener('click', function() {
        const lastImage = document.querySelector('.paper-image:last-child');
        lastImage.scrollIntoView({ behavior: 'smooth' });
    });
});


    // Run before the page fully loads
    window.onload = function () {
      alert("Screenshots are not allowed to protect content.⚠️");
    };


    