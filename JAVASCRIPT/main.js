/* ============================================================
   main.js — Advanced Interactive Portfolio JS
   ============================================================ */

/* ============================== CUSTOM CURSOR ============================== */
const cursorDot  = document.getElementById("cursor-dot");
const cursorRing = document.getElementById("cursor-ring");
let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursorDot) {
    cursorDot.style.left = mouseX + "px";
    cursorDot.style.top  = mouseY + "px";
  }
});

// Smooth ring follow with lerp
function animateCursor() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  if (cursorRing) {
    cursorRing.style.left = ringX + "px";
    cursorRing.style.top  = ringY + "px";
  }
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effect on interactive elements
const hoverTargets = document.querySelectorAll(
  "a, button, .skill-card, .project-card, .certificate-card, .info-item, .social-links a, .stat-item"
);
hoverTargets.forEach(el => {
  el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
  el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
});

/* ============================== SCROLL PROGRESS BAR ============================== */
const scrollBar = document.getElementById("scroll-progress");
window.addEventListener("scroll", () => {
  const scrollTop    = window.scrollY;
  const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
  const progress     = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (scrollBar) scrollBar.style.width = progress + "%";
});

/* ============================== HEADER SCROLL EFFECT ============================== */
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (header) header.classList.toggle("scrolled", window.scrollY > 60);
});

/* ============================== BACK TO TOP ============================== */
const backTop = document.getElementById("back-top");
window.addEventListener("scroll", () => {
  if (backTop) backTop.classList.toggle("visible", window.scrollY > 400);
});
if (backTop) {
  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ============================== ROLE ROTATOR ============================== */
const roles = [
  "Python Developer",
  "Data Analyst",
  "Web Developer",
  "Software Engineer",
  "Full Stack Developer"
];
let roleIndex = 0;
const developEl = document.getElementById("develop");

function rotateRole() {
  if (!developEl) return;
  // Fade out
  developEl.style.opacity = "0";
  developEl.style.transform = "translateY(-10px)";
  setTimeout(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    developEl.textContent = roles[roleIndex];
    developEl.style.opacity = "1";
    developEl.style.transform = "translateY(0)";
  }, 300);
}

if (developEl) {
  developEl.style.transition = "opacity 0.3s ease, transform 0.3s ease";
  setInterval(rotateRole, 2200);
}

/* ============================== DOWNLOAD RESUME ============================== */
const downloadBtn = document.getElementById("downloadBtn");
if (downloadBtn) {
  downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = "/Asset/RAMSURYA JAYABALAN (6).pdf";
    link.download = "Ramsurya_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

/* ============================== SCROLL REVEAL ============================== */
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      obs.unobserve(entry.target);
      // Trigger counter if about section
      if (entry.target.id === "about") startCounters();
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll("section").forEach(s => revealObserver.observe(s));

/* ============================== ANIMATED COUNTERS ============================== */
let countersStarted = false;
function startCounters() {
  if (countersStarted) return;
  countersStarted = true;
  document.querySelectorAll(".stat-number[data-target]").forEach(el => {
    const target  = parseInt(el.getAttribute("data-target"), 10);
    const duration = 1600;
    const step     = target / (duration / 16);
    let current    = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target + "+";
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, 16);
  });
}

/* ============================== ABOUT TYPING EFFECT ============================== */
document.addEventListener("DOMContentLoaded", () => {
  const para = document.getElementById("about-para");
  if (!para) return;
  const fullHTML = para.innerHTML.trim();
  para.innerHTML = "";
  let idx = 0;
  const speed = 18;

  function typeChar() {
    if (idx < fullHTML.length) {
      para.innerHTML = fullHTML.substring(0, idx) + '<span class="type-cursor">|</span>';
      idx++;
      setTimeout(typeChar, speed);
    } else {
      para.innerHTML = fullHTML;
    }
  }

  // Start typing when about section is visible
  const aboutSection = document.getElementById("about");
  if (aboutSection) {
    const typeObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(typeChar, 300);
        typeObs.disconnect();
      }
    }, { threshold: 0.3 });
    typeObs.observe(aboutSection);
  }
});

