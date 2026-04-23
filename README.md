# Zuma Inventory Core

Standalone dashboard Inventory Core (Retail / Warehouse / Consignment) — landing langsung di view inventory dari master dashboard.

## URL
- Production: https://database-zuma.github.io/zuma-inventory-dashboard/

## Approach: full-copy (Opsi Y)

Karena view ini paling kompleks di seluruh master (~2.000 baris JS + 3 tab dengan table + chart + pagination + filter + modals), repo ini pakai **full-copy** dari `dashboard_inventory.html` master + patch kecil:
- CSS inject: sidebar di-hide, container full width
- JS inject: auto-navigate ke `switchView('inventory')` saat load
- `<title>` ganti ke "Zuma Inventory Core"

## Features (full dari master)
- Retail tab: table per SKU per toko, filter area/store/tier/gender/series, pagination 50, 3 charts (gender/area/series)
- Warehouse tab: sama pattern, per WH
- Consignment tab: per partner, filter tambahan partner/store
- Minus on Hand modal
- Detail SKU modal
- Sort per kolom
- Entity toggle DDD/MBB/UBB/LJBB

## Trade-off
- File size ~1.2MB (cached setelah 1x load)
- Load time sama dengan master

## Sync dari master
Sama seperti zuma-stockcontrol-dashboard — lihat CLAUDE.md.
