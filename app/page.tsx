"use client";

import { useMemo, useState } from "react";
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, Bell, Box,
  CalendarDays, CheckCircle2, ChevronDown, CircleHelp, Clock3,
  Download, Fuel, LayoutDashboard, MapPin, Menu, MoreHorizontal,
  Package, Plus, Search, Settings2, ShieldCheck, Truck, Users,
  Warehouse, X, Zap
} from "lucide-react";

type Shipment = {
  id: string; customer: string; route: string; type: string;
  status: "In transit" | "Pending" | "Delivered" | "Delayed";
  eta: string; amount: string; initials: string;
};

const initialShipments: Shipment[] = [
  { id: "ATL-2048", customer: "Fresh Market Ltd", route: "Nairobi → Mombasa", type: "Full truckload", status: "In transit", eta: "Today, 14:30", amount: "KES 84,500", initials: "FM" },
  { id: "ATL-2047", customer: "Highland Supplies", route: "Nakuru → Nairobi", type: "Pallet delivery", status: "Pending", eta: "Today, 16:00", amount: "KES 18,200", initials: "HS" },
  { id: "ATL-2046", customer: "Kibo Retail Group", route: "Thika → Kisumu", type: "General cargo", status: "Delayed", eta: "Today, 18:45", amount: "KES 42,000", initials: "KR" },
  { id: "ATL-2045", customer: "Green Basket Co.", route: "Limuru → Nairobi", type: "Cold-chain", status: "Delivered", eta: "Delivered, 09:42", amount: "KES 12,800", initials: "GB" },
  { id: "ATL-2044", customer: "Mara Hardware", route: "Athi River → Eldoret", type: "Full truckload", status: "In transit", eta: "Tomorrow, 08:15", amount: "KES 67,300", initials: "MH" },
];

const navGroups = [
  { label: "WORKSPACE", items: [{ label: "Overview", icon: LayoutDashboard }, { label: "Shipments", icon: Package, count: "24" }, { label: "Fleet & vehicles", icon: Truck }, { label: "Drivers", icon: Users }, { label: "Warehouses", icon: Warehouse }] },
  { label: "MANAGEMENT", items: [{ label: "Live tracking", icon: MapPin }, { label: "Fuel & expenses", icon: Fuel }, { label: "Reports", icon: Activity }] },
];

function StatusBadge({ status }: { status: Shipment["status"] }) {
  return <span className={"status status-" + status.toLowerCase().replace(" ", "-")}><span />{status}</span>;
}

