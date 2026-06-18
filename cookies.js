/* ============================================================
   Belfield Festival — Consentement cookies + Google Analytics
   - RGPD : aucun cookie de mesure n'est déposé avant le consentement.
   - Google Consent Mode v2 : tout est "denied" par défaut.
   - GA (G-4TJS7727BF) n'est chargé qu'après acceptation.
   ============================================================ */
(function () {
  'use strict';

  var GA_ID = 'G-4TJS7727BF';
  var STORE_KEY = 'belfield_cookie_consent'; // 'granted' | 'denied'

  // --- Consent Mode : socle commun (toujours exécuté) -------------------
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500
  });
  gtag('js', new Date());

  function readChoice() {
    try { return localStorage.getItem(STORE_KEY); } catch (e) { return null; }
  }
  function saveChoice(v) {
    try { localStorage.setItem(STORE_KEY, v); } catch (e) {}
  }

  // --- Chargement effectif de GA --------------------------------------
  var gaLoaded = false;
  function loadGA() {
    if (gaLoaded) return;
    gaLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  function grant() {
    gtag('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'granted'
    });
    loadGA();
  }

  // --- Lien vers la politique cookies (chemin relatif auto) -----------
  function legalHref() {
    var p = window.location.pathname;
    var inPages = /\/pages\//.test(p);
    return (inPages ? '' : 'pages/') + 'mentions-legales.html#cookies';
  }

  // --- Bannière -------------------------------------------------------
  function buildBanner() {
    var banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', 'Consentement aux cookies');
    banner.innerHTML =
      '<div class="cookie-banner__inner">' +
        '<div class="cookie-banner__text">' +
          '<p class="cookie-banner__title">🍪 On utilise des cookies&nbsp;!</p>' +
          '<p>On mesure l\'audience du site pour l\'améliorer. ' +
          'Rien de personnel revendu, promis. Tu choisis. ' +
          '<a href="' + legalHref() + '" class="cookie-banner__link">En savoir plus</a></p>' +
        '</div>' +
        '<div class="cookie-banner__actions">' +
          '<button type="button" class="cookie-btn cookie-btn--ghost" data-cookie="refuse">Refuser</button>' +
          '<button type="button" class="cookie-btn cookie-btn--accept" data-cookie="accept">Accepter</button>' +
        '</div>' +
      '</div>';

    banner.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-cookie]');
      if (!btn) return;
      if (btn.getAttribute('data-cookie') === 'accept') {
        saveChoice('granted');
        grant();
      } else {
        saveChoice('denied');
      }
      banner.classList.remove('is-visible');
      setTimeout(function () { banner.remove(); }, 350);
    });

    document.body.appendChild(banner);
    // force reflow puis animation d'entrée
    requestAnimationFrame(function () { banner.classList.add('is-visible'); });
  }

  // --- Init -----------------------------------------------------------
  function init() {
    var choice = readChoice();
    if (choice === 'granted') {
      grant();
    } else if (choice === 'denied') {
      // rien : on respecte le refus, pas de bannière
    } else {
      buildBanner();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
