/* ============================================================
   Belfield Festival — Consentement cookies (Google Consent Mode v2)
   - RGPD : aucun cookie de mesure n'est déposé avant le consentement.
   - Le consent mode par défaut ("denied") est posé dans le <head>,
     avant le tag Google Tag Manager. Ce fichier ne fait que gérer
     la bannière et pousser la mise à jour du consentement ; c'est
     GTM qui décide, tag par tag, ce qui a le droit de se déclencher.
   ============================================================ */
(function () {
  'use strict';

  var STORE_KEY = 'belfield_cookie_consent'; // 'granted' | 'denied'

  function readChoice() {
    try { return localStorage.getItem(STORE_KEY); } catch (e) { return null; }
  }
  function saveChoice(v) {
    try { localStorage.setItem(STORE_KEY, v); } catch (e) {}
  }

  function grant() {
    gtag('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'granted'
    });
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
