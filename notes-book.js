 // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle.querySelector('i');
        
        // Check for saved theme or device preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        function setTheme(theme) {
            if (theme === 'dark') {
                document.body.classList.add('dark-theme');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-theme');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            }
        }
        
        // Initialize theme
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            setTheme(prefersDarkScheme.matches ? 'dark' : 'light');
        }
        
        // Toggle theme on button click
        themeToggle.addEventListener('click', () => {
            const isDark = document.body.classList.contains('dark-theme');
            setTheme(isDark ? 'light' : 'dark');
        });
        
        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mainNav = document.getElementById('mainNav');
        
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
        
        // Smooth Scrolling for Navigation Links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Close mobile menu if open
                    mainNav.classList.remove('active');
                    
                    // Scroll to section
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
    // Permission Modal with Google Drive Links
const permissionModal = document.getElementById('permissionModal');
const viewButtons = document.querySelectorAll('.view-btn');
const closeModal = document.getElementById('closeModal');
const resourceName = document.getElementById('resourceName');
const openResource = document.getElementById('openResource');

// Google Drive links for each resource
const driveLinks = {
    // Notes Section
    'Audiotion - Alt English': 'https://drive.google.com/file/d/1UYNBCJacF6bE-YCzkvPd54I8N2WSDPEk/view?usp=drivesdk',
    'The Ring - Alt English': 'https://drive.google.com/file/d/1AWmX76sVpMhSla6xqGGH7HIrOlM70iIY/view?usp=drivesdk',
    'History – Ancient Civilizations': 'https://drive.google.com/file/d/YOUR_FILE_ID_3/view',
    'Sociology – Social Stratification': 'https://drive.google.com/file/d/YOUR_FILE_ID_4/view',
    
    // Textbooks Section
    'Public Administration uni1 (Political 3rdsem)': 'https://drive.google.com/file/d/YOUR_FILE_ID_5/view',
    'Indian Polity for Civil Services': 'https://drive.google.com/file/d/YOUR_FILE_ID_6/view',
    'India\'s Struggle for Independence': 'https://drive.google.com/file/d/YOUR_FILE_ID_7/view',
    'Sociology: Themes and Perspectives': 'https://drive.google.com/file/d/YOUR_FILE_ID_8/view'
};

viewButtons.forEach(button => {
    button.addEventListener('click', function() {
        const title = this.getAttribute('data-title');
        resourceName.textContent = title;
        permissionModal.style.display = 'flex';
        
        // Set the Google Drive link for this resource
        const driveLink = driveLinks[title];
        if (driveLink) {
            openResource.onclick = function() {
                window.open(driveLink, '_blank');
                permissionModal.style.display = 'none';
            };
            openResource.disabled = false;
            openResource.innerHTML = '<i class="fas fa-external-link-alt"></i> Open';
        } else {
            openResource.disabled = true;
            openResource.innerHTML = '<i class="fas fa-external-link-alt"></i> Link Not Available';
        }
    });
});

closeModal.addEventListener('click', () => {
    permissionModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === permissionModal) {
        permissionModal.style.display = 'none';
    }
});
        
        // Search Functionality
        const searchInput = document.getElementById('searchInput');
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            // Search in notes
            document.querySelectorAll('.note-item').forEach(note => {
                const text = note.textContent.toLowerCase();
                note.style.display = text.includes(searchTerm) ? 'flex' : 'none';
            });
            
            // Search in resource cards
            document.querySelectorAll('.resource-card').forEach(card => {
                const text = card.textContent.toLowerCase();
                card.style.display = text.includes(searchTerm) ? 'block' : 'none';
            });
            
            // Search in links
            document.querySelectorAll('.link-card').forEach(link => {
                const text = link.textContent.toLowerCase();
                link.style.display = text.includes(searchTerm) ? 'flex' : 'none';
            });
        });
        
        // Set active navigation link based on scroll position
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('h2.section-title');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollY >= sectionTop - 100) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        });