/* Shared JavaScript for DTC Eligibility Project */
/* This file contains common functionality used across multiple documents */

// Theme Management
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) {
    console.log('Theme toggle button not found');
    return;
  }

  // Check for saved theme preference or default to system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Apply the appropriate theme
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  // Toggle theme on button click
  themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    console.log('Toggling theme from', currentTheme, 'to', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    // Only auto-switch if user hasn't manually set a preference
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  });
}

// Modal functionality
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus trap for accessibility
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  }
}

function closeModal(modal) {
  if (typeof modal === 'string') {
    modal = document.getElementById(modal);
  }
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modal on overlay click
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal-overlay')) {
    const modal = e.target.closest('.modal-overlay');
    if (modal) {
      closeModal(modal);
    }
  }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const activeModal = document.querySelector('.modal.active');
    if (activeModal) {
      closeModal(activeModal);
    }
  }
});

// Close modal on close button click
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal-close') || e.target.closest('.modal-close')) {
    const modal = e.target.closest('.modal-overlay');
    if (modal) {
      closeModal(modal);
    }
  }
});

// TOC Sidebar functionality (for documents that have sidebar)
function initTOCSidebar() {
  const tocToggle = document.querySelector('.toc-toggle');
  const tocSidebar = document.querySelector('.toc-sidebar');
  const sidebarClose = document.querySelector('.toc-close');
  const sidebarBackdrop = document.querySelector('.sidebar-backdrop');

  if (!tocToggle || !tocSidebar) return;

  function openSidebar() {
    tocSidebar.classList.add('open');
    if (sidebarBackdrop) {
      sidebarBackdrop.classList.add('active');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    tocSidebar.classList.remove('open');
    if (sidebarBackdrop) {
      sidebarBackdrop.classList.remove('active');
    }
    document.body.style.overflow = '';
  }

  tocToggle.addEventListener('click', openSidebar);

  if (sidebarClose) {
    sidebarClose.addEventListener('click', closeSidebar);
  }

  if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener('click', closeSidebar);
  }

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && tocSidebar.classList.contains('open')) {
      closeSidebar();
    }
  });

  // Touch swipe to close on mobile
  let touchStartX = 0;
  const toc = tocSidebar;

  if (toc) {
    toc.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    toc.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      
      // Swipe left to close
      if (diff > 50) {
        closeSidebar();
      }
    });
  }

  // Scroll spy - highlight current section in TOC
  function updateActiveSection() {
    const sections = document.querySelectorAll('h2[id], h3[id], .section-title[id]');
    const tocLinks = tocSidebar.querySelectorAll('a[href^="#"]');
    
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 100) {
        currentSection = section.getAttribute('id');
      }
    });
    
    tocLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });

    // Update breadcrumbs with current section
    updateBreadcrumbs(currentSection);
  }

  // Update breadcrumbs to show current section
  function updateBreadcrumbs(sectionId) {
    const breadcrumbs = document.querySelector('.breadcrumbs');
    if (!breadcrumbs) return;

    // Remove existing current section breadcrumb if it exists
    const existingSection = breadcrumbs.querySelector('.breadcrumb-section');
    if (existingSection) {
      existingSection.remove();
    }

    if (!sectionId) return;

    // Find the section title
    const section = document.getElementById(sectionId);
    if (!section) return;

    const sectionTitle = section.textContent || section.innerText;
    if (!sectionTitle || sectionTitle.trim().length === 0) return;

    // Limit title length for breadcrumbs
    const shortTitle = sectionTitle.trim().length > 30 
      ? sectionTitle.trim().substring(0, 30) + '...' 
      : sectionTitle.trim();

    // Create section breadcrumb
    const sectionCrumb = document.createElement('span');
    sectionCrumb.className = 'breadcrumb-section';
    sectionCrumb.innerHTML = `<span class="breadcrumb-separator">›</span><span class="breadcrumb-current">${shortTitle}</span>`;
    
    // Insert before the last breadcrumb
    const lastCrumb = breadcrumbs.lastElementChild;
    if (lastCrumb) {
      breadcrumbs.insertBefore(sectionCrumb, lastCrumb);
    }
  }

  // Add scroll listener for active section highlighting
  window.addEventListener('scroll', updateActiveSection);
  updateActiveSection(); // Initial call
}

// Return to Top Button functionality
function initReturnToTop() {
  const returnToTopButton = document.createElement('button');
  returnToTopButton.className = 'return-to-top';
  returnToTopButton.setAttribute('aria-label', 'Return to top');
  returnToTopButton.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  `;
  document.body.appendChild(returnToTopButton);

  // Show/hide button based on scroll position
  function toggleReturnToTop() {
    if (window.scrollY > 300) {
      returnToTopButton.classList.add('visible');
    } else {
      returnToTopButton.classList.remove('visible');
    }
  }

  // Scroll to top on click
  returnToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Add scroll listener
  window.addEventListener('scroll', toggleReturnToTop);
  toggleReturnToTop(); // Initial check
}

// Hotspot functionality
function initHotspots() {
  const hotspots = document.querySelectorAll('.hotspot');
  
  hotspots.forEach(hotspot => {
    // Make hotspots keyboard accessible
    hotspot.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const modalId = this.getAttribute('data-modal');
        if (modalId) {
          openModal('modal-' + modalId);
        }
      }
    });
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initTOCSidebar();
    initHotspots();
    initReturnToTop();
  });
} else {
  initTheme();
  initTOCSidebar();
  initHotspots();
  initReturnToTop();
}