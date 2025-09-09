<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Hero Tools</title>
<style>
:root{--bg:#0b0f1a;--card:#10182b;--card2:#0e1526;--txt:#eaf0ff;--muted:#a8b3cf;--accent:#66b2ff;--border:#1c2a4a;--ok:#1ec28b;--warn:#ffb44c;--danger:#ff6b6b}
*{box-sizing:border-box}
body{margin:0;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Helvetica,Arial,sans-serif;background:radial-gradient(1200px 800px at 15% -10%,#11214a00,#11214a66),linear-gradient(180deg,#0b0f1a 0%,#0b0f1a 100%);color:var(--txt)}
.container{max-width:1100px;margin:40px auto;padding:0 20px}
.header{display:flex;gap:12px;justify-content:space-between;align-items:center;margin-bottom:24px}
h1{margin:0;font-size:28px;letter-spacing:.3px}
.header .actions a{display:inline-block;padding:8px 12px;border-radius:10px;border:1px solid var(--border);background:var(--card2);color:var(--txt);text-decoration:none}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px}
.card{background:linear-gradient(180deg,var(--card) 0%,var(--card2) 100%);border:1px solid var(--border);border-radius:16px;padding:16px;box-shadow:0 6px 24px rgba(0,0,0,.25)}
.card h2{margin:0 0 8px;font-size:18px;display:flex;align-items:center;gap:8px;justify-content:space-between}
.key{font-size:11px;padding:2px 8px;border:1px solid var(--border);border-radius:999px;color:var(--muted)}
.urls{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
.link{padding:8px 10px;border-radius:10px;background:#0f1b34;border:1px solid var(--border);color:var(--accent);text-decoration:none}
.status{font-size:12px;border-radius:999px;padding:3px 8px;border:1px solid var(--border);background:#0f1b34;color:var(--muted)}
.status.ok{color:#0ef0ad;border-color:#10563f;background:#0a1f1a}
.status.down{color:#ff8a8a;border-color:#5a1f1f;background:#1a0e0e}
.footer{margin-top:26px;color:var(--muted);font-size:13px}
.kbd{padding:2px 6px;border-radius:6px;border:1px solid var(--border);background:var(--card2);font-size:12px}
.empty{opacity:.7}
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <h1>Hero Tools</h1>
    <div class="actions">
      <a href="/tools/json">Ver JSON</a>
    </div>
  </div>

  <div class="grid" id="grid">
    <?php foreach (($tools ?? []) as $key => $item): ?>
    <div class="card" data-key="<?php echo htmlspecialchars($key); ?>">
      <h2>
        <span><?php echo htmlspecialchars($item['title']); ?></span>
        <span class="key"><?php echo htmlspecialchars($key); ?></span>
      </h2>
      <div class="urls">
        <?php if (!empty($item['urls'])): ?>
          <?php foreach ($item['urls'] as $label => $url): ?>
            <a class="link" data-url="<?php echo htmlspecialchars($url); ?>" target="_blank" rel="noopener" href="<?php echo htmlspecialchars($url); ?>"><?php echo htmlspecialchars($label); ?></a>
          <?php endforeach; ?>
        <?php else: ?>
          <span class="empty">Sem URLs definidas</span>
        <?php endif; ?>
      </div>
      <div class="status" data-status>verificando...</div>
    </div>
    <?php endforeach; ?>
  </div>

  <div class="footer">
    Dica: defina <span class="kbd">APP_URL</span> e portas no <span class="kbd">.env</span> (ex.: <span class="kbd">ADMINER_PORT</span>, <span class="kbd">PHPMYADMIN_PORT</span>). A página tenta detectar automaticamente se os serviços estão online via navegador.
  </div>
</div>

<script>
(function(){
  const cards = document.querySelectorAll('.card');
  const controller = new AbortController();
  function ping(url){
    const signal = controller.signal;
    const t = setTimeout(()=>controller.abort(), 2000);
    return fetch(url, {method:'HEAD', mode:'no-cors', signal}).then(()=>{clearTimeout(t); return true;}).catch(()=>{clearTimeout(t); return false;});
  }
  async function checkCard(card){
    const links = card.querySelectorAll('.link');
    const status = card.querySelector('[data-status]');
    if(!links.length){ status.textContent = 'sem links'; return; }
    // consider online if at least one link responds
    for (let i=0;i<links.length;i++){
      const ok = await ping(links[i].href);
      if(ok){ status.textContent='online'; status.classList.add('ok'); return; }
    }
    status.textContent='offline'; status.classList.add('down');
  }
  cards.forEach(checkCard);
})();
</script>
</body>
</html>
