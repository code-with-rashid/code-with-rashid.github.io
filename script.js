// ------------------------------------------------------------
// 1. Particles.js background animation
// ------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    if (window.tsParticles) {
        tsParticles.load("tsparticles", {
            fpsLimit: 60,
            particles: {
                color: { value: "#6366f1" },
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
                    density: { enable: true, area: 800 },
                    value: 80,
                },
                opacity: { value: 0.5 },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 3 } },
            },
            detectRetina: true,
        });
    }

    // ------------------------------------------------------------
    // 2. Typewriter effect for hero section
    // ------------------------------------------------------------
    const typedText = document.querySelector(".typewriter");
    setTimeout(() => {
        typedText.style.animation = "none";
        setTimeout(
            () =>
                (typedText.style.animation =
                    "typing 3.5s steps(40, end), blink-caret .75s step-end infinite"),
            10,
        );
    }, 3500);

    // ------------------------------------------------------------
    // 3. Smooth scrolling for navigation
    // ------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
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

async function loadSocialIcons(containerId, jsonFile) {
    const response = await fetch(jsonFile);
    const socials = await response.json();
    const container = document.getElementById(containerId);
    container.innerHTML = socials
        .map(
            (social) => `
    <a href="$$ {social.url}" target="_blank" class=" $${social.color} transition-colors">
      <i class="${social.icon} text-2xl"></i>
    </a>
  `,
        )
        .join("");
}

async function loadAbout() {
    const resp = await fetch("about.json");
    const about = await resp.json();

    // ---- AI Enthusiast -------------------------------------------------
    document.getElementById("ai-enthusiast-container").innerHTML = `
    <div class="pattern-dots w-full h-80 rounded-2xl absolute -top-6 -left-6 z-0"></div>
    <div class="card-glass relative rounded-2xl p-8 h-full">
      <h3 class="text-2xl font-bold mb-4">${about.aiEnthusiast.title}</h3>
      ${about.aiEnthusiast.descriptions.map((d) => `<p class="text-gray-300 mb-6 leading-relaxed">${d}</p>`).join("")}
      <div class="grid grid-cols-2 gap-4 mt-8">
        ${about.aiEnthusiast.skills
            .map(
                (s) => `
          <div class="flex items-center">
            <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center mr-3">
              <i class="${s.icon}"></i>
            </div>
            <span>${s.text}</span>
          </div>
        `,
            )
            .join("")}
      </div>
    </div>
  `;

    // ---- Education ----------------------------------------------------
    document.getElementById("education-container").innerHTML = `
    <div class="flex items-start">
      <div class="mr-6 text-accent text-4xl"><i class="${about.education.icon}"></i></div>
      <div>
        <h3 class="text-xl font-bold mb-2">Education</h3>
        <p class="text-secondary font-medium">${about.education.degree}</p>
        <p class="text-gray-400">${about.education.university}</p>
        <p class="text-gray-400 mt-2">${about.education.years}</p>
      </div>
    </div>
  `;

    // ---- Experience ---------------------------------------------------
    const expHTML = about.experience.jobs
        .map(
            (job) => `
    <div class="flex items-start mb-8">
      <div class="w-16 flex-shrink-0 mr-4">
        <img src="${job.logo.trim()}"
             alt="${job.company} Logo"
             class="w-full h-auto object-contain rounded"
             loading="lazy"
             onerror="this.src='https://via.placeholder.com/64?text=Logo';">
      </div>
      <div class="flex-1">
        <p class="text-secondary font-medium">${job.title}</p>
        <p class="text-gray-400">${job.company}</p>
        <div class="text-gray-400 mt-4 italic">
          <p><span class="text-accent font-semibold">Mission:</span></p>
          <p class="mt-1">${job.mission.join("<br>")}</p>
        </div>
        <p class="text-gray-400 mt-2">${job.period}</p>
      </div>
    </div>
  `,
        )
        .join("");

    document.getElementById("experience-container").innerHTML = `
    <div class="flex items-start">
      <div class="mr-6 text-accent text-4xl"><i class="${about.experience.icon}"></i></div>
      <div class="flex-1">
        <h3 class="text-xl font-bold mb-6">Experience</h3>
        ${expHTML}
      </div>
    </div>
  `;
}
async function loadSkills() {
    const response = await fetch("skills.json");
    const skillsData = await response.json();
    const container = document.getElementById("skills-container");

    const subsections = Object.values(skillsData)
        .map(
            (section) => `
    <div>
      <h3 class="text-2xl font-heading font-bold mb-8 text-center md:text-left">${section.title}</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        ${section.skills
            .map(
                (skill) => `
          <div class="card-glass rounded-xl p-5 flex flex-col items-center justify-center text-center group relative overflow-hidden transform hover:scale-105 transition-all duration-300 border border-gray-800 hover:border-primary">
            <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            <div class="relative z-10 text-accent text-4xl mb-3 group-hover:glow-text">
              <i class="${skill.icon}"></i>
            </div>
            <span class="relative z-10 text-lg font-medium group-hover:text-white">${skill.text}</span>
          </div>
        `,
            )
            .join("")}
      </div>
    </div>
  `,
        )
        .join("");

    container.innerHTML = subsections;
}

