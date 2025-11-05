document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      const isHidden = siteNav.style.display === 'block';
      siteNav.style.display = isHidden ? '' : 'block';
    });
  }

  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  const threats = [
    {id:1, time:'2025-11-04 10:15:23', severity:'Low', desc:'Suspicious login attempt blocked from 203.0.113.12'},
    {id:2, time:'2025-11-04 09:42:10', severity:'High', desc:'Anomalous outbound traffic pattern detected (possible data exfiltration)'},
    {id:3, time:'2025-11-03 22:19:01', severity:'Medium', desc:'New vulnerable dependency detected: package@1.2.3'},
  ];

  const feedEl = document.getElementById('threat-feed');
  function renderThreats(list){
    if(!feedEl) return;
    feedEl.innerHTML = '';
    list.forEach(t => {
      const item = document.createElement('div');
      item.className = 'threat-item';
      item.innerHTML = `<strong>[${t.severity}]</strong> <span class="muted"> ${t.time}</span><div>${t.desc}</div>`;
      feedEl.appendChild(item);
    });
  }

  renderThreats(threats);

  const refreshBtn = document.getElementById('refresh-feed');
  if (refreshBtn) refreshBtn.addEventListener('click', () => {
    threats.unshift(threats.pop());
    renderThreats(threats);
  });

  const resources = [
    {title:'Hardening Checklist: Small Businesses', url:'#'},
    {title:'Incident Response: Quick Start Guide (PDF)', url:'#'},
    {title:'Top 10 Web App Security Misconfigurations', url:'#'}
  ];
  const resList = document.getElementById('resource-list');
  if(resList){
    resList.innerHTML = '';
    resources.forEach(r => {
      const li = document.createElement('li');
      li.className = 'resource';
      li.innerHTML = `<a href="${r.url}" class="resource-link">${r.title}</a>`;
      resList.appendChild(li);
    });
  }

  const form = document.getElementById('contact-form');
  const status = form ? document.getElementById('form-status') : null;
  if (form) {
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const message = form.querySelector('#message').value.trim();

      if (name.length < 2) return displayStatus('Please enter your name (2+ characters).', true);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return displayStatus('Please enter a valid email.', true);
      if (message.length < 10) return displayStatus('Message must be at least 10 characters.', true);

      
      displayStatus('Sending message…', false);
      setTimeout(() => {
        displayStatus('Thanks — your message was sent (demo only). We will respond shortly.', false);
        form.reset();
      }, 800);
    });
  }

  function displayStatus(text, isError) {
    if (!status) return;
    status.textContent = text;
    status.style.color = isError ? '#ff8a80' : '#b7f8ff';
  }
});
