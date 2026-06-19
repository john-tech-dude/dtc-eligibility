/* Shared JavaScript for DTC Eligibility Project */
/* This file contains common functionality used across multiple documents */

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
    initTOCSidebar();
    initHotspots();
  });
} else {
  initTOCSidebar();
  initHotspots();
}