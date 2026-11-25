/* HMR card screen module: app-fs (click-through mini-app, made-up data, nothing is sent). Loaded on demand by hmr-card.js. */
(function () {
var W = window, H = W.HMRCard; if (!H) return;
var esc = H.esc;
H.css('hc-scr-app-fs', [
  ".hc-app-fs-w{position:absolute;inset:0;overflow:auto;padding:10px 12px 14px;font-size:13px;line-height:1.4;color:@F;background:@S;box-sizing:border-box}",
  ".hc-app-fs-w *{box-sizing:border-box}",
  ".hc-app-fs-w :focus-visible{outline:3px solid @F;outline-offset:2px}",
  ".hc-app-fs-h{margin:0 0 2px;font-size:15px;line-height:1.2}",
  ".hc-app-fs-tag{margin:0 0 8px;font-size:12px;color:@M}",
  ".hc-app-fs-p{margin:0 0 8px;color:@M}",
  ".hc-app-fs-lab{display:block;margin:8px 0 3px;font-weight:700}",
  ".hc-app-fs-in,.hc-app-fs-ta,.hc-app-fs-sel{display:block;width:100%;border:1px solid @L;border-radius:8px;padding:6px 8px;background:@B;color:@F;font:inherit;min-height:34px}",
  ".hc-app-fs-ta{min-height:84px;resize:none}",
  ".hc-app-fs-b{min-height:34px;padding:0 12px;border-radius:8px;border:1px solid @A;background:@A;color:@O;font-size:12px;font-weight:600;cursor:pointer}",
  ".hc-app-fs-b.hc-app-fs-g{background:transparent;color:@F;border-color:@L}",
  ".hc-app-fs-b.on{outline:2px solid @F}",
  ".hc-app-fs-b[disabled]{opacity:.6;cursor:default}",
  ".hc-app-fs-acts{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}",
  ".hc-app-fs-row{display:flex;gap:8px;align-items:center;justify-content:space-between;flex-wrap:wrap;padding:6px 0;border-top:1px solid @L}",
  ".hc-app-fs-row small,.hc-app-fs-sm{display:block;color:@M;font-size:12px}",
  ".hc-app-fs-chk{display:flex;gap:8px;align-items:center;min-height:34px;padding:2px 0}",
  ".hc-app-fs-chk input{width:20px;height:20px;flex:none}",
  ".hc-app-fs-chk span{flex:1}",
  ".hc-app-fs-chk em{display:block;font-style:normal;color:@M;font-size:12px}",
  ".hc-app-fs-out{margin:8px 0 0;padding:6px 8px;border:1px solid @L;border-radius:8px;background:@B;min-height:2.2em}",
  ".hc-app-fs-live{font-size:12px;color:@M}",
  ".hc-app-fs-hl{outline:3px solid @A;outline-offset:2px}",
  ".hc-app-fs-list{margin:0;padding:0;list-style:none}",
  ".hc-app-fs-grid{display:grid;grid-template-columns:1fr;gap:8px}",
  "@media(min-width:560px){.hc-app-fs-grid{grid-template-columns:1fr 1fr 1fr}}",
  ".hc-app-fs-tile{display:block;width:100%;text-align:left;border:1px solid @L;border-radius:10px;padding:8px 10px;background:@B;color:@F;font:inherit;cursor:pointer}",
  ".hc-app-fs-tile.on{border-color:@A;outline:2px solid @A}",
  ".hc-app-fs-tile h5{margin:0 0 4px;font-size:13px}.hc-app-fs-tile ul{margin:0;padding:0;list-style:none}",
  ".hc-app-fs-tile li{display:flex;justify-content:space-between;gap:6px;font-size:12px}.hc-app-fs-tile em{font-style:normal;color:@M}"
].join(''));
H.registerScreen('app-fs', function (root, api) {
  var q = function (s) { return root.querySelector(s); }, qa = function (s) { return [].slice.call(root.querySelectorAll(s)); };
  var P = "hc-app-fs-";
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

  var T = [
    ['Today, ranked', [['Reply to Mom', '1'], ['Send the weekly recap', '2'], ['Book the dentist', '3']], 'Your ranked to-do list, set each morning.'],
    ['Inbox, drafted', [['Family dinner', 'draft ready'], ['Team update', 'draft ready']], 'Your inbox, with replies drafted in your voice. Nothing is sent without your yes.'],
    ['Calendar', [['Today', '2 events'], ['Friday', 'free']], 'One agenda for every calendar, with conflicts marked.'],
    ['People who matter', [['Grandma', 'birthday soon'], ['Cousins', 'message all']], 'The people who matter, one button away.'],
    ['Press a button, finish a chore', [['Family emails', 'open'], ['Weekly report', 'open'], ['Plan a trip', 'open']], 'Press a button, finish a chore. A window opens in the middle, and the dashboard waits underneath.'],
    ['Setup rating', [['Connected', 'more each week'], ['Refreshed', 'just now']], 'That is your dashboard. Everything on it is free to set up.']
  ];
  root.innerHTML = wrap(head('Your dashboard, all six tiles', 'Demo data. Nothing is sent.') +
    '<div class="hc-app-fs-grid">' + T.map(function (t, i) { return '<button type="button" class="hc-app-fs-tile" data-tile="' + i + '" data-t="t' + i + '" aria-pressed="false"><h5>' + t[0] + '</h5><ul>' + t[1].map(function (r) { return '<li><span>' + r[0] + '</span><em>' + r[1] + '</em></li>'; }).join('') + '</ul></button>'; }).join('') + '</div>' +
    out('Tap a tile to see what it does.'));
  root.addEventListener('click', function (e) {
    var b = e.target.closest('[data-tile]'); if (!b) return;
    qa('[data-tile]').forEach(function (x) { x.classList.remove('on'); x.setAttribute('aria-pressed', 'false'); });
    b.classList.add('on'); b.setAttribute('aria-pressed', 'true'); say(T[+b.getAttribute('data-tile')][2]);
  });

});
})();
