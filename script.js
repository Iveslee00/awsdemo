// ===================================
// ASYMMETRIC THEME - Interactive JS
// ===================================

// Parallax Effect for KV Hero
document.addEventListener('DOMContentLoaded', function() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  if (parallaxElements.length > 0) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;

      parallaxElements.forEach(element => {
        const speed = parseFloat(element.dataset.parallax) || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    });
  }

  // Animate on Scroll (Simple Implementation)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, observerOptions);

  document.querySelectorAll('[data-aos]').forEach(element => {
    observer.observe(element);
  });

  // Navbar Scroll Effect
  const navbar = document.querySelector('.nav-bar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }

    lastScroll = currentScroll;
  });

  // Product Quick View (Placeholder)
  document.querySelectorAll('.btn-quick-view').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const productName = this.closest('.product-item__inner').querySelector('.product-name').textContent;
      console.log(`Quick view: ${productName}`);
      // Add your quick view modal logic here
    });
  });

  // Smooth Reveal on Load
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// Page Load Animation
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';


// ===== Promotion Expand/Collapse Functionality =====

document.addEventListener('DOMContentLoaded', function() {
  initPromotionToggle();
});

function initPromotionToggle() {
  // Get all expandable promotions
  const expandablePromos = document.querySelectorAll('.promo-expandable');

  expandablePromos.forEach(promo => {
    const toggleBtn = promo.querySelector('.promo-toggle-btn');
    const content = promo.querySelector('.promo-content-collapsible');

    if (!toggleBtn || !content) return;

    // Check if content actually needs expand/collapse
    // If content is shorter than max-height, hide the button
    const contentHeight = content.scrollHeight;
    const maxHeight = parseInt(window.getComputedStyle(content).maxHeight);

    if (contentHeight <= maxHeight) {
      toggleBtn.style.display = 'none';
      content.style.maxHeight = 'none';
      return;
    }

    // Add click event listener
    toggleBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();

      // Toggle expanded state
      const isExpanded = promo.classList.contains('is-expanded');

      if (isExpanded) {
        // Collapse
        promo.classList.remove('is-expanded');

        // Smooth scroll to top of promo if it's out of view
        setTimeout(() => {
          const promoTop = promo.getBoundingClientRect().top;
          if (promoTop < 0) {
            promo.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        // Expand
        promo.classList.add('is-expanded');
      }

      // Update button text
      updateToggleButtonText(toggleBtn, !isExpanded);
    });
  });
}

function updateToggleButtonText(button, isExpanded) {
  const textSpan = button.querySelector('.promo-toggle-text');
  const isSmall = button.classList.contains('promo-toggle-btn--small');

  if (isExpanded) {
    textSpan.textContent = isSmall ? '收起' : '顯示較少';
  } else {
    textSpan.textContent = isSmall ? '更多' : '顯示更多';
  }
}

// Re-check on window resize
let resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    initPromotionToggle();
  }, 250);
});
