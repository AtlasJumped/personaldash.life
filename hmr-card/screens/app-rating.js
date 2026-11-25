/* HMR card screen module: app-rating (click-through mini-app, made-up data, nothing is sent). Loaded on demand by hmr-card.js. */
(function () {
var W = window, H = W.HMRCard; if (!H) return;
var esc = H.esc;
H.css('hc-scr-app-rating', [
  ".hc-app-rating-w{position:absolute;inset:0;overflow:auto;padding:10px 12px 14px;font-size:13px;line-height:1.4;color:@F;background:@S;box-sizing:border-box}",
  ".hc-app-rating-w *{box-sizing:border-box}",
  ".hc-app-rating-w :focus-visible{outline:3px solid @F;outline-offset:2px}",
  ".hc-app-rating-h{margin:0 0 2px;font-size:15px;line-height:1.2}",
  ".hc-app-rating-tag{margin:0 0 8px;font-size:12px;color:@M}",
  ".hc-app-rating-p{margin:0 0 8px;color:@M}",
  ".hc-app-rating-lab{display:block;margin:8px 0 3px;font-weight:700}",
  ".hc-app-rating-in,.hc-app-rating-ta,.hc-app-rating-sel{display:block;width:100%;border:1px solid @L;border-radius:8px;padding:6px 8px;background:@B;color:@F;font:inherit;min-height:34px}",
  ".hc-app-rating-ta{min-height:84px;resize:none}",
  ".hc-app-rating-b{min-height:34px;padding:0 12px;border-radius:8px;border:1px solid @A;background:@A;color:@O;font-size:12px;font-weight:600;cursor:pointer}",
  ".hc-app-rating-b.hc-app-rating-g{background:transparent;color:@F;border-color:@L}",
  ".hc-app-rating-b.on{outline:2px solid @F}",
  ".hc-app-rating-b[disabled]{opacity:.6;cursor:default}",
  ".hc-app-rating-acts{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}",
  ".hc-app-rating-row{display:flex;gap:8px;align-items:center;justify-content:space-between;flex-wrap:wrap;padding:6px 0;border-top:1px solid @L}",
  ".hc-app-rating-row small,.hc-app-rating-sm{display:block;color:@M;font-size:12px}",
  ".hc-app-rating-chk{display:flex;gap:8px;align-items:center;min-height:34px;padding:2px 0}",
  ".hc-app-rating-chk input{width:20px;height:20px;flex:none}",
  ".hc-app-rating-chk span{flex:1}",
  ".hc-app-rating-chk em{display:block;font-style:normal;color:@M;font-size:12px}",
  ".hc-app-rating-out{margin:8px 0 0;padding:6px 8px;border:1px solid @L;border-radius:8px;background:@B;min-height:2.2em}",
  ".hc-app-rating-live{font-size:12px;color:@M}",
  ".hc-app-rating-hl{outline:3px solid @A;outline-offset:2px}",
  ".hc-app-rating-list{margin:0;padding:0;list-style:none}",
  ".hc-app-rating-bar{height:12px;border:1px solid @L;border-radius:99px;background:@B;overflow:hidden;margin:4px 0 8px}",
  ".hc-app-rating-bar i{display:block;height:100%;background:@A}",
  ".hc-app-rating-num{font-size:13px;color:@M}.hc-app-rating-num b{font-size:26px;color:@F}"
].join(''));
H.registerScreen('app-rating', function (root, api) {
  var q = function (s) { return root.querySelector(s); }, qa = function (s) { return [].slice.call(root.querySelectorAll(s)); };
  var P = "hc-app-rating-";
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

  var C = [['Email, every provider', 'unlocks reply workflows', 14], ['Calendars', 'agenda and trip planning', 12], ['Team chat', 'one-button reports', 8], ['Notes and files', 'your voice journal', 8], ['Read-only money view', 'subscription review', 8], ['Streaming questions', 'the new-only TV screen', 6], ['Music', 'discovery', 4], ['Smart home hub', 'lights and thermostat', 4]];
  root.innerHTML = wrap(head('Your setup rating', 'Demo data. Nothing is connected.') +
    '<p class="hc-app-rating-p">Your rating starts at 36. Say yes to a connection and watch it rise toward 100.</p>' +
    '<div class="hc-app-rating-num"><b data-t="n">36</b> / 100</div><div class="hc-app-rating-bar" role="img" aria-label="Rating bar"><i data-t="bar" style="width:36%"></i></div>' +
    C.map(function (c, i) { return '<label class="hc-app-rating-chk"><input type="checkbox" data-p="' + c[2] + '" data-t="c' + i + '"><span>' + esc(c[0]) + '<em>' + esc(c[1]) + '</em></span></label>'; }).join('') +
    '<p class="hc-app-rating-out" role="status" aria-live="polite" data-t="out">Each connection is optional. You can say no to anything.</p>');
  function upd() {
    var v = 36; qa('input[data-p]').forEach(function (b) { if (b.checked) v += +b.getAttribute('data-p'); });
    q('[data-t="n"]').textContent = v; q('[data-t="bar"]').style.width = v + '%';
    say(v >= 100 ? '100. Everything is connected. Example numbers.' : 'Each connection is optional. You can say no to anything.');
  }
  root.addEventListener('change', upd);

});
})();
