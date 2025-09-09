<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?php echo htmlspecialchars($title ?? $key ?? 'Ferramenta'); ?></title>
<style>
body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Helvetica,Arial,sans-serif;margin:0;background:#0b1020;color:#e7e9ee}
a{color:#9ad0ff;text-decoration:none}
.container{max-width:900px;margin:40px auto;padding:0 16px}
.card{background:#121a34;border:1px solid #1e2a52;border-radius:14px;padding:20px;margin-bottom:16px;box-shadow:0 4px 16px rgba(0,0,0,.25)}
.card h1{margin:0 0 8px;font-size:22px}
.urls a{display:inline-block;margin-right:10px;padding:6px 10px;border:1px solid #29407a;border-radius:8px;background:#17224a}
</style>
</head>
<body>
<div class="container">
  <div class="card">
    <h1><?php echo htmlspecialchars($title ?? $key); ?></h1>
    <p><strong>Key:</strong> <?php echo htmlspecialchars($key); ?></p>
    <div class="urls">
      <?php foreach (($urls ?? []) as $label => $url): ?>
        <a href="<?php echo htmlspecialchars($url); ?>" target="_blank" rel="noopener"><?php echo htmlspecialchars($label); ?></a>
      <?php endforeach; ?>
    </div>
    <?php if (empty($urls)): ?>
      <p><em>Sem URLs definidas.</em></p>
    <?php endif; ?>
  </div>
  <p><a href="/tools">&larr; Voltar</a></p>
</div>
</body>
</html>
