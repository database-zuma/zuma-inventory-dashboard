# Zuma Inventory Analytics

Hub dashboard — 7 tab inventory dalam 1 URL. Visual style mengikuti `zuma-sales-dashboard` (navy + accent green, top tab-nav, sales-style).

## URL
- Production: https://database-zuma.github.io/zuma-inventory-dashboard/

## 7 Tab
| Tab | Source repo | Visual |
|-----|-------------|--------|
| **Inventory** | `./inventory.html` (full-copy master, Opsi Y) | Master style (Poppins, gradient) |
| **Stock Control** | iframe → `zuma-stockcontrol-dashboard` | Master style |
| **Max Stock** | iframe → `zuma-maxstock-dashboard` | ✅ Sales-style |
| **Redistribusi** | iframe → `zuma-redistribusi-dashboard` | ✅ Sales-style |
| **Stok per Area** | iframe → `zuma-stockbyarea-dashboard` | ✅ Sales-style |
| **SKU Search** | iframe → `zuma-skusearch-dashboard` | ✅ Sales-style |
| **Summary Report** | iframe → `zuma-summaryreport-dashboard` | ✅ Sales-style |

Hub chrome (top strip + navy header + tab-nav) **selalu** konsisten sales-style — yang beda cuma isi iframe-nya. Saat iframe load, hub inject CSS untuk hide duplicate header/sidebar di dalam iframe.

## Deep linking
URL hash nge-trigger tab:
- `#inventory` → tab Inventory
- `#stockcontrol` → tab Stock Control
- `#maxstock` · `#redistribusi` · `#stockbyarea` · `#skusearch` · `#summaryreport`

## Inventory tab lokal
`./inventory.html` = full-copy `dashboard_inventory.html` dari master + patch:
- CSS override (hide sidebar, full-width)
- JS auto-switchView('inventory')

## Catatan
- Semua 6 sub-dashboard tetap hidup sebagai standalone URL (bisa di-share langsung)
- Tab hub cuma embed mereka via iframe biar 1-URL experience
- 2 tab (Inventory + Stock Control) masih master-style; sisanya udah sales-style
- Kalau mau full-konsistensi sales-style, 2 itu perlu surgical-extract juga (lebih lama + risiko bug)
