/**
 * About Page Scroll Animations
 * Uses Intersection Observer for professional, performant animations
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }

  function initAnimations() {
    // Configuration for different animation targets
    const animationConfig = [
      // Vision section
      {
        target: '.about-vision-section',
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      },
      // Gallery section (intro)
      {
        target: '.about-gallery-section',
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      },
      // Gallery header
      {
        target: '.gallery-header',
        threshold: 0.5,
        rootMargin: '0px'
      },
      // Gallery grid
      {
        target: '.gallery-grid',
        threshold: 0.2,
        rootMargin: '0px 0px -30px 0px'
      },
      // Gallery footer
      {
        target: '.gallery-footer-desktop',
        threshold: 0.8,
        rootMargin: '0px'
      },
      {
        target: '.gallery-footer-inline',
        threshold: 0.8,
        rootMargin: '0px'
      },
      // Flavour Philosophy section
      {
        target: '.flavour-philosophy-section',
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      },
      // Philosophy rows (individual)
      {
        target: '.philosophy-row',
        threshold: 0.2,
        rootMargin: '0px 0px -80px 0px'
      }
    ];

    // Create observers for each configuration
    animationConfig.forEach(config => {
      const elements = document.querySelectorAll(config.target);
      if (elements.length === 0) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Optional: unobserve after animation (one-time animation)
            // observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: config.threshold,
        rootMargin: config.rootMargin
      });

      elements.forEach(el => observer.observe(el));
    });

    // Add class for generic animate-on-scroll elements
    const genericAnimatedElements = document.querySelectorAll('.animate-on-scroll');
    if (genericAnimatedElements.length > 0) {
      const genericObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      });

      genericAnimatedElements.forEach(el => genericObserver.observe(el));
    }

    // Parallax subtle effect for images (optional enhancement)
    initParallax();
  }

  function initParallax() {
    const parallaxElements = document.querySelectorAll('.vision-image, .intro-image, .philosophy-image');
    
    if (parallaxElements.length === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let ticking = false;

    function updateParallax() {
      parallaxElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const viewportCenter = window.innerHeight / 2;
        const offset = (centerY - viewportCenter) * 0.03; // Very subtle parallax
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.style.transform = `translateY(${offset}px)`;
        }
      });
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }
})();
