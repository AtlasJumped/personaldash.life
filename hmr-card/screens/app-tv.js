/* HMR card screen module: app-tv (click-through mini-app, made-up data, nothing is sent). Loaded on demand by hmr-card.js. */
(function () {
var W = window, H = W.HMRCard; if (!H) return;
var esc = H.esc;
H.css('hc-scr-app-tv', [
  ".hc-app-tv-w{position:absolute;inset:0;overflow:auto;padding:10px 12px 14px;font-size:13px;line-height:1.4;color:@F;background:@S;box-sizing:border-box}",
  ".hc-app-tv-w *{box-sizing:border-box}",
  ".hc-app-tv-w :focus-visible{outline:3px solid @F;outline-offset:2px}",
  ".hc-app-tv-h{margin:0 0 2px;font-size:15px;line-height:1.2}",
  ".hc-app-tv-tag{margin:0 0 8px;font-size:12px;color:@M}",
  ".hc-app-tv-p{margin:0 0 8px;color:@M}",
  ".hc-app-tv-lab{display:block;margin:8px 0 3px;font-weight:700}",
  ".hc-app-tv-in,.hc-app-tv-ta,.hc-app-tv-sel{display:block;width:100%;border:1px solid @L;border-radius:8px;padding:6px 8px;background:@B;color:@F;font:inherit;min-height:34px}",
  ".hc-app-tv-ta{min-height:84px;resize:none}",
  ".hc-app-tv-b{min-height:34px;padding:0 12px;border-radius:8px;border:1px solid @A;background:@A;color:@O;font-size:12px;font-weight:600;cursor:pointer}",
  ".hc-app-tv-b.hc-app-tv-g{background:transparent;color:@F;border-color:@L}",
  ".hc-app-tv-b.on{outline:2px solid @F}",
  ".hc-app-tv-b[disabled]{opacity:.6;cursor:default}",
  ".hc-app-tv-acts{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}",
  ".hc-app-tv-row{display:flex;gap:8px;align-items:center;justify-content:space-between;flex-wrap:wrap;padding:6px 0;border-top:1px solid @L}",
  ".hc-app-tv-row small,.hc-app-tv-sm{display:block;color:@M;font-size:12px}",
  ".hc-app-tv-chk{display:flex;gap:8px;align-items:center;min-height:34px;padding:2px 0}",
  ".hc-app-tv-chk input{width:20px;height:20px;flex:none}",
  ".hc-app-tv-chk span{flex:1}",
  ".hc-app-tv-chk em{display:block;font-style:normal;color:@M;font-size:12px}",
  ".hc-app-tv-out{margin:8px 0 0;padding:6px 8px;border:1px solid @L;border-radius:8px;background:@B;min-height:2.2em}",
  ".hc-app-tv-live{font-size:12px;color:@M}",
  ".hc-app-tv-hl{outline:3px solid @A;outline-offset:2px}",
  ".hc-app-tv-list{margin:0;padding:0;list-style:none}",
  ".hc-app-tv-set{display:flex;flex-wrap:wrap;gap:6px 14px;align-items:center;margin:6px 0}",
  ".hc-app-tv-cols{display:grid;grid-template-columns:1fr 1fr;gap:10px}",
  ".hc-app-tv-cols h5{margin:0 0 4px;font-size:13px}",
  ".hc-app-tv-cols ol{margin:0;padding:0 0 0 18px;color:@F}",
  ".hc-app-tv-cols li{margin:0 0 3px;font-size:12px}",
  ".hc-app-tv-air li{padding:6px 0;border-top:1px solid @L;display:flex;flex-wrap:wrap;gap:6px;align-items:center;justify-content:space-between}",
  ".hc-app-tv-air b{display:block}.hc-app-tv-air span.hc-app-tv-sm{display:block}",
  ".hc-app-tv-rc{flex-basis:100%;margin:0;color:@M;font-size:12px}"
].join(''));
H.registerScreen('app-tv', function (root, api) {
  var q = function (s) { return root.querySelector(s); }, qa = function (s) { return [].slice.call(root.querySelectorAll(s)); };
  var P = "hc-app-tv-";
  function say(m) { var o = q('[data-t="out"]'); if (o) o.textContent = m; }
  function head(t, note) { return '<h4 class="' + P + 'h">' + t + '</h4><p class="' + P + 'tag">' + note + '</p>'; }
  function wrap(inner) { return '<div class="' + P + 'w">' + inner + '</div>'; }
  function out(t) { return '<p class="' + P + 'out" role="status" aria-live="polite" data-t="out">' + (t || '') + '</p>'; }
  function mic() { return '<button type="button" class="' + P + 'b ' + P + 'g" data-mc data-t="mic" aria-pressed="false">Add by voice</button><span class="' + P + 'live" data-live></span>'; }
  function micInit(dict) {
    root.addEventListener('click', function (e) {
      var b = e.target.closest('[data-mc]'); if (!b) return;
      var on = !b.classList.contains('on'), lv = q('[data-live]'), ta = q('[data-ta]');
      b.classList.toggle('on', on); b.setAttribute('aria-pressed', on ? 'true' : 'false');
      lv.textContent = on ? 'Listening (demo, nothing is recorded)' : '';
      if (on && !root.hasAttribute('data-auto')) api.later(function () {
        b.classList.remove('on'); b.setAttribute('aria-pressed', 'false'); lv.textContent = '';
        ta.value = (ta.value.trim() + ' ' + dict).trim();
      }, 1800);
    });
    root.addEventListener('hc-typed', function () {
      var b = q('[data-mc]'); if (b) { b.classList.remove('on'); b.setAttribute('aria-pressed', 'false'); q('[data-live]').textContent = ''; }
    });
  }
  var RM = false; try { RM = W.matchMedia && W.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (x) {}

  var MOV = ['A heist caper on a space station', 'A quiet drama about a lighthouse keeper', 'A road-trip comedy for the whole family', 'A sweeping fantasy quest', 'A courtroom thriller', 'A documentary about deep oceans', 'A heartfelt sports story', 'A sci-fi mystery in a small town', 'An animated adventure with dragons', 'A gentle romance in a bakery'];
  var SHW = ['A fantasy series, new this week', 'A detective show set in the 1960s', 'A cooking competition, new season', 'A sci-fi anthology', 'A sitcom about neighbors', 'A mini-series about a historic voyage', 'A nature series, episode 1', 'A teen mystery, new this week', 'A space opera, season 1', 'A home-renovation show'];
  var AIR = [['A fantasy series', 'Season 3 returns in March', 'Last time: the heroes split up after a failed rescue, and a rival gained a powerful ally. Expect a reunion in the first episode.'], ['A medical drama', 'New episodes every Thursday', 'Last time: a hospital merger forced two teams to share one floor. The new chief makes a surprise announcement.'], ['A sci-fi series', 'Final season returns in the fall', 'Last time: the crew reached the edge of known space. A signal changed everything.'], ['A crime documentary series', 'New season in two weeks', 'Last time: a cold case reopened after a new witness came forward.']];
  function ol(a) { return '<ol>' + a.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ol>'; }
  root.innerHTML = wrap(head('Watch something new', 'Demo data. Titles are generic on purpose.') +
    '<div class="hc-app-tv-set"><label class="hc-app-tv-chk"><input type="checkbox" checked data-t="new"><span>Only new things</span></label><label class="hc-app-tv-chk"><input type="checkbox" data-t="re"><span>Open to rewatching</span></label><button type="button" class="hc-app-tv-b" data-t="pick">Pick for me</button></div>' +
    out('Showing your top 10 new picks for each side.') +
    '<div class="hc-app-tv-cols"><div><h5>Movies</h5>' + ol(MOV) + '</div><div><h5>Shows</h5>' + ol(SHW) + '</div></div>' +
    '<h5 style="margin:10px 0 2px">Still airing</h5><ul class="hc-app-tv-list hc-app-tv-air">' + AIR.map(function (a, i) { return '<li><div><b>' + esc(a[0]) + '</b><span class="hc-app-tv-sm">' + esc(a[1]) + '</span></div><button type="button" class="hc-app-tv-b hc-app-tv-g" aria-expanded="false" data-t="rc' + i + '" data-rc="' + i + '">Recap</button><p class="hc-app-tv-rc" hidden>' + esc(a[2]) + '</p></li>'; }).join('') + '</ul>');
  var n = 0;
  root.addEventListener('click', function (e) {
    var b = e.target.closest('[data-rc]');
    if (b) { var p = b.parentNode.querySelector('.' + P + 'rc'), open = p.hidden; p.hidden = !open; b.setAttribute('aria-expanded', open ? 'true' : 'false'); return; }
    if (e.target.closest('[data-t="pick"]')) { say('Picked for you: "' + MOV[n % 3] + '". Playing now (demo).'); n++; }
  });
  root.addEventListener('change', function (e) {
    if (e.target.getAttribute('data-t') === 'new') say(e.target.checked ? 'Showing only things you have not watched.' : 'Showing everything, including things you have watched.');
  });

});
})();
