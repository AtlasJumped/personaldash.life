/* HMR card screen module: app-health (click-through mini-app, made-up data, nothing is sent). Loaded on demand by hmr-card.js. */
(function () {
var W = window, H = W.HMRCard; if (!H) return;
var esc = H.esc;
H.css('hc-scr-app-health', [
  ".hc-app-health-w{position:absolute;inset:0;overflow:auto;padding:10px 12px 14px;font-size:13px;line-height:1.4;color:@F;background:@S;box-sizing:border-box}",
  ".hc-app-health-w *{box-sizing:border-box}",
  ".hc-app-health-w :focus-visible{outline:3px solid @F;outline-offset:2px}",
  ".hc-app-health-h{margin:0 0 2px;font-size:15px;line-height:1.2}",
  ".hc-app-health-tag{margin:0 0 8px;font-size:12px;color:@M}",
  ".hc-app-health-p{margin:0 0 8px;color:@M}",
  ".hc-app-health-lab{display:block;margin:8px 0 3px;font-weight:700}",
  ".hc-app-health-in,.hc-app-health-ta,.hc-app-health-sel{display:block;width:100%;border:1px solid @L;border-radius:8px;padding:6px 8px;background:@B;color:@F;font:inherit;min-height:34px}",
  ".hc-app-health-ta{min-height:84px;resize:none}",
  ".hc-app-health-b{min-height:34px;padding:0 12px;border-radius:8px;border:1px solid @A;background:@A;color:@O;font-size:12px;font-weight:600;cursor:pointer}",
  ".hc-app-health-b.hc-app-health-g{background:transparent;color:@F;border-color:@L}",
  ".hc-app-health-b.on{outline:2px solid @F}",
  ".hc-app-health-b[disabled]{opacity:.6;cursor:default}",
  ".hc-app-health-acts{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}",
  ".hc-app-health-row{display:flex;gap:8px;align-items:center;justify-content:space-between;flex-wrap:wrap;padding:6px 0;border-top:1px solid @L}",
  ".hc-app-health-row small,.hc-app-health-sm{display:block;color:@M;font-size:12px}",
  ".hc-app-health-chk{display:flex;gap:8px;align-items:center;min-height:34px;padding:2px 0}",
  ".hc-app-health-chk input{width:20px;height:20px;flex:none}",
  ".hc-app-health-chk span{flex:1}",
  ".hc-app-health-chk em{display:block;font-style:normal;color:@M;font-size:12px}",
  ".hc-app-health-out{margin:8px 0 0;padding:6px 8px;border:1px solid @L;border-radius:8px;background:@B;min-height:2.2em}",
  ".hc-app-health-live{font-size:12px;color:@M}",
  ".hc-app-health-hl{outline:3px solid @A;outline-offset:2px}",
  ".hc-app-health-list{margin:0;padding:0;list-style:none}",
  ".hc-app-health-sw{display:flex;gap:8px;align-items:center;justify-content:space-between;min-height:40px;border-top:1px solid @L}",
  ".hc-app-health-sw input{width:22px;height:22px;flex:none}"
].join(''));
H.registerScreen('app-health', function (root, api) {
  var q = function (s) { return root.querySelector(s); }, qa = function (s) { return [].slice.call(root.querySelectorAll(s)); };
  var P = "hc-app-health-";
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

  root.innerHTML = wrap(head('Health, tracked quietly', 'Demo data. Nothing is saved.') +
    '<p class="hc-app-health-p">Switch on what you want tracked. It stays private by default.</p>' +
    [['Air quality', 'Example: good today'], ['Sleep', 'Example: steady this week'], ['Meals', 'Example: logged']].map(function (r, i) { return '<label class="hc-app-health-sw"><span>' + r[0] + '<span class="hc-app-health-sm">' + r[1] + '</span></span><input type="checkbox" role="switch" checked data-t="h' + i + '" aria-label="Track ' + r[0] + '"></label>'; }).join('') +
    '<p class="hc-app-health-out" role="status" aria-live="polite" data-t="out">Tracking 3 things, privately.</p>');
  root.addEventListener('change', function () { say('Tracking ' + qa('input[type=checkbox]').filter(function (y) { return y.checked; }).length + ' things, privately.'); });

});
})();
