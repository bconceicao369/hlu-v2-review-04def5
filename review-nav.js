(function(){
  var PAGES=[
    {f:'index.html',t:'⌂ Review Home',g:''},
    {f:'00-website.html',t:'Website (Home)',g:'V2 WEBSITE'},
    {f:'01-registration.html',t:'1 · Registration',g:'WEBINAR FUNNEL'},
    {f:'02-watch.html',t:'2 · Watch Page',g:'WEBINAR FUNNEL'},
    {f:'booking-final.html',t:'3 · Book a Call',g:'WEBINAR FUNNEL'},
    {f:'07-confirmed.html',t:'4 · Booking Confirmed',g:'WEBINAR FUNNEL'},
    {f:'03-sales.html',t:'Sales / Offer',g:'POST-CALL CHECKOUT'},
    {f:'04-checkout.html',t:'Checkout',g:'POST-CALL CHECKOUT'},
    {f:'05-post-purchase.html',t:'Post-Purchase / Welcome',g:'POST-CALL CHECKOUT'},
    {f:'transcript.html',t:'Webinar Transcript',g:'MATERIALS'},
    {f:'emails.html',t:'Email Copy',g:'MATERIALS'}
  ];
  try{var mr=document.createElement('meta');mr.name='robots';mr.content='noindex,nofollow';document.head.appendChild(mr);}catch(e){}
  function base(p){p=p.split('?')[0].split('#')[0];var s=p.split('/');return s[s.length-1]||'index.html';}
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  function clean(t){return t.replace(/^[^A-Za-z0-9]+/,'').trim();}
  var cur=base(location.pathname); var idx=0;
  for(var i=0;i<PAGES.length;i++){if(PAGES[i].f===cur){idx=i;break;}}
  function curLabel(){for(var i=0;i<PAGES.length;i++){if(PAGES[i].f===cur)return clean(PAGES[i].t);}return cur;}
  function toast(msg){
    var t=document.getElementById('__rv_toast');
    if(!t){t=document.createElement('div');t.id='__rv_toast';document.body.appendChild(t);
      t.style.cssText='position:fixed;left:50%;bottom:64px;transform:translateX(-50%);background:#111;color:#fff;padding:10px 16px;border-radius:8px;font:14px/1.4 -apple-system,Segoe UI,Roboto,sans-serif;z-index:2147483647;box-shadow:0 4px 20px rgba(0,0,0,.35);max-width:90vw;text-align:center;opacity:0;transition:opacity .2s';}
    t.textContent=msg;t.style.opacity='1';clearTimeout(t.__h);t.__h=setTimeout(function(){t.style.opacity='0';},2800);
  }
  // ---- disable the funnel's own buttons/forms, allow review chrome ----
  document.addEventListener('click',function(e){
    if(e.target.closest('#__rv_bar')||e.target.closest('#__rv_fb'))return;
    if(e.target.closest('[data-rv-allow]'))return;
    var el=e.target.closest('a,button,[role=button],input[type=submit],input[type=button],.cta,[onclick]');
    if(!el)return;
    var href=el.getAttribute&&el.getAttribute('href');
    if(href&&href.charAt(0)==='#')return;
    e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();
    toast('Preview — this button is disabled. Use the bar below to move between pages.');
  },true);
  document.addEventListener('submit',function(e){
    if(e.target.closest('#__rv_fb'))return;
    e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();
    toast('Preview — forms are disabled in this review.');
  },true);
  try{window.open=function(){toast('Preview only');return null;};}catch(e){}
  // ---- feedback: sends straight to Brandon (FormSubmit), one note per page ----
  var NMKEY='hlu_v2_fb_name';
  function go(f){location.href=f;}
  function build(){
    if(!document.body)return setTimeout(build,50);
    document.body.style.paddingBottom='52px';
    var bar=document.createElement('div');bar.id='__rv_bar';
    bar.style.cssText='position:fixed;left:0;right:0;bottom:0;min-height:46px;display:flex;align-items:center;gap:8px;padding:5px 10px;background:#0b1f3a;color:#fff;font:13px/1.2 -apple-system,Segoe UI,Roboto,sans-serif;z-index:2147483647;box-shadow:0 -2px 12px rgba(0,0,0,.3);flex-wrap:wrap';
    var lab=document.createElement('span');lab.innerHTML='🔍 <b>COACH REVIEW</b> — HireLevel V2 <span style="opacity:.6">(preview)</span>';lab.style.whiteSpace='nowrap';
    var spacer=document.createElement('span');spacer.style.flex='1';
    var fbtn=document.createElement('button');fbtn.id='__rv_fbbtn';fbtn.innerHTML='💬 Leave feedback';
    fbtn.style.cssText='background:#1f7a4d;color:#fff;border:0;border-radius:6px;padding:7px 11px;cursor:pointer;font-size:13px;font-weight:700;white-space:nowrap';
    var prev=document.createElement('button');prev.textContent='←';prev.title='Previous';
    var next=document.createElement('button');next.textContent='→';next.title='Next';
    [prev,next].forEach(function(b){b.style.cssText='background:#13315c;color:#fff;border:0;border-radius:6px;padding:6px 10px;cursor:pointer;font-size:14px';});
    var sel=document.createElement('select');
    sel.style.cssText='background:#13315c;color:#fff;border:0;border-radius:6px;padding:6px 8px;cursor:pointer;max-width:240px';
    var oHome=document.createElement('option');oHome.value='index.html';oHome.textContent='⌂ Review Home';if(cur==='index.html')oHome.selected=true;sel.appendChild(oHome);
    var groups={},order=[];
    PAGES.forEach(function(p){if(p.f==='index.html')return;if(!groups[p.g]){groups[p.g]=[];order.push(p.g);}groups[p.g].push(p);});
    order.forEach(function(g){var og=document.createElement('optgroup');og.label=g;groups[g].forEach(function(p){var o=document.createElement('option');o.value=p.f;o.textContent=p.t;if(p.f===cur)o.selected=true;og.appendChild(o);});sel.appendChild(og);});
    sel.addEventListener('change',function(){go(sel.value);});
    prev.addEventListener('click',function(){go(PAGES[Math.max(0,idx-1)].f);});
    next.addEventListener('click',function(){go(PAGES[Math.min(PAGES.length-1,idx+1)].f);});
    bar.appendChild(lab);bar.appendChild(spacer);bar.appendChild(fbtn);bar.appendChild(prev);bar.appendChild(sel);bar.appendChild(next);
    document.body.appendChild(bar);
    var panel=document.createElement('div');panel.id='__rv_fb';
    panel.style.cssText='position:fixed;right:10px;bottom:56px;width:min(430px,94vw);background:#fff;border:1px solid #cdd8e6;border-radius:12px;box-shadow:0 8px 40px rgba(0,0,0,.28);z-index:2147483647;display:none;font:14px/1.5 -apple-system,Segoe UI,Roboto,sans-serif;color:#1c2733';
    document.body.appendChild(panel);
    function renderFB(){
      var lbl=curLabel();
      panel.innerHTML='<div style="background:#0b1f3a;color:#fff;padding:10px 14px;border-radius:12px 12px 0 0;font-weight:700;display:flex;justify-content:space-between;align-items:center">Feedback — '+esc(lbl)+'<span id="__rv_x" style="cursor:pointer;opacity:.85">✕</span></div>'+
        '<div style="padding:12px 14px">'+
        '<input id="__rv_nm" placeholder="Your name (optional)" value="'+esc(localStorage.getItem(NMKEY)||'')+'" style="width:100%;padding:8px;border:1px solid #dce3ec;border-radius:6px;margin-bottom:8px;font-size:14px">'+
        '<textarea id="__rv_ta" placeholder="Your feedback on this page…" style="width:100%;min-height:120px;padding:9px;border:1px solid #dce3ec;border-radius:6px;resize:vertical;font:14px/1.5 inherit"></textarea>'+
        '<button id="__rv_send" style="width:100%;margin-top:10px;background:#1f7a4d;color:#fff;border:0;border-radius:6px;padding:10px;cursor:pointer;font-weight:700;font-size:14px">Send to Brandon →</button>'+
        '<div style="font-size:12px;color:#8a98a8;margin-top:8px">Goes straight to Brandon, tagged with this page. Leave a note on any page — as many as you like.</div>'+
        '</div>';
      panel.querySelector('#__rv_x').onclick=function(){panel.style.display='none';};
      var nm=panel.querySelector('#__rv_nm');nm.addEventListener('input',function(){try{localStorage.setItem(NMKEY,nm.value);}catch(e){}});
      panel.querySelector('#__rv_send').onclick=function(){
        var ta=panel.querySelector('#__rv_ta');var txt=(ta.value||'').trim();
        if(!txt){toast('Type some feedback first');return;}
        var btn=this;btn.disabled=true;btn.textContent='Sending…';
        var to=String.fromCharCode(98,99,111,110,99,101,105,99,97,111,50,51,64,103,109,97,105,108,46,99,111,109);
        fetch('https://formsubmit.co/ajax/'+to,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},
          body:JSON.stringify({_subject:'Coach feedback: '+lbl,Page:lbl,Reviewer:(nm.value||'(anonymous)'),Feedback:txt})})
          .then(function(r){return r.json();})
          .then(function(d){ta.value='';btn.disabled=false;btn.textContent='Send to Brandon →';toast('Sent to Brandon ✓ — thank you!');panel.style.display='none';})
          .catch(function(){btn.disabled=false;btn.textContent='Send to Brandon →';toast('Could not send — check your connection and try again');});
      };
    }
    fbtn.onclick=function(){if(panel.style.display!=='block'){renderFB();panel.style.display='block';}else{panel.style.display='none';}};
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();
