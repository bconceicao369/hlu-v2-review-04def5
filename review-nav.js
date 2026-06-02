
(function(){
  var PAGES=[
    {f:'index.html',t:'⌂ Review Home'},
    {f:'00-website.html',t:'1 · Website'},
    {f:'01-registration.html',t:'2 · Registration'},
    {f:'02-watch.html',t:'3 · Watch Page'},
    {f:'03-sales.html',t:'4 · Sales Page'},
    {f:'04-checkout.html',t:'5 · Checkout'},
    {f:'05-post-purchase.html',t:'6 · Post-Purchase'},
    {f:'06-application.html',t:'7 · Application'},
    {f:'transcript.html',t:'▶ Transcript'},
    {f:'emails.html',t:'✉ Email Sequence'}
  ];
  try{var mr=document.createElement('meta');mr.name='robots';mr.content='noindex,nofollow';document.head.appendChild(mr);}catch(e){}
  function base(p){p=p.split('?')[0].split('#')[0];var s=p.split('/');return s[s.length-1]||'index.html';}
  var cur=base(location.pathname); var idx=0;
  for(var i=0;i<PAGES.length;i++){if(PAGES[i].f===cur){idx=i;break;}}
  function toast(msg){
    var t=document.getElementById('__rv_toast');
    if(!t){t=document.createElement('div');t.id='__rv_toast';document.body.appendChild(t);
      t.style.cssText='position:fixed;left:50%;bottom:64px;transform:translateX(-50%);background:#111;color:#fff;padding:10px 16px;border-radius:8px;font:14px/1.4 -apple-system,Segoe UI,Roboto,sans-serif;z-index:2147483647;box-shadow:0 4px 20px rgba(0,0,0,.35);max-width:90vw;text-align:center;opacity:0;transition:opacity .2s';}
    t.textContent=msg;t.style.opacity='1';clearTimeout(t.__h);t.__h=setTimeout(function(){t.style.opacity='0';},2300);
  }
  // Neutralize live buttons / links / forms (capture phase so page handlers never fire)
  document.addEventListener('click',function(e){
    if(e.target.closest('#__rv_bar'))return;
    var el=e.target.closest('a,button,[role=button],input[type=submit],input[type=button],.cta,[onclick]');
    if(!el)return;
    var href=el.getAttribute&&el.getAttribute('href');
    if(href&&href.charAt(0)==='#')return;            // allow in-page scroll anchors
    e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();
    toast('Preview only — this button is live in the real funnel');
  },true);
  document.addEventListener('submit',function(e){
    e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();
    toast('Preview only — forms are disabled in this review');
  },true);
  try{window.open=function(){toast('Preview only');return null;};}catch(e){}
  function go(f){location.href=f;}
  function build(){
    if(!document.body)return setTimeout(build,50);
    document.body.style.paddingBottom='52px';
    var bar=document.createElement('div');bar.id='__rv_bar';
    bar.style.cssText='position:fixed;left:0;right:0;bottom:0;height:46px;display:flex;align-items:center;gap:8px;padding:0 10px;background:#0b1f3a;color:#fff;font:13px/1.2 -apple-system,Segoe UI,Roboto,sans-serif;z-index:2147483647;box-shadow:0 -2px 12px rgba(0,0,0,.3)';
    var lab=document.createElement('span');lab.innerHTML='🔍 <b>COACH REVIEW</b> — HireLevel V2 <span style="opacity:.6">(preview)</span>';lab.style.whiteSpace='nowrap';
    var prev=document.createElement('button');prev.textContent='←';prev.title='Previous';
    var next=document.createElement('button');next.textContent='→';next.title='Next';
    [prev,next].forEach(function(b){b.style.cssText='background:#13315c;color:#fff;border:0;border-radius:6px;padding:6px 10px;cursor:pointer;font-size:14px';});
    var sel=document.createElement('select');
    sel.style.cssText='flex:1;max-width:320px;background:#13315c;color:#fff;border:0;border-radius:6px;padding:6px 8px;cursor:pointer';
    PAGES.forEach(function(p,i){var o=document.createElement('option');o.value=p.f;o.textContent=p.t;if(i===idx)o.selected=true;sel.appendChild(o);});
    sel.addEventListener('change',function(){go(sel.value);});
    prev.addEventListener('click',function(){go(PAGES[Math.max(0,idx-1)].f);});
    next.addEventListener('click',function(){go(PAGES[Math.min(PAGES.length-1,idx+1)].f);});
    var spacer=document.createElement('span');spacer.style.flex='1';
    bar.appendChild(lab);bar.appendChild(spacer);bar.appendChild(prev);bar.appendChild(sel);bar.appendChild(next);
    document.body.appendChild(bar);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();
