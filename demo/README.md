# EaTS UI Prototype

High-fidelity website concept based on the EaTS final project report and PostgreSQL schema.

## Screens

1. Owner Dashboard: daily revenue, best-selling menu, table availability, low-stock alerts, and recent transactions.
2. POS Kasir: digital ordering, customer and table assignment, menu filtering, QRIS/cash selection, and automatic totals.
3. Inventory & Recipe: raw-material stock, low-stock status, recipe composition, yield estimation, and automatic trigger messaging.
4. Customer Menu: menu discovery, dine-in/table selection, cart, and real-time stock messaging.

## Source Mapping

- Roles: Owner, Kasir, Pembeli.
- Core entities: WARUNG, KARYAWAN, PEMBELI, MENU, MEJA, Bahan_Baku, Resep, TRANSAKSI, DETAIL_TRANSAKSI.
- Reporting: daily revenue and most popular menu.
- Automation: pre-insert stock validation and post-insert stock deduction.
- Sample data: Warung IF, Kopi TC, Nasgor IF, Es Teh, Kopi Susu, Kentang, and transactions from June 15, 2026.

## Run

```bash
python3 -m http.server 4173 --directory outputs/eats-ui-prototype
```

Open `http://127.0.0.1:4173`.

## Figma

Target file: https://www.figma.com/design/rxzaFQRfcdLqn5mv2tc8mh

The Figma file and four screen frames were created. Further connector writes were stopped by the Figma Starter plan MCP call limit. This HTML is structured for capture/import when the quota becomes available again.
