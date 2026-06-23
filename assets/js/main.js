const WF_PHONE = '18094222222';
const WF_EMAIL = 'wanderfeetravel@gmail.com';
const WF_INSTAGRAM = 'https://instagram.com/wanderfeettravel';
const WF_BASE = '/wanderfeet-travel/';

const navItems = [
  ['Inicio', WF_BASE],
  ['Visas', `${WF_BASE}visas/`],
  ['Vuelos', `${WF_BASE}vuelos/`],
  ['Hoteles', `${WF_BASE}hoteles/`],
  ['Paquetes', `${WF_BASE}paquetes/`],
  ['Traveler Shop', `${WF_BASE}traveler-shop/`],
  ['Nosotros', `${WF_BASE}nosotros/`],
  ['Contacto', `${WF_BASE}contacto/`]
];

function waLink(message = 'Hola, quiero solicitar asistencia con WanderFeet Travel & Visa.') {
  return `https://wa.me/${WF_PHONE}?text=${encodeURIComponent(message)}`;
}

function mountNav() {
  const target = document.querySelector('[data-component="site-nav"]');
  if (!target) return;
  const current = document.body.dataset.page || 'inicio';
  const links = navItems.map(([label, href]) => {
    const key = label.toLowerCase().replace(' ', '-');
    const isActive = current === key || (current === 'traveler-shop' && label === 'Traveler Shop');
    return `<li><a class="${isActive ? 'active' : ''}" href="${href}">${label}</a></li>`;
  }).join('');
  target.innerHTML = `
    <nav class="site-nav" aria-label="Navegación principal">
      <div class="container nav-inner">
        <a class="nav-logo" href="${WF_BASE}" aria-label="WanderFeet Travel & Visa">
          <span class="logo-mark">WF</span>
          <span class="nav-brand">WanderFeet <span>Travel & Visa</span></span>
        </a>
        <ul class="nav-links" id="navLinks">${links}</ul>
        <a class="btn btn-primary btn-small nav-cta" href="${waLink('Hola, quiero solicitar asesoría con WanderFeet Travel & Visa.')}" target="_blank" rel="noopener">WhatsApp</a>
        <button class="hamburger" id="hamburger" aria-label="Abrir menú" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
    </nav>`;
}

