(() => {
  const PASS_KEY  = 'mha-admin-pass';
  const THEME_KEY = 'mha-theme';
  const VISIT_KEY = 'mha-last-visit';
  const NOTES_KEY = 'mha-admin-notes';
  const DEFAULT_PASS = 'metahub2024';

  /* ── trigger: 5 clicks within 3 s ── */
  let clickCount = 0;
  let clickTimer  = null;

  document.getElementById('adminTrigger').addEventListener('click', () => {
    clickCount++;
    if (clickCount === 1) {
      clickTimer = setTimeout(() => { clickCount = 0; }, 3000);
    }
    if (clickCount >= 5) {
      clearTimeout(clickTimer);
      clickCount = 0;
      openAuth();
    }
  });

  /* ── auth modal ── */
  function openAuth() {
    document.getElementById('adminAuth').classList.add('active');
    setTimeout(() => document.getElementById('admPassInput').focus(), 100);
  }

  function closeAuth() {
    document.getElementById('adminAuth').classList.remove('active');
    document.getElementById('admPassInput').value = '';
    document.getElementById('admAuthErr').textContent = '';
  }

  document.getElementById('admAuthDismiss').addEventListener('click', closeAuth);

  document.getElementById('admPassBtn').addEventListener('click', attemptLogin);
  document.getElementById('admPassInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') attemptLogin();
  });

  function attemptLogin() {
    const stored = localStorage.getItem(PASS_KEY) || DEFAULT_PASS;
    const input  = document.getElementById('admPassInput').value;
    if (input === stored) {
      closeAuth();
      openPanel();
    } else {
      document.getElementById('admAuthErr').textContent = 'Incorrect access key.';
      document.getElementById('admPassInput').value = '';
      document.getElementById('admPassInput').focus();
    }
  }

  /* ── panel ── */
  function openPanel() {
    document.getElementById('adminPanelOverlay').classList.add('active');
    loadDashboard();
    loadNotes();
    switchTab('overview');
    localStorage.setItem(VISIT_KEY, new Date().toISOString());
  }

  function closePanel() {
    document.getElementById('adminPanelOverlay').classList.remove('active');
    document.getElementById('admChangePassForm').style.display = 'none';
  }

  document.getElementById('adminPanelOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('adminPanelOverlay')) closePanel();
  });

  document.getElementById('admLogout').addEventListener('click', closePanel);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closePanel();
      closeAuth();
    }
  });

  /* ── tabs ── */
  document.querySelectorAll('.adm-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  function switchTab(name) {
    document.querySelectorAll('.adm-nav-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === name));
    document.querySelectorAll('.adm-tab').forEach(t => t.classList.toggle('active', t.id === `adm-tab-${name}`));
  }

  /* ── dashboard ── */
  function loadDashboard() {
    const theme     = localStorage.getItem(THEME_KEY) || 'dark';
    const lastVisit = localStorage.getItem(VISIT_KEY);

    const themeEl = document.getElementById('admThemeVal');
    if (themeEl) themeEl.textContent = theme === 'dark' ? 'Dark' : 'Light';

    const visitEl = document.getElementById('admLastVisit');
    if (visitEl) {
      visitEl.textContent = lastVisit
        ? new Date(lastVisit).toLocaleString('en-KE', { dateStyle: 'medium', timeStyle: 'short' })
        : 'First visit';
    }

    // sync theme toggle state
    const toggle = document.getElementById('admThemeToggle');
    if (toggle) {
      toggle.classList.toggle('on', theme === 'light');
    }
  }

  /* ── theme toggle (button) ── */
  document.getElementById('admThemeToggle').addEventListener('click', function () {
    const current = localStorage.getItem(THEME_KEY) || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(THEME_KEY, next);
    this.classList.toggle('on', next === 'light');
    const themeEl = document.getElementById('admThemeVal');
    if (themeEl) themeEl.textContent = next === 'dark' ? 'Dark' : 'Light';
  });

  /* ── change password ── */
  document.getElementById('admChangePass').addEventListener('click', () => {
    const form = document.getElementById('admChangePassForm');
    form.style.display = form.style.display === 'flex' ? 'none' : 'flex';
    if (form.style.display === 'flex') {
      document.getElementById('admNewPass').focus();
    }
  });

  document.getElementById('admCancelPass').addEventListener('click', () => {
    document.getElementById('admChangePassForm').style.display = 'none';
    document.getElementById('admNewPass').value = '';
  });

  document.getElementById('admSavePass').addEventListener('click', () => {
    const next = document.getElementById('admNewPass').value.trim();
    if (!next || next.length < 4) {
      alert('Password must be at least 4 characters.');
      return;
    }
    localStorage.setItem(PASS_KEY, next);
    document.getElementById('admNewPass').value = '';
    document.getElementById('admChangePassForm').style.display = 'none';
    alert('Password updated successfully.');
  });

  /* ── clear data ── */
  document.getElementById('admClearData').addEventListener('click', () => {
    if (!confirm('Clear all site localStorage data? This cannot be undone.')) return;
    [THEME_KEY, VISIT_KEY, NOTES_KEY].forEach(k => localStorage.removeItem(k));
    document.documentElement.setAttribute('data-theme', 'dark');
    loadDashboard();
    loadNotes();
  });

  /* ── qr code ── */
  let qrGenerated = false;

  function initQr() {
    if (qrGenerated) return;
    qrGenerated = true;
    new QRCode(document.getElementById('admQrCode'), {
      text: 'https://metahubacademy.com',
      width: 220,
      height: 220,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H,
    });
  }

  document.querySelector('.adm-nav-btn[data-tab="qr"]').addEventListener('click', () => {
    setTimeout(initQr, 50);
  });

  document.getElementById('admQrDownload').addEventListener('click', () => {
    initQr();
    setTimeout(() => {
      const canvas = document.querySelector('#admQrCode canvas');
      if (!canvas) return;
      const link = document.createElement('a');
      link.download = 'metahubacademy-qr.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }, 200);
  });

  /* ── notes ── */
  function loadNotes() {
    const area = document.getElementById('admNotesArea');
    if (area) area.value = localStorage.getItem(NOTES_KEY) || '';
  }

  let notesSaveTimer = null;
  document.getElementById('admNotesArea').addEventListener('input', function () {
    clearTimeout(notesSaveTimer);
    notesSaveTimer = setTimeout(() => {
      localStorage.setItem(NOTES_KEY, this.value);
    }, 800);
  });

  document.getElementById('admClearNotes').addEventListener('click', () => {
    if (!confirm('Clear all notes?')) return;
    localStorage.removeItem(NOTES_KEY);
    document.getElementById('admNotesArea').value = '';
  });
})();
