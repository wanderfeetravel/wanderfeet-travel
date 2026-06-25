function initVuelosCarousel() {
  const slides = Array.from(document.querySelectorAll('.vuelos-carousel .vuelos-slide'));
  const dots = Array.from(document.querySelectorAll('.vuelos-carousel-dots span'));
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

function initFlightAssistForm() {
  const form = document.getElementById('flightAssistForm');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const get = (id) => document.getElementById(id)?.value || '';
    const msg = `Solicitud de viaje — WanderFeet Travel & Visa\n\nServicio de interés: ${get('q_interest')}\nNombre: ${get('q_name')}\nWhatsApp: ${get('q_phone')}\nOrigen: ${get('q_origin')}\nDestino: ${get('q_dest')}\nSalida: ${get('q_depart')}\nRegreso: ${get('q_return') || 'Solo ida / por definir'}\nPasajeros: ${get('q_pax')}\nClase: ${get('q_class')}\nPresupuesto aproximado: ${get('q_budget') || 'Por definir'}\nNotas: ${get('q_notes') || 'Ninguna'}`;
    window.open(waLink(msg), '_blank');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initVuelosCarousel();
  initFlightAssistForm();
});
