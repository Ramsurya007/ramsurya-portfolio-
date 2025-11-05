/* === main.js (paste entire file) === */

/* ROLE ROTATOR */
const roles = [
  "Python Developer",
  "Data Analyst",
  "Web Developer",
  "Software Engineer",
  "Full Stack Developer"
];
let change = 0;
setInterval(() => {
  const el = document.getElementById("develop");
  if (el) el.innerText = roles[change];
  change = (change + 1) % roles.length;
}, 2000);

/* DOWNLOAD BUTTON */
const downloadBtn = document.getElementById("downloadBtn");
if (downloadBtn) {
  downloadBtn.addEventListener("click", () => {
    window.location.href = "/Asset/Ramsurya Resume KA.pdf";
  });
}

/* TYPING EFFECT (About paragraph) */
document.addEventListener("DOMContentLoaded", () => {
  const para = document.querySelector("main #about .about-right p");
  if (para) {
    const fullHTML = para.innerHTML.trim();
    para.innerHTML = "";
    let index = 0;
    const speed = 20;
    function typeChar() {
      if (index < fullHTML.length) {
        para.innerHTML = fullHTML.substring(0, index) + "|";
        index++;
        setTimeout(typeChar, speed);
      } else {
        para.innerHTML = fullHTML;
        para.querySelectorAll(".highlight").forEach((el) => {
          el.style.color = "var(--color-accent)";
          el.style.fontWeight = "600";
        });
      }
    }
    typeChar();
  }
});

/* SCROLL REVEAL (simple IntersectionObserver) */
const revealSections = document.querySelectorAll("section");
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

revealSections.forEach(s => revealObserver.observe(s));

/* CARD HOVER (project/certificate) */
document.querySelectorAll(".project-card, .certificate-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    card.style.transform = `rotateY(${(x - r.width/2)/25}deg) rotateX(${-(y - r.height/2)/25}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateY(0deg) rotateX(0deg)";
  });
});

/* NAV HIGHLIGHT ON SCROLL */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (scrollY >= top) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
});

/* EMAILJS CONTACT FORM */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || message.length < 10) {
      showToast("⚠️ Please fill all fields (message >= 10 chars)", "error");
      return;
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      showToast("⚠️ Please enter a valid email.", "error");
      return;
    }

    const params = { name, email, message, time: new Date().toLocaleString() };
    showToast("⏳ Sending message...", "info");
    emailjs.send("service_5hbd5co", "template_q5rlfv9", params)
      .then(() => {
        showToast("✅ Message sent successfully!", "success");
        form.reset();
      })
      .catch((err) => {
        console.error(err);
        showToast("❌ Failed to send message. Try again later.", "error");
      });
  });
});

/* TOAST */
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
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ============================= HAMBURGER MENU TOGGLE ============================= //
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const menuIcon = menuToggle.querySelector("i");
  const nav = document.querySelector("header nav");

  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");

    // Toggle the icon between bars and times
    if (nav.classList.contains("active")) {
      menuIcon.classList.remove("fa-bars");
      menuIcon.classList.add("fa-times"); // × close icon
    } else {
      menuIcon.classList.remove("fa-times");
      menuIcon.classList.add("fa-bars");
    }
  });

  // Close menu when a link is clicked (for mobile)
  document.querySelectorAll("header nav a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      menuIcon.classList.remove("fa-times");
      menuIcon.classList.add("fa-bars");
    });
  });
});
