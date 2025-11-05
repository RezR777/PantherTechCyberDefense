/* script.js - interactive behaviors for all pages */

// Shared utilities
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// Set current year placeholders
document.addEventListener('DOMContentLoaded', () => {
  const y = new Date().getFullYear();
  ['#year','#year-services','#year-solutions','#year-intel','#year-about','#year-careers','#year-blog','#year-contact-page'].forEach(id => {
    const el = document.querySelector(id);
    if (el) el.textContent = y;
  });
});

// Theme (dark/light) toggle and persistence
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.body.setAttribute('data-theme', theme);
  // update icon(s)
  $$('.icon-btn').forEach(b => b.textContent = theme === 'dark' ? '🌙' : '🌞');
  localStorage.setItem('panthertech-theme', theme);
}
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('panthertech-theme') || 'dark';
  setTheme(saved);

  // wire toggle buttons (present on each page)
  $$('.icon-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  });
});

// Mobile nav toggle (uses an id pattern nav-toggle / nav)
document.addEventListener('DOMContentLoaded', () => {
  $$('[id^=nav-toggle]').forEach(btn => {
    const id = btn.id.replace('nav-toggle','nav');
    const nav = document.getElementById(id);
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (nav) nav.classList.toggle('open');
    });
  });

  // make current nav link active based on path
  const path = window.location.pathname.split('/').pop() || 'index.html';
  $$('.nav-link').forEach(a => {
    const href = a.getAttribute('href');
    if (href && href.includes(path)) {
      a.classList.add('active');
    }
  });
});

// Mock threat feed for hero panel
document.addEventListener('DOMContentLoaded', () => {
  const feedEl = document.getElementById('threat-feed');
  if (!feedEl) return;
  const feed = [
    {t:'2025-11-04 10:15:23', s:'LOW', d:'Blocked brute-force login from 203.0.113.12'},
    {t:'2025-11-04 09:42:10', s:'HIGH', d:'Anomalous outbound upload to unknown domain (possible exfil)'},
    {t:'2025-11-03 22:19:01', s:'MED', d:'New vulnerable package detected: dep-lib@1.2.3'},
    {t:'2025-10-30 16:04:12', s:'HIGH', d:'Ransomware sample detected in isolated sandbox'},
  ];
  function render(list){
    feedEl.innerHTML = '';
    list.forEach(it => {
      const el = document.createElement('div');
      el.className = 'threat-item';
      el.innerHTML = `<strong>[${it.s}]</strong> <span class="muted"> ${it.t}</span><div>${it.d}</div>`;
      feedEl.appendChild(el);
    });
  }
  render(feed);

  // rotate on button
  const btn = document.getElementById('refresh');
  if (btn) btn.addEventListener('click', () => {
    feed.unshift(feed.pop());
    render(feed);
  });
});

// Simple reveal on scroll for elements with .reveal (enhanced)
(function() {
  const elems = Array.from(document.querySelectorAll('.reveal'));
  const onScroll = () => {
    const h = window.innerHeight;
    elems.forEach(el => {
      if (el.getBoundingClientRect().top < h - 80) el.classList.add('visible');
    });
  };
  document.addEventListener('scroll', onScroll);
  window.addEventListener('resize', onScroll);
  document.addEventListener('DOMContentLoaded', onScroll);
})();

// Contact form client-side validation + simulated submit
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('form-status');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.querySelector('#name') ? form.querySelector('#name').value.trim() : '';
    const email = form.querySelector('#email') ? form.querySelector('#email').value.trim() : '';
    const msg = form.querySelector('#message') ? form.querySelector('#message').value.trim() : '';

    if (name.length < 2) return show('Please enter your name (2+ characters)', true);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return show('Please enter a valid email', true);
    if (msg.length < 10) return show('Please provide more details in the message (10+ chars)', true);

    show('Sending…', false);
    // simulated network
    setTimeout(() => {
      show('Thanks — your request has been sent. Our team will reach out within one business day.', false);
      form.reset();
    }, 900);
  });

  function show(text, isErr) {
    if (!status) return alert(text);
    status.textContent = text;
    status.style.color = isErr ? '#ff8a80' : '#b7f8ff';
  }
});
