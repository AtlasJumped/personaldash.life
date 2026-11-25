/* HMR card screen module: app-family (click-through mini-app, made-up data, nothing is sent). Loaded on demand by hmr-card.js. */
(function () {
var W = window, H = W.HMRCard; if (!H) return;
var esc = H.esc;
H.css('hc-scr-app-family', [
  ".hc-app-family-w{position:absolute;inset:0;overflow:auto;padding:10px 12px 14px;font-size:13px;line-height:1.4;color:@F;background:@S;box-sizing:border-box}",
  ".hc-app-family-w *{box-sizing:border-box}",
  ".hc-app-family-w :focus-visible{outline:3px solid @F;outline-offset:2px}",
  ".hc-app-family-h{margin:0 0 2px;font-size:15px;line-height:1.2}",
  ".hc-app-family-tag{margin:0 0 8px;font-size:12px;color:@M}",
  ".hc-app-family-p{margin:0 0 8px;color:@M}",
  ".hc-app-family-lab{display:block;margin:8px 0 3px;font-weight:700}",
  ".hc-app-family-in,.hc-app-family-ta,.hc-app-family-sel{display:block;width:100%;border:1px solid @L;border-radius:8px;padding:6px 8px;background:@B;color:@F;font:inherit;min-height:34px}",
  ".hc-app-family-ta{min-height:84px;resize:none}",
  ".hc-app-family-b{min-height:34px;padding:0 12px;border-radius:8px;border:1px solid @A;background:@A;color:@O;font-size:12px;font-weight:600;cursor:pointer}",
  ".hc-app-family-b.hc-app-family-g{background:transparent;color:@F;border-color:@L}",
  ".hc-app-family-b.on{outline:2px solid @F}",
  ".hc-app-family-b[disabled]{opacity:.6;cursor:default}",
  ".hc-app-family-acts{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}",
  ".hc-app-family-row{display:flex;gap:8px;align-items:center;justify-content:space-between;flex-wrap:wrap;padding:6px 0;border-top:1px solid @L}",
  ".hc-app-family-row small,.hc-app-family-sm{display:block;color:@M;font-size:12px}",
  ".hc-app-family-chk{display:flex;gap:8px;align-items:center;min-height:34px;padding:2px 0}",
  ".hc-app-family-chk input{width:20px;height:20px;flex:none}",
  ".hc-app-family-chk span{flex:1}",
  ".hc-app-family-chk em{display:block;font-style:normal;color:@M;font-size:12px}",
  ".hc-app-family-out{margin:8px 0 0;padding:6px 8px;border:1px solid @L;border-radius:8px;background:@B;min-height:2.2em}",
  ".hc-app-family-live{font-size:12px;color:@M}",
  ".hc-app-family-hl{outline:3px solid @A;outline-offset:2px}",
  ".hc-app-family-list{margin:0;padding:0;list-style:none}",
  ".hc-app-family-bd li{display:flex;justify-content:space-between;gap:8px;padding:5px 0;border-top:1px solid @L}.hc-app-family-bd em{font-style:normal;color:@M}"
].join(''));
H.registerScreen('app-family', function (root, api) {
  var q = function (s) { return root.querySelector(s); }, qa = function (s) { return [].slice.call(root.querySelectorAll(s)); };
  var P = "hc-app-family-";
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
      '<p class="hc-app-family-p">' + esc(o.tag) + '</p>' +
      '<div class="hc-app-family-row"><span>To</span><b>' + esc(o.to) + '</b></div><div class="hc-app-family-row"><span>Subject</span><b>' + esc(o.subj) + '</b></div>' +
      '<label class="hc-app-family-lab" for="hc-app-family-ta">Message</label><textarea class="hc-app-family-ta" id="hc-app-family-ta" data-ta data-t="draft"></textarea>' +
      '<div class="hc-app-family-acts"><button type="button" class="hc-app-family-b" data-t="send">' + esc(o.send) + '</button>' + mic() + '</div>' + out(''));
    q('textarea').value = o.body;
    q('[data-t="send"]').addEventListener('click', function () { say(o.done + '. Demo only, nothing was sent.'); if (o.after) o.after(); });
  }
  micInit(DICT);

  function list() {
    root.innerHTML = wrap(head('The people who matter, one button away', 'Demo data. Nothing is sent.') +
      '<p class="hc-app-family-p">Parents own the family information, and children\'s dashboards inherit it. Reaching the whole family takes one click.</p>' +
      '<p class="hc-app-family-lab" style="margin-top:0">Who should get it</p>' +
      ['Cousin Dev', 'Cousin Mina', 'Cousin Theo', 'Cousin Ana'].map(function (n, i) { return '<label class="hc-app-family-chk"><input type="checkbox" checked data-fname="' + n + '" data-t="f' + i + '"><span>' + n + '</span></label>'; }).join('') +
      '<ul class="hc-app-family-list hc-app-family-bd" style="margin:8px 0"><li><span>Grandma</span><em>Birthday in 9 days</em></li><li><span>Cousin Mina</span><em>Birthday in 3 weeks</em></li><li><span>Uncle</span><em>Birthday next month</em></li></ul>' +
      '<div class="hc-app-family-acts"><button type="button" class="hc-app-family-b" data-t="go">Message all selected cousins</button></div>' + out(''));
    q('[data-t="go"]').addEventListener('click', function () {
      var names = qa('[data-fname]').filter(function (i) { return i.checked; }).map(function (i) { return i.getAttribute('data-fname'); });
      if (!names.length) { say('Check at least one cousin first.'); return; }
      compose({ title: 'Message your cousins', tag: 'Demo draft.', to: names.join(', '), subj: 'Hello from the family dashboard', body: "Hi everyone,\n\nI was thinking of you and wanted to say hello. How are you doing? Let's plan a video call soon.", send: 'Send to all', done: 'Sent to ' + names.length + ' cousin' + (names.length > 1 ? 's' : ''),
        after: null }); (function () { var a = q('.' + P + 'acts'), bk = document.createElement('button'); bk.type = 'button'; bk.className = P + 'b ' + P + 'g'; bk.setAttribute('data-t', 'back'); bk.textContent = 'Back to the family'; bk.addEventListener('click', list); a.appendChild(bk); })();
    });
  }
  list();

});
})();
