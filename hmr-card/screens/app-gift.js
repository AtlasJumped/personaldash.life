/* HMR card screen module: app-gift (click-through mini-app, made-up data, nothing is sent). Loaded on demand by hmr-card.js. */
(function () {
var W = window, H = W.HMRCard; if (!H) return;
var esc = H.esc;
H.css('hc-scr-app-gift', [
  ".hc-app-gift-w{position:absolute;inset:0;overflow:auto;padding:10px 12px 14px;font-size:13px;line-height:1.4;color:@F;background:@S;box-sizing:border-box}",
  ".hc-app-gift-w *{box-sizing:border-box}",
  ".hc-app-gift-w :focus-visible{outline:3px solid @F;outline-offset:2px}",
  ".hc-app-gift-h{margin:0 0 2px;font-size:15px;line-height:1.2}",
  ".hc-app-gift-tag{margin:0 0 8px;font-size:12px;color:@M}",
  ".hc-app-gift-p{margin:0 0 8px;color:@M}",
  ".hc-app-gift-lab{display:block;margin:8px 0 3px;font-weight:700}",
  ".hc-app-gift-in,.hc-app-gift-ta,.hc-app-gift-sel{display:block;width:100%;border:1px solid @L;border-radius:8px;padding:6px 8px;background:@B;color:@F;font:inherit;min-height:34px}",
  ".hc-app-gift-ta{min-height:84px;resize:none}",
  ".hc-app-gift-b{min-height:34px;padding:0 12px;border-radius:8px;border:1px solid @A;background:@A;color:@O;font-size:12px;font-weight:600;cursor:pointer}",
  ".hc-app-gift-b.hc-app-gift-g{background:transparent;color:@F;border-color:@L}",
  ".hc-app-gift-b.on{outline:2px solid @F}",
  ".hc-app-gift-b[disabled]{opacity:.6;cursor:default}",
  ".hc-app-gift-acts{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}",
  ".hc-app-gift-row{display:flex;gap:8px;align-items:center;justify-content:space-between;flex-wrap:wrap;padding:6px 0;border-top:1px solid @L}",
  ".hc-app-gift-row small,.hc-app-gift-sm{display:block;color:@M;font-size:12px}",
  ".hc-app-gift-chk{display:flex;gap:8px;align-items:center;min-height:34px;padding:2px 0}",
  ".hc-app-gift-chk input{width:20px;height:20px;flex:none}",
  ".hc-app-gift-chk span{flex:1}",
  ".hc-app-gift-chk em{display:block;font-style:normal;color:@M;font-size:12px}",
  ".hc-app-gift-out{margin:8px 0 0;padding:6px 8px;border:1px solid @L;border-radius:8px;background:@B;min-height:2.2em}",
  ".hc-app-gift-live{font-size:12px;color:@M}",
  ".hc-app-gift-hl{outline:3px solid @A;outline-offset:2px}",
  ".hc-app-gift-list{margin:0;padding:0;list-style:none}"
].join(''));
H.registerScreen('app-gift', function (root, api) {
  var q = function (s) { return root.querySelector(s); }, qa = function (s) { return [].slice.call(root.querySelectorAll(s)); };
  var P = "hc-app-gift-";
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
  var DICT = 'I can collect the photos this weekend.';
  function compose(o) {
    root.innerHTML = wrap(head(esc(o.title), 'Demo data. Nothing is sent.') +
      '<p class="hc-app-gift-p">' + esc(o.tag) + '</p>' +
      '<div class="hc-app-gift-row"><span>To</span><b>' + esc(o.to) + '</b></div><div class="hc-app-gift-row"><span>Subject</span><b>' + esc(o.subj) + '</b></div>' +
      '<label class="hc-app-gift-lab" for="hc-app-gift-ta">Message</label><textarea class="hc-app-gift-ta" id="hc-app-gift-ta" data-ta data-t="draft"></textarea>' +
      '<div class="hc-app-gift-acts"><button type="button" class="hc-app-gift-b" data-t="send">' + esc(o.send) + '</button>' + mic() + '</div>' + out(''));
    q('textarea').value = o.body;
    q('[data-t="send"]').addEventListener('click', function () { say(o.done + '. Demo only, nothing was sent.'); if (o.after) o.after(); });
  }
  micInit(DICT);

  compose({ title: 'Gift idea for Grandma', tag: 'Demo draft with a gift idea and a note.', to: 'Cousin Dev, Cousin Mina, Mom', subj: 'Gift idea for Grandma', body: "Hi all,\n\nFor Grandma's birthday, how about a framed family photo with a handwritten note from each of us? I can collect the photos if you send them to me.", send: 'Send with note', done: 'Gift idea sent with a note' });

});
})();