export default function Home() {
  const [active, setActive] = useState("Overview");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [shipments, setShipments] = useState(initialShipments);
  const [showNew, setShowNew] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [notice, setNotice] = useState("");
  const [newCustomer, setNewCustomer] = useState("");
  const [newRoute, setNewRoute] = useState("");

  const filtered = useMemo(() => shipments.filter(s => {
    const matchQuery = [s.id, s.customer, s.route, s.type].join(" ").toLowerCase().includes(query.toLowerCase());
    return matchQuery && (statusFilter === "All statuses" || s.status === statusFilter);
  }), [shipments, query, statusFilter]);

  function createShipment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newCustomer.trim() || !newRoute.trim()) return;
    const next: Shipment = {
      id: "ATL-" + (2049 + shipments.length - initialShipments.length),
      customer: newCustomer.trim(), route: newRoute.trim(), type: "General cargo",
      status: "Pending", eta: "To be scheduled", amount: "Pending quote",
      initials: newCustomer.trim().split(/\s+/).map(x => x[0]).join("").slice(0, 2).toUpperCase()
    };
    setShipments(current => [next, ...current]);
    setNewCustomer(""); setNewRoute(""); setShowNew(false);
    setActive("Shipments"); setNotice("Shipment " + next.id + " added to this demo.");
    window.setTimeout(() => setNotice(""), 3500);
  }

  return (
    <main className="app-shell">
      {mobileNav && <button aria-label="Close menu" className="mobile-scrim" onClick={() => setMobileNav(false)} />}
      <aside className={"sidebar " + (mobileNav ? "sidebar-open" : "")}>
        <div className="brand-lockup">
          <div className="brand-mark"><Truck size={22} strokeWidth={2.2} /></div>
          <div><div className="brand-name">atlas<span>.</span></div><div className="brand-caption">LOGISTICS PLATFORM</div></div>
          <button className="icon-button close-mobile" onClick={() => setMobileNav(false)} aria-label="Close navigation"><X size={18}/></button>
        </div>
        <button className="workspace-switch"><div className="workspace-avatar">A</div><div className="workspace-text"><strong>Atlas Freight Co.</strong><span>Business workspace</span></div><ChevronDown size={15}/></button>
        <nav className="main-nav">
          {navGroups.map(group => <div className="nav-group" key={group.label}><div className="nav-heading">{group.label}</div>{group.items.map(item => {
            const Icon = item.icon;
            return <button key={item.label} onClick={() => { setActive(item.label); setMobileNav(false); }} className={"nav-link " + (active === item.label ? "nav-active" : "")}><Icon size={18}/><span>{item.label}</span>{("count" in item) && <span className="nav-count">{item.count}</span>}</button>;
          })}</div>)}
        </nav>
        <div className="sidebar-bottom">
          <div className="upgrade-card"><div className="upgrade-icon"><Zap size={16}/></div><strong>Move more, manage less.</strong><p>Your operations, connected in one place.</p><button onClick={() => setNotice("You're viewing the Atlas demo workspace.")}>Explore workspace <ArrowRight size={14}/></button></div>
          <button className={"nav-link " + (active === "Settings" ? "nav-active" : "")} onClick={() => setActive("Settings")}><Settings2 size={18}/><span>Settings</span></button>
          <button className="nav-link" onClick={() => setNotice("Help centre: support@atlas-logistics.example")}><CircleHelp size={18}/><span>Help & support</span></button>
          <div className="profile-row"><div className="profile-avatar">BW</div><div className="profile-text"><strong>Workspace Admin</strong><span>Administrator</span></div><MoreHorizontal size={18}/></div>
        </div>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <div className="topbar-left"><button className="icon-button mobile-menu" aria-label="Open menu" onClick={() => setMobileNav(true)}><Menu size={20}/></button><div className="breadcrumb">Workspace <span>/</span> <strong>{active}</strong></div></div>
          <div className="topbar-actions"><div className="system-status"><span/> All systems operational</div><button className="icon-button notification-button" aria-label="Notifications" onClick={() => setNotice("You're all caught up — no new notifications.")}><Bell size={18}/><i/></button><div className="top-avatar">BW</div></div>
        </header>

        <div className="page-content">
          {notice && <div className="notice"><CheckCircle2 size={17}/>{notice}<button onClick={() => setNotice("")} aria-label="Dismiss"><X size={15}/></button></div>}
          <div className="page-heading">
            <div><div className="eyebrow"><span className="eyebrow-dot"/> THURSDAY, OCTOBER 09</div><h1>{active === "Overview" ? "Good morning, Admin" : active}</h1><p className="heading-subtitle">{active === "Overview" ? "Here's what's happening across your logistics operations today." : "Manage and monitor your " + active.toLowerCase() + " in one place."}</p></div>
            <div className="heading-actions"><button className="button button-secondary" onClick={() => setNotice("Demo report prepared. Connect reporting exports to download live data.")}><Download size={16}/> Export report</button><button className="button button-primary" onClick={() => setShowNew(true)}><Plus size={17}/> New shipment</button></div>
          </div>

          <div className="overview-strip"><div className="strip-icon"><ShieldCheck size={19}/></div><div><strong>Your operations at a glance</strong><span>Demo workspace · Sample figures shown until your data source is connected</span></div><button onClick={() => setNotice("Connect your database in the next setup stage to replace sample figures.")}>Connect data <ArrowRight size={14}/></button></div>

          <div className="metrics-grid">
            <article className="metric-card"><div className="metric-top"><span>Total shipments</span><span className="metric-icon green"><Package size={18}/></span></div><div className="metric-value">1,284</div><div className="metric-foot"><span className="trend-up"><ArrowUpRight size={14}/> 12.8%</span><span>vs. last month</span><div className="sparkline spark-green"><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></div></article>
            <article className="metric-card"><div className="metric-top"><span>Active deliveries</span><span className="metric-icon blue"><Truck size={18}/></span></div><div className="metric-value">186</div><div className="metric-foot"><span className="trend-up"><ArrowUpRight size={14}/> 8.2%</span><span>vs. last month</span><div className="sparkline spark-blue"><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></div></article>
            <article className="metric-card"><div className="metric-top"><span>On-time rate</span><span className="metric-icon amber"><Clock3 size={18}/></span></div><div className="metric-value">96.4<span className="metric-unit">%</span></div><div className="metric-foot"><span className="trend-up"><ArrowUpRight size={14}/> 2.4%</span><span>vs. last month</span><div className="sparkline spark-amber"><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></div></article>
            <article className="metric-card"><div className="metric-top"><span>Fleet utilisation</span><span className="metric-icon purple"><Activity size={18}/></span></div><div className="metric-value">78<span className="metric-unit">%</span></div><div className="metric-foot"><span className="trend-down"><ArrowDownRight size={14}/> 1.6%</span><span>vs. last month</span><div className="sparkline spark-purple"><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></div></article>
          </div>

          <div className="content-grid">
            <section className="panel shipments-panel">
              <div className="panel-header"><div><h2>Recent shipments</h2><p>Keep an eye on your latest movements.</p></div><button className="text-button" onClick={() => setActive("Shipments")}>View all <ArrowRight size={15}/></button></div>
              <div className="table-tools"><label className="search-box"><Search size={16}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search shipments..." /></label><select aria-label="Filter by shipment status" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}><option>All statuses</option><option>In transit</option><option>Pending</option><option>Delivered</option><option>Delayed</option></select></div>
              <div className="table-scroll"><table><thead><tr><th>SHIPMENT</th><th>ROUTE</th><th>STATUS</th><th>ETA</th><th>AMOUNT</th><th/></tr></thead><tbody>{filtered.map(s => <tr key={s.id}><td><div className="shipment-cell"><div className="customer-avatar">{s.initials}</div><div><strong>{s.id}</strong><span>{s.customer}</span></div></div></td><td><div className="route-cell">{s.route}<span>{s.type}</span></div></td><td><StatusBadge status={s.status}/></td><td><span className="eta-cell">{s.eta}</span></td><td><strong className="amount-cell">{s.amount}</strong></td><td><button className="row-more" aria-label={"More options for " + s.id} onClick={() => setNotice("Shipment " + s.id + " selected. Detailed shipment records are part of the next build stage.")}><MoreHorizontal size={17}/></button></td></tr>)}</tbody></table>{filtered.length === 0 && <div className="empty-state"><Package size={24}/><strong>No shipments found</strong><span>Try a different search or status filter.</span></div>}</div>
              <div className="table-footer"><span>Showing <strong>{filtered.length}</strong> of <strong>{shipments.length}</strong> demo shipments</span><button onClick={() => {setQuery("");setStatusFilter("All statuses");}}>Clear filters <X size={13}/></button></div>
            </section>

            <aside className="right-column">
              <section className="panel fleet-panel"><div className="panel-header"><div><h2>Fleet overview</h2><p>Vehicle availability today</p></div><button className="icon-button small" onClick={() => setActive("Fleet & vehicles")} aria-label="View fleet"><ArrowRight size={16}/></button></div><div className="fleet-visual"><div className="fleet-ring"><div><strong>48</strong><span>Total vehicles</span></div></div><div className="fleet-legend"><div><i className="legend-dot available"/><span>Available</span><strong>14</strong></div><div><i className="legend-dot on-road"/><span>On the road</span><strong>28</strong></div><div><i className="legend-dot service"/><span>In service</span><strong>6</strong></div></div></div><div className="fleet-footer"><span><span className="live-dot"/> Fleet data is demo only</span><button onClick={() => setActive("Fleet & vehicles")}>Manage fleet <ArrowRight size={14}/></button></div></section>

              <section className="panel activity-panel"><div className="panel-header"><div><h2>Latest activity</h2><p>Recent operational updates</p></div><button className="icon-button small" onClick={() => setNotice("You're viewing the latest sample activity.")} aria-label="Activity options"><MoreHorizontal size={17}/></button></div><div className="activity-list"><div className="activity-item"><div className="activity-icon activity-green"><CheckCircle2 size={16}/></div><div><p><strong>ATL-2045</strong> delivered successfully</p><span>Green Basket Co. · 09:42 AM</span></div></div><div className="activity-item"><div className="activity-icon activity-blue"><Truck size={16}/></div><div><p>Driver assigned to <strong>ATL-2048</strong></p><span>James Mwangi · 09:18 AM</span></div></div><div className="activity-item"><div className="activity-icon activity-amber"><Clock3 size={16}/></div><div><p><strong>ATL-2046</strong> flagged for delay</p><span>Route review needed · 08:56 AM</span></div></div><div className="activity-item"><div className="activity-icon activity-purple"><Box size={16}/></div><div><p>New cargo booking received</p><span>Highland Supplies · 08:31 AM</span></div></div></div><button className="activity-all" onClick={() => setNotice("Full activity history will be connected to the event log.")}>View activity log <ArrowRight size={14}/></button></section>
            </aside>
          </div>
          <footer className="page-footer"><span>© 2026 Atlas Logistics Platform</span><span><span className="footer-dot"/> Prototype environment</span><span>Built for clearer operations.</span></footer>
        </div>
      </section>

      {showNew && <div className="modal-backdrop" role="presentation" onMouseDown={e => {if (e.target === e.currentTarget) setShowNew(false);}}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="new-shipment-title"><div className="modal-heading"><div><div className="modal-kicker">SHIPMENT MANAGEMENT</div><h2 id="new-shipment-title">Create a shipment</h2><p>Add a shipment to your demo workspace.</p></div><button className="icon-button" onClick={() => setShowNew(false)} aria-label="Close dialog"><X size={18}/></button></div><form onSubmit={createShipment}><label>Customer or business name<input autoFocus value={newCustomer} onChange={e => setNewCustomer(e.target.value)} placeholder="e.g. Nairobi Fresh Produce" required /></label><label>Route<input value={newRoute} onChange={e => setNewRoute(e.target.value)} placeholder="e.g. Nairobi → Mombasa" required /></label><div className="modal-note"><ShieldCheck size={16}/> This creates a local demo record only. Database persistence will be added next.</div><div className="modal-actions"><button type="button" className="button button-secondary" onClick={() => setShowNew(false)}>Cancel</button><button type="submit" className="button button-primary"><Plus size={16}/> Create shipment</button></div></form></section></div>}
    </main>
  );
}