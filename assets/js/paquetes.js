function initPaquetesCarousel() {
  const slides = Array.from(document.querySelectorAll('.paquetes-carousel .paquetes-slide'));
  const dots = Array.from(document.querySelectorAll('.paquetes-carousel-dots span'));
  if (slides.length < 2) return;
  let current = 0;

  const showSlide = (index) => {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  };

  dots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(index)));
  setInterval(() => showSlide((current + 1) % slides.length), 4600);
}

function initPackageForm() {
  const form = document.getElementById('packageForm');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const get = (id) => document.getElementById(id)?.value || '';
    const msg = `Cotización de paquete — WanderFeet Travel & Visa\n\nNombre: ${get('p_name')}\nWhatsApp: ${get('p_phone')}\nDestino: ${get('p_destination')}\nTipo de viaje: ${get('p_style')}\nFecha tentativa: ${get('p_depart') || 'Por definir'}\nDuración: ${get('p_days') || 'Por definir'}\nViajeros: ${get('p_travelers')}\nPresupuesto aproximado: ${get('p_budget') || 'Por definir'}\nServicios deseados: ${get('p_includes')}\nDetalles: ${get('p_notes') || 'Ninguno'}`;
    window.open(waLink(msg), '_blank');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initPaquetesCarousel();
  initPackageForm();
});
