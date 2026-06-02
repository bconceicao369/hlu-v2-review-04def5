
(function(){
  var PAGES=[
    {f:'index.html',t:'⌂ Review Home',g:''},
    {f:'00-website.html',t:'Website (Home)',g:'V2 WEBSITE'},
    {f:'01-registration.html',t:'1 · Registration',g:'V2 WEBINAR FUNNEL'},
    {f:'02-watch.html',t:'2 · Watch Page',g:'V2 WEBINAR FUNNEL'},
    {f:'03-sales.html',t:'3 · Sales Page',g:'V2 WEBINAR FUNNEL'},
    {f:'04-checkout.html',t:'4 · Checkout',g:'V2 WEBINAR FUNNEL'},
    {f:'05-post-purchase.html',t:'5 · Post-Purchase',g:'V2 WEBINAR FUNNEL'},
    {f:'06-application.html',t:'6 · Application',g:'V2 WEBINAR FUNNEL'},
    {f:'transcript.html',t:'Webinar Transcript',g:'MATERIALS'},
    {f:'emails.html',t:'Email Sequence',g:'MATERIALS'}
  ];
  try{var mr=document.createElement('meta');mr.name='robots';mr.content='noindex,nofollow';document.head.appendChild(mr);}catch(e){}
  function base(p){p=p.split('?')[0].split('#')[0];var s=p.split('/');return s[s.length-1]||'index.html';}
  var cur=base(location.pathname); var idx=0;
  for(var i=0;i<PAGES.length;i++){if(PAGES[i].f===cur){idx=i;break;}}
  function toast(msg){
    var t=document.getElementById('__rv_toast');
    if(!t){t=document.createElement('div');t.id='__rv_toast';document.body.appendChild(t);
      t.style.cssText='position:fixed;left:50%;bottom:64px;transform:translateX(-50%);background:#111;color:#fff;padding:10px 16px;border-radius:8px;font:14px/1.4 -apple-system,Segoe UI,Roboto,sans-serif;z-index:2147483647;box-shadow:0 4px 20px rgba(0,0,0,.35);max-width:90vw;text-align:center;opacity:0;transition:opacity .2s';}
    t.textContent=msg;t.style.opacity='1';clearTimeout(t.__h);t.__h=setTimeout(function(){t.style.opacity='0';},2600);
  }
  // Disable the funnel's OWN live buttons/forms, but allow the review's own nav (#__rv_bar or [data-rv-allow])
  document.addEventListener('click',function(e){
    if(e.target.closest('#__rv_bar'))return;
    if(e.target.closest('[data-rv-allow]'))return;       // review home cards / back links / video links
    var el=e.target.closest('a,button,[role=button],input[type=submit],input[type=button],.cta,[onclick]');
    if(!el)return;
    var href=el.getAttribute&&el.getAttribute('href');
    if(href&&href.charAt(0)==='#')return;                // allow in-page scroll anchors
    e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();
    toast('Preview — this button is disabled. Use the bar below (or Review Home) to move between pages.');
  },true);
  document.addEventListener('submit',function(e){
    e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();
    toast('Preview — forms are disabled in this review.');
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
    sel.style.cssText='flex:1;max-width:340px;background:#13315c;color:#fff;border:0;border-radius:6px;padding:6px 8px;cursor:pointer';
    var oHome=document.createElement('option');oHome.value='index.html';oHome.textContent='⌂ Review Home';if(cur==='index.html')oHome.selected=true;sel.appendChild(oHome);
    var groups={},order=[];
    PAGES.forEach(function(p){if(p.f==='index.html')return;if(!groups[p.g]){groups[p.g]=[];order.push(p.g);}groups[p.g].push(p);});
    order.forEach(function(g){var og=document.createElement('optgroup');og.label=g;groups[g].forEach(function(p){var o=document.createElement('option');o.value=p.f;o.textContent=p.t;if(p.f===cur)o.selected=true;og.appendChild(o);});sel.appendChild(og);});
    sel.addEventListener('change',function(){go(sel.value);});
    prev.addEventListener('click',function(){go(PAGES[Math.max(0,idx-1)].f);});
    next.addEventListener('click',function(){go(PAGES[Math.min(PAGES.length-1,idx+1)].f);});
    var spacer=document.createElement('span');spacer.style.flex='1';
    bar.appendChild(lab);bar.appendChild(spacer);bar.appendChild(prev);bar.appendChild(sel);bar.appendChild(next);
    document.body.appendChild(bar);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();
