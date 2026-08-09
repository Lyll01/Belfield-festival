/* ============================================================
   Belfield Festival — Consentement cookies (Google Consent Mode v2)
   - RGPD : aucun cookie de mesure n'est déposé avant le consentement.
   - Le consent mode par défaut ("denied") est posé dans le <head>,
     avant le tag Google Tag Manager. Ce fichier ne fait que gérer
     la bannière et pousser la mise à jour du consentement ; c'est
     GTM qui décide, tag par tag, ce qui a le droit de se déclencher.
   - CNIL : le retrait du consentement doit être aussi simple que son
     recueil -> tout élément [data-cookie-settings] rouvre la bannière,
     et le choix est de toute façon redemandé au bout de 6 mois.
   ============================================================ */
(function () {
  'use strict';

  var STORE_KEY = 'belfield_cookie_consent';
  var MAX_AGE_MS = 6 * 30 * 24 * 60 * 60 * 1000; // ~6 mois (reco CNIL)

  // --- Stockage -------------------------------------------------------
  // Format : {"v":"granted"|"denied","t":<timestamp>}
  // Compatible avec l'ancien format (simple chaîne "granted"/"denied").
  function readChoice() {
    var raw;
    try { raw = localStorage.getItem(STORE_KEY); } catch (e) { return null; }
    if (!raw) return null;

    if (raw === 'granted' || raw === 'denied') {
      // Ancien format : on le migre en lui donnant la date du jour.
      saveChoice(raw);
      return raw;
    }
    try {
      var data = JSON.parse(raw);
      if (!data || (data.v !== 'granted' && data.v !== 'denied')) return null;
      if (!data.t || (Date.now() - data.t) > MAX_AGE_MS) return null; // expiré
      return data.v;
    } catch (e) {
      return null;
    }
  }

  function saveChoice(v) {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({ v: v, t: Date.now() }));
    } catch (e) {}
  }

  // --- Consent Mode ---------------------------------------------------
  function updateConsent(granted) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: granted ? 'granted' : 'denied'
    });
  }

  // --- Lien vers la politique cookies (chemin relatif auto) -----------
  function legalHref() {
    var p = window.location.pathname;
    var inPages = /\/pages\//.test(p);
    return (inPages ? '' : 'pages/') + 'mentions-legales.html#cookies';
  }

  // --- Bannière -------------------------------------------------------
  var banner = null;

  function closeBanner() {
    if (!banner) return;
    var el = banner;
    banner = null;
    el.classList.remove('is-visible');
    setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 350);
  }

  function buildBanner(currentChoice) {
    if (banner) return; // déjà ouverte

    var isReopen = currentChoice === 'granted' || currentChoice === 'denied';
    var statusLine = '';
    if (isReopen) {
      statusLine = '<p class="cookie-banner__status">Ton choix actuel : <strong>' +
        (currentChoice === 'granted' ? 'cookies de mesure acceptés' : 'cookies de mesure refusés') +
        '</strong>.</p>';
    }

    banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-modal', 'false');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', 'Consentement aux cookies');
    banner.innerHTML =
      '<div class="cookie-banner__inner">' +
        '<div class="cookie-banner__text">' +
          '<p class="cookie-banner__title">🍪 On utilise des cookies&nbsp;!</p>' +
          '<p>On mesure l\'audience du site pour l\'améliorer. ' +
          'Rien de personnel revendu, promis. Tu choisis, et tu peux changer d\'avis quand tu veux. ' +
          '<a href="' + legalHref() + '" class="cookie-banner__link">En savoir plus</a></p>' +
          statusLine +
        '</div>' +
        '<div class="cookie-banner__actions">' +
          '<button type="button" class="cookie-btn cookie-btn--ghost" data-cookie="refuse">Refuser</button>' +
          '<button type="button" class="cookie-btn cookie-btn--accept" data-cookie="accept">Accepter</button>' +
        '</div>' +
      '</div>';

    banner.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-cookie]');
      if (!btn) return;
      var accepted = btn.getAttribute('data-cookie') === 'accept';
      saveChoice(accepted ? 'granted' : 'denied');
      updateConsent(accepted);
      closeBanner();
    });

    banner.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeBanner();
    });

    document.body.appendChild(banner);
    requestAnimationFrame(function () {
      banner.classList.add('is-visible');
      var first = banner.querySelector('[data-cookie]');
      if (first && isReopen) first.focus();
    });
  }

  // --- API publique ---------------------------------------------------
  window.BelfieldCookies = {
    open: function () {
      var raw = null;
      try { raw = localStorage.getItem(STORE_KEY); } catch (e) {}
      var current = null;
      if (raw === 'granted' || raw === 'denied') {
        current = raw;
      } else if (raw) {
        try { current = JSON.parse(raw).v; } catch (e) {}
      }
      buildBanner(current);
    },
    get: readChoice
  };

  // Tout élément [data-cookie-settings] rouvre la bannière (footer, page légale…)
  document.addEventListener('click', function (e) {
    if (!e.target || typeof e.target.closest !== 'function') return;
    var trigger = e.target.closest('[data-cookie-settings]');
    if (!trigger) return;
    e.preventDefault();
    window.BelfieldCookies.open();
  });

  // --- Init -----------------------------------------------------------
  function init() {
    var choice = readChoice();
    if (choice === 'granted') {
      updateConsent(true);
    } else if (choice === 'denied') {
      // Refus toujours valide : on le respecte, pas de bannière.
    } else {
      // Aucun choix, ou choix expiré (> 6 mois) : on redemande.
      buildBanner(null);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
