/* HMR card screen module: chat (narrow phone-style chat, made-up data). Loaded on demand by hmr-card.js.
   Targets (all by data-t): chat.typing, chat.input, chat.send, chat.free,
   and for slot N = 0..13 (slots appear in page order, so the card decides the order of events):
   chat.N.a (assistant bubble), chat.N.u (user bubble), chat.N.note, chat.N.tap (button),
   chat.N.rows + chat.N.r0..r7 (checklist rows, "label|small text", click toggles the tick),
   chat.N.ph + chat.N.p0..p5 (phones; chat.N.pK.msg = "New message", chat.N.pK.rep = the reply),
   chat.N.gauge (pick a number 0..100).
   Every text target takes the "type" verb (it fills the element), so no player change is needed. */
(function () {
var W = window, H = W.HMRCard; if (!H) return;
var esc = H.esc, SLOTS = 14, ROWS = 8, PHONES = 6;
H.css('hc-scr-chat', [
'.hc-chat{position:absolute;inset:0;display:flex;flex-direction:column;font-size:13px;line-height:1.4;color:@F;background:@S}',
'.hc-chat :focus-visible{outline:3px solid @F;outline-offset:2px}',
'.hc-chat-hd{display:flex;align-items:center;gap:8px;padding:8px 12px;border-bottom:1px solid @L;background:@B;font-weight:700}',
'.hc-chat-hd span{margin-left:auto;padding:0 8px;border:1px solid @A;border-radius:99px;font-size:11px}',
'.hc-chat-list{flex:1;overflow:auto;padding:10px 12px;display:flex;flex-direction:column;gap:8px}',
'.hc-chat-list [hidden]{display:none!important}',
'.hc-chat-slot{display:flex;flex-direction:column;gap:8px}',
'.hc-chat-b{max-width:86%;padding:7px 11px;border-radius:14px;overflow-wrap:anywhere}',
'.hc-chat-a{align-self:flex-start;background:@B;border:1px solid @L;border-bottom-left-radius:4px}',
'.hc-chat-u{align-self:flex-end;background:@A;color:@O;border-bottom-right-radius:4px}',
'.hc-chat-u::after{content:" \\2713\\2713";font-size:10px;opacity:.8;white-space:nowrap}',
'.hc-chat-note{align-self:center;text-align:center;padding:6px 10px;border:1px dashed @L;border-radius:10px;color:@M;font-size:12px}',
'.hc-chat-tap{align-self:center;min-height:34px;padding:0 16px;border-radius:99px;border:1px solid @A;background:transparent;color:@F;font-size:13px;font-weight:600;cursor:pointer}',
'.hc-chat-tap.hc-press{background:@A;color:@O}',
'.hc-chat-rows{border:1px solid @L;border-radius:10px;background:@B;overflow:hidden}',
'.hc-chat-row{display:flex;align-items:center;gap:8px;padding:7px 10px;border-top:1px solid @L;cursor:pointer}',
'.hc-chat-row:first-child{border-top:0}',
'.hc-chat-row:not(.has){display:none}',
'.hc-chat-k{flex:none;width:18px;height:18px;border-radius:5px;border:2px solid @M;display:inline-flex;align-items:center;justify-content:center;font-size:12px;line-height:1}',
'.hc-chat-row.on .hc-chat-k{background:@A;border-color:@A;color:@O}',
'.hc-chat-row.on .hc-chat-k::before{content:"\\2713"}',
'.hc-chat-l{flex:1;min-width:0}',
'.hc-chat-s{color:@M;font-size:12px;text-align:right;max-width:45%}',
'.hc-chat-s:empty{display:none}',
'.hc-chat-ph{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,92px),1fr));gap:8px}',
'.hc-chat-p{border:2px solid @L;border-radius:14px;padding:6px 8px;background:@B;min-height:64px}',
'.hc-chat-p:not(.has){display:none}',
'.hc-chat-p.ping{border-color:@A}',
'.hc-chat-p.rep{border-color:@F}',
'.hc-chat-pn{display:block;font-weight:700;font-size:12px}',
'.hc-chat-p em{color:@M;font-size:12px}',
'.hc-chat-p.ping em,.hc-chat-p.rep em{display:none}',
'.hc-chat-pm,.hc-chat-pr{font-size:12px}',
'.hc-chat-pm:empty,.hc-chat-pr:empty{display:none}',
'.hc-chat-p.rep .hc-chat-pm{display:none}',
'.hc-chat-g{border:1px solid @L;border-radius:10px;background:@B;padding:8px 12px}',
'.hc-chat-gn{font-size:12px;color:@M}',
'.hc-chat-gn b{font-size:26px;color:@F;line-height:1.1}',
'.hc-chat-gb{height:10px;border-radius:99px;background:@L;margin-top:6px;overflow:hidden}',
'.hc-chat-gb i{display:block;height:100%;width:0;background:@A;transition:width .9s ease}',
'@media (prefers-reduced-motion:reduce){.hc-chat-gb i{transition:none}}',
'.hc-chat-typing{align-self:flex-start;display:flex;gap:4px;padding:9px 12px;border:1px solid @L;border-radius:14px;background:@B}',
'.hc-chat-typing i{width:6px;height:6px;border-radius:50%;background:@M;display:block}',
'.hc-chat-bar{display:flex;gap:8px;align-items:flex-end;padding:8px 10px;border-top:1px solid @L;background:@B}',
'.hc-chat-in{flex:1;min-height:36px;height:36px;border:1px solid @L;border-radius:18px;padding:7px 12px;background:@S;color:@F;font-size:13px;line-height:1.3;resize:none;font-family:inherit}',
'.hc-chat-send{flex:none;min-height:36px;padding:0 14px;border-radius:18px;border:1px solid @A;background:@A;color:@O;font-size:13px;font-weight:600;cursor:pointer}'
].join(''));

/* make an element answer to the player's "type": el.value reads and writes its text */
function txt(el) {
  Object.defineProperty(el, 'value', {
    configurable: true,
    get: function () { return el.textContent; },
    set: function (v) { el.textContent = v; }
  });
  return el;
}

function chat(root, api) {
  var h = ['<div class="hc-chat"><div class="hc-chat-hd">Your assistant<span>Demo, made-up data</span></div><div class="hc-chat-list" data-list>'];
  var n, k;
  for (n = 0; n < SLOTS; n++) {
    var p = 'chat.' + n + '.';
    h.push('<div class="hc-chat-slot">',
      '<div class="hc-chat-b hc-chat-a" data-t="' + p + 'a" hidden></div>',
      '<div class="hc-chat-b hc-chat-u" data-t="' + p + 'u" hidden></div>',
      '<div class="hc-chat-note" data-t="' + p + 'note" hidden></div>',
      '<button type="button" class="hc-chat-tap" data-t="' + p + 'tap" hidden></button>',
      '<div class="hc-chat-rows" data-t="' + p + 'rows" hidden>');
    for (k = 0; k < ROWS; k++) h.push('<div class="hc-chat-row" data-row data-t="' + p + 'r' + k + '" role="checkbox" aria-checked="false" tabindex="0"><span class="hc-chat-k" aria-hidden="true"></span><span class="hc-chat-l" data-l></span><span class="hc-chat-s" data-s></span></div>');
    h.push('</div><div class="hc-chat-ph" data-t="' + p + 'ph" hidden>');
    for (k = 0; k < PHONES; k++) h.push('<div class="hc-chat-p" data-t="' + p + 'p' + k + '"><span class="hc-chat-pn" data-pn></span><em>Phone</em><div class="hc-chat-pm" data-t="' + p + 'p' + k + '.msg"></div><div class="hc-chat-pr" data-t="' + p + 'p' + k + '.rep"></div></div>');
    h.push('</div><div class="hc-chat-g" data-t="' + p + 'gauge" hidden><div class="hc-chat-gn"><b data-gv>0</b> / 100</div><div class="hc-chat-gb"><i></i></div></div></div>');
  }
  h.push('<div data-t="chat.free" class="hc-chat-slot"></div>',
    '<div class="hc-chat-typing" data-t="chat.typing" hidden aria-label="Typing"><i></i><i></i><i></i></div></div>',
    '<div class="hc-chat-bar"><textarea class="hc-chat-in" data-t="chat.input" rows="1" aria-label="Message (demo)" placeholder="Message"></textarea><button type="button" class="hc-chat-send" data-t="chat.send">Send</button></div></div>');
  root.innerHTML = h.join('');
  var list = root.querySelector('[data-list]');

  /* text targets take "type" through el.value */
  [].forEach.call(root.querySelectorAll('.hc-chat-b,.hc-chat-note,.hc-chat-tap,.hc-chat-pm,.hc-chat-pr'), function (el) { txt(el); });
  [].forEach.call(root.querySelectorAll('.hc-chat-g'), function (g) {
    var gv = g.querySelector('[data-gv]'), bar = g.querySelector('i');
    Object.defineProperty(g, 'value', { configurable: true, get: function () { return gv.textContent; }, set: function (v) {
      var x = Math.max(0, Math.min(100, parseInt(v, 10) || 0)); gv.textContent = x; bar.style.width = x + '%';
    } });
  });
  /* rows and phones keep their inner parts, so their value setters write into those */
  [].forEach.call(root.querySelectorAll('[data-row]'), function (r) {
    var l = r.querySelector('[data-l]'), s = r.querySelector('[data-s]');
    Object.defineProperty(r, 'value', { configurable: true, get: function () { return l.textContent; }, set: function (v) {
      var p = String(v).split('|'); l.textContent = p[0].trim(); s.textContent = (p[1] || '').trim();
    } });
  });
  [].forEach.call(root.querySelectorAll('.hc-chat-p'), function (ph) {
    var pn = ph.querySelector('[data-pn]');
    Object.defineProperty(ph, 'value', { configurable: true, get: function () { return pn.textContent; }, set: function (v) { pn.textContent = v; } });
  });

  function down() { list.scrollTop = list.scrollHeight; }
  if (W.MutationObserver) new W.MutationObserver(down).observe(list, { subtree: true, childList: true, attributes: true, attributeFilter: ['hidden', 'class'] });

  root.addEventListener('hc-typed', function (e) {
    var t = e.target, row = t.closest && t.closest('.hc-chat-row'), ph = t.closest && t.closest('.hc-chat-p');
    if (row) { row.classList.add('has'); return; }
    if (ph) {
      ph.classList.add('has');
      if (t.className === 'hc-chat-pm') ph.classList.add('ping');
      if (t.className === 'hc-chat-pr') { ph.classList.remove('ping'); ph.classList.add('rep'); }
    }
  });
  root.addEventListener('click', function (e) {
    var t = e.target, row = t.closest('.hc-chat-row'), tap = t.closest('.hc-chat-tap'), send = t.closest('.hc-chat-send');
    if (row) { var on = !row.classList.contains('on'); row.classList.toggle('on', on); row.setAttribute('aria-checked', on ? 'true' : 'false'); }
    else if (tap) tap.classList.add('hc-press');
    else if (send) {
      var inp = root.querySelector('[data-t="chat.input"]'), v = inp.value.trim(), auto = root.hasAttribute('data-auto');
      inp.value = '';
      if (v && !auto) { /* free play: your own message appears, nothing is sent anywhere */
        var free = root.querySelector('[data-t="chat.free"]'), b = document.createElement('div'), r = document.createElement('div');
        b.className = 'hc-chat-b hc-chat-u'; b.textContent = v;
        r.className = 'hc-chat-note'; r.textContent = 'Demo only. Nothing is sent.';
        free.appendChild(b); free.appendChild(r); down();
      }
    }
  });
  root.addEventListener('keydown', function (e) {
    var row = e.target.closest && e.target.closest('.hc-chat-row');
    if (row && (e.key === ' ' || e.key === 'Enter')) { e.preventDefault(); row.click(); }
  });
}
H.registerScreen('chat', chat);
})();
