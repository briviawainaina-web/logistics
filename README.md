# Atlas Logistics Platform

An all-in-one logistics operations platform for freight, fleet, shipments, warehouses, and last-mile delivery.

## Current status

**Phase 1 — UI prototype.** The responsive dashboard includes sample KPIs, shipment search and status filters, a local demo shipment-creation form, fleet overview, and activity feed. It does not yet connect to a database, live GPS, SMS, or payment provider. Metrics and activity are illustrative sample data.

## Planned stack

- **Web:** Next.js, React, TypeScript
- **Mobile:** Expo / React Native (planned)
- **Data and authentication:** PostgreSQL through Supabase (planned)
- **Maps:** provider integration to be selected
- **Payments:** M-PESA integration for Kenya (planned)

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Roadmap

1. Responsive operations dashboard and shipment workflow
2. Supabase schema, authentication, and role-based access control
3. Fleet and driver management
4. Shipment events and customer tracking page
5. Warehouse and inventory workflows
6. Expo mobile app for drivers and customers
7. Maps, notifications, and payment integrations
8. Automated tests, deployment, monitoring, and security review

## Configuration

Copy `.env.example` to `.env.local` when configuring Supabase. Never commit credentials or production personal data.

## Brand

Atlas Logistics is a temporary working name. Confirm trademark, domain, and social-handle availability before public launch.