/* ============================== 3D CARD TILT ============================== */
document.querySelectorAll(".project-card, .certificate-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rotY =  ((x - r.width  / 2) / r.width)  * 14;
    const rotX = -((y - r.height / 2) / r.height) * 14;
    card.style.transform = `translateY(-12px) rotateY(${rotY}deg) rotateX(${rotX}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) rotateY(0deg) rotateX(0deg)";
    card.style.transition = "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)";
  });
  card.addEventListener("mouseenter", () => {
    card.style.transition = "transform 0.1s ease, box-shadow 0.3s ease, border-color 0.3s ease";
  });
});

/* ============================== MAGNETIC BUTTONS ============================== */
document.querySelectorAll(".btn-primary, .btn-secondary, .btn.send").forEach(btn => {
  btn.addEventListener("mousemove", (e) => {
    const r    = btn.getBoundingClientRect();
    const dx   = (e.clientX - (r.left + r.width  / 2)) * 0.25;
    const dy   = (e.clientY - (r.top  + r.height / 2)) * 0.25;
    btn.style.transform = `translate(${dx}px, ${dy}px) scale(1.04)`;
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "";
    btn.style.transition = "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease";
  });
  btn.addEventListener("mouseenter", () => {
    btn.style.transition = "transform 0.1s ease";
  });
});

/* ============================== NAV HIGHLIGHT ON SCROLL ============================== */
const sections  = document.querySelectorAll("section[id]");
const navLinks  = document.querySelectorAll("header nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
});

/* ============================== PARTICLE CANVAS ============================== */
const canvas = document.getElementById("particles-canvas");
if (canvas) {
  const ctx     = canvas.getContext("2d");
  let   particles = [];
  const NUM_PARTICLES = 55;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * canvas.width;
      this.y  = Math.random() * canvas.height;
      this.r  = Math.random() * 1.6 + 0.4;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.alpha = Math.random() * 0.5 + 0.15;
      const palette = ["108,99,255", "0,212,255", "255,107,107", "255,217,61"];
      this.color = palette[Math.floor(Math.random() * palette.length)];
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < NUM_PARTICLES; i++) particles.push(new Particle());

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(108,99,255,${0.08 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  // Mouse repel
  let mx = -9999, my = -9999;
  window.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; });

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      const dx   = p.x - mx;
      const dy   = p.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 80) {
        p.x += (dx / dist) * 1.5;
        p.y += (dy / dist) * 1.5;
      }
      p.update();
      p.draw();
    });
    drawLines();
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}

/* ============================== SKILL CARD STAGGER ============================== */
const skillCards = document.querySelectorAll(".skill-card");
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll(".skill-card");
      cards.forEach((card, i) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px) scale(0.9)";
        setTimeout(() => {
          card.style.transition = `opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)`;
          card.style.opacity = "1";
          card.style.transform = "translateY(0) scale(1)";
        }, i * 60);
      });
      skillObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".skill-grid").forEach(grid => skillObs.observe(grid));

/* ============================== HAMBURGER MENU ============================== */
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  if (!menuToggle) return;
  const menuIcon   = menuToggle.querySelector("i");
  const nav        = document.querySelector("header nav");

  menuToggle.addEventListener("click", () => {
    const isActive = nav.classList.toggle("active");
    menuIcon.classList.toggle("fa-bars",  !isActive);
    menuIcon.classList.toggle("fa-times",  isActive);
  });

  document.querySelectorAll("header nav a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      menuIcon.classList.replace("fa-times", "fa-bars");
    });
  });
});

/* ============================== EMAILJS CONTACT FORM ============================== */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name    = document.getElementById("name").value.trim();
    const email   = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || message.length < 10) {
      showToast("⚠️ Please fill all fields (message ≥ 10 chars)", "error");
      return;
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      showToast("⚠️ Please enter a valid email.", "error");
      return;
    }

    const params = { name, email, message, time: new Date().toLocaleString() };
    showToast("⏳ Sending message…", "info");

    emailjs.send("service_5hbd5co", "template_q5rlfv9", params)
      .then(() => { showToast("✅ Message sent successfully!", "success"); form.reset(); })
      .catch((err) => { console.error(err); showToast("❌ Failed to send. Try again later.", "error"); });
  });

  // Ripple effect on send button
  const sendBtn = form.querySelector(".btn.send");
  if (sendBtn) {
    sendBtn.addEventListener("click", function(e) {
      const ripple = document.createElement("span");
      const r = this.getBoundingClientRect();
      ripple.style.cssText = `
        position:absolute;left:${e.clientX-r.left}px;top:${e.clientY-r.top}px;
        width:0;height:0;background:rgba(255,255,255,0.25);border-radius:50%;
        transform:translate(-50%,-50%);animation:rippleAnim 0.6s ease-out forwards;pointer-events:none;
      `;
      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  }
});

/* Inject ripple keyframe */
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
  @keyframes rippleAnim {
    to { width: 200px; height: 200px; opacity: 0; }
  }
  .type-cursor {
    display: inline-block;
    animation: blink 0.8s step-end infinite;
    color: #6c63ff;
    font-weight: 300;
  }
`;
document.head.appendChild(rippleStyle);

/* ============================== TOAST ============================== */
function showToast(text, type = "info") {
  const existing = document.querySelector(".emailjs-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = `emailjs-toast ${type}`;
  toast.textContent = text;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 20);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 350);
  }, 3200);
}

/* ============================== SECTION ENTRY STAGGER (children) ============================== */
const childStaggerObs = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const children = entry.target.querySelectorAll(
      ".education-card, .experience-card, .info-item, .stat-item"
    );
    children.forEach((child, i) => {
      child.style.opacity = "0";
      child.style.transform = "translateY(24px)";
      setTimeout(() => {
        child.style.transition = "opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)";
        child.style.opacity = "1";
        child.style.transform = "translateY(0)";
      }, i * 100);
    });
    obs.unobserve(entry.target);
  });
}, { threshold: 0.15 });

document.querySelectorAll("#education, #contact, #about, #experience").forEach(sec => {
  childStaggerObs.observe(sec);
});
