@php
    $title = 'Hero Tools';
@endphp
<!doctype html>
<html lang="pt-br">
<head>
<meta charset="utf-8">
<title>{{ $title }}</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
:root { --bg:#0b1324; --panel:#131c2f; --muted:#8aa0c7; --text:#e6eefc; --ok:#2ecc71; --warn:#f1c40f; --err:#e74c3c; --chip:#1f2a44; --chipText:#c9d6f5; }
*{box-sizing:border-box}
body{margin:0;background:radial-gradient(1000px 600px at 20% -10%,#14203b 0%,var(--bg) 60%),linear-gradient(180deg,#0b1324, #0a1120);color:var(--text);font-family:Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;}
.container{max-width:1100px;margin:32px auto;padding:0 16px}
.header{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}
.h1{font-weight:800;font-size:30px}
.btn{background:#1d2a44;border:1px solid #293756;color:#cfe1ff;padding:8px 12px;border-radius:10px;text-decoration:none}
.grid{display:grid;grid-template-columns:repeat(12,1fr);gap:18px}
.card{grid-column:span 4;background:var(--panel);border:1px solid #22304d;border-radius:18px;padding:16px;box-shadow:0 10px 24px rgba(0,0,0,.25)}
.card h3{margin:0 0 6px;font-size:18px}
.small{color:var(--muted);font-size:12px}
.badges{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
.badge{background:var(--chip);color:var(--chipText);padding:4px 8px;border-radius:10px;font-size:12px;text-decoration:none}
.status{margin-top:14px;height:10px;border-radius:999px;background:#1a243b;position:relative}
.status.ok{background:linear-gradient(90deg,#1f4,#0b5 80%)}
.status.warn{background:linear-gradient(90deg,#ffe08a,#e0b100 80%)}
.status.err{background:linear-gradient(90deg,#ff9c9c,#d33 80%)}
.status-label{margin-top:8px;font-size:12px}
.footer-hint{margin-top:22px;color:#9fb3db;font-size:12px}
@media (max-width:900px){ .card{grid-column:span 6} }
@media (max-width:600px){ .card{grid-column:span 12} }
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <div class="h1">{{ $title }}</div>
    <a class="btn" href="{{ url('/hero/tools?format=json') }}">Ver JSON</a>
  </div>
  <div class="grid">
    @foreach ($items as $it)
    <div class="card" data-key="{{ $it['key'] }}">
      <h3>{{ $it['title'] }}</h3>
      <div class="small">{{ $it['key'] }}</div>
      <div class="badges">
        @foreach($it['urls'] as $name => $u)
          <a class="badge" href="{{ $u }}" target="_blank">{{ $name }}</a>
        @endforeach
      </div>
      <div class="status" data-status="{{ $it['status'] }}"></div>
      <div class="status-label small">checando...</div>
    </div>
    @endforeach
  </div>
  <div class="footer-hint">Dica: defina APP_URL e portas no .env. A página tenta detectar se os serviços estão online.</div>
</div>
<script>
(function(){
  function setState(card, state){
    const bar = card.querySelector('.status');
    const label = card.querySelector('.status-label');
    bar.classList.remove('ok','warn','err');
    if(state==='online'){ bar.classList.add('ok'); label.textContent='online'; }
    else if(state==='idle'||state==='paused'){ bar.classList.add('warn'); label.textContent=state; }
    else{ bar.classList.add('err'); label.textContent='offline'; }
  }
  document.querySelectorAll('.card').forEach(function(card){
    const st = card.querySelector('.status').getAttribute('data-status')||'probe';
    if(st!=='probe'){ setState(card, st); }
  });
  function ping(url){ return fetch(url,{method:'HEAD',mode:'no-cors'}).then(()=>true).catch(()=>false); }
  document.querySelectorAll('.card').forEach(function(card){
    const key = card.getAttribute('data-key');
    if(key==='horizon'){ return; }
    const link = card.querySelector('.badges a');
    if(!link){ setState(card,'offline'); return; }
    ping(link.href).then(ok=>setState(card, ok?'online':'offline'));
  });
})();
</script>
</body>
</html>
