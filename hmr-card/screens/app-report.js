/* HMR card screen module: app-report (click-through mini-app, made-up data, nothing is sent). Loaded on demand by hmr-card.js. */
(function () {
var W = window, H = W.HMRCard; if (!H) return;
var esc = H.esc;
H.css('hc-scr-app-report', [
  ".hc-app-report-w{position:absolute;inset:0;overflow:auto;padding:10px 12px 14px;font-size:13px;line-height:1.4;color:@F;background:@S;box-sizing:border-box}",
  ".hc-app-report-w *{box-sizing:border-box}",
  ".hc-app-report-w :focus-visible{outline:3px solid @F;outline-offset:2px}",
  ".hc-app-report-h{margin:0 0 2px;font-size:15px;line-height:1.2}",
  ".hc-app-report-tag{margin:0 0 8px;font-size:12px;color:@M}",
  ".hc-app-report-p{margin:0 0 8px;color:@M}",
  ".hc-app-report-lab{display:block;margin:8px 0 3px;font-weight:700}",
  ".hc-app-report-in,.hc-app-report-ta,.hc-app-report-sel{display:block;width:100%;border:1px solid @L;border-radius:8px;padding:6px 8px;background:@B;color:@F;font:inherit;min-height:34px}",
  ".hc-app-report-ta{min-height:84px;resize:none}",
  ".hc-app-report-b{min-height:34px;padding:0 12px;border-radius:8px;border:1px solid @A;background:@A;color:@O;font-size:12px;font-weight:600;cursor:pointer}",
  ".hc-app-report-b.hc-app-report-g{background:transparent;color:@F;border-color:@L}",
  ".hc-app-report-b.on{outline:2px solid @F}",
  ".hc-app-report-b[disabled]{opacity:.6;cursor:default}",
  ".hc-app-report-acts{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}",
  ".hc-app-report-row{display:flex;gap:8px;align-items:center;justify-content:space-between;flex-wrap:wrap;padding:6px 0;border-top:1px solid @L}",
  ".hc-app-report-row small,.hc-app-report-sm{display:block;color:@M;font-size:12px}",
  ".hc-app-report-chk{display:flex;gap:8px;align-items:center;min-height:34px;padding:2px 0}",
  ".hc-app-report-chk input{width:20px;height:20px;flex:none}",
  ".hc-app-report-chk span{flex:1}",
  ".hc-app-report-chk em{display:block;font-style:normal;color:@M;font-size:12px}",
  ".hc-app-report-out{margin:8px 0 0;padding:6px 8px;border:1px solid @L;border-radius:8px;background:@B;min-height:2.2em}",
  ".hc-app-report-live{font-size:12px;color:@M}",
  ".hc-app-report-hl{outline:3px solid @A;outline-offset:2px}",
  ".hc-app-report-list{margin:0;padding:0;list-style:none}",
  ".hc-app-report-met{display:grid;grid-template-columns:repeat(auto-fit,minmax(70px,1fr));gap:6px;margin:6px 0}",
  ".hc-app-report-met div{border:1px solid @L;border-radius:8px;padding:6px 8px;font-size:12px;color:@M}.hc-app-report-met b{display:block;font-size:20px;line-height:1.1;color:@F}"
].join(''));
H.registerScreen('app-report', function (root, api) {
  var q = function (s) { return root.querySelector(s); }, qa = function (s) { return [].slice.call(root.querySelectorAll(s)); };
  var P = "hc-app-report-";
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

  root.innerHTML = wrap(head('Weekly recruiting recap', 'Demo data. Nothing is sent.') +
    '<div class="hc-app-report-met" data-t="metrics"><div><b>12</b>Open roles</div><div><b>31</b>Interviews</div><div><b>4</b>Offers out</div><div><b>2</b>Accepted</div></div>' +
    '<p class="hc-app-report-tag">In the real dashboard these numbers come live from the systems you connect.</p>' +
    '<label class="hc-app-report-lab" for="hc-app-report-ch">Post to</label><input class="hc-app-report-in" id="hc-app-report-ch" type="text" value="#hiring-managers" data-t="channel">' +
    '<label class="hc-app-report-lab" for="hc-app-report-b">Message</label><textarea class="hc-app-report-ta" id="hc-app-report-b" style="min-height:130px" data-ta data-t="draft"></textarea>' +
    '<div class="hc-app-report-acts"><button type="button" class="hc-app-report-b" data-t="send">Send to Slack</button>' + mic() + '</div>' + out(''));
  q('textarea').value = "Hi team, here is this week's recruiting recap.\n\nOpen roles: 12. Interviews held: 31. Offers out: 4. Accepted: 2.\n\nBiggest blocker: scheduling final rounds. If you have openings next week, please add them to your calendar so we can move candidates quickly.\n\nThanks for the partnership.";
  q('[data-t="send"]').addEventListener('click', function () { say('Demo only, nothing was sent to ' + q('[data-t="channel"]').value + '.'); });
  micInit('Also, interview availability is tight on Thursday.');

});
})();
