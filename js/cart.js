/* ══════════════════════════════════════════════════════
   MetaHub Academy — Cart
   ══════════════════════════════════════════════════════ */

const PAYPAL_EMAIL = 'megametahub42@gmail.com';
const CART_KEY     = 'mha-cart';

const getCart  = () => JSON.parse(localStorage.getItem(CART_KEY) || '[]');
const saveCart = cart => localStorage.setItem(CART_KEY, JSON.stringify(cart));
const getTotal = () => getCart().reduce((sum, i) => sum + i.price * i.qty, 0);
const getCount = () => getCart().reduce((sum, i) => sum + i.qty, 0);

const buildPayPalUrl = (total, note) =>
  `https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=${encodeURIComponent(PAYPAL_EMAIL)}&amount=${total}&currency_code=USD&item_name=${encodeURIComponent(note)}&no_note=0&bn=PP-DonationsBF`;

/* ── Badge (store page) ── */
const updateBadge = () => {
  const badge = document.getElementById('cartBadge');
  if (!badge) return;
  const count = getCount();
  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
};

document.addEventListener('DOMContentLoaded', () => {

  /* ════════════════════════════════
     STORE PAGE — Buy Now → cart.html
     ════════════════════════════════ */
  updateBadge();

  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const { id, name, price } = btn.dataset;
      const cart = getCart();
      const existing = cart.find(i => i.id === id);
      if (existing) existing.qty += 1;
      else cart.push({ id, name, price: parseFloat(price), qty: 1 });
      saveCart(cart);

      const orig = btn.innerHTML;
      btn.textContent = 'Added!';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.disabled = false;
        window.location.href = 'cart.html';
      }, 600);
    });
  });

  /* ════════════════════════════════
     CART PAGE
     ════════════════════════════════ */
  if (!document.getElementById('cartPageItems')) return;

  const renderCartPage = () => {
    const cart       = getCart();
    const emptyEl    = document.getElementById('cartPageEmpty');
    const gridEl     = document.getElementById('cartPageGrid');
    const itemsEl    = document.getElementById('cartPageItems');
    const totalEl    = document.getElementById('cartPageTotal');
    const subtotalEl = document.getElementById('cartSubtotal');
    const countEl    = document.getElementById('cartItemCount');

    if (cart.length === 0) {
      emptyEl.style.display = 'flex';
      gridEl.style.display  = 'none';
      return;
    }

    emptyEl.style.display = 'none';
    gridEl.style.display  = 'grid';

    const total = getTotal();
    if (totalEl)    totalEl.textContent    = total.toFixed(2);
    if (subtotalEl) subtotalEl.textContent = total.toFixed(2);
    if (countEl)    countEl.textContent    = getCount();

    itemsEl.innerHTML = cart.map(item => `
      <div class="cart-page-item" data-id="${item.id}">
        <div class="cpi-info">
          <span class="cpi-name">${item.name}</span>
          <span class="cpi-unit">$${item.price} each</span>
        </div>
        <div class="cpi-controls">
          <button class="cpi-qty-btn" data-action="dec" data-id="${item.id}">−</button>
          <input class="cpi-qty-input" type="number" value="${item.qty}" min="1" data-id="${item.id}">
          <button class="cpi-qty-btn" data-action="inc" data-id="${item.id}">+</button>
        </div>
        <div class="cpi-right">
          <span class="cpi-subtotal">$${(item.price * item.qty).toFixed(2)}</span>
          <button class="cpi-remove" data-id="${item.id}" title="Remove">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
      </div>
    `).join('');

    /* bind qty buttons */
    itemsEl.querySelectorAll('.cpi-qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cart = getCart();
        const item = cart.find(i => i.id === btn.dataset.id);
        if (!item) return;
        if (btn.dataset.action === 'inc') item.qty += 1;
        else item.qty = Math.max(1, item.qty - 1);
        saveCart(cart);
        renderCartPage();
      });
    });

    itemsEl.querySelectorAll('.cpi-qty-input').forEach(input => {
      input.addEventListener('change', () => {
        const cart = getCart();
        const item = cart.find(i => i.id === input.dataset.id);
        if (item) {
          item.qty = Math.max(1, parseInt(input.value) || 1);
          saveCart(cart);
          renderCartPage();
        }
      });
    });

    itemsEl.querySelectorAll('.cpi-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        saveCart(getCart().filter(i => i.id !== btn.dataset.id));
        renderCartPage();
      });
    });
  };

  renderCartPage();

  /* ── Clear all ── */
  document.getElementById('clearCartBtn')?.addEventListener('click', () => {
    saveCart([]);
    renderCartPage();
  });

  /* ── PayPal checkout ── */
  document.getElementById('paypalCheckoutBtn')?.addEventListener('click', () => {
    const cart = getCart();
    if (!cart.length) return;
    const total = getTotal().toFixed(2);
    const note  = cart.map(i => `${i.name} x${i.qty}`).join(', ');
    window.open(buildPayPalUrl(total, note), '_blank');
  });

  /* ── Card form toggle ── */
  const cardFormEl = document.getElementById('cardCheckoutForm');
  document.getElementById('showCardFormBtn')?.addEventListener('click', () => {
    const open = cardFormEl.classList.toggle('visible');
    if (open) cardFormEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  /* ── Card type detection ── */
  const CARD_TYPES = [
    { name: 'AMEX',       pattern: /^3[47]/,          color: '#2E77BC', max: 15 },
    { name: 'VISA',       pattern: /^4/,               color: '#1A1F71', max: 16 },
    { name: 'MASTERCARD', pattern: /^5[1-5]|^2[2-7]/, color: '#252525', max: 16 },
    { name: 'DISCOVER',   pattern: /^6(?:011|5)/,      color: '#FF6600', max: 16 },
  ];
  const detectCard = num => CARD_TYPES.find(t => t.pattern.test(num)) || null;

  const updatePreview = () => {
    const rawNum = (document.getElementById('cardNumber')?.value || '').replace(/\s/g, '');
    const name   = (document.getElementById('cardName')?.value.trim())  || 'YOUR NAME';
    const expiry = document.getElementById('cardExpiry')?.value || 'MM/YY';
    const type   = detectCard(rawNum);

    const padded = rawNum.padEnd(16, '•');
    const numEl  = document.getElementById('previewNumber');
    if (numEl) numEl.textContent = padded.match(/.{1,4}/g)?.join(' ') || '•••• •••• •••• ••••';

    const nameEl = document.getElementById('previewName');
    if (nameEl) nameEl.textContent = name.toUpperCase().slice(0, 22);

    const expEl = document.getElementById('previewExp');
    if (expEl) expEl.textContent = expiry;

    const brandEl = document.getElementById('previewBrandTxt');
    if (brandEl) brandEl.textContent = type ? type.name : '';

    const badge = document.getElementById('cardTypeBadge');
    if (badge) {
      if (type) { badge.textContent = type.name; badge.style.cssText = `background:${type.color};color:#fff;`; }
      else       { badge.textContent = ''; badge.style.cssText = ''; }
    }
  };

  document.getElementById('cardNumber')?.addEventListener('input', e => {
    let val  = e.target.value.replace(/\D/g, '');
    const type = detectCard(val);
    val = val.slice(0, type?.max || 16);
    e.target.value = val.match(/.{1,4}/g)?.join(' ') || val;
    updatePreview();
  });

  document.getElementById('cardExpiry')?.addEventListener('input', e => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 3) val = val.slice(0, 2) + '/' + val.slice(2);
    e.target.value = val;
    updatePreview();
  });

  document.getElementById('cardName')?.addEventListener('input', updatePreview);

  /* ── Card form submit ── */
  document.getElementById('cardForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const errorEl = document.getElementById('cardError');
    const payBtn  = document.getElementById('cardPayBtn');
    const num     = (document.getElementById('cardNumber')?.value || '').replace(/\s/g, '');
    const name    = document.getElementById('cardName')?.value.trim();
    const expiry  = document.getElementById('cardExpiry')?.value;
    const cvv     = document.getElementById('cardCvv')?.value.trim();

    errorEl.textContent = '';
    if (num.length < 13)                          return (errorEl.textContent = 'Enter a valid card number.');
    if (!name)                                    return (errorEl.textContent = 'Enter the name on your card.');
    if (!/^\d{2}\/\d{2}$/.test(expiry))          return (errorEl.textContent = 'Enter expiry as MM/YY.');
    if (cvv.length < 3)                           return (errorEl.textContent = 'Enter a valid CVV.');

    const [mm, yy] = expiry.split('/').map(Number);
    const now = new Date();
    if (new Date(2000 + yy, mm - 1) < new Date(now.getFullYear(), now.getMonth())) {
      return (errorEl.textContent = 'Card has expired.');
    }

    payBtn.disabled = true;
    payBtn.innerHTML = `
      <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" style="animation:spin .7s linear infinite"><path stroke-linecap="round" stroke-linejoin="round" d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
      Processing…
    `;
    setTimeout(() => {
      const cart  = getCart();
      const total = getTotal().toFixed(2);
      const note  = cart.map(i => `${i.name} x${i.qty}`).join(', ');
      window.open(buildPayPalUrl(total, note), '_blank');
      payBtn.disabled = false;
      payBtn.innerHTML = `
        <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path stroke-linecap="round" stroke-linejoin="round" d="M7 11V7a5 5 0 0110 0v4"/></svg>
        Pay Now
      `;
    }, 1600);
  });

});
