// Particles.js background animation
document.addEventListener('DOMContentLoaded', function () {
    if (window.tsParticles) {
        tsParticles.load("tsparticles", {
            fpsLimit: 60,
            particles: {
                color: {
                    value: "#6366f1"
                },
                links: {
                    color: "#8b5cf6",
                    distance: 150,
                    enable: true,
                    opacity: 0.3,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    outModes: "bounce"
                },
                number: {
                    density: {
                        enable: true,
                        area: 800
                    },
                    value: 80
                },
                opacity: {
                    value: 0.5
                },
                shape: {
                    type: "circle"
                },
                size: {
                    value: { min: 1, max: 3 }
                }
            },
            detectRetina: true
        });
    }

    // Typewriter effect for hero section
    const typedText = document.querySelector('.typewriter');
    // This timeout ensures the animation plays on load, then resets for potential re-runs.
    // The existing animation style is removed and re-added to trigger it.
    setTimeout(() => {
        typedText.style.animation = 'none';
        setTimeout(() => typedText.style.animation = 'typing 3.5s steps(40, end), blink-caret .75s step-end infinite', 10);
    }, 3500); // Original animation duration

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Adjust for fixed nav height
                    behavior: 'smooth'
                });
            }
        });
    });
});