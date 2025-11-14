// Particles.js background animation
document.addEventListener("DOMContentLoaded", function () {
    if (window.tsParticles) {
        tsParticles.load("tsparticles", {
            fpsLimit: 60,
            particles: {
                color: {
                    value: "#6366f1",
                },
                links: {
                    color: "#8b5cf6",
                    distance: 150,
                    enable: true,
                    opacity: 0.3,
                    width: 1,
                },
                move: {
                    enable: true,
                    speed: 2,
                    outModes: "bounce",
                },
                number: {
                    density: {
                        enable: true,
                        area: 800,
                    },
                    value: 80,
                },
                opacity: {
                    value: 0.5,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 3 },
                },
            },
            detectRetina: true,
        });
    }

    // Typewriter effect for hero section
    const typedText = document.querySelector(".typewriter");
    // This timeout ensures the animation plays on load, then resets for potential re-runs.
    // The existing animation style is removed and re-added to trigger it.
    setTimeout(() => {
        typedText.style.animation = "none";
        setTimeout(
            () =>
                (typedText.style.animation =
                    "typing 3.5s steps(40, end), blink-caret .75s step-end infinite"),
            10,
        );
    }, 3500); // Original animation duration

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Adjust for fixed nav height
                    behavior: "smooth",
                });
            }
        });
    });
});

async function loadProjects() {
    const response = await fetch("projects.json");

    const projects = await response.json();

    const container = document.getElementById("projects-container");

    container.innerHTML = projects
        .map(
            (project) => `
      <div class="project-card card-glass rounded-2xl overflow-hidden border border-gray-700 transition-transform duration-500">
        <div class="h-48 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r ${project.gradient} z-10"></div>
          <div class="w-full h-full grid-pattern"></div>

          ${
              project.placeholderImage
                  ? `
            <div class="absolute inset-0 opacity-30" style="background: url('${project.placeholderImage}') center center / cover;"></div>
          `
                  : ""
          }

          <div class="absolute top-4 right-4 bg-dark/80 px-3 py-1 rounded-full text-sm border border-gray-700">
            ${project.tags}
          </div>
          <div class="absolute bottom-4 left-4 right-4">
            <h3 class="text-xl font-bold">${project.title}</h3>
          </div>
        </div>
        <div class="p-6">
          <p class="text-gray-400 mb-6">${project.description}</p>
          <div class="flex justify-between">
            <a href="${project.github}" target="_blank" class="text-accent flex items-center">
              <i class="fab fa-github mr-2"></i> Read More →
            </a>
            <span class="flex items-center">
              <span class="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              ${project.status}
            </span>
          </div>
        </div>
      </div>
    `,
        )
        .join("");
}

// Load on page load
document.addEventListener("DOMContentLoaded", loadProjects);
