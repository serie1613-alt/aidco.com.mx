/* ===== TEMA OSCURO / CLARO (opcional, bien integrado) ===== */
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeToggleMobile = document.getElementById('darkModeToggleMobile');
const body = document.body;
const metaThemeColor = document.getElementById('metaThemeColor');

function syncThemeChrome(isLight) {
  document.documentElement.style.colorScheme = isLight ? 'light' : 'dark';
  document.documentElement.dataset.theme = isLight ? 'light' : 'dark';
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', isLight ? '#faf7f0' : '#0d1425');
  }
}

function updateThemeToggleUi(isLight) {
  [darkModeToggle, darkModeToggleMobile].forEach((toggle) => {
    if (!toggle) return;
    toggle.setAttribute('aria-pressed', isLight ? 'true' : 'false');
    toggle.setAttribute(
      'aria-label',
      isLight ? 'Activar modo oscuro' : 'Activar modo claro'
    );
    toggle.title = isLight ? 'Modo oscuro' : 'Modo claro';
  });
}

/** persist: guardar en localStorage solo cuando el usuario pulsa el botón */
function applyTheme(theme, persist) {
  const isLight = theme === 'light';
  body.classList.toggle('light-mode', isLight);
  syncThemeChrome(isLight);
  updateThemeToggleUi(isLight);
  if (persist) localStorage.setItem('theme', theme);
}

let savedTheme = localStorage.getItem('theme');
if (savedTheme !== 'light' && savedTheme !== 'dark') {
  savedTheme = 'dark';
}
applyTheme(savedTheme, false);

function bindThemeToggle(toggle) {
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    const next = body.classList.contains('light-mode') ? 'dark' : 'light';
    applyTheme(next, true);
  });
}

bindThemeToggle(darkModeToggle);
bindThemeToggle(darkModeToggleMobile);

let modalsEnLoadPromise = null;

function loadModalsEnScript() {
  if (window.SERVICIOS_DETALLE_EN) return Promise.resolve();
  if (modalsEnLoadPromise) return modalsEnLoadPromise;
  modalsEnLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'i18n-modals-en.js';
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
  return modalsEnLoadPromise;
}

function scheduleLucideIcons() {
  const run = () => {
    if (typeof lucide !== 'undefined') lucide.createIcons();
  };
  if ('requestIdleCallback' in window) {
    requestIdleCallback(run, { timeout: 2500 });
  } else {
    setTimeout(run, 120);
  }
}

function initLucideWhenReady() {
  if (typeof lucide !== 'undefined') {
    scheduleLucideIcons();
    return;
  }
  const lucideScript = document.querySelector('script[src*="lucide"]');
  if (lucideScript) {
    lucideScript.addEventListener('load', scheduleLucideIcons, { once: true });
  }
}

/* ===== IDIOMA ES / EN ===== */
window.__pageLang = localStorage.getItem('lang') === 'en' ? 'en' : 'es';
const urlLangParam = new URLSearchParams(window.location.search).get('lang');
if (urlLangParam === 'en' || urlLangParam === 'es') {
  window.__pageLang = urlLangParam;
  localStorage.setItem('lang', urlLangParam);
}
const langToggleEl = document.getElementById('langToggle');
const langToggleMobile = document.getElementById('langToggleMobile');

function pageStrings(lang) {
  return (window.PAGE_I18N && window.PAGE_I18N[lang]) || {};
}

function applyPageLanguage(lang) {
  window.__pageLang = lang === 'en' ? 'en' : 'es';
  localStorage.setItem('lang', window.__pageLang);
  document.documentElement.lang = window.__pageLang === 'en' ? 'en' : 'es';
  const T = pageStrings(window.__pageLang);
  if (!window.PAGE_I18N) return;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key && T[key] != null) el.textContent = T[key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.getAttribute('data-i18n-html');
    if (key && T[key] != null) el.innerHTML = T[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key && T[key] != null) el.placeholder = T[key];
  });
  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    const key = el.getAttribute('data-i18n-aria');
    if (key && T[key] != null) el.setAttribute('aria-label', T[key]);
  });
  document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
    const key = el.getAttribute('data-i18n-alt');
    if (key && T[key] != null) el.setAttribute('alt', T[key]);
  });
  document.querySelectorAll('[data-i18n-href]').forEach((el) => {
    const key = el.getAttribute('data-i18n-href');
    if (key && T[key] != null) el.setAttribute('href', T[key]);
  });

  document.querySelectorAll('[data-alt-i18n]').forEach((el) => {
    const key = el.getAttribute('data-alt-i18n');
    if (key && T[key] != null) el.dataset.statAlt = T[key];
  });
  document.querySelectorAll('[data-aria-i18n]').forEach((el) => {
    const key = el.getAttribute('data-aria-i18n');
    if (key && T[key] != null) el.setAttribute('aria-label', T[key]);
  });

  const htmlTitleKey = document.documentElement.getAttribute('data-i18n-meta-title');
  if (htmlTitleKey && T[htmlTitleKey]) document.title = T[htmlTitleKey];
  else if (T['meta.title']) document.title = T['meta.title'];

  syncSeoMeta(T);
  syncWhatsAppLinks(T);
  syncFaqSchema(T);

  document.querySelectorAll('.hero-stat-img-btn img').forEach((img) => {
    const btn = img.closest('.hero-stat-img-btn');
    const key = btn?.getAttribute('data-alt-i18n');
    if (key && T[key]) img.alt = T[key];
  });

  const romboAltKeys = { 1: 'srv.cctv.alt', 2: 'srv.redes.alt', 3: 'srv.ca.alt', 4: 'srv.fibra.alt', 5: 'srv.cb.alt', 6: 'srv.wifi.alt', 7: 'srv.det.alt', 8: 'srv.rt.alt', 9: 'srv.ip.alt' };
  document.querySelectorAll('.rombo[data-id]:not(.rombo-empty)').forEach((el) => {
    const id = el.getAttribute('data-id');
    const thumb = el.querySelector('.rombo-img');
    const key = romboAltKeys[id];
    if (thumb && key && T[key]) thumb.alt = T[key];
  });

  syncLangToggleUi();

  if (navToggle && nav) {
    const open = nav.classList.contains('nav-open');
    navToggle.setAttribute('aria-label', open ? (T['nav.menuClose'] || '') : (T['nav.menuOpen'] || ''));
  }

  initVirtualAssistant(T);

  scheduleLucideIcons();
}

function syncLangToggleUi() {
  if (!window.PAGE_I18N) return;
  const es = window.PAGE_I18N.es;
  const en = window.PAGE_I18N.en;
  [langToggleEl, langToggleMobile].forEach((toggle) => {
    if (!toggle) return;
    if (window.__pageLang === 'en') {
      toggle.textContent = 'ES';
      toggle.setAttribute('aria-label', es['lang.switchEs']);
      toggle.title = 'Español';
    } else {
      toggle.textContent = 'EN';
      toggle.setAttribute('aria-label', en['lang.switchEn']);
      toggle.title = 'English';
    }
  });
}

function bindLangToggle(toggle) {
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    const next = window.__pageLang === 'en' ? 'es' : 'en';
    if (next === 'en') {
      loadModalsEnScript().finally(() => applyPageLanguage('en'));
    } else {
      applyPageLanguage('es');
    }
  });
}

bindLangToggle(langToggleEl);
bindLangToggle(langToggleMobile);

window.applyPageLanguage = applyPageLanguage;

const WHATSAPP_NUMBER = '526647323050';

