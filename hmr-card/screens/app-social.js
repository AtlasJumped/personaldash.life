/* HMR card screen module: app-social (click-through mini-app, made-up data, nothing is sent). Loaded on demand by hmr-card.js. */
(function () {
var W = window, H = W.HMRCard; if (!H) return;
var esc = H.esc;
H.css('hc-scr-app-social', [
  ".hc-app-social-w{position:absolute;inset:0;overflow:auto;padding:10px 12px 14px;font-size:13px;line-height:1.4;color:@F;background:@S;box-sizing:border-box}",
  ".hc-app-social-w *{box-sizing:border-box}",
  ".hc-app-social-w :focus-visible{outline:3px solid @F;outline-offset:2px}",
  ".hc-app-social-h{margin:0 0 2px;font-size:15px;line-height:1.2}",
  ".hc-app-social-tag{margin:0 0 8px;font-size:12px;color:@M}",
  ".hc-app-social-p{margin:0 0 8px;color:@M}",
  ".hc-app-social-lab{display:block;margin:8px 0 3px;font-weight:700}",
  ".hc-app-social-in,.hc-app-social-ta,.hc-app-social-sel{display:block;width:100%;border:1px solid @L;border-radius:8px;padding:6px 8px;background:@B;color:@F;font:inherit;min-height:34px}",
  ".hc-app-social-ta{min-height:84px;resize:none}",
  ".hc-app-social-b{min-height:34px;padding:0 12px;border-radius:8px;border:1px solid @A;background:@A;color:@O;font-size:12px;font-weight:600;cursor:pointer}",
  ".hc-app-social-b.hc-app-social-g{background:transparent;color:@F;border-color:@L}",
  ".hc-app-social-b.on{outline:2px solid @F}",
  ".hc-app-social-b[disabled]{opacity:.6;cursor:default}",
  ".hc-app-social-acts{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}",
  ".hc-app-social-row{display:flex;gap:8px;align-items:center;justify-content:space-between;flex-wrap:wrap;padding:6px 0;border-top:1px solid @L}",
  ".hc-app-social-row small,.hc-app-social-sm{display:block;color:@M;font-size:12px}",
  ".hc-app-social-chk{display:flex;gap:8px;align-items:center;min-height:34px;padding:2px 0}",
  ".hc-app-social-chk input{width:20px;height:20px;flex:none}",
  ".hc-app-social-chk span{flex:1}",
  ".hc-app-social-chk em{display:block;font-style:normal;color:@M;font-size:12px}",
  ".hc-app-social-out{margin:8px 0 0;padding:6px 8px;border:1px solid @L;border-radius:8px;background:@B;min-height:2.2em}",
  ".hc-app-social-live{font-size:12px;color:@M}",
  ".hc-app-social-hl{outline:3px solid @A;outline-offset:2px}",
  ".hc-app-social-list{margin:0;padding:0;list-style:none}",
  ".hc-app-social-sw{display:flex;gap:8px;align-items:center;justify-content:space-between;min-height:36px;padding:2px 0;border-top:1px solid @L}",
  ".hc-app-social-sw input{width:22px;height:22px;flex:none}",
  ".hc-app-social-out.ask{border-color:@A}"
].join(''));
H.registerScreen('app-social', function (root, api) {
  var q = function (s) { return root.querySelector(s); }, qa = function (s) { return [].slice.call(root.querySelectorAll(s)); };
  var P = "hc-app-social-";
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

  var NAMES = ['About me', 'Family tree', 'Interests and hobbies', 'Photos'];
  root.innerHTML = wrap(head('Your circles and who sees what', 'Demo data. Nothing is saved or sent.') +
    '<p class="hc-app-social-p">You choose what is public, who can message you, and who can see where you are. Try the switches.</p>' +
    NAMES.map(function (n, i) { return '<label class="hc-app-social-sw"><span>' + n + '</span><input type="checkbox" role="switch" data-t="sw' + i + '" data-sw aria-label="' + n + ' public"></label>'; }).join('') +
    '<p class="hc-app-social-tag" role="status" aria-live="polite" data-t="pub">0 of 4 public</p>' +
    '<label class="hc-app-social-lab" for="hc-app-social-who">Try it: who is messaging you?</label><select class="hc-app-social-sel" id="hc-app-social-who" data-t="who"><option value="0">A close trusted friend</option><option value="1">A close friend of a close friend</option><option value="2">A friend of a friend, two steps out</option><option value="3">Someone outside your circles</option></select>' +
    '<p class="hc-app-social-out" role="status" aria-live="polite" data-t="res"></p>' +
    '<label class="hc-app-social-sw" style="margin-top:8px"><span>Share my location with Best friend 1</span><input type="checkbox" data-t="loc" aria-label="Share location with Best friend 1"></label>' +
    '<p class="hc-app-social-tag" role="status" aria-live="polite" data-t="locn">Sharing with nobody.</p>' + out(''));
  var sw = qa('[data-sw]');
  function res() { var ask = +q('[data-t="who"]').value >= 2, r = q('[data-t="res"]'); r.textContent = ask ? 'Needs permission first. They get a short request with your reason, and they can say no.' : 'Goes straight through. No request needed.'; r.classList.toggle('ask', ask); }
  root.addEventListener('change', function (e) {
    var t = e.target.getAttribute('data-t');
    if (e.target.hasAttribute('data-sw')) q('[data-t="pub"]').textContent = sw.filter(function (y) { return y.checked; }).length + ' of 4 public';
    else if (t === 'who') res();
    else if (t === 'loc') q('[data-t="locn"]').textContent = e.target.checked ? 'Sharing with Best friend 1. They get a notification. You can stop any time.' : 'Sharing with nobody.';
  });
  res();

});
})();
