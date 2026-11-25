/* HMR card screen module: dashboard (seven tabs, made-up data). Loaded on demand by hmr-card.js. */
(function () {
var W = window, H = W.HMRCard; if (!H) return;
var esc = H.esc;
H.css('hc-scr-dashboard', [
'.hc-scr{position:absolute;inset:0;display:flex;flex-direction:column;font-size:13px;line-height:1.4;color:@F;background:@S}',
'.hc-scr :focus-visible{outline:3px solid @F;outline-offset:2px}',
'.hc-mt{display:flex;flex-wrap:wrap;justify-content:space-between;gap:2px 10px;padding:8px 12px;border-bottom:1px solid @L;background:@B;color:@M}',
'.hc-mt b{color:@F}',
'.hc-demo{margin-left:6px;padding:0 8px;border:1px solid @A;border-radius:99px;font-size:11px;font-weight:700;color:@F}',
'.hc-tabs{display:flex;flex-wrap:wrap;gap:4px;padding:6px 10px;border-bottom:1px solid @L}',
'.hc-tab{min-height:32px;padding:0 12px;border-radius:99px;border:1px solid @L;background:@B;color:@F;font-size:12px;font-weight:600;cursor:pointer}',
'.hc-tab[aria-selected=true]{background:@A;border-color:@A;color:@O}',
'.hc-pane{flex:1;overflow:auto;padding:10px 14px}',
'.hc-pane h4{margin:0 0 8px;font-size:15px;line-height:1.2}',
'.hc-pane p{margin:0 0 8px;color:@M}',
'.hc-row{display:flex;gap:8px;align-items:center;justify-content:space-between;flex-wrap:wrap;padding:6px 0;border-top:1px solid @L}',
'.hc-row small{display:block;color:@M;font-size:12px}',
'.hc-mb{min-height:32px;padding:0 12px;border-radius:8px;border:1px solid @A;background:@A;color:@O;font-size:12px;font-weight:600;cursor:pointer}',
'.hc-mb.hc-g{background:transparent;color:@F}',
'.hc-hl{outline:3px solid @A;outline-offset:2px}',
'.hc-comp{margin-top:8px;padding:8px;border:1px solid @L;border-radius:10px;background:@B}',
'.hc-lab{margin:0 0 4px!important;font-weight:700;color:@F!important}',
'.hc-ta{display:block;width:100%;min-height:60px;border:1px solid @L;border-radius:8px;padding:6px 8px;background:@S;color:@F;font-size:13px;line-height:1.4;resize:none}',
'.hc-acts{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:6px}',
'.hc-send{margin-left:auto}',
'.hc-mic{display:inline-flex;align-items:center;gap:4px}',
'.hc-mic.on{background:#d92d3d;border-color:#d92d3d;color:#fff}',
'.hc-live{font-size:12px;color:@M;min-height:1.2em}',
'.hc-metrics{display:grid;grid-template-columns:repeat(auto-fit,minmax(70px,1fr));gap:6px;margin-bottom:8px}',
'.hc-metrics div{border:1px solid @L;border-radius:8px;padding:6px 8px;font-size:12px;color:@M}',
'.hc-metrics b{display:block;font-size:20px;line-height:1.1;color:@F}',
'.hc-cal{display:grid;gap:4px;margin:6px 0}',
'.hc-cal div{display:grid;grid-template-columns:64px repeat(4,1fr);gap:4px;align-items:center;font-size:12px;color:@M}',
'.hc-cal i{height:18px;border-radius:5px;background:@L;display:block}',
'.hc-cal i.f{background:@A}',
'.hc-cal i.b{background:repeating-linear-gradient(45deg,@L,@L 4px,@B 4px,@B 8px)}',
'.hc-cols{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr));gap:10px;margin:6px 0}',
'.hc-cols ul{margin:4px 0 0 16px;padding:0;color:@M}',
'.hc-sel{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:6px 0}',
'.hc-sel select{min-height:32px;max-width:100%;padding:0 8px;border:1px solid @L;border-radius:8px;background:@B;color:@F;font-size:13px}',
'.hc-out{padding:8px 10px;border-left:4px solid @A;background:@B;border-radius:6px;margin:6px 0}',
'.hc-out ol{margin:4px 0 0 18px;padding:0}',
'.hc-kid{padding:8px 10px;border:1px solid @L;border-radius:10px;margin:6px 0;background:@B}',
'.hc-kid small{display:block;color:@M}',
'.hc-kid em{display:block;color:@M;margin:2px 0}',
'.hc-opts{display:flex;flex-direction:column;align-items:flex-start;gap:6px;margin-bottom:6px}',
'.hc-note{position:absolute;left:50%;bottom:10px;transform:translateX(-50%);z-index:7;max-width:calc(100% - 20px);padding:6px 14px;border-radius:99px;background:@F;color:@B;font-size:13px;font-weight:600;text-align:center;opacity:0;transition:opacity var(--hc-base);pointer-events:none}',
'.hc-note.on{opacity:1}'
].join(''));
/* ---------- screen module: dashboard (seven tabs, made-up data) ---------- */
var MAILS = [
  ['Aunt Rosa', 'Reunion dates this summer', 'Hi Rosa, thank you for the reunion dates. The second weekend works for us, and I can bring a side dish.', 'I will bring a salad.'],
  ['Cousin Dev', 'Grandma birthday card idea', 'Hi Dev, great idea. My favorite memory for Grandma is the summer we baked her recipe together. Please add it to the card.', 'Please mail it on Monday.'],
  ['Mom', 'Holiday plans', 'Hi Mom, thanks for asking about the holidays. I would love to come, and the guest room sounds perfect. I will send my travel dates soon.', 'I land on the twentieth.']
];
var PROFILES = [
  ['Grandparent new to AI', 'Example result: you connect more than a grandparent new to AI, who usually only chats. Next step: try one connector, such as your calendar.'],
  ['Medium user', 'Example result: you match a medium user. You prompt well and use a few connectors. Next step: add files, so your assistant can find your documents.'],
  ['Expert home user', 'Example result: an expert home user also keeps reusable instructions and picks models on purpose. Next step: save your favorite prompt as a reusable instruction.'],
  ['Power home user with local GPUs', 'Example result: a power home user also runs jobs on their own machines and schedules them. Next step: let your assistant run one task on a schedule.'],
  ['Software engineer', 'Example result: a software engineer works in code and tests what the AI writes. You do not need that to benefit. Next step: ask for a tutorial on the one task you repeat most.']
];
var REPLIES = ['Ha. That is exactly you. Calmest one in the tub.', 'I love this. Who are the ducks?', 'This made my afternoon. Send me more of these.'];
var MIC = '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0M12 17v4M9 21h6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function dashHTML() {
  function comp(n, lab, init, dict, send, msg, hid) {
    return '<div class="hc-comp" data-comp' + (hid ? ' hidden' : '') + '><p class="hc-lab" data-lab>' + lab + '</p><textarea class="hc-ta" data-mic="none" data-t="' + n + '.draft" aria-label="Message text">' + esc(init) + '</textarea><div class="hc-acts"><button class="hc-mb hc-g hc-mic" data-a="mic" data-t="' + n + '.mic" data-dict="' + esc(dict) + '" aria-pressed="false" aria-label="Microphone, demo only">' + MIC + ' Mic</button><span class="hc-live" data-live aria-live="polite"></span><button class="hc-mb hc-send" data-a="send" data-t="' + n + '.send" data-msg="' + esc(msg) + '">' + send + '</button></div></div>';
  }
  var rows = MAILS.map(function (m, i) { return '<div class="hc-row"><span><b>' + esc(m[0]) + '</b><small>' + esc(m[1]) + '</small></span><button class="hc-mb hc-g" data-a="reply" data-v="' + i + '" data-t="inbox.reply' + i + '" aria-label="Reply to ' + esc(m[0]) + '">Reply</button></div>'; }).join('');
  var opts = '<option value="">Pick a profile</option>' + PROFILES.map(function (p, i) { return '<option value="' + i + '">' + esc(p[0]) + '</option>'; }).join('');
  var tabs = [['today', 'Today'], ['inbox', 'Inbox'], ['work', 'Work'], ['agenda', 'Agenda'], ['journey', 'My AI Journey'], ['closer', 'Closer'], ['integrations', 'Integrations']].map(function (t) { return '<button class="hc-tab" role="tab" data-a="tab" data-v="' + t[0] + '" data-t="tab:' + t[0] + '" aria-selected="false">' + t[1] + '</button>'; }).join('');
  function pane(n, hid, body) { return '<div class="hc-pane" role="tabpanel" data-pane="' + n + '"' + (hid ? ' hidden' : '') + '>' + body + '</div>'; }
  return ('<div class="hc-mt"><span><b>My dashboard</b><span class="hc-demo">Demo data</span></span><span>Last refreshed: just now</span></div>' +
  '<div class="hc-tabs" role="tablist" aria-label="Dashboard tabs">' + tabs + '</div>' +
  pane('today', 0, '<h4>Today: your top three</h4><div data-t="today.list"><div class="hc-row"><span>Reply to Mom about the holidays<small>Waiting since Monday</small></span><button class="hc-mb hc-g" data-a="tab" data-v="inbox">Open inbox</button></div><div class="hc-row"><span>Send the weekly recruiting recap<small>Due today</small></span><button class="hc-mb hc-g" data-a="tab" data-v="work">Open work</button></div><div class="hc-row"><span>Pick a week for the trip<small>Friends are free in week 3</small></span><button class="hc-mb hc-g" data-a="tab" data-v="agenda">Open agenda</button></div></div>') +
  pane('inbox', 1, '<h4>Inbox: needs a reply</h4>' + rows + comp('inbox', 'Reply', '', '', 'Send', 'Demo only. Nothing was sent.', 1)) +
  pane('work', 1, '<h4>Work: weekly recruiting recap</h4><div class="hc-metrics" data-t="work.metrics"><div><b>12</b>Open roles</div><div><b>31</b>Interviews</div><div><b>4</b>Offers out</div><div><b>2</b>Accepted</div></div><p>In the real dashboard, these numbers come from the systems you connect.</p>' + comp('work', 'Post to #hiring-managers', 'Weekly recruiting recap: 12 open roles, 31 interviews, 4 offers out, 2 accepted.', 'Please add your interview availability by Friday.', 'Send to team chat', 'Demo only. Nothing was sent to the team chat.', 0)) +
  pane('agenda', 1, '<h4>Agenda: find a week</h4><div class="hc-cal" data-t="agenda.cal" role="img" aria-label="Calendars: you and two friends are all free in week 3"><div><b>You</b><i></i><i></i><i class="f"></i><i></i></div><div><b>Friend A</b><i class="b"></i><i></i><i class="f"></i><i></i></div><div><b>Friend B</b><i></i><i class="b"></i><i class="f"></i><i class="b"></i></div><div><span></span><span>Wk 1</span><span>Wk 2</span><span>Wk 3</span><span>Wk 4</span></div></div><button class="hc-mb" data-a="trip" data-t="agenda.trip">Suggest a trip</button>' + comp('agenda', 'Suggested group message', '', 'I can drive if we pick somewhere close.', 'Start the group chat', 'Demo only. No group chat was started.', 1)) +
  pane('journey', 1, '<h4>My AI Journey</h4><p>Example data. In your real dashboard, this comes from what your assistant can see.</p><div class="hc-cols" data-t="journey.cols"><div><b>Accounts and connectors</b><ul><li>Assistant, chat</li><li>Email connector</li><li>Calendar connector</li><li>Not connected: files, team chat</li></ul></div><div><b>What you do most</b><ul><li>Drafting replies</li><li>Planning trips</li><li>Summarizing long emails</li></ul></div></div><div class="hc-sel"><label for="hc-cmp">Compare me to</label><select id="hc-cmp" data-t="journey.compare">' + opts + '</select><button class="hc-mb hc-g" data-a="cmp" data-t="journey.go">How do I compare?</button></div><div class="hc-out" data-cmpout hidden aria-live="polite"></div><button class="hc-mb" data-a="tut" data-t="journey.tut">Give me a tutorial based on my usage</button><div class="hc-out" data-tutout hidden><b>Tutorial: summarize a long email thread</b><ol><li>Open the thread and copy it into your assistant.</li><li>Say: "Summarize this in five lines and list what I owe."</li><li>Read the list and fix anything wrong.</li><li>Say: "Draft my reply from that list."</li><li>Edit the draft, then send it yourself.</li></ol></div>') +
  pane('closer', 1, '<h4>Bringing humans closer</h4><p><i>Made-up family. Made-up message. This shows what it would look like.</i></p><div class="hc-kid" data-t="closer.kid"><small>From Milo, 4:12 pm</small><em>[picture: a capybara sitting calmly in a hot tub while a dozen ducks flap around it]</em>this is lowkey me 💀</div><div class="hc-cols"><div data-t="closer.bare"><b>Bare chatbot</b><p><i>What it knows:</i> Nothing about you. Nothing about Milo.</p><p>"Lowkey" means "somewhat" and the skull emoji often means something is very funny. You could reply with a laughing emoji, or ask your child what they meant.</p><p><i>Not wrong. Not much help either.</i></p></div><div><b>Your assistant with your dashboard</b><p><i>What it knows (demo data):</i></p><ul><li>You: Dana, born 1984. Millennial.</li><li>Milo: your son, 13, born 2013. Generation Alpha.</li><li>Milo likes skateboarding, drawing, and capybaras.</li><li>From your notes: Milo started at a new school in September, and you said it is loud.</li><li>Your last three texts to Milo were reminders about chores.</li></ul></div></div><button class="hc-mb" data-a="signal" data-t="closer.signal">Read the signal</button><div class="hc-out" data-t="closer.read" data-signalout hidden aria-live="polite"><p><b>What it means:</b> "Lowkey me" means "this is a bit like me." The skull means he is laughing. He is saying he is the calm one while everything around him is noisy.</p><p><b>What kind of signal:</b> Sharing a laugh, and telling you a little about how school feels. He is not asking for advice.</p><p><b>How sure:</b> Fairly sure about the joke. Less sure about the school part. That is a guess from your notes, so do not push on it.</p><p><b>What to do:</b> Laugh with him first. He sent you his favorite animal, which means he wanted you to see it.</p><p><b>Reply options</b></p><div class="hc-opts">' + REPLIES.map(function (r, i) { return '<button class="hc-mb hc-g" data-a="opt" data-v="' + i + '" data-t="closer.opt' + i + '">' + (i + 1) + '. ' + esc(r) + '</button>'; }).join('') + '</div><p>These are drafts. Nothing is sent until you say yes.</p></div>' + comp('closer', 'Reply to Milo', '', 'Love you, see you at dinner.', 'Send to Milo', 'Demo only. Nothing was sent.', 1)) +
  pane('integrations', 1, '<h4>Integrations and partnerships</h4><p><i>Made-up example. Yours shows your own connections.</i></p><div class="hc-cols" data-t="integrations.cols"><div><b>Connected now</b><ul><li>Email: feeds Inbox</li><li>Calendar: feeds Agenda</li><li>Weather: feeds Today</li></ul></div><div><b>Suggested for you</b><ul><li>Meetup: local groups that match your interests. Coming later.</li><li>Instagram and Facebook: your pages in one place. Coming later.</li><li>Photos: family pictures on your Today tab. Coming later.</li></ul></div></div><p><b>Staying up to date:</b> say "refresh my dashboard", or ask your AI to refresh it on a schedule if it can.</p><p><b>Coming later: HMR family.</b> A bookmark, a desktop app and a phone app, with a dashboard that updates itself.</p>') +
  '<div class="hc-note" role="status"></div>').replace(/<button /g, '<button type="button" ');
}

function dashboard(r, api) {
  r.innerHTML = dashHTML();
  var q = function (s) { return r.querySelector(s); }, noteT = 0;
  function pane(n) {
    [].forEach.call(r.querySelectorAll('.hc-pane'), function (p) { p.hidden = p.getAttribute('data-pane') !== n; p.scrollTop = 0; });
    [].forEach.call(r.querySelectorAll('.hc-tab'), function (b) { b.setAttribute('aria-selected', b.getAttribute('data-v') === n ? 'true' : 'false'); });
  }
  function note(m) { var x = q('.hc-note'); x.textContent = m; x.classList.add('on'); clearTimeout(noteT); noteT = api.later(function () { x.classList.remove('on'); }, 2400); }
  function comp(sel) { var c = q('[data-pane=' + sel + '] [data-comp]'); c.hidden = false; return c; }
  r.addEventListener('click', function (e) {
    var b = e.target.closest('[data-a]'); if (!b || !r.contains(b)) return;
    var a = b.getAttribute('data-a'), v = b.getAttribute('data-v'), c, auto = r.hasAttribute('data-auto');
    if (a === 'tab') pane(v);
    else if (a === 'reply') { var m = MAILS[+v]; c = comp('inbox'); c.querySelector('[data-lab]').innerHTML = 'Reply to <b>' + esc(m[0]) + '</b>'; c.querySelector('textarea').value = m[2]; c.querySelector('[data-a=mic]').setAttribute('data-dict', m[3]); }
    else if (a === 'trip') { c = comp('agenda'); c.querySelector('textarea').value = 'Hey all, I noticed our calendars are all free in week 3. Want me to set up a group chat to plan a trip?'; }
    else if (a === 'opt') { c = comp('closer'); c.querySelector('textarea').value = REPLIES[+v]; }
    else if (a === 'mic') {
      c = b.closest('[data-comp]');
      var on = !b.classList.contains('on');
      b.classList.toggle('on', on); b.setAttribute('aria-pressed', on ? 'true' : 'false');
      c.querySelector('[data-live]').textContent = on ? 'Listening (demo, nothing is recorded)' : '';
      if (on && !auto) api.later(function () { /* free play: the demo "hears" the stored words */
        b.classList.remove('on'); b.setAttribute('aria-pressed', 'false'); c.querySelector('[data-live]').textContent = '';
        var ta = c.querySelector('textarea'); ta.value = (ta.value.trim() + ' ' + (b.getAttribute('data-dict') || '')).trim();
      }, 1800);
    }
    else if (a === 'send') note(b.getAttribute('data-msg') || BAN);
    else if (a === 'cmp') { var sv = q('[data-t="journey.compare"]').value, o = q('[data-cmpout]'); o.hidden = false; o.textContent = sv === '' ? 'Pick a profile first.' : PROFILES[+sv][1]; }
    else if (a === 'tut') q('[data-tutout]').hidden = false;
    else if (a === 'signal') q('[data-signalout]').hidden = false;
  });
  r.addEventListener('hc-typed', function (e) { /* scripted dictation arrived: mic switches off */
    var c = e.target.closest('[data-comp]'); if (!c) return;
    var b = c.querySelector('[data-a=mic]'); b.classList.remove('on'); b.setAttribute('aria-pressed', 'false'); c.querySelector('[data-live]').textContent = '';
  });
  pane('today');
}
H.registerScreen('dashboard', dashboard);
})();
