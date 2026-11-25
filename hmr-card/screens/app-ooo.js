/* HMR card screen module: app-ooo (click-through mini-app, made-up data, nothing is sent). Loaded on demand by hmr-card.js. */
(function () {
var W = window, H = W.HMRCard; if (!H) return;
var esc = H.esc;
H.css('hc-scr-app-ooo', [
  ".hc-app-ooo-w{position:absolute;inset:0;overflow:auto;padding:10px 12px 14px;font-size:13px;line-height:1.4;color:@F;background:@S;box-sizing:border-box}",
  ".hc-app-ooo-w *{box-sizing:border-box}",
  ".hc-app-ooo-w :focus-visible{outline:3px solid @F;outline-offset:2px}",
  ".hc-app-ooo-h{margin:0 0 2px;font-size:15px;line-height:1.2}",
  ".hc-app-ooo-tag{margin:0 0 8px;font-size:12px;color:@M}",
  ".hc-app-ooo-p{margin:0 0 8px;color:@M}",
  ".hc-app-ooo-lab{display:block;margin:8px 0 3px;font-weight:700}",
  ".hc-app-ooo-in,.hc-app-ooo-ta,.hc-app-ooo-sel{display:block;width:100%;border:1px solid @L;border-radius:8px;padding:6px 8px;background:@B;color:@F;font:inherit;min-height:34px}",
  ".hc-app-ooo-ta{min-height:84px;resize:none}",
  ".hc-app-ooo-b{min-height:34px;padding:0 12px;border-radius:8px;border:1px solid @A;background:@A;color:@O;font-size:12px;font-weight:600;cursor:pointer}",
  ".hc-app-ooo-b.hc-app-ooo-g{background:transparent;color:@F;border-color:@L}",
  ".hc-app-ooo-b.on{outline:2px solid @F}",
  ".hc-app-ooo-b[disabled]{opacity:.6;cursor:default}",
  ".hc-app-ooo-acts{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}",
  ".hc-app-ooo-row{display:flex;gap:8px;align-items:center;justify-content:space-between;flex-wrap:wrap;padding:6px 0;border-top:1px solid @L}",
  ".hc-app-ooo-row small,.hc-app-ooo-sm{display:block;color:@M;font-size:12px}",
  ".hc-app-ooo-chk{display:flex;gap:8px;align-items:center;min-height:34px;padding:2px 0}",
  ".hc-app-ooo-chk input{width:20px;height:20px;flex:none}",
  ".hc-app-ooo-chk span{flex:1}",
  ".hc-app-ooo-chk em{display:block;font-style:normal;color:@M;font-size:12px}",
  ".hc-app-ooo-out{margin:8px 0 0;padding:6px 8px;border:1px solid @L;border-radius:8px;background:@B;min-height:2.2em}",
  ".hc-app-ooo-live{font-size:12px;color:@M}",
  ".hc-app-ooo-hl{outline:3px solid @A;outline-offset:2px}",
  ".hc-app-ooo-list{margin:0;padding:0;list-style:none}",
  ".hc-app-ooo-steps li{padding:5px 0 5px 26px;border-top:1px solid @L;color:@M;position:relative}",
  ".hc-app-ooo-steps li:before{content:\"\";position:absolute;left:4px;top:8px;width:12px;height:12px;border:2px solid @L;border-radius:99px}",
  ".hc-app-ooo-steps li.ok{color:@F}.hc-app-ooo-steps li.ok:before{background:@A;border-color:@A}"
].join(''));
H.registerScreen('app-ooo', function (root, api) {
  var q = function (s) { return root.querySelector(s); }, qa = function (s) { return [].slice.call(root.querySelectorAll(s)); };
  var P = "hc-app-ooo-";
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

  var S = ['Setting your email auto-reply', 'Telling your team in chat', 'Handing off open items to your backup', 'Blocking your calendar'];
  root.innerHTML = wrap(head('Out of office', 'Demo data. Nothing is changed.') +
    '<p class="hc-app-ooo-p">In the future, setting your out of office also hands your coworker a dashboard you preset. One click, and they take over.</p>' +
    '<label class="hc-app-ooo-lab" for="hc-app-ooo-w">When</label><select class="hc-app-ooo-sel" id="hc-app-ooo-w" data-t="when"><option>This Friday to next Monday</option><option>Next week, all week</option><option>Two weeks from Monday</option></select>' +
    '<label class="hc-app-ooo-lab" for="hc-app-ooo-nt">Note for your team</label><textarea class="hc-app-ooo-ta" id="hc-app-ooo-nt" style="min-height:64px" data-t="note">I\'m out for a few days. For anything urgent, please reach out to the backup listed in the handoff list.</textarea>' +
    '<div class="hc-app-ooo-acts"><button type="button" class="hc-app-ooo-b" data-t="go">I\'m going out of office</button></div>' +
    '<ul class="hc-app-ooo-list hc-app-ooo-steps" aria-live="polite" style="margin-top:8px">' + S.map(function (s, i) { return '<li data-s data-t="s' + i + '">' + s + '</li>'; }).join('') + '</ul>');
  var go = q('[data-t="go"]'), steps = qa('[data-s]'), on = false, busy = false;
  go.addEventListener('click', function () {
    if (busy) return;
    if (on) { steps.forEach(function (s) { s.classList.remove('ok'); }); on = false; go.textContent = "I'm going out of office"; return; }
    busy = true; go.disabled = true;
    steps.forEach(function (s, i) { api.later(function () { s.classList.add('ok'); }, RM ? 0 : i * 600); });
    api.later(function () { on = true; busy = false; go.disabled = false; go.textContent = 'You are out of office (demo). Press to come back.'; }, RM ? 0 : steps.length * 600);
  });

});
})();
