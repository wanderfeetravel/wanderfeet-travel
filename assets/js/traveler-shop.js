function initTravelerShopCarousel() {
  const slides = Array.from(document.querySelectorAll('.shop-carousel .shop-slide'));
  const dots = Array.from(document.querySelectorAll('.shop-carousel-dots span'));
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
  setInterval(() => showSlide((current + 1) % slides.length), 4200);
}

function initTravelerShopInquiry() {
  const modal = document.getElementById('shopModal');
  const form = document.getElementById('shopInquiryForm');
  const productSelect = document.getElementById('shop_product');
  const variantInput = document.getElementById('shop_variant');
  if (!modal || !form || !productSelect) return;

  window._openShopInquiry = (selectedProduct, selectedVariant) => {
    if (selectedProduct) {
      const opt = Array.from(productSelect.options).find((o) => o.value === selectedProduct || o.text === selectedProduct);
      if (opt) productSelect.value = opt.value;
    }
    if (selectedVariant && variantInput) variantInput.value = selectedVariant;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    setTimeout(() => document.getElementById('shop_name')?.focus(), 80);
  };

  const closeModal = () => {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };

  document.querySelectorAll('.shop-interest').forEach((button) => {
    button.addEventListener('click', () => window._openShopInquiry(button.dataset.product, ''));
  });

  modal.querySelector('.shop-modal-close')?.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && modal.classList.contains('show')) closeModal(); });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const get = (id) => document.getElementById(id)?.value || '';
    const msg = `Solicitud Traveler Shop — WanderFeet Travel & Visa\n\nProducto/kit: ${get('shop_product')}\nVariante seleccionada: ${get('shop_variant') || 'Por confirmar'}\nCantidad: ${get('shop_qty')}\nCiudad/zona de entrega: ${get('shop_city') || 'Por confirmar'}\n\nNombre: ${get('shop_name')}\nWhatsApp: ${get('shop_phone')}\nComentario: ${get('shop_notes') || 'Ninguno'}\n\nQuiero confirmar disponibilidad, precio y tiempo de entrega.`;
    window.open(waLink(msg), '_blank');
    closeModal();
  });
}

