/* ══════════════════════════════════════════════════════
   MetaHub Academy — Main JavaScript
   ══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Sticky navbar on scroll ── */
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  /* ── Mobile hamburger menu ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  /* ── Dark / Light theme toggle ── */
  const html        = document.documentElement;
  const toggleBtn   = document.getElementById('themeToggle');
  const toggleEmoji = document.getElementById('toggleEmoji');

  // Restore saved preference
  const savedTheme = localStorage.getItem('mha-theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  toggleEmoji.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

  toggleBtn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    toggleEmoji.textContent = next === 'dark' ? '🌙' : '☀️';
    localStorage.setItem('mha-theme', next);
  });

  /* ── Scroll-reveal animation ── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 90);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── chat widget ── */
  const chatTrigger = document.getElementById('chatTrigger');
  const chatPopup   = document.getElementById('chatPopup');
  const chatClose   = document.getElementById('chatClose');

  if (chatTrigger && chatPopup) {
    const iconOpen  = chatTrigger.querySelector('.chat-icon-open');
    const iconClose = chatTrigger.querySelector('.chat-icon-close');

    const openChat = () => {
      chatPopup.classList.add('open');
      iconOpen.style.display  = 'none';
      iconClose.style.display = 'flex';
    };
    const closeChat = () => {
      chatPopup.classList.remove('open');
      iconOpen.style.display  = 'flex';
      iconClose.style.display = 'none';
    };

    chatTrigger.addEventListener('click', () => {
      chatPopup.classList.contains('open') ? closeChat() : openChat();
    });
    if (chatClose) chatClose.addEventListener('click', closeChat);

    document.addEventListener('click', e => {
      if (!document.getElementById('chatWidget').contains(e.target)) closeChat();
    });
  }

  /* ── footer live clock ── */
  const clockEl = document.getElementById('footerClock');
  if (clockEl) {
    const tick = () => {
      const now = new Date();
      const date = now.toLocaleDateString('en-KE', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
      const time = now.toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
      clockEl.textContent = `${date}  ${time}`;
    };
    tick();
    setInterval(tick, 1000);
  }

});
