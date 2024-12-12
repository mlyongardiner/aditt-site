// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Animate hero sections
gsap.from('.hero-split', {
    duration: 1,
    y: 100,
    opacity: 0,
    stagger: 0.3,
    ease: 'power3.out'
});

// Animate features on scroll
gsap.utils.toArray('.feature-card').forEach(card => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8
    });
});

// Animate statistics
gsap.utils.toArray('.stat-number').forEach(stat => {
    let target = parseFloat(stat.getAttribute('data-target'));
    
    gsap.to(stat, {
        scrollTrigger: {
            trigger: stat,
            start: 'top 80%'
        },
        innerText: target,
        duration: 2,
        snap: { innerText: 1 },
        ease: 'power1.inOut'
    });
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        e.preventDefault();
        if (href && href !== '#') {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});