const ASSISTANT_ACTIONS = [
  { id: 'services', qKey: 'assistant.q.services', rKey: 'assistant.r.services', target: '#servicios' },
  { id: 'quote', qKey: 'assistant.q.quote', rKey: 'assistant.r.quote', target: '#contacto' },
  { id: 'payment', qKey: 'assistant.q.payment', rKey: 'assistant.r.payment', target: '#contacto' },
  { id: 'coverage', qKey: 'assistant.q.coverage', rKey: 'assistant.r.coverage', target: '#contacto' },
  { id: 'support', qKey: 'assistant.q.support', rKey: 'assistant.r.support', target: '#contacto' },
  { id: 'timeline', qKey: 'assistant.q.timeline', rKey: 'assistant.r.timeline', target: '#contacto' },
  { id: 'certifications', qKey: 'assistant.q.certifications', rKey: 'assistant.r.certifications', target: '#confianza' },
  { id: 'contact', qKey: 'assistant.q.contact', rKey: 'assistant.r.contact', target: '#contacto' },
];

const ASSISTANT_KNOWLEDGE = [
  {
    keys: ['servicio', 'servicios', 'cctv', 'camara', 'cámaras', 'cableado', 'acceso', 'red', 'redes', 'fibra', 'telefonia', 'telefonía', 'wifi', 'inalambrico', 'detector', 'router'],
    actionId: 'services',
  },
  {
    keys: ['cotiz', 'presupuesto', 'precio', 'precios', 'costo', 'cuanto', 'cuánto', 'tarifa', 'propuesta'],
    actionId: 'quote',
  },
  {
    keys: ['pago', 'pagos', 'pagar', 'metodo', 'metodos', 'tarjeta', 'tarjetas', 'efectivo', 'visa', 'mastercard', 'amex', 'debito', 'credito', 'factura', 'facturacion'],
    actionId: 'payment',
  },
  {
    keys: ['cobertura', 'cubren', 'republica', 'república', 'mexico', 'méxico', 'sonora', 'sinaloa', 'jalisco', 'nuevo leon', 'nuevo león', 'cdmx', 'ciudad de mexico', 'estado', 'estados', 'region', 'donde', 'ubicacion', 'localidad', 'ciudad'],
    actionId: 'coverage',
  },
  {
    keys: ['soporte', '24/7', '24 7', 'emergencia', 'urgente', 'urgencia', 'monitoreo', 'mantenimiento', 'falla', 'averia'],
    actionId: 'support',
  },
  {
    keys: ['tiempo', 'tarda', 'tardan', 'plazo', 'plazos', 'duracion', 'cronograma', 'cuanto tarda', 'cuando terminan', 'entrega', 'instalan'],
    actionId: 'timeline',
  },
  {
    keys: ['certificacion', 'certificaciones', 'certificado', 'certificados', 'oficial', 'oficiales', 'panduit', 'belden', 'corning', 'total ground', 'acreditacion', 'norma', 'estandar'],
    actionId: 'certifications',
  },
  {
    keys: ['contacto', 'contactar', 'correo', 'email', 'telefono', 'teléfono', 'llamar', 'whatsapp', 'escribir'],
    actionId: 'contact',
  },
];

let assistantInitialized = false;
let assistantHasWelcomed = false;
let assistantTextsCache = null;

function normalizeAssistantText(value) {
  return (value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function getAssistantTexts(T) {
  return {
    welcome: T['assistant.welcome'] || '',
    openAria: T['assistant.openAria'] || '',
    closeToggleAria: T['assistant.closeToggleAria'] || '',
    closeAria: T['assistant.closeAria'] || '',
    fallback: T['assistant.fallback'] || '',
    actions: ASSISTANT_ACTIONS.map((action) => ({
      ...action,
      label: T[action.qKey] || '',
      reply: T[action.rKey] || '',
    })),
  };
}

function bindAssistantMessageLinks(msg) {
  msg.querySelectorAll('a[href^="mailto:"], a[href^="tel:"], a[href^="#"], a[href*="mail.google.com/mail"], a[href*="wa.me"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.stopPropagation();
      const href = link.getAttribute('href') || '';
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
          setAssistantOpen(false);
        }
        return;
      }
      if (href.includes('mail.google.com/mail') || href.includes('wa.me')) {
        e.preventDefault();
        window.open(href, '_blank', 'noopener,noreferrer');
        return;
      }
      if (href.startsWith('mailto:')) {
        e.preventDefault();
        window.location.href = href;
      }
    });
  });
}

function appendAssistantMessage(text, type) {
  const messagesEl = document.getElementById('assistantMessages');
  if (!messagesEl || !text) return;
  const msg = document.createElement('div');
  msg.className = `assistant-msg assistant-msg--${type}`;
  if (type === 'bot' && /<a[\s>]|(<br\s*\/?>)/i.test(text)) {
    msg.innerHTML = text;
    bindAssistantMessageLinks(msg);
  } else {
    msg.textContent = text;
  }
  messagesEl.appendChild(msg);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function findAssistantActionFromText(text, actions) {
  const normalized = normalizeAssistantText(text);
  if (!normalized) return null;

  const exact = actions.find((action) => normalizeAssistantText(action.label) === normalized);
  if (exact) return exact;

  for (const item of ASSISTANT_KNOWLEDGE) {
    if (item.keys.some((key) => normalized.includes(key))) {
      const match = actions.find((action) => action.id === item.actionId);
      if (match) return match;
    }
  }

  return null;
}

function renderAssistantQuickActions(actions) {
  const quickEl = document.getElementById('assistantQuick');
  if (!quickEl) return;
  quickEl.innerHTML = '';
  actions.forEach((action) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'assistant-quick-btn';
    btn.textContent = action.label;
    btn.addEventListener('click', () => handleAssistantUserMessage(action.label, action));
    quickEl.appendChild(btn);
  });
}

function handleAssistantUserMessage(rawText, presetAction) {
  const texts = assistantTextsCache || getAssistantTexts(pageStrings(window.__pageLang || 'es'));
  const text = (rawText || '').trim();
  if (!text) return;

  appendAssistantMessage(text, 'user');

  const input = document.getElementById('assistantInput');
  if (input) input.value = '';

  const action = presetAction || findAssistantActionFromText(text, texts.actions);
  const reply = action ? action.reply : texts.fallback;

  window.setTimeout(() => {
    appendAssistantMessage(reply, 'bot');
  }, 350);
}

function resetAssistantConversation() {
  const messagesEl = document.getElementById('assistantMessages');
  const input = document.getElementById('assistantInput');
  if (messagesEl) messagesEl.innerHTML = '';
  if (input) input.value = '';
  assistantHasWelcomed = false;
}

function setAssistantOpen(open) {
  const panel = document.getElementById('assistantPanel');
  const toggle = document.getElementById('assistantToggle');
  const widget = document.getElementById('assistantWidget');
  const input = document.getElementById('assistantInput');
  const iconOpen = toggle?.querySelector('.assistant-float-icon-open');
  const texts = assistantTextsCache || getAssistantTexts(pageStrings(window.__pageLang || 'es'));

  if (!panel || !toggle) return;

  panel.hidden = !open;
  panel.setAttribute('aria-hidden', open ? 'false' : 'true');
  toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  toggle.setAttribute('aria-label', open ? texts.closeToggleAria : texts.openAria);
  if (widget) widget.classList.toggle('is-open', open);
  if (iconOpen) iconOpen.hidden = false;

  if (open) {
    const messagesEl = document.getElementById('assistantMessages');
    if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight;
    window.setTimeout(() => input?.focus(), 180);
  } else {
    input?.blur();
    resetAssistantConversation();
  }
}

