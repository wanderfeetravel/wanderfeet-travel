function initTravelerShopInquiry() {
  const modal = document.getElementById('shopModal');
  const form = document.getElementById('shopInquiryForm');
  const product = document.getElementById('shop_product');
  if (!modal || !form || !product) return;

  const openModal = (selectedProduct) => {
    product.value = selectedProduct;
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
    button.addEventListener('click', () => openModal(button.dataset.product || 'Producto Traveler Shop'));
  });

  modal.querySelector('.shop-modal-close')?.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && modal.classList.contains('show')) closeModal(); });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const get = (id) => document.getElementById(id)?.value || '';
    const msg = `Solicitud Traveler Shop — WanderFeet Travel & Visa\n\nProducto/kit: ${get('shop_product')}\nCantidad: ${get('shop_qty')}\nColor/modelo preferido: ${get('shop_variant') || 'Por confirmar'}\nCiudad/zona de entrega: ${get('shop_city') || 'Por confirmar'}\n\nNombre: ${get('shop_name')}\nWhatsApp: ${get('shop_phone')}\nComentario: ${get('shop_notes') || 'Ninguno'}\n\nQuiero confirmar disponibilidad, precio y tiempo de entrega.`;
    window.open(waLink(msg), '_blank');
    closeModal();
  });
}

document.addEventListener('DOMContentLoaded', initTravelerShopInquiry);
