/* =========================================================
   Serralheria Ferro Forte - scripts
   ========================================================= */

/* ---------------------------------------------------------
   >>> EDITE AQUI OS DADOS DA SERRALHERIA <<<
   Tudo que aparece no site (telefone, WhatsApp, endereço...)
   vem daqui. Basta trocar os textos abaixo.
   --------------------------------------------------------- */
const SITE = {
  whatsapp:  "5500000000000",             // só números: 55 + DDD + número
  telefone:  "(00) 00000-0000",
  email:     "contato@ferroforte.com.br",
  cidade:    "Sua Cidade - UF",
  endereco:  "Rua Exemplo, 123 - Bairro, Sua Cidade - UF",
  horario:   "Seg a Sex 7h–18h · Sáb 7h–12h",
  instagram: "",                           // ex: "https://instagram.com/ferroforte" (deixe vazio para esconder)
  areas: ["Centro", "Zona Norte", "Zona Sul", "Zona Leste", "Zona Oeste", "Cidades vizinhas"]
};

(function () {
  "use strict";
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const onlyDigits = (v) => String(v).replace(/\D/g, "");
  const waLink = (msg) => `https://wa.me/${onlyDigits(SITE.whatsapp)}${msg ? "?text=" + encodeURIComponent(msg) : ""}`;

  /* ---------- Preenche dados do site ---------- */
  $$("[data-site]").forEach((el) => { const v = SITE[el.dataset.site]; if (v) el.textContent = v; });

  $$("[data-site-href]").forEach((el) => {
    const t = el.dataset.siteHref;
    if (t === "wa")   el.href = waLink(el.dataset.waMsg || "Olá! Vim pelo site da Serralheria Ferro Forte.");
    if (t === "tel")  el.href = "tel:+" + onlyDigits(SITE.whatsapp);
    if (t === "mail") el.href = "mailto:" + SITE.email;
    if (t === "insta") {
      if (SITE.instagram) el.href = SITE.instagram; else el.parentElement.remove();
    }
  });

  const areasEl = $("#areas");
  if (areasEl) areasEl.innerHTML = SITE.areas.map((a) => `<li>${a}</li>`).join("");

  const map = $("#map");
  if (map) map.src = "https://maps.google.com/maps?q=" + encodeURIComponent(SITE.endereco || SITE.cidade) + "&t=&z=13&ie=UTF8&iwloc=&output=embed";

  $("#year").textContent = new Date().getFullYear();

  /* ---------- Header: sombra ao rolar + botão topo ---------- */
  const header = $("#header");
  const toTop = $("#toTop");
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("is-stuck", y > 30);
    toTop.classList.toggle("is-visible", y > 700);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- Menu mobile ---------- */
  const burger = $("#burger");
  const nav = $("#nav");
  const setMenu = (open) => {
    nav.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  };
  burger.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  $$("a", nav).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  /* ---------- Animações ao rolar (reveal) ---------- */
  const reveals = $$(".reveal");
  // pequeno atraso em cascata para itens irmãos
  reveals.forEach((el) => {
    const sibs = Array.from(el.parentElement.children).filter((c) => c.classList.contains("reveal"));
    el.style.setProperty("--d", Math.min(sibs.indexOf(el), 6) * 0.08 + "s");
  });
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Contadores ---------- */
  const counters = $$("[data-count]");
  const runCounter = (el) => {
    const target = +el.dataset.count, suffix = el.dataset.suffix || "";
    const dur = 1600, t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ("IntersectionObserver" in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { runCounter(en.target); co.unobserve(en.target); } });
    }, { threshold: 0.6 });
    counters.forEach((c) => co.observe(c));
  }

  /* ---------- Galeria: filtro ---------- */
  const filters = $$(".filter");
  const shots = $$(".shot");
  filters.forEach((btn) => btn.addEventListener("click", () => {
    filters.forEach((b) => b.classList.toggle("is-active", b === btn));
    const f = btn.dataset.filter;
    shots.forEach((s) => s.classList.toggle("is-hidden", f !== "all" && s.dataset.cat !== f));
  }));

  /* ---------- Lightbox ---------- */
  const lb = $("#lightbox"), lbImg = $("#lbImg"), lbCap = $("#lbCap");
  let current = 0;
  const visibleShots = () => shots.filter((s) => !s.classList.contains("is-hidden"));
  const show = (i) => {
    const list = visibleShots();
    current = (i + list.length) % list.length;
    const img = $("img", list[current]);
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = $("strong", list[current]).textContent;
  };
  const openLb = (shot) => {
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    show(visibleShots().indexOf(shot));
  };
  const closeLb = () => { lb.hidden = true; document.body.style.overflow = ""; };
  shots.forEach((s) => {
    s.addEventListener("click", () => openLb(s));
    s.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLb(s); } });
  });
  $("#lbClose").addEventListener("click", closeLb);
  $("#lbPrev").addEventListener("click", () => show(current - 1));
  $("#lbNext").addEventListener("click", () => show(current + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });

  /* ---------- Formulário -> WhatsApp ---------- */
  const form = $("#quote"), msg = $("#formMsg");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = form.elements.nome.value.trim();
    const servico = form.elements.servico.value;
    $$(".is-error", form).forEach((x) => x.classList.remove("is-error"));
    msg.classList.remove("ok");
    if (!nome || !servico) {
      if (!nome) form.elements.nome.classList.add("is-error");
      if (!servico) form.elements.servico.classList.add("is-error");
      msg.textContent = "Preencha seu nome e o serviço desejado.";
      return;
    }
    const linhas = [
      "Olá, Serralheria Ferro Forte! Gostaria de um orçamento.",
      "",
      `*Nome:* ${nome}`,
      form.elements.telefone.value.trim() ? `*Telefone:* ${form.elements.telefone.value.trim()}` : null,
      `*Serviço:* ${servico}`,
      form.elements.mensagem.value.trim() ? `*Detalhes:* ${form.elements.mensagem.value.trim()}` : null
    ].filter((l) => l !== null);
    window.open(waLink(linhas.join("\n")), "_blank", "noopener");
    msg.classList.add("ok");
    msg.textContent = "Abrindo o WhatsApp... Obrigado!";
    form.reset();
  });

  /* ---------- Fagulhas de solda no hero (canvas) ---------- */
  const canvas = $("#sparks");
  if (canvas && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const ctx = canvas.getContext("2d");
    let w, h, dpr, parts = [], running = true;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const spawn = () => {
      const fromX = w * (0.55 + Math.random() * 0.35);
      return {
        x: fromX, y: h * (0.55 + Math.random() * 0.25),
        vx: (Math.random() - 0.7) * 3.2, vy: -Math.random() * 3.6 - 0.8,
        life: 0, max: 50 + Math.random() * 60, r: Math.random() * 1.6 + 0.6
      };
    };
    const loop = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      if (parts.length < 70 && Math.random() < 0.7) parts.push(spawn());
      ctx.globalCompositeOperation = "lighter";
      parts = parts.filter((p) => p.life < p.max);
      for (const p of parts) {
        p.life++; p.vy += 0.07; p.x += p.vx; p.y += p.vy;
        const a = 1 - p.life / p.max;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, ${150 + Math.floor(a * 90)}, 40, ${a})`;
        ctx.shadowColor = "rgba(255,120,0,.9)"; ctx.shadowBlur = 8;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(loop);
    };
    resize();
    window.addEventListener("resize", resize);
    // pausa quando o hero sai da tela (economiza bateria)
    new IntersectionObserver(([en]) => {
      const was = running; running = en.isIntersecting;
      if (running && !was) requestAnimationFrame(loop);
    }).observe(canvas);
    requestAnimationFrame(loop);
  }
})();
