(function () {
  var S = window.SITE || {}; var KEY = 'wnd_consent_v1';
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  // Google Consent Mode v2: everything denied until the visitor chooses.
  gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied', wait_for_update: 500 });

  function load(src) { var s = document.createElement('script'); s.async = true; s.src = src; s.crossOrigin = 'anonymous'; document.head.appendChild(s); }
  var adsLoaded = false;
  function startAds(personalised) {
    if (!S.adsClient || adsLoaded) return; adsLoaded = true;
    var q = (window.adsbygoogle = window.adsbygoogle || []);
    if (!personalised) q.requestNonPersonalizedAds = 1;
    if (!document.querySelector('script[src*="adsbygoogle.js"]')) load('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + encodeURIComponent(S.adsClient)); // normally already in <head>
    document.querySelectorAll('ins.adsbygoogle').forEach(function () { try { q.push({}); } catch (e) {} });
  }
  function startGA() { /* GA4 is now loaded from the page <head> (views.js) and obeys Consent Mode, so nothing to do here */ }
  function apply(choice) {
    var yes = choice === 'accept';
    gtag('consent', 'update', { ad_storage: yes ? 'granted' : 'denied', ad_user_data: yes ? 'granted' : 'denied', ad_personalization: yes ? 'granted' : 'denied', analytics_storage: yes ? 'granted' : 'denied' });
    if (yes) startGA();
    startAds(yes);
  }
  function get() { try { var v = JSON.parse(localStorage.getItem(KEY)); if (v && Date.now() - v.t < 182 * 864e5) return v.c; } catch (e) {} return null; }
  var banner = document.getElementById('cookie');
  function show() { if (banner) banner.hidden = false; }

  if (S.consentMode === 'google' || S.consentMode === 'ezoic') { startAds(true); startGA(); } // a Google-certified CMP (Google's, or Ezoic's Gatekeeper) handles consent
  else { var c = get(); if (c) apply(c); else show(); }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-consent]');
    if (b) { var c = b.getAttribute('data-consent'); try { localStorage.setItem(KEY, JSON.stringify({ c: c, t: Date.now() })); } catch (x) {} banner.hidden = true; apply(c); }
    if (e.target.closest('[data-cookie-settings]')) { e.preventDefault(); if (S.consentMode === 'ezoic') { try { if (window.ezCMP && window.ezCMP._showConsentDialog) window.ezCMP._showConsentDialog(); else if (window.__tcfapi) window.__tcfapi('showConsentTool', 2, function () {}); } catch (x) {} } else if (S.consentMode === 'google' && window.googlefc) { (window.googlefc.callbackQueue = window.googlefc.callbackQueue || []).push(function () { googlefc.showRevocationMessage(); }); } else show(); }
  });

  // Keep "x min ago" labels fresh.
  function ago(ts) { var s = Math.max(0, (Date.now() - ts) / 1000 | 0); if (s < 60) return 'just now'; var m = Math.round(s / 60); if (m < 60) return m + ' min ago'; var h = Math.round(m / 60); if (h < 24) return h + (h === 1 ? ' hour ago' : ' hours ago'); var d = Math.round(h / 24); return d + (d === 1 ? ' day ago' : ' days ago'); }
  function tick() { document.querySelectorAll('time[data-ts]').forEach(function (t) { t.textContent = ago(+t.getAttribute('data-ts')); }); }
  tick(); setInterval(tick, 60000);
})();
