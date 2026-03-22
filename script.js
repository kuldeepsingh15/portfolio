document.addEventListener('DOMContentLoaded', () => {
    const timelineFill = document.getElementById('timeline-fill');
    const timelineContainer = document.querySelector('.timeline-container');
    const triggers = document.querySelectorAll('.observer-trigger');
    const bgs = document.querySelectorAll('.fixed-bg');
    const navbar = document.querySelector('.navbar');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    // Timeline fill logic + navbar/scroll-indicator visibility
    window.addEventListener('scroll', () => {
        // Hide navbar after scrolling past hero
        if (navbar) {
            navbar.classList.toggle('hidden', window.scrollY > 100);
        }
        // Fade out scroll indicator
        if (scrollIndicator) {
            scrollIndicator.style.opacity = window.scrollY > 50 ? '0' : '';
            scrollIndicator.style.pointerEvents = window.scrollY > 50 ? 'none' : '';
        }
        if (!timelineContainer || !timelineFill) return;
        
        // Calculate progress based on when container enters middle of screen
        const rect = timelineContainer.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        
        let progress = 0;
        if (rect.top < viewportCenter) {
            const traveled = viewportCenter - rect.top;
            progress = (traveled / rect.height) * 100;
        }
        
        // Clamp between 0 and 100
        progress = Math.max(0, Math.min(100, progress));
        timelineFill.style.height = `${progress}%`;
    });

    // Observer for Background Switching and Content Revealing
    const observerOptions = {
        root: null,
        rootMargin: '-35% 0px -35% 0px', // Trigger when ~35% from top/bottom
        threshold: 0
    };

    const bgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Content reveal
                entry.target.classList.add('active');
                
                // Background update
                const bgTargetId = entry.target.getAttribute('data-bg');
                if (bgTargetId) {
                    bgs.forEach(bg => {
                        if (bg.id === bgTargetId) {
                            bg.classList.add('active');
                        } else {
                            bg.classList.remove('active');
                        }
                    });
                }
            }
        });
    }, observerOptions);

    triggers.forEach(trigger => bgObserver.observe(trigger));
});
