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

// Mobile Menu Toggle - FIXED
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
const mobileNav = document.querySelector('.mobile-nav');

// Create mobile navigation if it doesn't exist
if (!mobileNav) {
    const mobileNavHTML = `
        <div class="mobile-nav-overlay"></div>
        <div class="mobile-nav">
            <a href="#notes" class="nav-link">Notes</a>
            <a href="#textbooks" class="nav-link">Textbooks</a>
            <a href="#additional-books" class="nav-link">Wise Books</a>
            <a href="index.html">Home</a>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', mobileNavHTML);
}

// Re-select elements after creation
const mobileNavOverlayFixed = document.querySelector('.mobile-nav-overlay');
const mobileNavFixed = document.querySelector('.mobile-nav');

mobileMenuBtn.addEventListener('click', () => {
    mobileNavFixed.classList.toggle('active');
    mobileNavOverlayFixed.classList.toggle('active');
    document.body.style.overflow = mobileNavFixed.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking overlay
mobileNavOverlayFixed.addEventListener('click', () => {
    mobileNavFixed.classList.remove('active');
    mobileNavOverlayFixed.classList.remove('active');
    document.body.style.overflow = '';
});

// Smooth Scrolling for Navigation Links - FIXED
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // Only prevent default for anchor links, not for external links
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                if (mobileNavFixed) {
                    mobileNavFixed.classList.remove('active');
                    mobileNavOverlayFixed.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                // Scroll to section
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Search Functionality - FIXED
const searchCompact = document.querySelector('.search-compact');
const searchIcon = searchCompact.querySelector('i');
const searchInput = document.getElementById('searchInput');

// Toggle search input on icon click
searchIcon.addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent the click from bubbling up
    searchCompact.classList.toggle('active');
    
    if (searchCompact.classList.contains('active')) {
        searchInput.focus();
    } else {
        searchInput.value = '';
        // Show all elements when search is closed
        document.querySelectorAll('.note-item, .resource-card, .link-card').forEach(el => {
            el.style.display = '';
        });
    }
});

// Search functionality
searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    
    if (searchTerm.length === 0) {
        // Show all elements when search is empty
        document.querySelectorAll('.note-item, .resource-card, .link-card').forEach(el => {
            el.style.display = '';
        });
        return;
    }
    
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

// Close search when clicking outside
document.addEventListener('click', function(e) {
    if (!searchCompact.contains(e.target) && searchCompact.classList.contains('active')) {
        searchCompact.classList.remove('active');
        searchInput.value = '';
        
        // Show all elements when search is closed
        document.querySelectorAll('.note-item, .resource-card, .link-card').forEach(el => {
            el.style.display = '';
        });
    }
});

// Prevent search input click from closing the search
searchInput.addEventListener('click', function(e) {
    e.stopPropagation();
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
    'Public Administration uni1 (Political 3rdsem)': 'https://drive.google.com/file/d/1tAlDGOFvuuH8tk9Rp3piHEFHPdTQnGte/view?usp=drivesdk',
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