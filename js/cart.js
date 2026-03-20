/* ══════════════════════════════════════════════════════
   MetaHub Academy — Cart
   ══════════════════════════════════════════════════════ */

const PAYPAL_EMAIL = 'megametahub42@gmail.com';
const CART_KEY = 'mha-cart';

const getCart  = () => JSON.parse(localStorage.getItem(CART_KEY) || '[]');
const saveCart = cart => localStorage.setItem(CART_KEY, JSON.stringify(cart));
const getTotal = () => getCart().reduce((sum, i) => sum + i.price * i.qty, 0);
const getCount = () => getCart().reduce((sum, i) => sum + i.qty, 0);

const updateBadge = () => {
  const badge = document.getElementById('cartBadge');
  if (!badge) return;
  const count = getCount();
  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
};

const renderCart = () => {
  const container = document.getElementById('cartItems');
  const totalEl   = document.getElementById('cartTotal');
  if (!container) return;

  const cart = getCart();
  if (cart.length === 0) {
    container.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
    if (totalEl) totalEl.textContent = '0.00';
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-info">
        <span class="cart-item-name">${item.name}</span>
        <span class="cart-item-price">$${item.price} each</span>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" data-action="dec" data-id="${item.id}">−</button>
        <input class="qty-input" type="number" value="${item.qty}" min="1" data-id="${item.id}">
        <button class="qty-btn" data-action="inc" data-id="${item.id}">+</button>
        <button class="cart-remove" data-id="${item.id}" title="Remove">✕</button>
      </div>
      <div class="cart-item-subtotal">$${(item.price * item.qty).toFixed(2)}</div>
    </div>
  `).join('');

  if (totalEl) totalEl.textContent = getTotal().toFixed(2);

  container.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cart = getCart();
      const item = cart.find(i => i.id === btn.dataset.id);
      if (!item) return;
      if (btn.dataset.action === 'inc') item.qty += 1;
      else item.qty = Math.max(1, item.qty - 1);
      saveCart(cart);
      updateBadge();
      renderCart();
    });
  });

  container.querySelectorAll('.qty-input').forEach(input => {
    input.addEventListener('change', () => {
      const cart = getCart();
      const item = cart.find(i => i.id === input.dataset.id);
      if (item) {
        item.qty = Math.max(1, parseInt(input.value) || 1);
        saveCart(cart);
        updateBadge();
        renderCart();
      }
    });
  });

  container.querySelectorAll('.cart-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      saveCart(getCart().filter(i => i.id !== btn.dataset.id));
      updateBadge();
      renderCart();
    });
  });
};

const openCart  = () => {
  document.getElementById('cartDrawer')?.classList.add('open');
  document.getElementById('cartOverlay')?.classList.add('open');
};
const closeCart = () => {
  document.getElementById('cartDrawer')?.classList.remove('open');
  document.getElementById('cartOverlay')?.classList.remove('open');
};

const checkout = () => {
  const cart = getCart();
  if (!cart.length) return;
  const total = getTotal().toFixed(2);
  const note  = cart.map(i => `${i.name} x${i.qty}`).join(', ');
  const url   = `https://www.paypal.com/send?recipient=${encodeURIComponent(PAYPAL_EMAIL)}&amount=${total}&note=${encodeURIComponent(note)}&currency_code=USD`;
  window.open(url, '_blank');
};

document.addEventListener('DOMContentLoaded', () => {
  updateBadge();
  renderCart();

  document.getElementById('cartNavBtn')?.addEventListener('click', () =>
    document.getElementById('cartDrawer')?.classList.contains('open') ? closeCart() : openCart()
  );
  document.getElementById('cartDrawerClose')?.addEventListener('click', closeCart);
  document.getElementById('cartOverlay')?.addEventListener('click', closeCart);

  document.getElementById('cartClear')?.addEventListener('click', () => {
    saveCart([]);
    updateBadge();
    renderCart();
  });

  document.getElementById('cartCheckout')?.addEventListener('click', checkout);

  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const { id, name, price } = btn.dataset;
      const cart = getCart();
      const existing = cart.find(i => i.id === id);
      if (existing) existing.qty += 1;
      else cart.push({ id, name, price: parseFloat(price), qty: 1 });
      saveCart(cart);
      updateBadge();
      renderCart();
      openCart();

      const orig = btn.innerHTML;
      btn.textContent = 'Added!';
      btn.disabled = true;
      setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; }, 1500);
    });
  });
});