function mountFooter() {
  const target = document.querySelector('[data-component="site-footer"]');
  if (!target) return;
  target.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-inner">
          <div class="footer-col">
            <div class="footer-brand">WanderFeet Travel & Visa</div>
            <p class="footer-tagline">Tu compañero antes, durante y después del viaje.</p>
          </div>
          <div class="footer-col">
            <h3>Servicios</h3>
            <ul>
              <li><a href="${WF_BASE}visas/">Visas</a></li>
              <li><a href="${WF_BASE}vuelos/">Vuelos</a></li>
              <li><a href="${WF_BASE}hoteles/">Hoteles</a></li>
              <li><a href="${WF_BASE}paquetes/">Paquetes</a></li>
              <li><a href="${WF_BASE}traveler-shop/">Traveler Shop</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h3>Información</h3>
            <ul>
              <li><a href="${WF_BASE}nosotros/">Nosotros</a></li>
              <li><a href="${WF_BASE}contacto/">Contacto</a></li>
              <li><a href="${WF_INSTAGRAM}" target="_blank" rel="noopener">Instagram</a></li>
              <li><a href="${waLink()}" target="_blank" rel="noopener">WhatsApp</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h3>Legal</h3>
            <ul>
              <li><a href="${WF_BASE}aviso-legal/">Aviso Legal</a></li>
              <li><a href="${WF_BASE}politica-privacidad/">Política de Privacidad</a></li>
              <li><a href="${WF_BASE}terminos-condiciones/">Términos y Condiciones</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} WanderFeet Travel & Visa. Todos los derechos reservados.</span>
          <span><a href="mailto:${WF_EMAIL}">${WF_EMAIL}</a> · <a href="${WF_INSTAGRAM}" target="_blank" rel="noopener">@wanderfeettravel</a></span>
        </div>
      </div>
    </footer>`;
}

function mountFloatingWhatsApp() {
  const target = document.querySelector('[data-component="whatsapp-float"]');
  if (!target) return;
  target.innerHTML = `<a class="wa-float" href="${waLink()}" target="_blank" rel="noopener" aria-label="Chatear por WhatsApp">💬</a>`;
}

function mountProfessionalModal() {
  if (!document.body.dataset.modal) return;
  const modal = document.createElement('div');
  modal.className = 'professional-modal';
  modal.id = 'professionalModal';
  modal.innerHTML = `
    <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <button class="modal-close" type="button" aria-label="Cerrar">×</button>
      <h2 id="modalTitle">Solicita tu evaluación inicial de viaje o visa</h2>
      <p>Cuéntanos tu destino, fecha estimada y tipo de servicio. Te orientamos con claridad por WhatsApp.</p>
      <a class="btn btn-primary" href="${waLink('Hola, quiero solicitar mi evaluación inicial de viaje o visa con WanderFeet Travel & Visa.')}" target="_blank" rel="noopener">Solicitar por WhatsApp</a>
    </div>`;
  document.body.appendChild(modal);
  const hasSeen = sessionStorage.getItem('wfProfessionalModalSeen');
  if (!hasSeen) setTimeout(() => modal.classList.add('show'), 1400);
  const close = () => { modal.classList.remove('show'); sessionStorage.setItem('wfProfessionalModalSeen', '1'); };
  modal.querySelector('.modal-close').addEventListener('click', close);
  modal.addEventListener('click', (event) => { if (event.target === modal) close(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') close(); });
}

function initMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(navLinks.classList.contains('open')));
  });
  navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => navLinks.classList.remove('open')));
}

function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12 });
  reveals.forEach((item) => observer.observe(item));
}

function initWhatsAppButtons() {
  document.querySelectorAll('[data-wa-message]').forEach((element) => {
    element.setAttribute('href', waLink(element.dataset.waMessage));
    element.setAttribute('target', '_blank');
    element.setAttribute('rel', 'noopener');
  });
}

function initFlightForm() {
  const form = document.getElementById('flightForm');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const get = (id) => document.getElementById(id)?.value || '';
    const msg = `Cotización de vuelo — WanderFeet Travel & Visa\n\nNombre: ${get('q_name')}\nWhatsApp: ${get('q_phone')}\nOrigen: ${get('q_origin')}\nDestino: ${get('q_dest')}\nSalida: ${get('q_depart')}\nRegreso: ${get('q_return') || 'Solo ida / por definir'}\nPasajeros: ${get('q_pax')}\nClase: ${get('q_class')}\nNotas: ${get('q_notes') || 'Ninguna'}`;
    window.open(waLink(msg), '_blank');
  });
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const get = (id) => document.getElementById(id)?.value || '';
    const msg = `Consulta — WanderFeet Travel & Visa\n\nNombre: ${get('c_name')}\nWhatsApp: ${get('c_phone')}\nServicio de interés: ${get('c_service')}\n\nMensaje:\n${get('c_msg')}`;
    window.open(waLink(msg), '_blank');
  });
}

function initGlobe() {
  const canvas = document.getElementById('globeCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height, cx = W / 2, cy = H / 2, R = 130;
  const destinations = [
    { lat: 40.4, lon: -3.7 }, { lat: 48.8, lon: 2.3 }, { lat: 51.5, lon: -0.1 },
    { lat: 45.4, lon: 12.3 }, { lat: 43.7, lon: -79.4 }, { lat: 40.7, lon: -74.0 },
    { lat: 25.8, lon: -80.2 }, { lat: 18.5, lon: -69.9 }, { lat: 12.5, lon: -70.0 },
    { lat: 19.4, lon: -99.1 }, { lat: 35.7, lon: 139.7 }, { lat: 4.7, lon: 114.2 }
  ];
  const landMasses = [
    [[35,-10],[36,28],[55,28],[58,5],[50,-10],[35,-10]],
    [[15,-117],[50,-130],[70,-140],[72,-60],[45,-55],[25,-80],[15,-85],[15,-117]],
    [[-5,-80],[-5,-35],[-55,-35],[-55,-70],[-18,-75],[-5,-80]],
    [[35,-17],[37,37],[10,42],[-35,18],[-35,-17],[35,-17]],
    [[10,44],[70,44],[70,140],[10,140],[10,44]],
    [[-12,130],[-12,155],[-40,155],[-40,115],[-20,115],[-12,130]]
  ];
  let rotY = 0, rotX = 0.2, isDragging = false, lastX = 0, lastY = 0, velX = 0.004;
  const toRad = (deg) => deg * Math.PI / 180;
  function project3D(lat, lon) {
    const phi = toRad(90 - lat);
    const theta = toRad(lon) + rotY;
    const x = R * Math.sin(phi) * Math.cos(theta);
    const y = R * Math.cos(phi) * Math.cos(rotX) - R * Math.sin(phi) * Math.sin(theta) * Math.sin(rotX);
    const z = R * Math.sin(phi) * Math.sin(theta) * Math.cos(rotX) + R * Math.cos(phi) * Math.sin(rotX);
    return { x: cx + x, y: cy - y, z };
  }
  function drawGlobe() {
    ctx.clearRect(0, 0, W, H);
    const shadow = ctx.createRadialGradient(cx + 20, cy + 20, R * 0.5, cx + 20, cy + 20, R * 1.3);
    shadow.addColorStop(0, 'rgba(0,0,0,0.15)'); shadow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = shadow; ctx.beginPath(); ctx.arc(cx + 20, cy + 20, R * 1.3, 0, Math.PI * 2); ctx.fill();
    const ocean = ctx.createRadialGradient(cx - 30, cy - 30, 10, cx, cy, R);
    ocean.addColorStop(0, '#1a6fa8'); ocean.addColorStop(0.5, '#0d4f80'); ocean.addColorStop(1, '#082d4a');
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fillStyle = ocean; ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.07)'; ctx.lineWidth = 0.5;
    for (let lat = -60; lat <= 60; lat += 30) {
      ctx.beginPath(); let first = true;
      for (let lon = -180; lon <= 180; lon += 5) {
        const p = project3D(lat, lon); if (p.z > 0) { first ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y); first = false; } else first = true;
      }
      ctx.stroke();
    }
    for (let lon = -180; lon <= 180; lon += 30) {
      ctx.beginPath(); let first = true;
      for (let lat = -90; lat <= 90; lat += 5) {
        const p = project3D(lat, lon); if (p.z > 0) { first ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y); first = false; } else first = true;
      }
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(45,160,80,0.75)'; ctx.strokeStyle = 'rgba(60,180,90,0.42)'; ctx.lineWidth = 0.8;
    landMasses.forEach((poly) => {
      ctx.beginPath(); let started = false;
      poly.forEach(([lat, lon]) => { const p = project3D(lat, lon); if (p.z > 0) { started ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y); started = true; } });
      if (started) { ctx.closePath(); ctx.fill(); ctx.stroke(); }
    });
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip();
    destinations.forEach((d) => {
      const p = project3D(d.lat, d.lon);
      if (p.z > 0) {
        const alpha = Math.min(1, (p.z / R) * 1.5);
        ctx.beginPath(); ctx.arc(p.x, p.y, 3.6, 0, Math.PI * 2); ctx.fillStyle = `rgba(245,166,35,${alpha})`; ctx.fill();
        ctx.beginPath(); ctx.arc(p.x, p.y, 7, 0, Math.PI * 2); ctx.strokeStyle = `rgba(245,166,35,${alpha * 0.38})`; ctx.stroke();
      }
    });
    ctx.restore();
    const shine = ctx.createRadialGradient(cx - 45, cy - 45, 5, cx - 20, cy - 20, R * 0.8);
    shine.addColorStop(0, 'rgba(255,255,255,0.18)'); shine.addColorStop(0.45, 'rgba(255,255,255,0.05)'); shine.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fillStyle = shine; ctx.fill();
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(245,166,35,0.35)'; ctx.lineWidth = 1.5; ctx.stroke();
  }
  function animate() { if (!isDragging) rotY += velX; drawGlobe(); requestAnimationFrame(animate); }
  canvas.addEventListener('mousedown', (event) => { isDragging = true; lastX = event.clientX; lastY = event.clientY; canvas.style.cursor = 'grabbing'; });
  window.addEventListener('mousemove', (event) => {
    if (!isDragging) return;
    const dx = event.clientX - lastX, dy = event.clientY - lastY;
    rotY += dx * 0.01; rotX = Math.max(-1.2, Math.min(1.2, rotX + dy * 0.01)); velX = dx * 0.003; lastX = event.clientX; lastY = event.clientY;
  });
  window.addEventListener('mouseup', () => { isDragging = false; canvas.style.cursor = 'grab'; });
  canvas.addEventListener('touchstart', (event) => { isDragging = true; lastX = event.touches[0].clientX; lastY = event.touches[0].clientY; }, { passive: true });
  canvas.addEventListener('touchmove', (event) => {
    if (!isDragging) return;
    const dx = event.touches[0].clientX - lastX, dy = event.touches[0].clientY - lastY;
    rotY += dx * 0.01; rotX = Math.max(-1.2, Math.min(1.2, rotX + dy * 0.01)); velX = dx * 0.003; lastX = event.touches[0].clientX; lastY = event.touches[0].clientY;
  }, { passive: true });
  canvas.addEventListener('touchend', () => { isDragging = false; });
  animate();
}

document.addEventListener('DOMContentLoaded', () => {
  mountNav();
  mountFooter();
  mountFloatingWhatsApp();
  mountProfessionalModal();
  initMenu();
  initReveal();
  initWhatsAppButtons();
  initFlightForm();
  initContactForm();
  initGlobe();
});
