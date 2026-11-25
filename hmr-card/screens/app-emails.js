/* HMR card screen module: app-emails (click-through mini-app, made-up data, nothing is sent). Loaded on demand by hmr-card.js. */
(function () {
var W = window, H = W.HMRCard; if (!H) return;
var esc = H.esc;
H.css('hc-scr-app-emails', [
  ".hc-app-emails-w{position:absolute;inset:0;overflow:auto;padding:10px 12px 14px;font-size:13px;line-height:1.4;color:@F;background:@S;box-sizing:border-box}",
  ".hc-app-emails-w *{box-sizing:border-box}",
  ".hc-app-emails-w :focus-visible{outline:3px solid @F;outline-offset:2px}",
  ".hc-app-emails-h{margin:0 0 2px;font-size:15px;line-height:1.2}",
  ".hc-app-emails-tag{margin:0 0 8px;font-size:12px;color:@M}",
  ".hc-app-emails-p{margin:0 0 8px;color:@M}",
  ".hc-app-emails-lab{display:block;margin:8px 0 3px;font-weight:700}",
  ".hc-app-emails-in,.hc-app-emails-ta,.hc-app-emails-sel{display:block;width:100%;border:1px solid @L;border-radius:8px;padding:6px 8px;background:@B;color:@F;font:inherit;min-height:34px}",
  ".hc-app-emails-ta{min-height:84px;resize:none}",
  ".hc-app-emails-b{min-height:34px;padding:0 12px;border-radius:8px;border:1px solid @A;background:@A;color:@O;font-size:12px;font-weight:600;cursor:pointer}",
  ".hc-app-emails-b.hc-app-emails-g{background:transparent;color:@F;border-color:@L}",
  ".hc-app-emails-b.on{outline:2px solid @F}",
  ".hc-app-emails-b[disabled]{opacity:.6;cursor:default}",
  ".hc-app-emails-acts{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}",
  ".hc-app-emails-row{display:flex;gap:8px;align-items:center;justify-content:space-between;flex-wrap:wrap;padding:6px 0;border-top:1px solid @L}",
  ".hc-app-emails-row small,.hc-app-emails-sm{display:block;color:@M;font-size:12px}",
  ".hc-app-emails-chk{display:flex;gap:8px;align-items:center;min-height:34px;padding:2px 0}",
  ".hc-app-emails-chk input{width:20px;height:20px;flex:none}",
  ".hc-app-emails-chk span{flex:1}",
  ".hc-app-emails-chk em{display:block;font-style:normal;color:@M;font-size:12px}",
  ".hc-app-emails-out{margin:8px 0 0;padding:6px 8px;border:1px solid @L;border-radius:8px;background:@B;min-height:2.2em}",
  ".hc-app-emails-live{font-size:12px;color:@M}",
  ".hc-app-emails-hl{outline:3px solid @A;outline-offset:2px}",
  ".hc-app-emails-list{margin:0;padding:0;list-style:none}",
  ".hc-app-emails-em{padding:8px 0;border-top:1px solid @L}.hc-app-emails-em.off{opacity:.6}",
  ".hc-app-emails-em .t{display:flex;gap:8px;align-items:center;justify-content:space-between}",
  ".hc-app-emails-em .t span.hc-app-emails-sm{display:inline}",
  ".hc-app-emails-em p{margin:4px 0;color:@M;font-size:12px}",
  ".hc-app-emails-em .c{display:flex;gap:14px;flex-wrap:wrap}",
  ".hc-app-emails-em label{display:flex;gap:6px;align-items:center;min-height:30px}",
  ".hc-app-emails-em input{width:18px;height:18px}",
  ".hc-app-emails-mv{display:flex;gap:4px}.hc-app-emails-mv .hc-app-emails-b{min-height:30px;padding:0 8px}"
].join(''));
H.registerScreen('app-emails', function (root, api) {
  var q = function (s) { return root.querySelector(s); }, qa = function (s) { return [].slice.call(root.querySelectorAll(s)); };
  var P = "hc-app-emails-";
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

  var EM = [
    { from: 'Aunt Rosa', subj: 'Reunion dates this summer', sum: 'Rosa is choosing dates for the family reunion and has two weekends in mind. She asks which one works for you and if you can bring a side dish.' },
    { from: 'Cousin Dev', subj: 'Grandma birthday card idea', sum: 'Dev wants everyone to sign one big card for Grandma. He asks if you can send a favorite memory by Monday.' },
    { from: 'Mom', subj: 'Holiday plans', sum: 'Mom is asking where you will be for the holidays. The guest room is free. She would like your travel dates soon.' },
    { from: 'Uncle Marcus', subj: 'Old photos found', sum: 'Marcus found a box of old family photos and is scanning them. He asks if you can help identify people in a few pictures.' },
    { from: 'Cousin Mina', subj: 'Moving to a new city', sum: 'Mina is moving next month and has a new address to share. She wants to set up a video call with the cousins.' },
    { from: 'Grandma', subj: 'Thank you for the call', sum: 'Grandma loved your last call and kept the photos you sent. She would like another call on Sunday.' }
  ];
  var st = EM.map(function (e, i) { return { i: i, reply: true, ai: true }; });
  function listView() {
    root.innerHTML = wrap(head('Family emails', 'Demo data. Nothing is sent.') +
      '<p class="hc-app-emails-p">We found 6 family emails that may need a reply. Uncheck what you want to skip, reorder with Up and Down, then press Let\'s go.</p>' +
      '<div class="hc-app-emails-chk"><span><b>Select all</b></span><label><input type="checkbox" data-t="all-reply"> Reply</label><label><input type="checkbox" data-t="all-ai"> AI draft</label></div>' +
      '<div data-t="list"></div>' +
      '<label class="hc-app-emails-lab" for="hc-app-emails-ctx">Tell us what to say, before any draft is written</label><textarea class="hc-app-emails-ta" id="hc-app-emails-ctx" style="min-height:64px" data-t="ctx" data-ta placeholder="For example: I can\'t make that weekend, say it kindly."></textarea>' +
      '<div class="hc-app-emails-acts"><span class="hc-app-emails-sm" data-t="count"></span><button type="button" class="hc-app-emails-b" data-t="go" style="margin-left:auto">Let\'s go</button>' + mic() + '</div>' + out(''));
    renderList();
    q('[data-t="all-reply"]').addEventListener('change', function (e) { st.forEach(function (s) { s.reply = e.target.checked; }); renderList(); });
    q('[data-t="all-ai"]').addEventListener('change', function (e) { st.forEach(function (s) { if (s.reply) s.ai = e.target.checked; }); renderList(); });
    q('[data-t="go"]').addEventListener('click', go);
  }
  function renderList() {
    var box = q('[data-t="list"]');
    box.innerHTML = st.map(function (s, k) {
      var e = EM[s.i];
      return '<div class="hc-app-emails-em' + (s.reply ? '' : ' off') + '"><div class="t"><span><b>' + (k + 1) + '. ' + esc(e.from) + '</b> <span class="hc-app-emails-sm">' + esc(e.subj) + '</span></span><span class="hc-app-emails-mv"><button type="button" class="hc-app-emails-b hc-app-emails-g" data-mv="-1" data-t="up' + k + '" aria-label="Move ' + esc(e.from) + ' up"' + (k === 0 ? ' disabled' : '') + '>Up</button><button type="button" class="hc-app-emails-b hc-app-emails-g" data-mv="1" data-t="down' + k + '" aria-label="Move ' + esc(e.from) + ' down"' + (k === st.length - 1 ? ' disabled' : '') + '>Down</button></span></div><p>' + esc(e.sum) + '</p><div class="c"><label><input type="checkbox" data-f="reply" data-k="' + k + '" data-t="r' + k + '"' + (s.reply ? ' checked' : '') + '> Reply</label><label><input type="checkbox" data-f="ai" data-k="' + k + '" data-t="a' + k + '"' + (s.ai ? ' checked' : '') + (s.reply ? '' : ' disabled') + '> AI draft</label></div></div>';
    }).join('');
    var n = st.filter(function (s) { return s.reply; }).length, na = st.filter(function (s) { return s.reply && s.ai; }).length;
    q('[data-t="count"]').textContent = n + ' of ' + st.length + ' will get a reply';
    var sr = q('[data-t="all-reply"]'), sa = q('[data-t="all-ai"]');
    sr.checked = n === st.length; sr.indeterminate = n > 0 && n < st.length;
    sa.checked = n > 0 && na === n; sa.indeterminate = na > 0 && na < n;
  }
  root.addEventListener('click', function (e) {
    var b = e.target.closest('[data-mv]'); if (!b || b.disabled) return;
    var k = +b.closest('.' + P + 'em').querySelector('[data-k]').getAttribute('data-k'), j = k + +b.getAttribute('data-mv');
    if (j < 0 || j >= st.length) return;
    var t = st[k]; st[k] = st[j]; st[j] = t; renderList();
    var nb = q('[data-t="' + (b.getAttribute('data-mv') === '-1' ? 'up' : 'down') + j + '"]'); if (nb && !nb.disabled) nb.focus({ preventScroll: true });
  });
  root.addEventListener('change', function (e) {
    var c = e.target; if (!c.getAttribute || !c.getAttribute('data-f')) return;
    st[+c.getAttribute('data-k')][c.getAttribute('data-f')] = c.checked; renderList();
  });
  function go() {
    var qd = st.filter(function (s) { return s.reply; });
    if (!qd.length) { say('Check at least one email to reply to.'); return; }
    var ctx = q('[data-t="ctx"]').value.trim(), n = 0;
    function step() {
      if (n >= qd.length) {
        root.innerHTML = wrap(head('That was the last one', 'Demo data. Nothing was sent.') + '<p class="hc-app-emails-p">In the real dashboard, each reply goes out from the right inbox, with that provider\'s formatting.</p><div class="hc-app-emails-acts"><button type="button" class="hc-app-emails-b" data-t="back">Back to the list</button></div>');
        q('[data-t="back"]').addEventListener('click', listView); return;
      }
      var s = qd[n], e = EM[s.i], first = e.from.replace(/^(Aunt|Uncle|Cousin)\s+/, '');
      var body = s.ai ? 'Hi ' + first + ',\n\nThank you for writing about "' + e.subj + '". ' + (ctx ? 'Here is what I want to say, based on my notes: ' + ctx.slice(0, 160) + (ctx.length > 160 ? '...' : '') + '\n\n' : 'I will get back to you with details soon.\n\n') + 'Love,\nYou' : '';
      root.innerHTML = wrap(head('Reply ' + (n + 1) + ' of ' + qd.length, 'Demo data. Nothing is sent.') +
        '<div class="hc-app-emails-row"><span>To</span><b>' + esc(e.from) + '</b></div><div class="hc-app-emails-row"><span>Subject</span><b>Re: ' + esc(e.subj) + '</b></div>' +
        (s.ai ? '<p class="hc-app-emails-tag">Demo AI draft. Your own assistant would write the real one.</p>' : '') +
        '<label class="hc-app-emails-lab" for="hc-app-emails-rb">Message</label><textarea class="hc-app-emails-ta" id="hc-app-emails-rb" data-t="draft"></textarea>' +
        '<p class="hc-app-emails-p" style="margin-top:8px"><b>Original message:</b> ' + esc(e.sum) + '</p>' +
        '<div class="hc-app-emails-acts"><button type="button" class="hc-app-emails-b hc-app-emails-g" data-t="skip">Skip</button><button type="button" class="hc-app-emails-b" data-t="send">' + (n + 1 < qd.length ? 'Send, then next' : 'Send') + '</button></div>');
      q('textarea').value = body;
      q('[data-t="send"]').addEventListener('click', function () { n++; step(); });
      q('[data-t="skip"]').addEventListener('click', function () { n++; step(); });
    }
    step();
  }
  micInit('Say it kindly.');
  listView();

});
})();
