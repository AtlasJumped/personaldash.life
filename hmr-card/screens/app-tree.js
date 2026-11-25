/* HMR card screen module: app-tree (click-through mini-app, made-up data, nothing is sent). Loaded on demand by hmr-card.js. */
(function () {
var W = window, H = W.HMRCard; if (!H) return;
var esc = H.esc;
H.css('hc-scr-app-tree', [
  ".hc-app-tree-w{position:absolute;inset:0;overflow:auto;padding:10px 12px 14px;font-size:13px;line-height:1.4;color:@F;background:@S;box-sizing:border-box}",
  ".hc-app-tree-w *{box-sizing:border-box}",
  ".hc-app-tree-w :focus-visible{outline:3px solid @F;outline-offset:2px}",
  ".hc-app-tree-h{margin:0 0 2px;font-size:15px;line-height:1.2}",
  ".hc-app-tree-tag{margin:0 0 8px;font-size:12px;color:@M}",
  ".hc-app-tree-p{margin:0 0 8px;color:@M}",
  ".hc-app-tree-lab{display:block;margin:8px 0 3px;font-weight:700}",
  ".hc-app-tree-in,.hc-app-tree-ta,.hc-app-tree-sel{display:block;width:100%;border:1px solid @L;border-radius:8px;padding:6px 8px;background:@B;color:@F;font:inherit;min-height:34px}",
  ".hc-app-tree-ta{min-height:84px;resize:none}",
  ".hc-app-tree-b{min-height:34px;padding:0 12px;border-radius:8px;border:1px solid @A;background:@A;color:@O;font-size:12px;font-weight:600;cursor:pointer}",
  ".hc-app-tree-b.hc-app-tree-g{background:transparent;color:@F;border-color:@L}",
  ".hc-app-tree-b.on{outline:2px solid @F}",
  ".hc-app-tree-b[disabled]{opacity:.6;cursor:default}",
  ".hc-app-tree-acts{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}",
  ".hc-app-tree-row{display:flex;gap:8px;align-items:center;justify-content:space-between;flex-wrap:wrap;padding:6px 0;border-top:1px solid @L}",
  ".hc-app-tree-row small,.hc-app-tree-sm{display:block;color:@M;font-size:12px}",
  ".hc-app-tree-chk{display:flex;gap:8px;align-items:center;min-height:34px;padding:2px 0}",
  ".hc-app-tree-chk input{width:20px;height:20px;flex:none}",
  ".hc-app-tree-chk span{flex:1}",
  ".hc-app-tree-chk em{display:block;font-style:normal;color:@M;font-size:12px}",
  ".hc-app-tree-out{margin:8px 0 0;padding:6px 8px;border:1px solid @L;border-radius:8px;background:@B;min-height:2.2em}",
  ".hc-app-tree-live{font-size:12px;color:@M}",
  ".hc-app-tree-hl{outline:3px solid @A;outline-offset:2px}",
  ".hc-app-tree-list{margin:0;padding:0;list-style:none}",
  ".hc-app-tree-svg{display:block;width:100%;max-width:360px;margin:0 auto;height:auto}",
  ".hc-app-tree-svg [role=button]{cursor:pointer}.hc-app-tree-svg circle{fill:@B;stroke:@F;stroke-width:1.5}",
  ".hc-app-tree-svg .on circle{fill:@A;stroke:@A}",
  ".hc-app-tree-svg text{fill:@F;font-size:12px}",
  ".hc-app-tree-tags li{padding:5px 0;border-top:1px solid @L;color:@M}.hc-app-tree-tags b{color:@F}"
].join(''));
H.registerScreen('app-tree', function (root, api) {
  var q = function (s) { return root.querySelector(s); }, qa = function (s) { return [].slice.call(root.querySelectorAll(s)); };
  var P = "hc-app-tree-";
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

  var PPL = [['Grandma', 118, 34], ['Grandpa', 242, 34], ['Aunt', 52, 108], ['Mom', 138, 108], ['Dad', 222, 108], ['Uncle', 308, 108], ['Cousin', 52, 192], ['You', 180, 192], ['Cousin', 308, 192]];
  var NOTE = 'Each person decides how much of their branch is public.';
  root.innerHTML = wrap(head('Family tree', 'Demo data. Invented people. Nothing is sent.') +
    '<p class="hc-app-tree-p">Tap a person to share their branch with the whole tree.</p>' +
    '<svg class="hc-app-tree-svg" viewBox="0 0 360 250" aria-label="A family tree. Grandma and Grandpa at the top, their children below, and You between two cousins at the bottom.">' +
    '<g fill="none" stroke="currentColor" stroke-width="1.5" opacity=".5"><path d="M118 34H242M180 34V66M52 66H308M52 66V94M138 66V94M308 66V94M152 108H208M180 108V178M52 142V178M308 142V178"/></g>' +
    PPL.map(function (p, i) { return '<g role="button" tabindex="0" aria-pressed="false" data-node="' + i + '" data-t="n' + i + '" aria-label="' + p[0] + ': share branch"><circle cx="' + p[1] + '" cy="' + p[2] + '" r="14"/><text x="' + p[1] + '" y="' + (p[2] + 28) + '" text-anchor="middle">' + p[0] + '</text></g>'; }).join('') + '</svg>' +
    out(NOTE) +
    '<ul class="hc-app-tree-list hc-app-tree-tags" style="margin-top:8px"><li><b>Family</b> Any contact a member shares is visible to the whole tree.</li><li><b>Friends</b> Shared only with the friends you pick.</li><li><b>Work</b> Kept apart from family and friends unless you say so.</li></ul>');
  function tog(g) {
    var on = g.getAttribute('aria-pressed') !== 'true'; g.setAttribute('aria-pressed', on ? 'true' : 'false'); g.classList.toggle('on', on);
    var n = qa('[data-node].on').length; say(n ? n + ' branch' + (n > 1 ? 'es' : '') + ' shared with the tree (demo).' : NOTE);
  }
  root.addEventListener('click', function (e) { var g = e.target.closest('[data-node]'); if (g) tog(g); });
  root.addEventListener('keydown', function (e) { var g = e.target.closest && e.target.closest('[data-node]'); if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); tog(g); } });

});
})();
