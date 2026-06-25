function initVisasCarousel() {
  const slides = Array.from(document.querySelectorAll('.visas-carousel .visas-slide'));
  const dots = Array.from(document.querySelectorAll('.visas-carousel-dots span'));
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

document.addEventListener('DOMContentLoaded', initVisasCarousel);
