/* HMR card screen module: app-trip (click-through mini-app, made-up data, nothing is sent). Loaded on demand by hmr-card.js. */
(function () {
var W = window, H = W.HMRCard; if (!H) return;
var esc = H.esc;
H.css('hc-scr-app-trip', [
  ".hc-app-trip-w{position:absolute;inset:0;overflow:auto;padding:10px 12px 14px;font-size:13px;line-height:1.4;color:@F;background:@S;box-sizing:border-box}",
  ".hc-app-trip-w *{box-sizing:border-box}",
  ".hc-app-trip-w :focus-visible{outline:3px solid @F;outline-offset:2px}",
  ".hc-app-trip-h{margin:0 0 2px;font-size:15px;line-height:1.2}",
  ".hc-app-trip-tag{margin:0 0 8px;font-size:12px;color:@M}",
  ".hc-app-trip-p{margin:0 0 8px;color:@M}",
  ".hc-app-trip-lab{display:block;margin:8px 0 3px;font-weight:700}",
  ".hc-app-trip-in,.hc-app-trip-ta,.hc-app-trip-sel{display:block;width:100%;border:1px solid @L;border-radius:8px;padding:6px 8px;background:@B;color:@F;font:inherit;min-height:34px}",
  ".hc-app-trip-ta{min-height:84px;resize:none}",
  ".hc-app-trip-b{min-height:34px;padding:0 12px;border-radius:8px;border:1px solid @A;background:@A;color:@O;font-size:12px;font-weight:600;cursor:pointer}",
  ".hc-app-trip-b.hc-app-trip-g{background:transparent;color:@F;border-color:@L}",
  ".hc-app-trip-b.on{outline:2px solid @F}",
  ".hc-app-trip-b[disabled]{opacity:.6;cursor:default}",
  ".hc-app-trip-acts{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}",
  ".hc-app-trip-row{display:flex;gap:8px;align-items:center;justify-content:space-between;flex-wrap:wrap;padding:6px 0;border-top:1px solid @L}",
  ".hc-app-trip-row small,.hc-app-trip-sm{display:block;color:@M;font-size:12px}",
  ".hc-app-trip-chk{display:flex;gap:8px;align-items:center;min-height:34px;padding:2px 0}",
  ".hc-app-trip-chk input{width:20px;height:20px;flex:none}",
  ".hc-app-trip-chk span{flex:1}",
  ".hc-app-trip-chk em{display:block;font-style:normal;color:@M;font-size:12px}",
  ".hc-app-trip-out{margin:8px 0 0;padding:6px 8px;border:1px solid @L;border-radius:8px;background:@B;min-height:2.2em}",
  ".hc-app-trip-live{font-size:12px;color:@M}",
  ".hc-app-trip-hl{outline:3px solid @A;outline-offset:2px}",
  ".hc-app-trip-list{margin:0;padding:0;list-style:none}",
  ".hc-app-trip-cal{margin:6px 0}",
  ".hc-app-trip-cal div{display:grid;grid-template-columns:62px repeat(4,1fr);gap:4px;align-items:center;font-size:12px;color:@M;margin-bottom:4px}",
  ".hc-app-trip-cal i{height:18px;border-radius:5px;background:@L;display:block}.hc-app-trip-cal i.f{background:@A}",
  ".hc-app-trip-cal i.b{background:repeating-linear-gradient(45deg,@L,@L 4px,@B 4px,@B 8px)}",
  ".hc-app-trip-cost{width:100%;border-collapse:collapse;margin:6px 0}.hc-app-trip-cost td{padding:4px 0;border-top:1px solid @L}.hc-app-trip-cost td+td{text-align:right}"
].join(''));
H.registerScreen('app-trip', function (root, api) {
  var q = function (s) { return root.querySelector(s); }, qa = function (s) { return [].slice.call(root.querySelectorAll(s)); };
  var P = "hc-app-trip-";
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

  root.innerHTML = wrap(head('Plan a trip', 'Demo data. Nothing is booked.') +
    '<p class="hc-app-trip-p">Your budget looks good, and two friends in your close circle have the same week free.</p>' +
    '<div class="hc-app-trip-cal" role="img" aria-label="Calendars: you and two friends are all free in week 3"><div><b>You</b><i></i><i></i><i class="f"></i><i></i></div><div><b>Friend A</b><i class="b"></i><i></i><i class="f"></i><i></i></div><div><b>Friend B</b><i></i><i class="b"></i><i class="f"></i><i class="b"></i></div><div><span></span><span>Wk 1</span><span>Wk 2</span><span>Wk 3</span><span>Wk 4</span></div></div>' +
    '<label class="hc-app-trip-lab" for="hc-app-trip-n">People going</label><select class="hc-app-trip-sel" id="hc-app-trip-n" data-t="n"><option>2</option><option selected>3</option><option>4</option><option>5</option><option>6</option></select>' +
    '<table class="hc-app-trip-cost"><tbody><tr><td>Flights, each</td><td>$820</td></tr><tr><td>Stay, shared, 7 nights</td><td>$1,260</td></tr><tr><td><b>Per person</b></td><td><b data-t="per">$1,240</b></td></tr></tbody></table><p class="hc-app-trip-tag">Example prices.</p>' +
    '<label class="hc-app-trip-lab" for="hc-app-trip-m">Suggested group message</label><textarea class="hc-app-trip-ta" id="hc-app-trip-m" data-ta data-t="draft"></textarea>' +
    '<div class="hc-app-trip-acts"><button type="button" class="hc-app-trip-b" data-t="send">Start the group chat</button>' + mic() + '</div>' + out(''));
  var ta = q('textarea'), sel = q('select');
  function calc() {
    var each = Math.round(820 + 1260 / +sel.value).toLocaleString('en-US');
    q('[data-t="per"]').textContent = '$' + each;
    ta.value = 'Hey all, I noticed our calendars are all free in week 3. I found a place to stay and it comes to about $' + each + ' each with flights. Want me to set up a group chat to plan it?';
  }
  calc(); sel.addEventListener('change', calc);
  q('[data-t="send"]').addEventListener('click', function () { say('Demo only. No group chat was started.'); });
  micInit('I can drive if we pick somewhere close.');

});
})();