function initImageModal() {
  const COLOR_FILTERS = {
    'negro':       'grayscale(1) brightness(0.38)',
    'negra':       'grayscale(1) brightness(0.38)',
    'miel':        'sepia(0.7) saturate(2) hue-rotate(5deg) brightness(1.1)',
    'azul':        'hue-rotate(195deg) saturate(1.5) brightness(0.88)',
    'azul marino': 'hue-rotate(210deg) saturate(1.6) brightness(0.72)',
    'gris':        'grayscale(0.75) brightness(0.9)',
    'verde':       'hue-rotate(100deg) saturate(1.3) brightness(0.9)',
    'verde oliva': 'hue-rotate(85deg) saturate(0.9) brightness(0.75)',
    'rosa':        'hue-rotate(310deg) saturate(1.5) brightness(1.05)',
    'beige':       'sepia(0.45) saturate(0.8) brightness(1.18)',
    'naranja':     'hue-rotate(28deg) saturate(2) brightness(1.05)',
    'lavanda':     'hue-rotate(255deg) saturate(0.85) brightness(1.08)',
    'blanco':      'grayscale(0.2) brightness(1.55) saturate(0.4)',
    'rose gold':   'hue-rotate(340deg) saturate(0.9) brightness(1.1) sepia(0.25)',
    'cuero':       'sepia(0.55) saturate(1.6) hue-rotate(8deg) brightness(0.95)',
    'cuero negro': 'grayscale(1) brightness(0.32)',
    'cuero miel':  'sepia(0.7) saturate(2) hue-rotate(5deg) brightness(1.1)',
    'silicona':    'hue-rotate(180deg) saturate(1.2) brightness(1.0)',
  };

  // Fallback filters when the variant name isn't a color (sizes, types, etc.)
  const FALLBACK_FILTERS = [
    'none',
    'brightness(0.82) saturate(1.2) contrast(1.08)',
    'brightness(1.12) saturate(0.78) hue-rotate(12deg)',
    'sepia(0.3) brightness(0.95) saturate(1.1)',
  ];

  const getFilter = (variantName, index) => {
    const key = variantName.toLowerCase().trim();
    return COLOR_FILTERS[key] || FALLBACK_FILTERS[index] || FALLBACK_FILTERS[0];
  };

  const modal = document.createElement('div');
  modal.id = 'imgViewerModal';
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <div class="img-viewer-box" role="dialog" aria-modal="true" aria-label="Vista de producto">
      <button class="img-viewer-close" aria-label="Cerrar">&times;</button>
      <div class="img-viewer-main-wrap">
        <img id="imgViewerMain" src="" alt="" />
      </div>
      <div class="img-viewer-info">
        <h3 class="img-viewer-title" id="imgViewerTitle"></h3>
        <p class="img-viewer-variant-label">Variante seleccionada: <strong id="imgViewerVariantName"></strong></p>
        <div class="img-viewer-thumbs" id="imgViewerThumbs"></div>
        <button class="btn btn-navy img-viewer-interest" id="imgViewerInterest" type="button">Me interesa — <span id="imgViewerInterestLabel"></span></button>
      </div>
    </div>`;
  document.body.appendChild(modal);

  let currentProduct = '';
  let currentVariant = '';

  const closeViewer = () => {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };

  const selectVariant = (variantName, filter, thumbEl) => {
    currentVariant = variantName;
    const mainImg = document.getElementById('imgViewerMain');
    // Animate the filter change on the main image
    mainImg.style.transition = 'filter 0.35s ease, transform 0.2s ease';
    mainImg.style.transform = 'scale(0.97)';
    setTimeout(() => {
      mainImg.style.filter = filter;
      mainImg.style.transform = 'scale(1)';
    }, 80);
    document.getElementById('imgViewerVariantName').textContent = variantName;
    document.getElementById('imgViewerInterestLabel').textContent = variantName;
    document.querySelectorAll('.img-thumb').forEach((t) => t.classList.remove('active'));
    thumbEl.classList.add('active');
  };

  document.querySelectorAll('.shop-card-img-wrap').forEach((wrap) => {
    wrap.style.cursor = 'zoom-in';
    wrap.addEventListener('click', () => {
      const card = wrap.closest('.shop-card');
      if (!card) return;
      const img = wrap.querySelector('img');
      const title = card.querySelector('.card-title')?.textContent || '';
      const interestBtn = card.querySelector('.shop-interest');
      currentProduct = interestBtn?.dataset.product || title;

      const variantSpans = Array.from(card.querySelectorAll('.variant-row span'));
      const variants = variantSpans.map((s) => s.textContent.trim());

      document.getElementById('imgViewerTitle').textContent = title;
      const mainImg = document.getElementById('imgViewerMain');
      mainImg.src = img.src;
      mainImg.alt = img.alt;
      mainImg.style.filter = 'none';
      mainImg.style.transition = 'filter 0.35s ease, transform 0.2s ease';

      const thumbsContainer = document.getElementById('imgViewerThumbs');
      thumbsContainer.innerHTML = '';

      variants.forEach((v, i) => {
        const filter = getFilter(v, i);
        const thumb = document.createElement('button');
        thumb.className = 'img-thumb';
        thumb.type = 'button';
        thumb.title = v;
        thumb.innerHTML = `<img src="${img.src}" alt="${v}" style="filter:${filter}" /><span>${v}</span>`;
        if (i === 0) {
          thumb.classList.add('active');
          mainImg.style.filter = filter === 'none' ? 'none' : filter;
        }
        thumb.addEventListener('click', () => selectVariant(v, filter, thumb));
        thumbsContainer.appendChild(thumb);
      });

      currentVariant = variants[0] || '';
      document.getElementById('imgViewerVariantName').textContent = currentVariant;
      document.getElementById('imgViewerInterestLabel').textContent = currentVariant;

      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    });
  });

  document.getElementById('imgViewerInterest').addEventListener('click', () => {
    closeViewer();
    setTimeout(() => window._openShopInquiry(currentProduct, currentVariant), 120);
  });

  modal.querySelector('.img-viewer-close').addEventListener('click', closeViewer);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeViewer(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('show')) closeViewer(); });
}

function initCategoryFilter() {
  const filters = document.querySelectorAll('.shop-filter');
  const cards = document.querySelectorAll('#catalogGrid .shop-card');
  const countEl = document.getElementById('shopCount');
  if (!filters.length || !cards.length) return;

  const updateCount = (visible) => {
    if (countEl) countEl.textContent = `Mostrando ${visible} de ${cards.length} productos`;
  };

  const applyFilter = (filter) => {
    let visible = 0;
    cards.forEach((card) => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('cat-hidden', !match);
      if (match) visible++;
    });
    updateCount(visible);
  };

  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      filters.forEach((f) => f.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
    });
  });

  updateCount(cards.length);
}

document.addEventListener('DOMContentLoaded', () => {
  initTravelerShopCarousel();
  initTravelerShopInquiry();
  initImageModal();
  initCategoryFilter();
});
