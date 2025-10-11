
  // Existing code for mobile menu and theme toggle
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navList = document.querySelector('.nav-links ul');
  menuBtn.addEventListener('click', () => { navList.classList.toggle('show'); });

  function searchContent() {
    let input = document.getElementById('search-input').value.toLowerCase();
    let content = document.getElementById('content');
    let items = content.querySelectorAll('li, p');
    for (let item of items) {
      item.style.display = item.textContent.toLowerCase().includes(input) ? 'block' : 'none';
    }
  }

  const toggle = document.getElementById('themeToggle');
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    toggle.innerHTML = document.body.classList.contains('dark') ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  });

  // New code to disable right-click and copy
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });

  document.addEventListener('selectstart', function(e) {
    e.preventDefault();
  });

  document.addEventListener('copy', function(e) {
    e.preventDefault();
    alert('Copying is disabled on this page.');
  });

  document.addEventListener('cut', function(e) {
    e.preventDefault();
    alert('Cutting is disabled on this page.');
  });





  