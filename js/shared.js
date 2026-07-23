/* Shared JavaScript for DTC Eligibility Project */
/* This file contains common functionality used across multiple documents */

// Theme Management
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.classList.toggle('light', theme === 'light');
  localStorage.setItem('dtc-theme', theme);
}

function initTheme() {
  // Check for saved theme preference or default to system preference
  const savedTheme = localStorage.getItem('dtc-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Apply the appropriate theme
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  }

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    // Only auto-switch if user hasn't manually set a preference
    if (!localStorage.getItem('dtc-theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
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
    const activeModal =
      document.querySelector('.modal-overlay.active') ||
      document.querySelector('.modal.active');
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
  const tocSidebar = document.querySelector('.toc-sidebar, .page-sidebar');
  const sidebarBackdrop = document.querySelector('.sidebar-backdrop');
  const tocClose = document.querySelector('.toc-close, .sidebar-close');

  if (!tocToggle || !tocSidebar) return;

  function setBackdropVisible(visible) {
    if (!sidebarBackdrop) return;
    sidebarBackdrop.classList.toggle('active', visible);
    sidebarBackdrop.classList.toggle('show', visible);
  }

  function closeSidebar() {
    tocSidebar.classList.remove('open');
    setBackdropVisible(false);
    document.body.style.overflow = '';
    tocToggle.classList.remove('open');
  }

  function openSidebar() {
    tocSidebar.classList.add('open');
    setBackdropVisible(true);
    document.body.style.overflow = 'hidden';
    tocToggle.classList.add('open');
  }

  function toggleSidebar() {
    if (tocSidebar.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }

  tocToggle.addEventListener('click', toggleSidebar);

  if (tocClose) {
    tocClose.addEventListener('click', closeSidebar);
  }

  if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener('click', closeSidebar);
  }

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && tocSidebar.classList.contains('open')) {
      closeSidebar();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      toggleSidebar();
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
    const sections = Array.from(
      document.querySelectorAll('h2[id], h3[id], .section-title[id]')
    ).filter(el => !el.closest('.modal-overlay')); // exclude hidden modal titles
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
  if (
    document.getElementById('scrollTop') ||
    document.querySelector('.scroll-top, #fab-top, .return-to-top')
  ) {
    return;
  }

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

// Concept-map horizontal scroll hints (mobile)
function initConceptMapScrollHints() {
  const boxes = document.querySelectorAll('.diagram-box.concept-map');
  if (!boxes.length) return;

  const updateBox = (box) => {
    const scrollEl = box;
    const overflow = scrollEl.scrollWidth > scrollEl.clientWidth + 4;
    box.classList.toggle('is-scrollable', overflow);
    if (!overflow) {
      box.classList.remove('is-scrolled-end');
      return;
    }
    const atEnd = scrollEl.scrollLeft + scrollEl.clientWidth >= scrollEl.scrollWidth - 8;
    box.classList.toggle('is-scrolled-end', atEnd);
  };

  boxes.forEach((box) => {
    updateBox(box);
    box.addEventListener('scroll', () => updateBox(box), { passive: true });
  });

  window.addEventListener('resize', () => {
    boxes.forEach(updateBox);
  }, { passive: true });
}

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

  // Concept-map SVG nodes (data-modal="dtc" opens modal-dtc)
  document.querySelectorAll('.cm-node[data-modal]').forEach(node => {
    const openFromNode = function() {
      const modalId = node.getAttribute('data-modal');
      if (modalId) openModal('modal-' + modalId);
    };
    node.addEventListener('click', openFromNode);
    node.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openFromNode();
      }
    });
  });
}

// Generic keyboard support for other clickable "pseudo-buttons"
// (.legacy-tag, .updated-tag, .field-diff, and similar) that are marked
// tabindex="0" role="button" with an inline onclick attribute. Real
// <button>/<a> elements fire their click handler on Enter/Space
// automatically; plain <span>/<div> elements do not, so without this a
// keyboard user can Tab to one of these but Enter/Space does nothing.
// .hotspot and .cm-node already have their own dedicated handling above,
// so they're excluded here to avoid double-firing.
function initGenericRoleButtons() {
  document.querySelectorAll('[role="button"][tabindex="0"]:not(.hotspot):not(.cm-node)').forEach(el => {
    el.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
}

// Check URL hash to automatically open modals
function checkUrlHash() {
  const hash = window.location.hash;
  if (hash && hash.startsWith('#modal-')) {
    const modalId = hash.substring(1);
    setTimeout(() => {
      openModal(modalId);
    }, 150);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initTOCSidebar();
    initHotspots();
    initGenericRoleButtons();
    initConceptMapScrollHints();
    initReturnToTop();
    checkUrlHash();
  });
} else {
  initTheme();
  initTOCSidebar();
  initHotspots();
  initGenericRoleButtons();
  initConceptMapScrollHints();
  initReturnToTop();
  checkUrlHash();
}

window.addEventListener('hashchange', checkUrlHash);