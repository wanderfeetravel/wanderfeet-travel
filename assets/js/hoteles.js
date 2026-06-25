function initHotelesCarousel() {
  const slides = Array.from(document.querySelectorAll('.hoteles-carousel .hoteles-slide'));
  const dots = Array.from(document.querySelectorAll('.hoteles-carousel-dots span'));
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

function initHotelForm() {
  const form = document.getElementById('hotelForm');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const get = (id) => document.getElementById(id)?.value || '';
    const msg = `Solicitud de hotel — WanderFeet Travel & Visa\n\nNombre: ${get('h_name')}\nWhatsApp: ${get('h_phone')}\nDestino: ${get('h_dest')}\nTipo de viaje: ${get('h_travel_type')}\nEntrada: ${get('h_checkin')}\nSalida: ${get('h_checkout')}\nViajeros: ${get('h_guests')}\nPresupuesto aproximado: ${get('h_budget') || 'Por definir'}\nPreferencias: ${get('h_notes') || 'Ninguna'}`;
    window.open(waLink(msg), '_blank');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initHotelesCarousel();
  initHotelForm();
});
