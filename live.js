// Keeps the prerendered pages fresh: asks the site's backend /api/live endpoint (filled every 10 min by a cron job)
// for the newest headlines and refreshes the "Latest" list and category lists. Pages work fine without it.
(function () {
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var CATS = {}; (window.SITE_CATS || []).forEach(function (c) { CATS[c.slug] = c.name; });
  function ago(ts) { var s = Math.max(0, (Date.now() - ts) / 1000 | 0); if (s < 60) return 'just now'; var m = Math.round(s / 60); if (m < 60) return m + ' min ago'; var h = Math.round(m / 60); if (h < 24) return h + (h === 1 ? ' hour ago' : ' hours ago'); var d = Math.round(h / 24); return d + (d === 1 ? ' day ago' : ' days ago'); }
  function mainCat(it) { for (var i = 0; i < it.c.length; i++) if (it.c[i] !== 'top') return it.c[i]; return 'world'; }
  function card(it) {
    var c = mainCat(it);
    return '<article class="card">' + (it.i ? '<a class="thumb" href="' + esc(it.l) + '" target="_blank" rel="noopener nofollow" tabindex="-1" aria-hidden="true"><img src="' + esc(it.i) + '" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.parentNode.remove()"></a>' : '') +
      '<div class="card-body"><div class="kicker"><a href="/category/' + c + '">' + esc(CATS[c] || '') + '</a></div><h3><a href="' + esc(it.l) + '" target="_blank" rel="noopener nofollow">' + esc(it.t) + '</a></h3>' +
      (it.x ? '<p class="excerpt">' + esc(it.x) + '</p>' : '') + '<div class="meta"><span class="src">' + esc(it.s) + '</span> · <time data-ts="' + it.d + '">' + ago(it.d) + '</time></div></div></article>';
  }
  try { var el = document.querySelector('.today'); if (el) el.textContent = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/London' }); } catch (e) {}
  var list = document.querySelector('.list[data-live-cat]'); var latest = document.querySelector('ol.latest');
  if (!list && !latest) return;
  fetch("/api/live", { headers: { Accept: 'application/json' } }).then(function (r) { return r.ok ? r.json() : null; }).then(function (d) {
    if (!d || !d.items || !d.items.length) return;
    var items = d.items;
    if (latest) latest.innerHTML = items.slice(0, 10).map(function (it) { return '<li><a href="' + esc(it.l) + '" target="_blank" rel="noopener nofollow">' + esc(it.t) + '</a><span class="meta">' + esc(it.s) + ' · <time data-ts="' + it.d + '">' + ago(it.d) + '</time></span></li>'; }).join('');
    if (list) {
      var cat = list.getAttribute('data-live-cat');
      var mine = items.filter(function (it) { return it.c.indexOf(cat) > -1; }).slice(0, 30);
      if (mine.length >= 10) list.innerHTML = mine.map(card).join('');
    }
  }).catch(function () {});
})();
