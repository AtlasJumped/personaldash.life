/* HMR card screen module: app-money (click-through mini-app, made-up data, nothing is sent). Loaded on demand by hmr-card.js. */
(function () {
var W = window, H = W.HMRCard; if (!H) return;
var esc = H.esc;
H.css('hc-scr-app-money', [
  ".hc-app-money-w{position:absolute;inset:0;overflow:auto;padding:10px 12px 14px;font-size:13px;line-height:1.4;color:@F;background:@S;box-sizing:border-box}",
  ".hc-app-money-w *{box-sizing:border-box}",
  ".hc-app-money-w :focus-visible{outline:3px solid @F;outline-offset:2px}",
  ".hc-app-money-h{margin:0 0 2px;font-size:15px;line-height:1.2}",
  ".hc-app-money-tag{margin:0 0 8px;font-size:12px;color:@M}",
  ".hc-app-money-p{margin:0 0 8px;color:@M}",
  ".hc-app-money-lab{display:block;margin:8px 0 3px;font-weight:700}",
  ".hc-app-money-in,.hc-app-money-ta,.hc-app-money-sel{display:block;width:100%;border:1px solid @L;border-radius:8px;padding:6px 8px;background:@B;color:@F;font:inherit;min-height:34px}",
  ".hc-app-money-ta{min-height:84px;resize:none}",
  ".hc-app-money-b{min-height:34px;padding:0 12px;border-radius:8px;border:1px solid @A;background:@A;color:@O;font-size:12px;font-weight:600;cursor:pointer}",
  ".hc-app-money-b.hc-app-money-g{background:transparent;color:@F;border-color:@L}",
  ".hc-app-money-b.on{outline:2px solid @F}",
  ".hc-app-money-b[disabled]{opacity:.6;cursor:default}",
  ".hc-app-money-acts{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}",
  ".hc-app-money-row{display:flex;gap:8px;align-items:center;justify-content:space-between;flex-wrap:wrap;padding:6px 0;border-top:1px solid @L}",
  ".hc-app-money-row small,.hc-app-money-sm{display:block;color:@M;font-size:12px}",
  ".hc-app-money-chk{display:flex;gap:8px;align-items:center;min-height:34px;padding:2px 0}",
  ".hc-app-money-chk input{width:20px;height:20px;flex:none}",
  ".hc-app-money-chk span{flex:1}",
  ".hc-app-money-chk em{display:block;font-style:normal;color:@M;font-size:12px}",
  ".hc-app-money-out{margin:8px 0 0;padding:6px 8px;border:1px solid @L;border-radius:8px;background:@B;min-height:2.2em}",
  ".hc-app-money-live{font-size:12px;color:@M}",
  ".hc-app-money-hl{outline:3px solid @A;outline-offset:2px}",
  ".hc-app-money-list{margin:0;padding:0;list-style:none}"
].join(''));
H.registerScreen('app-money', function (root, api) {
  var q = function (s) { return root.querySelector(s); }, qa = function (s) { return [].slice.call(root.querySelectorAll(s)); };
  var P = "hc-app-money-";
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

  var SUBS = [['Streaming service A', 12], ['Music app', 11], ['Cloud storage', 3], ['Premium bundle', 30]];
  root.innerHTML = wrap(head('Money: your subscriptions', 'Demo data. Nothing is cancelled.') +
    '<p class="hc-app-money-p">Here are the subscriptions we found in your email, and what each one costs. Uncheck any you want to cancel.</p>' +
    SUBS.map(function (s, i) { return '<label class="hc-app-money-chk"><input type="checkbox" checked data-i="' + i + '" data-t="s' + i + '"><span>' + s[0] + '<em>$' + s[1] + ' a month</em></span></label>'; }).join('') +
    out('Keeping all four.') +
    '<div class="hc-app-money-acts"><button type="button" class="hc-app-money-b" data-t="go">Submit</button><button type="button" class="hc-app-money-b hc-app-money-g" data-t="save">I want to save money today</button></div>');
  function gone() { return qa('[data-i]').reduce(function (t, b) { return t + (b.checked ? 0 : SUBS[+b.getAttribute('data-i')][1]); }, 0); }
  root.addEventListener('change', function (e) { if (!e.target.hasAttribute('data-i')) return; var g = gone(); say(g ? 'Cancelling these saves $' + g + ' a month.' : 'Keeping all four.'); });
  q('[data-t="go"]').addEventListener('click', function () { var g = gone(); say(g ? 'We have started cancelling. You are now saving $' + g + ' a month. Demo only.' : 'Nothing to cancel. You keep all four.'); });
  q('[data-t="save"]').addEventListener('click', function () { say('You wanted to take a trip. The price now is the lowest we have seen in the past year (example). Want us to book it? Demo only, so nothing is booked.'); });

});
})();