function initVirtualAssistant(T) {
  const widget = document.getElementById('assistantWidget');
  const panel = document.getElementById('assistantPanel');
  const toggle = document.getElementById('assistantToggle');
  const closeBtn = document.getElementById('assistantClose');
  const form = document.getElementById('assistantForm');
  const input = document.getElementById('assistantInput');
  const messagesEl = document.getElementById('assistantMessages');
  if (!widget || !panel || !toggle || !closeBtn || !messagesEl || !form || !input) return;

  const texts = getAssistantTexts(T);
  assistantTextsCache = texts;
  closeBtn.setAttribute('aria-label', texts.closeAria);
  toggle.setAttribute('aria-label', panel.hidden ? texts.openAria : texts.closeToggleAria);

  renderAssistantQuickActions(texts.actions);

  if (!assistantInitialized) {
    assistantInitialized = true;

    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const willOpen = panel.hidden;
      setAssistantOpen(willOpen);
      if (willOpen && !assistantHasWelcomed) {
        assistantHasWelcomed = true;
        appendAssistantMessage(texts.welcome, 'bot');
      }
    });

    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      setAssistantOpen(false);
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleAssistantUserMessage(input.value);
    });

    document.addEventListener('click', (e) => {
      if (panel.hidden) return;
      if (e.target.closest('#assistantWidget')) return;
      setAssistantOpen(false);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !panel.hidden) setAssistantOpen(false);
    });

    scheduleLucideIcons();
  } else if (!panel.hidden) {
    messagesEl.innerHTML = '';
    assistantHasWelcomed = true;
    appendAssistantMessage(texts.welcome, 'bot');
    setAssistantOpen(true);
  } else {
    assistantHasWelcomed = false;
    setAssistantOpen(false);
  }
}

function getWhatsAppUrl(text) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function syncWhatsAppLinks(T) {
  const text = T['wa.text'] || 'Hola, quiero información sobre sus servicios de AIDCO.';
  const url = getWhatsAppUrl(text);
  const el = document.getElementById('whatsappFloat');
  if (el) el.href = url;
}

function getPageMeta(T) {
  const titleKey = document.documentElement.getAttribute('data-i18n-meta-title');
  const descKey = document.documentElement.getAttribute('data-i18n-meta-description');
  const title = (titleKey && T[titleKey]) ? T[titleKey] : (T['meta.title'] || document.title);
  const desc = (descKey && T[descKey]) ? T[descKey] : (T['meta.description'] || '');
  return { title, desc };
}

function syncSeoMeta(T) {
  const { title, desc } = getPageMeta(T);
  document.title = title;

  const metaDesc = document.getElementById('metaDescription');
  if (metaDesc) metaDesc.setAttribute('content', desc);

  const ogTitle = document.getElementById('ogTitle');
  if (ogTitle) ogTitle.setAttribute('content', title);

  const ogDescription = document.getElementById('ogDescription');
  if (ogDescription) ogDescription.setAttribute('content', desc);

  const twitterTitle = document.getElementById('twitterTitle');
  if (twitterTitle) twitterTitle.setAttribute('content', title);

  const twitterDescription = document.getElementById('twitterDescription');
  if (twitterDescription) twitterDescription.setAttribute('content', desc);

  const ogLocale = document.getElementById('ogLocale');
  if (ogLocale) ogLocale.setAttribute('content', window.__pageLang === 'en' ? 'en_US' : 'es_MX');
}

function syncFaqSchema(T) {
  const schemaEl = document.getElementById('faqSchema');
  if (!schemaEl || !document.getElementById('faq')) return;

  const mainEntity = [1, 2, 3, 4, 5, 6, 7]
    .map((n) => ({
      '@type': 'Question',
      name: T[`faq.q${n}`] || '',
      acceptedAnswer: {
        '@type': 'Answer',
        text: T[`faq.a${n}`] || '',
      },
    }))
    .filter((item) => item.name && item.acceptedAnswer.text);

  schemaEl.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  });
}

/* ===== NAVIGATION SCROLL ===== */
const nav = document.getElementById('nav');
let lastNavScrollY = window.scrollY;
const NAV_HIDE_AFTER = 72;
const NAV_SCROLL_DELTA = 6;

function syncNavScrolledState() {
  if (!nav) return;
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 24);

  if (nav.classList.contains('nav-open') || y <= NAV_HIDE_AFTER) {
    nav.classList.remove('nav-hidden');
    lastNavScrollY = y;
    return;
  }

  const delta = y - lastNavScrollY;
  if (Math.abs(delta) < NAV_SCROLL_DELTA) return;

  if (delta > 0) {
    nav.classList.add('nav-hidden');
  } else {
    nav.classList.remove('nav-hidden');
  }

  lastNavScrollY = y;
}

window.addEventListener('scroll', syncNavScrolledState, { passive: true });
window.addEventListener('load', syncNavScrolledState);

const backToTopBtn = document.getElementById('backToTop');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function syncBackToTopVisibility() {
  if (!backToTopBtn) return;
  backToTopBtn.classList.toggle('is-visible', window.scrollY > 420);
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
}

if (backToTopBtn) {
  window.addEventListener('scroll', syncBackToTopVisibility, { passive: true });
  window.addEventListener('load', syncBackToTopVisibility);
  syncBackToTopVisibility();
  backToTopBtn.addEventListener('click', scrollToTop);
}

const navToggle = document.getElementById('navToggle');
const mobileMenuPanel = document.getElementById('mobileMenuPanel');
const primaryNav = document.getElementById('primary-navigation');
const mqMobileNav = window.matchMedia('(max-width: 768px)');

function syncNavOffset() {
  if (!nav) return;
  nav.style.setProperty('--nav-offset', `${nav.offsetHeight}px`);
}

function closeMobileNav() {
  if (!nav || !mobileMenuPanel) return;
  if (!nav.classList.contains('nav-open')) return;
  nav.classList.remove('nav-open');
  nav.classList.remove('nav-hidden');
  mobileMenuPanel.hidden = true;
  mobileMenuPanel.classList.remove('is-open');
  mobileMenuPanel.setAttribute('aria-hidden', 'true');
  if (navToggle) {
    const Tnav = pageStrings(window.__pageLang || 'es');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', Tnav['nav.menuOpen'] || 'Abrir menú');
  }
  document.body.classList.remove('menu-open');
  document.body.style.overflow = '';
}

function openMobileNav() {
  if (!nav || !mobileMenuPanel) return;
  syncNavOffset();
  nav.classList.remove('nav-hidden');
  nav.classList.add('nav-open');
  mobileMenuPanel.hidden = false;
  mobileMenuPanel.classList.add('is-open');
  mobileMenuPanel.setAttribute('aria-hidden', 'false');
  if (navToggle) {
    const Tnav = pageStrings(window.__pageLang || 'es');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', Tnav['nav.menuClose'] || 'Cerrar menú');
  }
  document.body.classList.add('menu-open');
  document.body.style.overflow = 'hidden';
}

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    if (nav.classList.contains('nav-open')) closeMobileNav();
    else openMobileNav();
  });
}

if (primaryNav) {
  primaryNav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      if (mqMobileNav.matches) closeMobileNav();
    });
  });
}

window.addEventListener('resize', () => {
  syncNavOffset();
  if (window.innerWidth > 768) closeMobileNav();
});

