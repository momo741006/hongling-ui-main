document.addEventListener("DOMContentLoaded", () => {
  // 打字機動畫
  new Typed("#typed-slogan", {
    strings: [
      "Art, Bravery, Creation & Truth",
      "Always Bring Care & Truth",
      "靈魂的骨架 × 情感的光譜",
      "從這裡開始，成為自己生命劇本的主角",
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 1500,
    loop: false,
  });

  // logo 漸現
  const logos = document.querySelectorAll(".logo");
  logos.forEach((logo, i) => {
    setTimeout(() => {
      logo.style.opacity = 1;
    }, i * 500);
  });

  // 語音開場（可選）
  const audio = document.getElementById("welcome-audio");
  if (audio) audio.play();
});

function enterSite() {
  const tone = document.getElementById("tone").value;
  localStorage.setItem("tone", tone);
  window.location.href = "bazi.html";
}

// === FX pack: particles, reveal, cursor sparkles ===
(function () {
  const body = document.body;
  body.classList.add("coolified");

  // Particles background
  const canvas = document.createElement("canvas");
  canvas.id = "particles-bg";
  canvas.style.position = "fixed";
  canvas.style.inset = "0";
  canvas.style.zIndex = "-1";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  let w,
    h,
    dpr = Math.min(window.devicePixelRatio || 1, 2);
  const particles = [];
  function resize() {
    w = canvas.width = innerWidth * dpr;
    h = canvas.height = innerHeight * dpr;
  }
  window.addEventListener("resize", resize);
  resize();

  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.2 * dpr,
      vy: (Math.random() - 0.5) * 0.2 * dpr,
      r: Math.random() * 1.8 * dpr + 0.2,
      a: Math.random() * 0.5 + 0.2,
    });
  }
  function tick() {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
      g.addColorStop(0, `rgba(255,255,255,${p.a})`);
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }
  tick();

  // Reveal on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("in");
      });
    },
    { threshold: 0.1 },
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // Cursor sparkles
  const pool = [];
  for (let i = 0; i < 20; i++) {
    const s = document.createElement("div");
    s.style.cssText =
      "position:fixed;width:6px;height:6px;border-radius:50%;pointer-events:none;opacity:0;mix-blend-mode:screen;";
    s.style.background = "var(--ring)";
    document.body.appendChild(s);
    pool.push({ el: s, t: 0 });
  }
  let idx = 0;
  window.addEventListener("mousemove", (e) => {
    const p = pool[idx++ % pool.length];
    p.el.style.left = e.clientX + "px";
    p.el.style.top = e.clientY + "px";
    p.el.animate(
      [
        { transform: "translate(-50%,-50%) scale(1)", opacity: 0.9 },
        { transform: "translate(-50%,-50%) scale(0.2)", opacity: 0 },
      ],
      { duration: 600, easing: "ease-out" },
    );
  });

  // Ripple on .btn
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn");
    if (!btn) return;
    const r = document.createElement("span");
    r.style.cssText =
      "position:absolute;border-radius:50%;inset:auto;pointer-events:none;background:rgba(255,255,255,.35);transform:translate(-50%,-50%) scale(0);";
    const rect = btn.getBoundingClientRect();
    r.style.width = r.style.height = Math.max(rect.width, rect.height) + "px";
    r.style.left = e.clientX - rect.left + "px";
    r.style.top = e.clientY - rect.top + "px";
    r.animate(
      [
        { transform: "translate(-50%,-50%) scale(.1)", opacity: 0.45 },
        { transform: "translate(-50%,-50%) scale(1.2)", opacity: 0 },
      ],
      { duration: 500, easing: "ease-out" },
    );
    btn.style.position = "relative";
    btn.appendChild(r);
    setTimeout(() => r.remove(), 520);
  });
})();
