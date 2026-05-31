(function(){
  var KEY='smallbizops_events_v1';
  function read(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return []}}
  function write(events){try{localStorage.setItem(KEY,JSON.stringify(events.slice(-100)))}catch(e){}}
  function params(){return Object.fromEntries(new URLSearchParams(location.search).entries())}
  function log(name, data){
    var event={name:name,ts:new Date().toISOString(),path:location.pathname,query:params(),data:data||{}};
    var events=read(); events.push(event); write(events);
    if(window.console) console.info('[SmallBizOps event]', event);
  }
  window.SmallBizOpsTrack={log:log,events:read};
  log('page_view',{referrer:document.referrer||''});
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[data-track],button[data-track]');
    if(!a) return;
    log(a.getAttribute('data-track')||'click',{text:(a.textContent||'').trim(),href:a.href||''});
  },true);
})();