syncNavOffset();
window.addEventListener('load', syncNavOffset);

mqMobileNav.addEventListener('change', () => {
  if (!nav) return;
  syncNavOffset();
  if (!mqMobileNav.matches) closeMobileNav();
});

/* ===== SCROLL REVEAL ANIMATION ===== */
const revealEls = document.querySelectorAll('.reveal');

function getRevealStaggerIndex(el) {
  const parent = el.parentElement;
  if (!parent) return 0;
  const siblings = [...parent.children].filter((child) => child.classList.contains('reveal'));
  const index = siblings.indexOf(el);
  return index >= 0 ? index : 0;
}

function animateMetricCounter(el) {
  if (!el || el.dataset.animated === 'true') return;

  const staticValue = el.dataset.countStatic;
  if (staticValue) {
    el.textContent = staticValue;
    el.dataset.animated = 'true';
    return;
  }

  const target = Number(el.dataset.count);
  if (!Number.isFinite(target)) return;

  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  el.dataset.animated = 'true';

  if (prefersReducedMotion) {
    el.textContent = `${prefix}${target}${suffix}`;
    return;
  }

  const duration = 1400;
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(eased * target);
    el.textContent = `${prefix}${value}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  }

  el.textContent = `${prefix}0${suffix}`;
  requestAnimationFrame(tick);
}

function revealElement(el) {
  if (!el || el.classList.contains('visible')) return;

  const staggerMs = getRevealStaggerIndex(el) * 90;
  el.style.setProperty('--reveal-delay', `${staggerMs}ms`);
  el.classList.add('visible');

  const counter = el.querySelector('.metrica-num[data-count], .metrica-num[data-count-static]');
  if (counter) animateMetricCounter(counter);
}

function initScrollReveal() {
  if (!revealEls.length) return;

  revealEls.forEach((el) => {
    const counter = el.querySelector('.metrica-num[data-count]');
    if (counter && !prefersReducedMotion) {
      const prefix = counter.dataset.prefix || '';
      const suffix = counter.dataset.suffix || '';
      counter.textContent = `${prefix}0${suffix}`;
    }
  });

  if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
    revealEls.forEach(revealElement);
    return;
  }

  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        revealElement(entry.target);
        revealObs.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );

  revealEls.forEach((el) => revealObs.observe(el));
}

initScrollReveal();

/* ===== FAQ: evitar salto de scroll al abrir ===== */
document.querySelectorAll('#faq .faq-item summary').forEach((summary) => {
  summary.addEventListener('click', (event) => {
    event.preventDefault();
    const details = summary.closest('.faq-item');
    if (!details) return;
    details.open = !details.open;
  });
});

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if(target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ===== MODAL FUNCTIONALITY ===== */
const data = {
  1: { img: 'img/CCTV-slide.webp', thumb: 'img/thumbs/CCTV-slide.webp', title: 'CCTV & Videovigilancia', desc: 'Videovigilancia profesional con analitica inteligente y monitoreo remoto.' },
  2: { img: 'img/cableado-01.jpg', thumb: 'img/cableado-01.jpg', title: 'Redes IP', desc: 'Infraestructura de red empresarial con conmutacion, enrutamiento y alta disponibilidad.' },
  3: { img: 'img/Control-de-acceso-slide.webp', thumb: 'img/thumbs/Control-de-acceso-slide.webp', title: 'Control de Acceso', desc: 'Biometria, tarjetas y control de puertas con gestion centralizada.' },
  4: { img: 'img/fibra-optica-(2).webp', thumb: 'img/thumbs/fibra-optica-(2).webp', title: 'Fibra Optica', desc: 'Backbone de fibra monomodo y multimodo para enlaces de alta capacidad.' },
  5: { img: 'img/cableado-estructurado-slide.webp', thumb: 'img/thumbs/cableado-estructurado-slide.webp', title: 'Cableado Estructurado', desc: 'Redes de datos, fibra y certificacion bajo estandares de la industria.' },
  6: { img: 'img/Enlaces-Inalambricos-slide.webp', thumb: 'img/thumbs/Enlaces-Inalambricos-slide.webp', title: 'Enlaces Inalambricos', desc: 'Cobertura Wi-Fi empresarial, radioenlaces y conectividad sin cables.' },
  7: { img: 'img/detector.webp', thumb: 'img/thumbs/detector.webp', title: 'Detector de metales', desc: 'Control y supervision de accesos con deteccion precisa y alertas inmediatas.' },
  8: { img: 'img/ROUTERSWITCH2.webp', thumb: 'img/thumbs/ROUTERSWITCH2.webp', title: 'Routers & Switches', desc: 'Infraestructura de red activa con equipamiento enterprise.' },
  9: { img: 'img/IP.webp', thumb: 'img/thumbs/IP.webp', title: 'Telefonia IP', desc: 'VoIP, centralitas y comunicacion unificada para tu empresa.' }
};

function setRomboThumb(el) {
  const id = el.getAttribute('data-id');
  const thumb = el.querySelector('.rombo-img');
  if (thumb && data[id] && !thumb.dataset.loaded) {
    thumb.src = data[id].thumb || data[id].img;
    thumb.alt = data[id].title;
    thumb.dataset.loaded = '1';
  }
}

function initRomboThumbsLazy() {
  const rombos = document.querySelectorAll('.rombo[data-id]:not(.rombo-empty)');
  if (!rombos.length) return;

  if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
    rombos.forEach(setRomboThumb);
    return;
  }

  const romboObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        setRomboThumb(entry.target);
        romboObs.unobserve(entry.target);
      });
    },
    { rootMargin: '140px 0px' }
  );

  rombos.forEach((el) => romboObs.observe(el));
}

initRomboThumbsLazy();

const modalEl = document.getElementById('modal');

function getModalContentEl() {
  return document.querySelector('#modal .modal-content');
}

function abrirModal(id) {
  const item = data[id];
  if (!item) return;
  abrirImagenHeroStat(item.img || item.thumb, item.title, false);
}

function abrirImagenHeroStat(src, alt, large = false) {
  if (!modalEl || !src) return;
  const content = getModalContentEl();
  if (content) {
    content.classList.add('modal-content--solo-img');
    content.classList.toggle('modal-content--solo-img-lg', large);
  }
  const img = document.getElementById('modal-img');
  if (!img) return;
  img.classList.remove('modal-img--zoomed');
  img.dataset.zoomable = large ? 'true' : '';
  img.alt = alt || '';
  img.loading = 'eager';
  img.onerror = () => {
    if (/\.webp(\?.*)?$/i.test(src)) {
      img.onerror = null;
      img.src = src.replace(/\.webp(\?.*)?$/i, '.png');
    }
  };
  img.src = src;
  document.getElementById('modal-title').innerHTML = '';
  document.getElementById('modal-desc').innerHTML = '';
  modalEl.style.display = 'block';
}

function cerrarModal() {
  if (!modalEl) return;
  modalEl.style.display = 'none';
  const content = getModalContentEl();
  const img = document.getElementById('modal-img');
  if (img) {
    img.classList.remove('modal-img--zoomed');
    img.dataset.zoomable = '';
  }
  if (content) content.classList.remove('modal-content--solo-img', 'modal-content--solo-img-lg');
}

document.querySelectorAll('.hero-stat-img-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    abrirImagenHeroStat(btn.dataset.statImg, btn.dataset.statAlt || '');
  });
});

document.querySelectorAll('#galeria .galeria-item img').forEach((img) => {
  const item = img.closest('.galeria-item');
  const src = img.getAttribute('src');
  if (!item || !src) return;

  item.classList.add('galeria-item--interactive');
  item.setAttribute('role', 'button');
  item.setAttribute('tabindex', '0');

  const openGalleryImage = () => {
    const fullSrc = img.dataset.fullSrc || img.getAttribute('src') || img.currentSrc;
    abrirImagenHeroStat(fullSrc, img.alt || '', item.classList.contains('galeria-item--modal-lg'));
  };

  item.addEventListener('click', openGalleryImage);
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openGalleryImage();
    }
  });
});

const servicioModalEl = document.getElementById('servicio-modal');
const servicioModalBg = document.getElementById('servicio-modal-bg');

const SERVICIOS_DETALLE = {
  cctv: {
    img: 'img/CCTV-slide.webp',
    title: 'CCTV & Videovigilancia',
    html: `
      <p>Diseñamos e integramos sistemas de videovigilancia para entornos corporativos, industriales y proyectos que requieren alta disponibilidad. Trabajamos con cámaras IP en Full HD y 4K, lentes motorizados, visión nocturna de largo alcance y almacenamiento que permite conservar evidencia clara durante el tiempo que necesite.</p>
      <p>Incorporamos <strong>analítica de video con inteligencia artificial</strong>: detección de personas y vehículos, cruces de línea y perímetros virtuales, conteos y alertas en tiempo real. Esto reduce falsos positivos y permite reaccionar antes ante situaciones de riesgo.</p>
      <p>Centralizamos el monitoreo en equipos NVR, servidores o plataformas compatibles, con acceso remoto seguro desde escritorio o app móvil. Definimos usuarios, permisos y respaldos según sus políticas de seguridad y cumplimiento.</p>
      <p>Ofrecemos capacitación breve al personal clave, mantenimiento preventivo y soporte técnico para mantener el sistema actualizado y estable a largo plazo.</p>
    `
  },
  'control-acceso': {
    img: 'img/Control-de-acceso-slide.webp',
    title: 'Control de Acceso',
    html: `
      <p>Implementamos soluciones de control de acceso físico que combinan <strong>lectores de proximidad, biométricos (huella, rostro)</strong> y barreras automatizadas según el nivel de seguridad de cada zona.</p>
      <p>Centralizamos permisos en software de gestión: alta y baja de usuarios, horarios, grupos de acceso y auditoría de eventos en tiempo real. Facilita cumplir políticas internas y responder ante incidentes con trazabilidad.</p>
      <p>Integramos puertas, torniquetes, cercos motorizados y sistemas de visitantes con flujos claros para empleados y contratistas. Cuando el proyecto lo requiere, enlazamos con CCTV y alarmas para una respuesta coordinada.</p>
      <p>Incluimos puesta en marcha, documentación básica y opciones de soporte para mantener firmware al día y minimizar tiempos fuera de servicio.</p>
    `
  },
  cableado: {
    img: 'img/cableado-estructurado-slide.webp',
    title: 'Cableado Estructurado',
    html: `
      <p>Planificamos la infraestructura física de red desde la tabla de cargas y rutas hasta la terminación en racks y gabinetes. Trabajamos con cableado <strong>Copper Cat6A</strong> para altas velocidades y <strong>fibra óptica monomodo/multimodo</strong> para backbone y enlaces entre edificios.</p>
      <p>Seguimos buenas prácticas alineadas con referencias como <strong>ANSI/TIA</strong>: organización en canalizaciones, curvas mínimas, etiquetado, gestión de cables en patch panels y documentación de puntos de red.</p>
      <p>Realizamos (o coordinamos) pruebas de certificación para validar parámetros eléctricos y canalización, dejando registros útiles para ampliaciones futuras y soporte.</p>
      <p>El objetivo es una planta escalable, ordenada y fácil de operar durante años, reduciendo fallos intermitentes y costos de mantenimiento.</p>
    `
  },
  enlaces: {
    img: 'img/detector.webp',
    title: 'Detector de metales',
    html: `
      <p>El detector de metales para entradas es una solucion de seguridad disenada para controlar y supervisar el acceso de personas en diferentes tipos de instalaciones. Su funcion principal es identificar la presencia de objetos metalicos como armas, herramientas o cualquier elemento no autorizado, permitiendo prevenir riesgos antes de que ocurran.</p>
      <p>Estos equipos cuentan con tecnologia de alta sensibilidad, capaz de detectar metales con precision sin afectar el flujo de personas. Incorporan multiples zonas de deteccion que permiten identificar exactamente en que parte del cuerpo se encuentra el objeto, asi como alarmas visuales y sonoras que se activan de forma inmediata.</p>
      <p>Ademas, su diseno moderno y resistente los hace ideales para uso continuo en entornos exigentes, ofreciendo una operacion confiable y de bajo mantenimiento. Son faciles de instalar y configurar, adaptandose a diferentes niveles de seguridad segun las necesidades del lugar.</p>
      <p>Son ampliamente utilizados en corporativos, escuelas, aeropuertos, eventos, industrias y edificios gubernamentales, donde el control de acceso es fundamental.</p>
      <p>En resumen, un detector de metales no solo detecta, sino que protege, previene y brinda tranquilidad en cada acceso.</p>
    `
  },
  telefonia: {
    img: 'img/IP.webp',
    title: 'Telefonía IP',
    html: `
      <p>Migramos o desplegamos desde cero <strong>centralitas IP (PBX)</strong> y telefonía basada en estándares abiertos, integrando extensiones, grupos de captura, IVR, colas de llamadas y horarios según su operación.</p>
      <p>Suministramos y configuramos <strong>teléfonos IP, gateways FXO/FXS</strong> cuando hay líneas analógicas legadas, y codecs para conferencias. Priorizamos calidad de voz (QoS) sobre la red de datos para evitar cortes y eco.</p>
      <p>Podemos acercarlo a la <strong>comunicación unificada</strong>: correo, mensajería y telefonía en un mismo ecosistema cuando la plataforma elegida lo permite.</p>
      <p>Incluimos capacitación para administradores, esquemas de respaldo de configuración y soporte para actualizaciones planificadas.</p>
    `
  },
  routers: {
    img: 'img/ROUTERSWITCH2.webp',
    title: 'Routers & Switches',
    html: `
      <p>Diseñamos la capa de <strong>conmutación y enrutamiento</strong> según topología, VLANs, agregación de enlaces y redundancia (STP, LACP, enlaces duplicados) para minimizar puntos únicos de fallo.</p>
      <p>Configuramos routers perimetrales con políticas de firewall stateful, NAT, VPN sitio a sitio o cliente a sitio, y rutas estáticas o dinámicas según el proveedor y tamaño de la red.</p>
      <p>En switching aplicamos <strong>PoE</strong> donde conviene (APs, cámaras, teléfonos), QoS por colas y, cuando aplica, capas de acceso/distribución/núcleo claras para escalar sin rediseños constantes.</p>
      <p>Entregamos inventario lógico (IPs, VLANs, usuarios admin), backups de configuración y recomendaciones de parcheo para mantener la infraestructura alineada con buenas prácticas de seguridad.</p>
    `
  },
  redes: {
    img: 'img/cableado-01.jpg',
    title: 'Redes IP',
    html: `
      <p>Diseñamos redes empresariales estables y escalables: segmentación por VLANs, políticas de acceso, direccionamiento IP ordenado y documentación que facilita soporte y crecimiento.</p>
      <p>Integramos conmutación, enrutamiento, Wi-Fi y servicios críticos (CCTV, telefonía, control de acceso) sobre una misma infraestructura bien planificada.</p>
      <p>Priorizamos disponibilidad, rendimiento y seguridad con monitoreo, respaldos de configuración y soporte para incidentes en horarios extendidos cuando el contrato lo requiere.</p>
    `
  },
  fibra: {
    img: 'img/fibra-optica-(2).webp',
    title: 'Fibra Óptica',
    html: `
      <p>Instalamos <strong>fibra óptica monomodo y multimodo</strong> para backbone, enlaces entre edificios y puntos de alta demanda de ancho de banda.</p>
      <p>Realizamos tendido, fusiones, terminaciones en patch panels y pruebas OTDR para garantizar enlaces confiables y documentados.</p>
      <p>La fibra reduce latencia, soporta distancias largas y prepara su red para crecer sin cuellos de botella en datos, telefonía o videovigilancia.</p>
    `
  },
  wireless: {
    img: 'img/Enlaces-Inalambricos-slide.webp',
    title: 'Enlaces Inalámbricos',
    html: `
      <p>Desplegamos <strong>redes Wi-Fi empresariales</strong> con cobertura uniforme, roaming entre access points y segmentación para invitados y equipos críticos.</p>
      <p>Implementamos radioenlaces punto a punto o multipunto cuando el cableado no es viable, manteniendo velocidad y estabilidad para operaciones en bodega, oficina o campus.</p>
      <p>Dimensionamos la solución según usuarios, áreas y aplicaciones para evitar caídas en videollamadas, POS o sistemas de producción.</p>
    `
  }
};

function getServicioDetalle(slug) {
  const base = SERVICIOS_DETALLE[slug];
  if (!base) return null;
  if (window.__pageLang !== 'en' || !window.SERVICIOS_DETALLE_EN || !SERVICIOS_DETALLE_EN[slug]) return base;
  const en = SERVICIOS_DETALLE_EN[slug];
  return { ...base, title: en.title, html: en.html };
}

function abrirServicioModalDetalle(slug) {
  if (!servicioModalEl || !servicioModalBg || !slug) return;
  const d = getServicioDetalle(slug);
  if (!d) return;
  const imgEl = document.getElementById('servicio-modal-img');
  imgEl.src = d.img;
  imgEl.alt = d.title;
  document.getElementById('servicio-modal-title').textContent = d.title;
  document.getElementById('servicio-modal-body').innerHTML = d.html;
  servicioModalBg.style.backgroundImage = `url("${d.img}")`;
  servicioModalEl.hidden = false;
  document.body.style.overflow = 'hidden';
}

function cerrarServicioModal() {
  if (!servicioModalEl) return;
  servicioModalEl.hidden = true;
  document.body.style.overflow = '';
}

document.querySelectorAll('.servicio-card--expandable').forEach((card) => {
  const slug = card.dataset.servicio;
  card.addEventListener('click', () => abrirServicioModalDetalle(slug));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      abrirServicioModalDetalle(slug);
    }
  });
});

if (servicioModalEl) {
  servicioModalEl.addEventListener('click', (e) => {
    if (!e.target.closest('.servicio-modal-panel')) {
      cerrarServicioModal();
    }
  });
}

const nosotrosDialogoModalEl = document.getElementById('nosotros-dialogo-modal');

const NOSOTROS_DIALOGOS = {
  'redes-ip': {
    title: '¿Tu red es lenta, inestable o insegura?',
    html: `
      <p><span class="dialogo-rol">Cliente:</span> Oye… el internet en mi empresa falla mucho, se cae la red y nadie puede trabajar bien.</p>
      <p><span class="dialogo-rol">Nosotros:</span> Eso no es normal. Lo que necesitas no es más internet, es una red bien diseñada.</p>
      <p><span class="dialogo-rol">Cliente:</span> ¿Cómo así?</p>
      <p><span class="dialogo-rol">Nosotros:</span> Con una Red IP profesional puedes tener conexión estable en toda tu empresa, mayor velocidad real sin pérdidas, seguridad contra accesos no autorizados y control total de tus dispositivos.</p>
      <p><span class="dialogo-rol">Cliente:</span> Eso suena justo a lo que necesito.</p>
      <p><span class="dialogo-rol">Nosotros:</span> Exacto. Nosotros diseñamos e instalamos redes IP a la medida, para que tu negocio funcione sin interrupciones.</p>
      <p class="dialogo-cierre">Tu red no debe fallar, debe impulsar tu negocio. <a href="#contacto" class="nosotros-dialogo-cta" onclick="cerrarNosotrosDialogoModal()">Contáctanos</a> y optimiza tu infraestructura hoy mismo.</p>
    `
  },
  'cctv-ia': {
    title: '¿Tu sistema de cámaras solo graba… o realmente protege?',
    html: `
      <p><span class="dialogo-rol">Cliente:</span> Tengo cámaras, pero la verdad casi no sirven. Solo reviso grabaciones cuando ya pasó algo.</p>
      <p><span class="dialogo-rol">Nosotros:</span> Ese es el problema. Hoy no basta con grabar, necesitas un sistema inteligente.</p>
      <p><span class="dialogo-rol">Cliente:</span> ¿A qué te refieres?</p>
      <p><span class="dialogo-rol">Nosotros:</span> Con CCTV con inteligencia artificial puedes detectar movimientos sospechosos en tiempo real, recibir alertas inmediatas, identificar personas o vehículos y prevenir incidentes antes de que ocurran.</p>
      <p><span class="dialogo-rol">Cliente:</span> Eso sí me interesa, porque quiero evitar problemas, no solo verlos después.</p>
      <p><span class="dialogo-rol">Nosotros:</span> Exacto. Implementamos soluciones de videovigilancia inteligente que te dan control total, monitoreo 24/7 y mayor seguridad para tu empresa o propiedad.</p>
      <p class="dialogo-cierre">Tu seguridad no debe ser reactiva, debe ser inteligente. <a href="#contacto" class="nosotros-dialogo-cta" onclick="cerrarNosotrosDialogoModal()">Contáctanos</a> y lleva tu CCTV al siguiente nivel.</p>
    `
  },
  'control-acceso': {
    title: '¿Quién entra a tu empresa… y quién no?',
    html: `
      <p><span class="dialogo-rol">Cliente:</span> La verdad no tengo control, cualquiera puede entrar y salir sin registro.</p>
      <p><span class="dialogo-rol">Nosotros:</span> Eso es un riesgo. Hoy necesitas control total, no solo vigilancia.</p>
      <p><span class="dialogo-rol">Cliente:</span> ¿Cómo puedo lograrlo?</p>
      <p><span class="dialogo-rol">Nosotros:</span> Con un sistema de control de acceso puedes autorizar o restringir entradas, registrar cada movimiento, usar tarjetas, huella o reconocimiento facial y tener control en tiempo real desde cualquier lugar.</p>
      <p><span class="dialogo-rol">Cliente:</span> Eso me ayudaría mucho para tener orden y seguridad.</p>
      <p><span class="dialogo-rol">Nosotros:</span> Exacto. Implementamos soluciones de acceso que protegen tu empresa, tu personal y tu información.</p>
      <p class="dialogo-cierre">El acceso no se improvisa, se controla. <a href="#contacto" class="nosotros-dialogo-cta" onclick="cerrarNosotrosDialogoModal()">Contáctanos</a> y toma el control de tu seguridad desde hoy.</p>
    `
  },
  wireless: {
    title: '¿Tu Wi-Fi se cae justo cuando más lo necesitas?',
    html: `
      <p><span class="dialogo-rol">Cliente:</span> En varias áreas casi no hay señal, las videollamadas se cortan y el personal se queja todo el día.</p>
      <p><span class="dialogo-rol">Nosotros:</span> Eso pasa cuando el wireless no está dimensionado para el espacio ni para la cantidad de equipos conectados.</p>
      <p><span class="dialogo-rol">Cliente:</span> ¿Qué alternativa hay sin volver loco a todo mundo con cables?</p>
      <p><span class="dialogo-rol">Nosotros:</span> Con una red Wi-Fi empresarial bien diseñada puedes tener cobertura uniforme, más velocidad real, roaming fluido entre puntos de acceso y seguridad con redes invitadas y segmentación.</p>
      <p><span class="dialogo-rol">Cliente:</span> Me interesa que funcione igual de bien en oficina que en bodega o sala de juntas.</p>
      <p><span class="dialogo-rol">Nosotros:</span> Exacto. Diseñamos e instalamos soluciones wireless con puntos de acceso profesionales, radioenlaces cuando hace falta y soporte para que tu operación no dependa de un router doméstico improvisado.</p>
      <p class="dialogo-cierre">Tu conectividad inalámbrica debe ser confiable, no una ruleta. <a href="#contacto" class="nosotros-dialogo-cta" onclick="cerrarNosotrosDialogoModal()">Contáctanos</a> y lleva tu red wireless al nivel que tu negocio merece.</p>
    `
  },
  'ia-aplicada': {
    title: '¿Cómo se usa la inteligencia artificial hoy?',
    html: `
      <p>La inteligencia artificial ya forma parte del día a día en entornos empresariales e industriales. Estas son algunas de sus aplicaciones más habituales:</p>
      <p><strong>Seguridad:</strong> analiza video para detectar personas, vehículos o comportamientos fuera de lo normal y genera alertas al instante.</p>
      <p><strong>Acceso y control:</strong> reconoce rostros, placas o credenciales y agiliza entradas con trazabilidad completa.</p>
      <p><strong>Redes e infraestructura:</strong> monitorea tráfico, identifica anomalías y ayuda a prevenir caídas o cuellos de botella.</p>
      <p><strong>Operación y mantenimiento:</strong> procesa sensores y registros para anticipar fallas, ordenar prioridades y reducir tiempos de respuesta.</p>
      <p>En conjunto, la IA no sustituye al equipo humano: <strong>filtra ruido, automatiza tareas repetitivas y entrega información clara</strong> para decidir más rápido y con mayor precisión.</p>
    `
  },
  'experiencia-sector': {
    title: '¿Qué significa experiencia comprobada en infraestructura tecnológica?',
    html: `
      <p>En proyectos de conectividad, seguridad y comunicaciones, la experiencia se demuestra con hechos, no solo con palabras. Esto implica:</p>
      <p><strong>Trayectoria en el sector:</strong> años resolviendo instalaciones similares en oficinas, plantas, comercios e industria.</p>
      <p><strong>Certificaciones y estándares:</strong> conocimiento de normas como TIA/EIA, prácticas de cableado estructurado y buenas prácticas de videovigilancia y redes.</p>
      <p><strong>Proyectos documentados:</strong> planos, etiquetado, registros de pruebas y entregables que facilitan el mantenimiento futuro.</p>
      <p><strong>Equipos capacitados:</strong> personal con formación continua en equipos, protocolos y tendencias del mercado.</p>
      <p><strong>Soporte post-instalación:</strong> capacidad de dar seguimiento, resolver incidencias y escalar soluciones cuando el negocio crece.</p>
      <p>La experiencia comprobada reduce riesgos, evita retrabajos y da <strong>seguridad de que el proyecto se hará bien desde el primer intento</strong>.</p>
    `
  },
  'honestidad-confianza': {
    title: '¿Por qué importan la honestidad y la confianza en un proyecto tecnológico?',
    html: `
      <p>La infraestructura tecnológica es una inversión a largo plazo. Por eso la relación con quien la diseña e instala debe basarse en transparencia:</p>
      <p><strong>Alcance claro:</strong> definir qué incluye y qué no incluye cada propuesta, sin sorpresas a mitad del proyecto.</p>
      <p><strong>Tiempos realistas:</strong> plazos alcanzables según el tamaño del sitio, permisos, disponibilidad y complejidad técnica.</p>
      <p><strong>Comunicación directa:</strong> informar avances, obstáculos y cambios antes de que se conviertan en problemas.</p>
      <p><strong>Calidad sobre atajos:</strong> usar materiales y equipos adecuados al entorno, sin comprometer la operación por ahorrar en lo crítico.</p>
      <p><strong>Compromiso después de la entrega:</strong> garantías, documentación entregada y disponibilidad para soporte cuando haga falta.</p>
      <p>La confianza se construye cuando lo prometido se cumple y el cliente puede <strong>tomar decisiones con información clara y honesta</strong>.</p>
    `
  },
  'innovacion-vanguardia': {
    title: '¿Qué implica innovar con tecnología de vanguardia?',
    html: `
      <p>Innovar no es cambiar equipos cada año: es adoptar soluciones actuales que aporten valor real y preparen la infraestructura para el futuro:</p>
      <p><strong>Protocolos modernos:</strong> redes de alta velocidad, Wi-Fi empresarial, telefonía IP, fibra óptica y videovigilación en alta definición.</p>
      <p><strong>Escalabilidad:</strong> diseños que permiten agregar cámaras, puntos de red o usuarios sin rehacer todo desde cero.</p>
      <p><strong>Integración:</strong> sistemas que se comunican entre sí — acceso, CCTV, red y telefonía — en lugar de islas desconectadas.</p>
      <p><strong>Actualización continua:</strong> firmware, parches de seguridad y revisión periódica para mantener el rendimiento.</p>
      <p><strong>Evaluación antes de adoptar:</strong> probar nuevas tecnologías con criterio técnico y no implementar modas sin beneficio claro.</p>
      <p>La innovación responsable busca <strong>más eficiencia, mejor seguridad y una base tecnológica que dure</strong>, no solo lo más nuevo del catálogo.</p>
    `
  }
};

function getNosotrosDialogo(slug) {
  const base = NOSOTROS_DIALOGOS[slug];
  if (!base) return null;
  if (window.__pageLang !== 'en' || !window.NOSOTROS_DIALOGOS_EN || !NOSOTROS_DIALOGOS_EN[slug]) return base;
  return NOSOTROS_DIALOGOS_EN[slug];
}

function abrirNosotrosDialogoModal(slug) {
  if (!nosotrosDialogoModalEl || !slug) return;
  const d = getNosotrosDialogo(slug);
  if (!d) return;
  document.getElementById('nosotros-dialogo-title').textContent = d.title;
  document.getElementById('nosotros-dialogo-body').innerHTML = d.html;
  nosotrosDialogoModalEl.hidden = false;
  document.body.style.overflow = 'hidden';
}

function cerrarNosotrosDialogoModal() {
  if (!nosotrosDialogoModalEl) return;
  nosotrosDialogoModalEl.hidden = true;
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-nosotros-dialogo]').forEach((el) => {
  const slug = el.dataset.nosotrosDialogo;
  if (!slug) return;
  el.addEventListener('click', () => abrirNosotrosDialogoModal(slug));
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      abrirNosotrosDialogoModal(slug);
    }
  });
});

if (nosotrosDialogoModalEl) {
  nosotrosDialogoModalEl.addEventListener('click', (e) => {
    if (!e.target.closest('.nosotros-dialogo-panel')) {
      cerrarNosotrosDialogoModal();
    }
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (servicioModalEl && !servicioModalEl.hidden) {
    cerrarServicioModal();
    return;
  }
  if (nosotrosDialogoModalEl && !nosotrosDialogoModalEl.hidden) {
    cerrarNosotrosDialogoModal();
    return;
  }
  if (modalEl && modalEl.style.display === 'block') {
    cerrarModal();
    return;
  }
  if (nav && nav.classList.contains('nav-open')) {
    closeMobileNav();
  }
});

// Cerrar modal al hacer clic fuera del contenido
if (modalEl) {
  modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl) {
      cerrarModal();
    }
  });
}

const modalImgEl = document.getElementById('modal-img');
if (modalImgEl) {
  modalImgEl.addEventListener('click', (e) => {
    if (modalImgEl.dataset.zoomable !== 'true') return;
    e.stopPropagation();
    modalImgEl.classList.toggle('modal-img--zoomed');
  });
}

/* ===== HERO TÚNEL DIGITAL (canvas) ===== */
(function initHeroTunnel() {
  const canvas = document.getElementById('heroTunnelCanvas');
  const container = canvas?.closest('.hero-funnel');
  if (!canvas || !container) return;

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let animId = null;
  let offset = 0;

  const CFG = {
    fov: 220,
    layers: 22,
    spacing: 64,
    cols: 8,
    rows: 5,
    color: '0, 230, 255',
    speed: 0.06
  };

  function resize() {
    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function project(z) {
    const s = CFG.fov / (CFG.fov + z);
    const cx = width * 0.5;
    const cy = height * 0.5;
    const hw = width * 0.48 * s;
    const hh = height * 0.48 * s;
    return {
      s,
      left: cx - hw,
      right: cx + hw,
      top: cy - hh,
      bottom: cy + hh
    };
  }

  function strokeLine(x1, y1, x2, y2, dash, alpha, lw) {
    ctx.strokeStyle = `rgba(${CFG.color}, ${alpha})`;
    ctx.lineWidth = lw;
    ctx.setLineDash(dash);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  function layerAlpha(z, scale) {
    const totalDepth = CFG.layers * CFG.spacing;
    const depthT = Math.min(1, z / totalDepth);
    const depthFade = 1 - Math.pow(depthT, 1.65);
    return Math.min(0.38, scale * 0.78 * depthFade);
  }

  function draw(staticFrame) {
    ctx.clearRect(0, 0, width, height);

    if (!staticFrame) {
      offset = (offset + CFG.speed) % CFG.spacing;
    }

    const totalDepth = CFG.layers * CFG.spacing;
    const far = project(totalDepth);
    const cx = width * 0.5;
    const cy = height * 0.5;

    ctx.lineCap = 'round';

    const diagonals = [
      [0, 0, far.left, far.top],
      [width, 0, far.right, far.top],
      [0, height, far.left, far.bottom],
      [width, height, far.right, far.bottom]
    ];
    diagonals.forEach(([x0, y0, x1, y1]) => {
      strokeLine(x0, y0, x1, y1, [20, 24], 0.18, 0.75);
    });

    for (let i = CFG.layers; i >= 0; i--) {
      let z = i * CFG.spacing + offset;
      if (z > totalDepth) z -= totalDepth;

      const p = project(z);
      const zPrev = Math.max(8, z - CFG.spacing);
      const pPrev = project(zPrev);
      const alpha = layerAlpha(z, p.s);
      const lw = Math.max(0.38, p.s * 1.1);
      const dash = [Math.max(4, p.s * 11), Math.max(8, p.s * 16)];

      strokeLine(p.left, p.top, p.right, p.top, dash, alpha, lw);
      strokeLine(p.left, p.bottom, p.right, p.bottom, dash, alpha, lw);
      strokeLine(p.left, p.top, p.left, p.bottom, dash, alpha, lw);
      strokeLine(p.right, p.top, p.right, p.bottom, dash, alpha, lw);

      for (let c = 1; c < CFG.cols; c++) {
        const t = c / CFG.cols;
        const x = p.left + (p.right - p.left) * t;
        const xPrev = pPrev.left + (pPrev.right - pPrev.left) * t;
        strokeLine(x, p.bottom, xPrev, pPrev.bottom, dash, alpha * 0.65, lw * 0.85);
        strokeLine(x, p.top, xPrev, pPrev.top, dash, alpha * 0.65, lw * 0.85);
      }

      for (let r = 1; r < CFG.rows; r++) {
        const t = r / CFG.rows;
        const y = p.top + (p.bottom - p.top) * t;
        const yPrev = pPrev.top + (pPrev.bottom - pPrev.top) * t;
        strokeLine(p.left, y, pPrev.left, yPrev, dash, alpha * 0.52, lw * 0.8);
        strokeLine(p.right, y, pPrev.right, yPrev, dash, alpha * 0.52, lw * 0.8);
      }
    }

    ctx.setLineDash([]);

    const vanishW = Math.max(8, far.right - far.left);
    const vanishH = Math.max(8, far.bottom - far.top);
    const vanishGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(vanishW, vanishH) * 0.95);
    vanishGrad.addColorStop(0, 'rgba(0, 8, 20, 0.94)');
    vanishGrad.addColorStop(0.5, 'rgba(0, 8, 20, 0.55)');
    vanishGrad.addColorStop(1, 'rgba(0, 8, 20, 0)');
    ctx.fillStyle = vanishGrad;
    ctx.fillRect(far.left, far.top, vanishW, vanishH);

    const leftFade = ctx.createLinearGradient(0, 0, width * 0.38, 0);
    leftFade.addColorStop(0, 'rgba(0, 8, 20, 0.38)');
    leftFade.addColorStop(1, 'rgba(0, 8, 20, 0)');
    ctx.fillStyle = leftFade;
    ctx.fillRect(0, 0, width, height);

    const topFade = ctx.createLinearGradient(0, 0, 0, height * 0.2);
    topFade.addColorStop(0, 'rgba(0, 8, 20, 0.22)');
    topFade.addColorStop(1, 'rgba(0, 8, 20, 0)');
    ctx.fillStyle = topFade;
    ctx.fillRect(0, 0, width, height);

    const bottomFade = ctx.createLinearGradient(0, height * 0.8, 0, height);
    bottomFade.addColorStop(0, 'rgba(0, 8, 20, 0)');
    bottomFade.addColorStop(1, 'rgba(0, 8, 20, 0.22)');
    ctx.fillStyle = bottomFade;
    ctx.fillRect(0, 0, width, height);
  }

  function loop() {
    draw(false);
    animId = requestAnimationFrame(loop);
  }

  function start() {
    resize();
    if (width < 2 || height < 2) return;
    if (prefersReducedMotion) {
      draw(true);
    } else if (!animId) {
      loop();
    }
  }

  start();
  window.addEventListener('load', start);
  window.addEventListener('resize', () => {
    resize();
    if (prefersReducedMotion) draw(true);
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (animId) cancelAnimationFrame(animId);
      animId = null;
    } else if (!prefersReducedMotion && !animId) {
      loop();
    }
  });
})();

if (window.__pageLang === 'en') {
  loadModalsEnScript()
    .catch(() => {})
    .finally(() => {
      applyPageLanguage('en');
      initLucideWhenReady();
    });
} else {
  applyPageLanguage('es');
  initLucideWhenReady();
}
