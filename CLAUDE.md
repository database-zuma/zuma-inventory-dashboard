# Zuma Inventory Core — Agent Context

Standalone view Inventory Core (spawned dari `stock-inventory-dashboard`) pakai pattern **Opsi Y** (full-copy + auto-navigate).

Sama persis pattern dengan `zuma-stockcontrol-dashboard`, cuma target view-nya `inventory` bukan `stockcontrol`.

## Patch applied

```html
<!-- Before </head> -->
<style id="standalone-overrides">
  body { padding-left: 0 !important; }
  .view-toggle { display: none !important; }
  .dashboard-body { margin-left: 0 !important; }
  .container { max-width: 100% !important; padding: 20px !important; }
  .view-container { display: none; }
  .view-container.active { display: block; }
</style>

<!-- Before </body> -->
<script id="standalone-autoview">
  setTimeout(function(){ switchView('inventory'); }, 400);
</script>
```

## Sync dari master

```bash
cd /Users/database-zuma/zuma-inventory-dashboard
cp ../stock-inventory-dashboard/dashboard_inventory.html index.html
# Re-apply patches (ganti 'stockcontrol' jadi 'inventory' dan title jadi 'Zuma Inventory Core')
python3 -c "
import re
f = 'index.html'
html = open(f).read()
html = re.sub(r'<title>[^<]*</title>', '<title>Zuma Inventory Core</title>', html, count=1)
css = '<style id=\"standalone-overrides\">body{padding-left:0!important}.view-toggle{display:none!important}.dashboard-body{margin-left:0!important}.container{max-width:100%!important;padding:20px!important}.view-container{display:none}.view-container.active{display:block}</style>'
js  = '<script id=\"standalone-autoview\">setTimeout(function(){switchView(\"inventory\")},400);</script>'
html = html.replace('</head>', css + '</head>', 1)
html = html.replace('</body>', js + '</body>', 1)
open(f, 'w').write(html)
"
git add -A && git commit -m 'chore: sync from master' && git push
```

## Safe edit rules
- Jangan edit inline di file ini — edit di master dulu, baru sync.
