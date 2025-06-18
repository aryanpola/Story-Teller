import { useEffect } from 'react';

export const useBackgroundImageOnHover = () => {
  useEffect(() => {
    const handleMouseEnter = (event) => {
      const card = event.currentTarget;
      const imageUrl = card.dataset.imageHd;
      
      if (imageUrl) {
        // Create overlay element
        const overlay = document.createElement('div');
        overlay.id = 'story-card-overlay';
        overlay.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-image: url(${imageUrl});
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 500ms ease-in-out;
          pointer-events: none;
          z-index: -1;
        `;
        
        document.body.appendChild(overlay);
        
        // Fade in
        requestAnimationFrame(() => {
          overlay.style.opacity = '0.15';
        });
      }
    };

    const handleMouseLeave = () => {
      const overlay = document.getElementById('story-card-overlay');
      if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
          if (overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
          }
        }, 500);
      }
    };

    // Add event listeners to all story cards
    const storyCards = document.querySelectorAll('[data-image-hd]');
    storyCards.forEach(card => {
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

    // Cleanup
    return () => {
      storyCards.forEach(card => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
      
      const overlay = document.getElementById('story-card-overlay');
      if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    };
  }, []);
};