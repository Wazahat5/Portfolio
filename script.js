const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

// 3D tilt effect
const tiltCards = document.querySelectorAll(".tilt");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// Scroll reveal animation
const revealElements = document.querySelectorAll(
  ".section-title, .glass-card, .skill-cloud span, .project-card, .service-card, .contact-card"
);

revealElements.forEach((element) => element.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.13 }
);

revealElements.forEach((element) => revealObserver.observe(element));

// Starfield canvas
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];
let mouse = { x: 0, y: 0 };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createStars();
}

function createStars() {
  const count = Math.floor((canvas.width * canvas.height) / 8500);
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    z: Math.random() * 1.5 + 0.2,
    size: Math.random() * 1.8 + 0.2,
    speed: Math.random() * 0.35 + 0.08
  }));
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const star of stars) {
    star.y += star.speed * star.z;
    star.x += (mouse.x - canvas.width / 2) * 0.00008 * star.z;

    if (star.y > canvas.height) {
      star.y = -5;
      star.x = Math.random() * canvas.width;
    }

    if (star.x < -5) star.x = canvas.width + 5;
    if (star.x > canvas.width + 5) star.x = -5;

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size * star.z, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(180, 245, 255, ${0.25 + star.z * 0.25})`;
    ctx.fill();
  }

  requestAnimationFrame(drawStars);
}

window.addEventListener("resize", resizeCanvas);
window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

resizeCanvas();
drawStars();
