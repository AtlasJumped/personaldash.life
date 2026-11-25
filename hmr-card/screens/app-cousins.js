/* HMR card screen module: app-cousins (click-through mini-app, made-up data, nothing is sent). Loaded on demand by hmr-card.js. */
(function () {
var W = window, H = W.HMRCard; if (!H) return;
var esc = H.esc;
H.css('hc-scr-app-cousins', [
  ".hc-app-cousins-w{position:absolute;inset:0;overflow:auto;padding:10px 12px 14px;font-size:13px;line-height:1.4;color:@F;background:@S;box-sizing:border-box}",
  ".hc-app-cousins-w *{box-sizing:border-box}",
  ".hc-app-cousins-w :focus-visible{outline:3px solid @F;outline-offset:2px}",
  ".hc-app-cousins-h{margin:0 0 2px;font-size:15px;line-height:1.2}",
  ".hc-app-cousins-tag{margin:0 0 8px;font-size:12px;color:@M}",
  ".hc-app-cousins-p{margin:0 0 8px;color:@M}",
  ".hc-app-cousins-lab{display:block;margin:8px 0 3px;font-weight:700}",
  ".hc-app-cousins-in,.hc-app-cousins-ta,.hc-app-cousins-sel{display:block;width:100%;border:1px solid @L;border-radius:8px;padding:6px 8px;background:@B;color:@F;font:inherit;min-height:34px}",
  ".hc-app-cousins-ta{min-height:84px;resize:none}",
  ".hc-app-cousins-b{min-height:34px;padding:0 12px;border-radius:8px;border:1px solid @A;background:@A;color:@O;font-size:12px;font-weight:600;cursor:pointer}",
  ".hc-app-cousins-b.hc-app-cousins-g{background:transparent;color:@F;border-color:@L}",
  ".hc-app-cousins-b.on{outline:2px solid @F}",
  ".hc-app-cousins-b[disabled]{opacity:.6;cursor:default}",
  ".hc-app-cousins-acts{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}",
  ".hc-app-cousins-row{display:flex;gap:8px;align-items:center;justify-content:space-between;flex-wrap:wrap;padding:6px 0;border-top:1px solid @L}",
  ".hc-app-cousins-row small,.hc-app-cousins-sm{display:block;color:@M;font-size:12px}",
  ".hc-app-cousins-chk{display:flex;gap:8px;align-items:center;min-height:34px;padding:2px 0}",
  ".hc-app-cousins-chk input{width:20px;height:20px;flex:none}",
  ".hc-app-cousins-chk span{flex:1}",
  ".hc-app-cousins-chk em{display:block;font-style:normal;color:@M;font-size:12px}",
  ".hc-app-cousins-out{margin:8px 0 0;padding:6px 8px;border:1px solid @L;border-radius:8px;background:@B;min-height:2.2em}",
  ".hc-app-cousins-live{font-size:12px;color:@M}",
  ".hc-app-cousins-hl{outline:3px solid @A;outline-offset:2px}",
  ".hc-app-cousins-list{margin:0;padding:0;list-style:none}"
].join(''));
H.registerScreen('app-cousins', function (root, api) {
  var q = function (s) { return root.querySelector(s); }, qa = function (s) { return [].slice.call(root.querySelectorAll(s)); };
  var P = "hc-app-cousins-";
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
  var DICT = 'Let us pick a Sunday.';
  function compose(o) {
    root.innerHTML = wrap(head(esc(o.title), 'Demo data. Nothing is sent.') +
      '<p class="hc-app-cousins-p">' + esc(o.tag) + '</p>' +
      '<div class="hc-app-cousins-row"><span>To</span><b>' + esc(o.to) + '</b></div><div class="hc-app-cousins-row"><span>Subject</span><b>' + esc(o.subj) + '</b></div>' +
      '<label class="hc-app-cousins-lab" for="hc-app-cousins-ta">Message</label><textarea class="hc-app-cousins-ta" id="hc-app-cousins-ta" data-ta data-t="draft"></textarea>' +
      '<div class="hc-app-cousins-acts"><button type="button" class="hc-app-cousins-b" data-t="send">' + esc(o.send) + '</button>' + mic() + '</div>' + out(''));
    q('textarea').value = o.body;
    q('[data-t="send"]').addEventListener('click', function () { say(o.done + '. Demo only, nothing was sent.'); if (o.after) o.after(); });
  }
  micInit(DICT);

  compose({ title: 'Message your cousins', tag: 'Demo draft to all four cousins.', to: 'Cousin Dev, Cousin Mina, Cousin Theo, Cousin Ana', subj: 'Hello from the family dashboard', body: "Hi everyone,\n\nI was thinking of you and wanted to say hello. How are you doing? Let's plan a video call soon.", send: 'Send to all', done: 'Sent to 4 cousins' });

});
})();