async function loadCertifications() {
    const response = await fetch("certifications.json");
    const certs = await response.json();
    const container = document.getElementById("certifications-container");

    container.innerHTML = certs
        .map(
            (cert) => `
      <div class="card-glass rounded-2xl p-6 flex items-start group hover:border-primary transition-all duration-300 cursor-pointer"
           onclick="window.open('${cert.link}', '_blank', 'noopener,noreferrer')">

        <!-- Icon -->
        <div class="mr-4 text-accent text-3xl flex-shrink-0 group-hover:glow-text transition-all">
          <i class="${cert.icon}"></i>
        </div>

        <!-- Content -->
        <div class="flex-1">
          <h3 class="font-bold text-white group-hover:text-primary transition-colors">
            ${cert.title}
          </h3>
          <p class="text-gray-400 text-sm mt-1">${cert.credential}</p>

          <!-- Verification Link (small, subtle) -->
          <a href="${cert.link}"
             target="_blank"
             rel="noopener noreferrer"
             class="inline-flex items-center text-xs text-accent mt-3 opacity-0 group-hover:opacity-100 transition-opacity"
             onclick="event.stopPropagation()">
            <i class="fas fa-external-link-alt mr-1"></i>
            Verify Certificate
          </a>
        </div>
      </div>
    `,
        )
        .join("");
}

async function loadLanguages() {
    const response = await fetch("languages.json");
    const langs = await response.json();
    const container = document.getElementById("languages-container");
    container.innerHTML = langs
        .map(
            (lang) => `
    <div class="card-glass rounded-2xl p-6 flex items-center">
      <div class="mr-4 text-accent text-3xl"><i class="${lang.icon}"></i></div>
      <div>
        <h3 class="font-bold">${lang.name}</h3>
        <p class="text-gray-400 text-sm">${lang.proficiency}</p>
      </div>
    </div>
  `,
        )
        .join("");
}

async function loadContactInfo() {
    const response = await fetch("contact.json");
    const info = await response.json();
    const container = document.getElementById("contact-info-container");
    container.innerHTML = info
        .map(
            (item) => `
    <div class="flex items-start">
      <div class="mr-4 text-primary text-2xl">
        <i class="${item.icon}"></i>
      </div>
      <div>
        <h4 class="font-medium">${item.title}</h4>
        <p class="text-gray-400">${item.value}</p>
      </div>
    </div>
  `,
        )
        .join("");
}

// ------------------------------------------------------------
// 5. CONTACT FORM – EMAIL SUBMISSION (NEW)
// ------------------------------------------------------------
document
    .getElementById("contact-form")
    .addEventListener("submit", async function (e) {
        e.preventDefault(); // Stops URL change

        const status = document.getElementById("form-status");
        const form = e.target;
        const data = new FormData(form);

        status.textContent = "Sending...";
        status.className = "mt-4 text-center text-sm text-accent block";

        try {
            const res = await fetch(form.action, {
                method: "POST",
                body: data,
                headers: { Accept: "application/json" },
            });

            if (res.ok) {
                status.textContent = "Message sent! I'll reply soon.";
                status.className =
                    "mt-4 text-center text-sm text-green-400 block";
                form.reset();
            } else {
                throw new Error();
            }
        } catch {
            status.textContent = "Failed. Try again or email me directly.";
            status.className = "mt-4 text-center text-sm text-red-400 block";
        }
    });

// ------------------------------------------------------------
// 6. Initialise everything on page load
// ------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    loadSocialIcons("social-icons-container", "social.json");
    loadAbout();
    loadProjects();
    loadSkills();
    loadCertifications();
    loadLanguages();
    loadContactInfo();
    loadSocialIcons("footer-social-container", "social.json");
    // (tsParticles & typewriter already handled in the first DOMContentLoaded above)
});
