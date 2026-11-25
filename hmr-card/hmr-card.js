/* hmr-card.js v1: HMR Card player. No dependencies, one global (HMRCard). See README.md. */
(function () {
'use strict';
var W = window, D = document;
if (W.HMRCard) return;
var SRC = (D.currentScript && D.currentScript.src) || '';
var BASE = (SRC || D.baseURI || '').replace(/[?#].*$/, '').replace(/[^\/]*$/, '');
var BAN = 'Demo only. Nothing is sent.';
var T = { fast: 120, base: 240, slow: 480, cur: 600 };
var SYN = !!(W.speechSynthesis && W.SpeechSynthesisUtterance);
var SCREENS = {}, S = null, timers = [], rid = 0, cssDone = false;

var CSS = [
'.hc-ov{--hc-bg:#0a0a0a;--hc-surface:#1c1c1c;--hc-line:#3a3a3a;--hc-fg:#f5f5f5;--hc-mut:#c8c8c8;--hc-accent:#ff6a1a;--hc-on:#0a0a0a;--hc-fast:120ms;--hc-base:240ms;--hc-slow:480ms;--hc-cursor:600ms;--hc-ease:cubic-bezier(.2,.8,.2,1);position:fixed;inset:0;z-index:2147483000;display:grid;place-items:center;padding:16px;background:rgba(0,0,0,.72);font:400 16px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;color:@F;animation:hc-fade var(--hc-base) var(--hc-ease)}',
'@media(prefers-color-scheme:light){.hc-ov{--hc-bg:#fff;--hc-surface:#f2f2f2;--hc-line:#8f8f8f;--hc-fg:#111;--hc-mut:#454545;--hc-accent:#b83c00;--hc-on:#fff}}',
'.hc-ov *{box-sizing:border-box;font-family:inherit;letter-spacing:0;text-transform:none}',
'.hc-ov [hidden]{display:none!important}',
'.hc-dlg{width:min(960px,calc(100vw - 32px));max-height:calc(100vh - 32px);max-height:calc(100dvh - 32px);overflow:auto;background:@B;border:1px solid @L;border-radius:12px;padding:16px;box-shadow:0 24px 80px rgba(0,0,0,.5)}',
'.hc-dlg:focus{outline:none}',
'.hc-hd{display:flex;gap:12px;align-items:flex-start;justify-content:space-between;margin-bottom:12px}',
'.hc-h{margin:0;font-size:20px;line-height:1.25;font-weight:700}',
'.hc-meta{margin:6px 0 0;display:flex;flex-wrap:wrap;gap:4px 12px;align-items:center;font-size:14px;color:@M}',
'.hc-ban{display:inline-block;padding:2px 10px;border:1px solid @A;border-radius:99px;color:@F;font-weight:600;font-size:13px}',
'.hc-b{min-height:44px;min-width:44px;padding:0 14px;display:inline-flex;align-items:center;justify-content:center;gap:6px;border:1px solid @L;border-radius:8px;background:@S;color:@F;font-size:14px;font-weight:600;cursor:pointer}',
'.hc-b:focus-visible{outline:3px solid @A;outline-offset:2px}',
'.hc-b[aria-pressed=true]{border-color:@A}',
'.hc-b:disabled{opacity:.45;cursor:default}',
'.hc-pri{background:@A;border-color:@A;color:@O}',
'.hc-x{font-size:24px;line-height:1;flex:none}',
'.hc-stage{position:relative;overflow:hidden;width:100%;aspect-ratio:16/9;background:@S;border:1px solid @L;border-radius:8px}',
'.hc-stage[data-f="4:5"]{aspect-ratio:4/5;max-width:520px;margin:0 auto}',
'.hc-stage[data-f="1:1"]{aspect-ratio:1;max-width:640px;margin:0 auto}',
'.hc-host{position:absolute;inset:0}',
'.hc-begin{position:absolute;inset:0;z-index:9;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:24px;text-align:center;background:@B}',
'.hc-intro{margin:0;max-width:34em;font-size:17px}',
'.hc-err{margin:16px 0;padding:12px;border:1px solid @A;border-radius:8px}',
'.hc-fb{margin:0}.hc-fb img{display:block;width:100%;height:auto;border:1px solid @L;border-radius:8px}.hc-fb .hc-err{margin:12px 0 0}',
'.hc-cap{margin:12px 0 0;min-height:3em;font-size:17px;font-weight:600;line-height:1.5}',
'.hc-fd{animation:hc-fade var(--hc-base) var(--hc-ease)}',
'.hc-off{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}',
'.hc-ctl{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}',
'@keyframes hc-fade{from{opacity:0}}',
'@keyframes hc-ring{0%{opacity:1;transform:scale(.4)}100%{opacity:0;transform:scale(1.8)}}',
'.hc-cur{position:absolute;left:0;top:0;width:24px;height:24px;z-index:8;pointer-events:none;transition:transform var(--hc-cursor) var(--hc-ease);filter:drop-shadow(0 2px 2px rgba(0,0,0,.4))}',
'.hc-cur::after{content:"";position:absolute;left:-7px;top:-8px;width:20px;height:20px;border-radius:50%;border:3px solid @A;opacity:0}',
'.hc-pulse::after{animation:hc-ring var(--hc-slow) var(--hc-ease)}',
'@media(max-width:480px){.hc-ov{padding:0;place-items:end center}.hc-dlg{width:100%;max-height:100vh;max-height:100dvh;border-radius:12px 12px 0 0}.hc-stage,.hc-stage[data-f]{aspect-ratio:4/5;max-width:none;margin:0}.hc-ctl{flex-wrap:nowrap;justify-content:space-between}.hc-ctl .hc-b{flex:1 1 0;padding:0}.hc-lb{display:none}.hc-h{font-size:18px}.hc-cap{font-size:16px}}',
'@media(prefers-reduced-motion:reduce){.hc-cur{transition:none}.hc-pulse::after{animation:none}}'
].join('').replace(/@([LAFBSMO])/g, function (x, c) { return 'var(--hc-' + { L: 'line', A: 'accent', F: 'fg', B: 'bg', S: 'surface', M: 'mut', O: 'on' }[c] + ')'; });

function el(tag, cls, txt) { var e = D.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
function later(fn, ms) {
  var id = setTimeout(function () { timers = timers.filter(function (x) { return x !== id; }); fn(); }, ms);
  timers.push(id); return id;
}
function sleep(ms) { return new Promise(function (r) { later(r, ms); }); }
function cancel() {
  timers.forEach(clearTimeout); timers = []; rid++;
  if (SYN) try { W.speechSynthesis.cancel(); } catch (e) {}
  if (S && S.cur) try { /* freeze a cursor glide where it is */
    var m = W.getComputedStyle(S.cur).transform;
    if (m && m !== 'none') { S.cur.style.transition = 'none'; S.cur.style.transform = m; }
  } catch (e2) {}
}
function reduced() { return !!(W.matchMedia && W.matchMedia('(prefers-reduced-motion: reduce)').matches); }


/* ---------- player ---------- */
function cursorTo(el, jump) {
  var c = S.cur, p = el.closest('.hc-pane'), r0 = el.getBoundingClientRect();
  c.hidden = false;
  if (p) { var pr = p.getBoundingClientRect(); if (r0.bottom > pr.bottom) p.scrollTop += r0.bottom - pr.bottom + 8; else if (r0.top < pr.top) p.scrollTop -= pr.top - r0.top + 8; }
  var a = S.stage.getBoundingClientRect(), r = el.getBoundingClientRect();
  var x = Math.max(0, r.left - a.left + Math.min(r.width * .55, r.width - 6)), y = Math.max(0, r.top - a.top + Math.min(r.height * .6, r.height - 4));
  c.style.transition = jump ? 'none' : '';
  c.style.transform = 'translate(' + x.toFixed(0) + 'px,' + y.toFixed(0) + 'px)';
}
function pulse() { S.cur.classList.remove('hc-pulse'); void S.cur.offsetWidth; S.cur.classList.add('hc-pulse'); }
function tgt(n) { return S.root.querySelector('[data-t="' + String(n).replace(/"/g, '') + '"]'); }
function fire(el) {
  S.root.setAttribute('data-auto', '1');
  el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: W }));
  S.root.removeAttribute('data-auto');
}
function effect(a, el) {
  var v = a[0];
  if (v === 'click') fire(el);
  else if (v === 'pick') { el.value = a[2]; el.dispatchEvent(new Event('change', { bubbles: true })); }
  else if (v === 'type') { el.value = (el.value.trim() + ' ' + a[2]).trim(); el.dispatchEvent(new Event('hc-typed', { bubbles: true })); }
}
/* silent: apply the result of an act with no waiting (used to rebuild state, and in manual mode) */
function quick(a, withCursor) {
  var v = a[0]; if (v === 'wait') return;
  var el = tgt(a[1]); if (!el) return;
  if (v === 'show' || v === 'hide') { el.hidden = v === 'hide'; return; }
  if (el.closest('[hidden]')) return;
  effect(a, el);
  if (withCursor) cursorTo(el, true);
}
async function animate(a, my) {
  var v = a[0];
  if (v === 'wait') { await sleep(a[1]); return; }
  var el = tgt(a[1]); if (!el) return;
  if (v === 'show' || v === 'hide') { el.hidden = v === 'hide'; return; }
  if (el.closest('[hidden]')) return;
  cursorTo(el, false); await sleep(T.cur); if (my !== rid) return;
  if (v === 'click') { el.classList.add('hc-hl'); await sleep(T.base); if (my !== rid) return; pulse(); effect(a, el); await sleep(T.base); el.classList.remove('hc-hl'); }
  else if (v !== 'move') { effect(a, el); await sleep(T.base); }
}
function holdFor(st) { return typeof st.hold === 'number' ? st.hold : Math.max(1800, 60 * st.say.length); }
function speak(t) {
  return new Promise(function (res) {
    if (!S.narr || !SYN) return res();
    try {
      var u = new W.SpeechSynthesisUtterance(t); u.lang = 'en-US'; u.rate = .98; u.onend = u.onerror = function () { res(); };
      W.speechSynthesis.cancel(); W.speechSynthesis.speak(u);
    } catch (e) { return res(); }
    later(res, t.length * 90 + 2000);
  });
}
async function play(i) {
  var my = rid, st = S.sc.steps[i];
  S.i = i; show(i);
  if (i === 0) { await sleep(T.slow); if (my !== rid) return; }
  var acts = (async function () { for (var k = 0; k < (st.act || []).length; k++) { await animate(st.act[k], my); if (my !== rid) return; } })();
  await Promise.all([acts, sleep(holdFor(st)), speak(st.say)]);
  if (my !== rid) return;
  await sleep(T.base); if (my !== rid) return;
  if (i + 1 < S.sc.steps.length) play(i + 1); else { S.mode = 'done'; S.cur.hidden = true; ui(); }
}
function show(i) {
  var st = S.sc.steps[i];
  S.cap.textContent = st.say; S.cap.classList.remove('hc-fd'); void S.cap.offsetWidth; S.cap.classList.add('hc-fd');
  ui();
}
function goto(i, auto) {
  cancel();
  S.host.textContent = ''; S.root = el('div', 'hc-scr'); S.host.appendChild(S.root);
  SCREENS[S.sc.screen || 'dashboard'](S.root, { later: later });
  S.cur.hidden = true; S.cur.style.transform = ''; S.cur.style.transition = '';
  var steps = S.sc.steps, k, j;
  for (k = 0; k < i; k++) for (j = 0; j < (steps[k].act || []).length; j++) quick(steps[k].act[j], false);
  S.i = i;
  if (auto && !S.manual) { S.mode = 'play'; play(i); }
  else {
    S.mode = S.manual ? 'manual' : (i === steps.length - 1 ? 'done' : 'pause');
    for (j = 0; j < (steps[i].act || []).length; j++) quick(steps[i].act[j], true);
    show(i);
  }
}
function ui() {
  var n = S.sc.steps.length, st = S.sc.steps[S.i], b = S.btn, pl = S.mode === 'play';
  S.st.textContent = S.begun ? 'Step ' + (S.i + 1) + ' of ' + n : '';
  ['prev', 'pause', 'next', 'replay'].forEach(function (k) { b[k].disabled = !S.begun; });
  b.prev.disabled = !S.begun || S.i === 0;
  b.next.disabled = !S.begun || S.i >= n - 1;
  b.pause.hidden = S.manual;
  b.pause.disabled = !S.begun || S.mode === 'done';
  var paused = S.mode === 'pause', lab = paused ? 'Resume' : 'Pause';
  b.pause.setAttribute('aria-label', lab); b.pause.title = lab;
  b.pause.firstChild.textContent = paused ? '▶' : '❚❚'; b.pause.lastChild.textContent = lab;
  b.caps.setAttribute('aria-pressed', S.caps ? 'true' : 'false');
  b.narr.setAttribute('aria-pressed', S.narr ? 'true' : 'false');
  S.cap.setAttribute('aria-live', S.narr ? 'off' : 'polite');
  S.cap.classList.toggle('hc-off', !S.caps);
  if (S.begun) { var free = st.free && !pl; if (free) S.stage.removeAttribute('inert'); else S.stage.setAttribute('inert', ''); }
}
function onBtn(k) {
  if (!S || !S.sc) return;
  var n = S.sc.steps.length, auto = S.mode === 'play' || S.mode === 'done';
  if (k === 'close') close();
  else if (k === 'begin') { S.begun = true; S.begin.hidden = true; goto(0, true); (S.manual ? S.btn.next : S.btn.pause).focus(); }
  else if (k === 'prev' && S.i > 0) goto(S.i - 1, auto);
  else if (k === 'next' && S.i < n - 1) goto(S.i + 1, auto);
  else if (k === 'pause') { if (S.mode === 'play') { cancel(); S.mode = 'pause'; ui(); } else if (S.mode === 'pause') goto(S.i, true); }
  else if (k === 'replay') goto(0, true);
  else if (k === 'caps') { S.caps = !S.caps; ui(); }
  else if (k === 'narr') { S.narr = !S.narr; if (!S.narr && SYN) try { W.speechSynthesis.cancel(); } catch (e) {} ui(); }
  if (S && S.begun) ui();
}

/* ---------- dialog ---------- */
function btnHTML(k, glyph, label, extra) { return '<button type="button" class="hc-b' + (extra || '') + '" data-k="' + k + '" aria-label="' + label + '" title="' + label + '"><span aria-hidden="true">' + glyph + '</span><span class="hc-lb">' + label + '</span></button>'; }
function open(id, opener) {
  if (S) close(true);
  if (!cssDone) { var s = el('style'); s.setAttribute('data-hc', ''); s.textContent = CSS; D.head.appendChild(s); cssDone = true; }
  var ov = el('div', 'hc-ov');
  ov.innerHTML = '<div class="hc-dlg" role="dialog" aria-modal="true" aria-labelledby="hc-t" tabindex="-1">' +
    '<div class="hc-hd"><div><h2 class="hc-h" id="hc-t">Loading</h2><p class="hc-meta"><span class="hc-ban">' + BAN + '</span><span class="hc-st" aria-hidden="true"></span></p></div><button type="button" class="hc-b hc-x" data-k="close" aria-label="Close">×</button></div>' +
    '<div class="hc-body"><div class="hc-stage" data-f="16:9"><div class="hc-host"></div><div class="hc-cur" hidden><svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M3 2l7.5 19 2.6-7.9L21 10.5z" style="fill:var(--hc-fg);stroke:var(--hc-bg)" stroke-width="1.5" stroke-linejoin="round"/></svg></div><div class="hc-begin"><p class="hc-intro">Loading the card.</p><button type="button" class="hc-b hc-pri" data-k="begin" disabled>Begin</button></div></div></div>' +
    '<p class="hc-cap" aria-live="polite" aria-atomic="true"></p>' +
    '<div class="hc-ctl">' + btnHTML('prev', '‹', 'Previous step') + btnHTML('pause', '❚❚', 'Pause') + btnHTML('next', '›', 'Next step') + btnHTML('replay', '↻', 'Replay') + btnHTML('caps', 'CC', 'Captions') + (SYN ? btnHTML('narr', '♪', 'Narration') : btnHTML('narr', '', 'Narration', '" hidden="hidden')) + '</div></div>';
  var d = ov.firstChild, q = function (s) { return ov.querySelector(s); };
  S = { id: id, ov: ov, dlg: d, opener: opener || D.activeElement, stage: q('.hc-stage'), host: q('.hc-host'), cur: q('.hc-cur'), cap: q('.hc-cap'), st: q('.hc-st'), begin: q('.hc-begin'), btn: {}, caps: true, narr: false, begun: false, mode: 'idle', i: 0, manual: reduced(), sc: null, ovx: D.documentElement.style.overflow };
  ['prev', 'pause', 'next', 'replay', 'caps', 'narr'].forEach(function (k) { S.btn[k] = q('[data-k=' + k + ']'); });
  ['prev', 'pause', 'next', 'replay'].forEach(function (k) { S.btn[k].disabled = true; });
  ov.addEventListener('click', function (e) { var b = e.target.closest('[data-k]'); if (b && !b.disabled) onBtn(b.getAttribute('data-k')); });
  ov.addEventListener('mousedown', function (e) { if (e.target === ov) close(); });
  D.documentElement.style.overflow = 'hidden';
  D.body.appendChild(ov); d.focus({ preventScroll: true });
  var me = S;
  load(id).then(function (sc) { check(sc); return screen(sc); }).then(function (sc) {
    if (S !== me) return;
    me.sc = sc;
    q('#hc-t').textContent = sc.title || id;
    me.stage.setAttribute('data-f', sc.frame || '16:9');
    q('.hc-intro').textContent = sc.intro || 'This is a short demo with made-up data. Nothing is sent.';
    me.btn.pause.hidden = me.manual;
    var bg = q('[data-k=begin]'); bg.disabled = false;
    var op = me.opener && me.opener.getAttribute ? me.opener : null;
    if (op && op.getAttribute('data-hmr-at') === 'end') { /* open straight into the card's last (free-play) step */
      me.begun = true; me.begin.hidden = true; goto(sc.steps.length - 1, false);
      var f = op.getAttribute('data-hmr-focus'); if (f) quick(['click', f], false);
      me.cur.hidden = true; ui(); me.dlg.focus({ preventScroll: true }); return;
    }
    bg.focus(); ui();
  }).catch(function (err) {
    if (S !== me) return;
    if (W.console) console.warn('hmr-card: ' + id + ': ' + (err && err.message));
    q('#hc-t').textContent = 'Demo not available here';
    q('.hc-body').innerHTML = '<figure class="hc-fb"><img src="' + BASE + 'still.svg" alt="A still picture of the demo dashboard, with made-up data." width="960" height="540"><figcaption class="hc-err" role="alert">This demo could not play on this device, so here is a still picture of it. Nothing is sent.</figcaption></figure>';
    q('.hc-ctl').hidden = true; q('.hc-cap').hidden = true; q('[data-k=close]').focus();
  });
}
function load(id) {
  var all = D.querySelectorAll('script[type="application/json"][data-hmr-scenario]');
  for (var i = 0; i < all.length; i++) if (all[i].getAttribute('data-hmr-scenario') === id) { var t = all[i].textContent; return Promise.resolve().then(function () { return JSON.parse(t); }); }
  if (!W.fetch) return Promise.reject(new Error('no fetch'));
  return W.fetch(BASE + 'cards/' + encodeURIComponent(id) + '.json?v=4').then(function (r) { if (!r.ok) throw new Error('not found'); return r.json(); });
}
function check(sc) {
  if (!sc || sc.schema !== 'hmr-card/1') throw new Error('unknown schema');
  if (!Array.isArray(sc.steps) || !sc.steps.length || sc.steps.some(function (s) { return typeof s.say !== 'string'; })) throw new Error('no steps');
}
function screen(sc) {
  var n = sc.screen || 'dashboard';
  if (SCREENS[n]) return Promise.resolve(sc);
  if (!/^[a-z0-9-]+$/.test(n)) return Promise.reject(new Error('unknown screen'));
  return new Promise(function (res, rej) {
    var s = D.createElement('script'); s.src = BASE + 'screens/' + n + '.js?v=4';
    s.onload = function () { SCREENS[n] ? res(sc) : rej(new Error('unknown screen')); };
    s.onerror = function () { rej(new Error('screen not found')); };
    D.head.appendChild(s);
  });
}
function close(quiet) {
  if (!S) return;
  var s = S; cancel(); S = null;
  s.ov.remove(); D.documentElement.style.overflow = s.ovx;
  if (!quiet && s.opener && s.opener.focus) try { s.opener.focus({ preventScroll: true }); } catch (e) {}
}
function focusables() {
  return [].filter.call(S.dlg.querySelectorAll('button,input,select,textarea,a[href],[tabindex]'), function (e) {
    return !e.disabled && e.tabIndex >= 0 && !e.closest('[hidden],[inert]');
  });
}
D.addEventListener('keydown', function (e) {
  if (!S) return;
  if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); return; }
  if (e.key !== 'Tab') return;
  var f = focusables(); if (!f.length) { e.preventDefault(); return; }
  var a = D.activeElement, i = f.indexOf(a);
  if (!S.dlg.contains(a) || i < 0 && !e.shiftKey) { e.preventDefault(); f[0].focus(); }
  else if (e.shiftKey && (i <= 0)) { e.preventDefault(); f[f.length - 1].focus(); }
  else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
}, true);
D.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-hmr-card]');
  if (b) { e.preventDefault(); open(b.getAttribute('data-hmr-card'), b); }
});

W.HMRCard = { open: open, close: close, esc: esc, css: function (id, text) { if (D.getElementById(id)) return; var s = D.createElement('style'); s.id = id; s.textContent = text.replace(/@([LAFBSMO])/g, function (x, c) { return 'var(--hc-' + { L: 'line', A: 'accent', F: 'fg', B: 'bg', S: 'surface', M: 'mut', O: 'on' }[c] + ')'; }); D.head.appendChild(s); }, registerScreen: function (name, mod) { if (typeof mod === 'function') SCREENS[name] = mod; } };
})();
