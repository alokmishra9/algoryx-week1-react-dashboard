import React, { useMemo, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Check,
  ChevronDown,
  CreditCard,
  DollarSign,
  Download,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Package,
  Search,
  Settings,
  ShoppingCart,
  TrendingUp,
  User,
  Users,
  X,
  Zap
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Orders", icon: ShoppingCart, badge: "12" },
  { label: "Customers", icon: Users },
  { label: "Products", icon: Package },
  { label: "Analytics", icon: TrendingUp },
  { label: "Settings", icon: Settings }
];

const orders = [
  { id: "#ORD-1098", customer: "Aarav Sharma", email: "aarav@example.com", product: "Pro Plan", amount: "$249.00", status: "Completed", date: "Today, 10:42 AM", avatar: "AS" },
  { id: "#ORD-1097", customer: "Emma Wilson", email: "emma@example.com", product: "Team Plan", amount: "$399.00", status: "Processing", date: "Today, 09:18 AM", avatar: "EW" },
  { id: "#ORD-1096", customer: "Rohan Mehta", email: "rohan@example.com", product: "Starter Plan", amount: "$99.00", status: "Completed", date: "Yesterday, 04:36 PM", avatar: "RM" },
  { id: "#ORD-1095", customer: "Sophia Brown", email: "sophia@example.com", product: "Pro Plan", amount: "$249.00", status: "Pending", date: "Yesterday, 02:10 PM", avatar: "SB" },
  { id: "#ORD-1094", customer: "Noah Davis", email: "noah@example.com", product: "Team Plan", amount: "$399.00", status: "Cancelled", date: "Sep 24, 11:05 AM", avatar: "ND" }
];

const activities = [
  { text: "New customer registered", detail: "Priya Kapoor joined the platform", time: "8 min ago", icon: Users },
  { text: "Payment received", detail: "$249.00 from Aarav Sharma", time: "24 min ago", icon: CreditCard },
  { text: "New order created", detail: "Order #ORD-1097 is processing", time: "41 min ago", icon: ShoppingCart },
  { text: "Subscription upgraded", detail: "Emma Wilson moved to Team Plan", time: "1 hr ago", icon: Zap }
];

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [query, setQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [period, setPeriod] = useState("Last 30 days");
  const [toast, setToast] = useState("");

  const filteredOrders = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return orders;
    return orders.filter((order) =>
      [order.id, order.customer, order.email, order.product, order.status]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  return (
    <div className="app-shell">
      <Sidebar
        open={sidebarOpen}
        active={activeNav}
        onSelect={(label) => {
          setActiveNav(label);
          setSidebarOpen(false);
          if (label !== "Dashboard") showToast(`${label} view selected`);
        }}
      />

      {sidebarOpen && <button className="mobile-backdrop" onClick={() => setSidebarOpen(false)} aria-label="Close menu" />}

      <main className="main-content">
        <Topbar
          query={query}
          setQuery={setQuery}
          onMenu={() => setSidebarOpen(true)}
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
          profileOpen={profileOpen}
          setProfileOpen={setProfileOpen}
        />

        <div className="page-content">
          <section className="welcome-row">
            <div>
              <p className="eyebrow">OVERVIEW</p>
              <h1>Good morning, Alok <span>👋</span></h1>
              <p className="subtitle">Here’s what’s happening with your business today.</p>
            </div>
            <button className="primary-btn" onClick={() => showToast("Report export started")}>
              <Download size={17} />
              Export report
            </button>
          </section>

          <StatsGrid />

          <section className="dashboard-grid">
            <RevenueCard period={period} setPeriod={setPeriod} />
            <ActivityCard />
          </section>

          <OrdersCard orders={filteredOrders} />

          <section className="bottom-grid">
            <ProfileCard />
            <NotificationsCard onAction={() => showToast("All notifications marked as read")} />
          </section>
        </div>
      </main>

      {toast && (
        <div className="toast" role="status">
          <span className="toast-icon"><Check size={15} /></span>
          {toast}
          <button onClick={() => setToast("")}><X size={15} /></button>
        </div>
      )}
    </div>
  );
}

function Sidebar({ open, active, onSelect }) {
  return (
    <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
      <div className="brand">
        <div className="brand-mark"><Zap size={19} fill="currentColor" /></div>
        <div>
          <strong>Algoryx</strong>
          <span>Admin Console</span>
        </div>
      </div>

      <div className="workspace">
        <div className="workspace-logo">A</div>
        <div>
          <strong>Acme Workspace</strong>
          <span>Business account</span>
        </div>
        <ChevronDown size={15} />
      </div>

      <nav className="nav-list" aria-label="Primary navigation">
        <p className="nav-label">MAIN MENU</p>
        {navItems.map(({ label, icon: Icon, badge }) => (
          <button
            key={label}
            className={`nav-item ${active === label ? "active" : ""}`}
            onClick={() => onSelect(label)}
          >
            <Icon size={18} />
            <span>{label}</span>
            {badge && <small>{badge}</small>}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="upgrade-card">
          <div className="upgrade-icon"><Zap size={17} /></div>
          <strong>Upgrade workspace</strong>
          <p>Unlock advanced analytics and automation.</p>
          <button onClick={() => onSelect("Billing")}>View plans →</button>
        </div>
        <p className="version">Algoryx Dashboard v1.0</p>
      </div>
    </aside>
  );
}

function Topbar({ query, setQuery, onMenu, notificationsOpen, setNotificationsOpen, profileOpen, setProfileOpen }) {
  return (
    <header className="topbar">
      <button className="icon-btn mobile-menu" onClick={onMenu} aria-label="Open menu"><Menu size={21} /></button>

      <div className="search-wrap">
        <Search size={18} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search orders, customers..."
          aria-label="Search dashboard"
        />
        <kbd>⌘ K</kbd>
      </div>

      <div className="top-actions">
        <div className="notification-wrap">
          <button
            className="icon-btn notification-btn"
            onClick={() => setNotificationsOpen((v) => !v)}
            aria-label="Notifications"
          >
            <Bell size={19} />
            <span className="notification-dot" />
          </button>
          {notificationsOpen && (
            <div className="popover notification-popover">
              <div className="popover-title"><strong>Notifications</strong><span>3 new</span></div>
              <div className="mini-notification"><span className="mini-dot" /><div><strong>New order</strong><p>#ORD-1098 was completed.</p></div></div>
              <div className="mini-notification"><span className="mini-dot" /><div><strong>Payment received</strong><p>$249.00 payment confirmed.</p></div></div>
              <button className="popover-link" onClick={() => setNotificationsOpen(false)}>View all notifications</button>
            </div>
          )}
        </div>

        <div className="profile-wrap">
          <button className="profile-trigger" onClick={() => setProfileOpen((v) => !v)}>
            <div className="avatar avatar-purple">AM</div>
            <div className="profile-name"><strong>Alok Mishra</strong><span>Administrator</span></div>
            <ChevronDown size={16} />
          </button>
          {profileOpen && (
            <div className="popover profile-popover">
              <button onClick={() => setProfileOpen(false)}><User size={16} /> My profile</button>
              <button onClick={() => setProfileOpen(false)}><Settings size={16} /> Account settings</button>
              <hr />
              <button className="danger" onClick={() => setProfileOpen(false)}>Sign out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function StatsGrid() {
  const stats = [
    { title: "Total Revenue", value: "$48,294", change: "+12.5%", trend: "up", icon: DollarSign, note: "vs. previous month" },
    { title: "Total Orders", value: "1,284", change: "+8.2%", trend: "up", icon: ShoppingCart, note: "vs. previous month" },
    { title: "New Customers", value: "384", change: "+18.7%", trend: "up", icon: Users, note: "vs. previous month" },
    { title: "Conversion Rate", value: "6.24%", change: "-2.4%", trend: "down", icon: Activity, note: "vs. previous month" }
  ];

  return (
    <section className="stats-grid">
      {stats.map((stat) => (
        <article className="stat-card" key={stat.title}>
          <div className="stat-top">
            <span className="stat-title">{stat.title}</span>
            <div className="stat-icon"><stat.icon size={18} /></div>
          </div>
          <div className="stat-value">{stat.value}</div>
          <div className="stat-change">
            <span className={stat.trend === "up" ? "change-up" : "change-down"}>
              {stat.trend === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {stat.change}
            </span>
            <span>{stat.note}</span>
          </div>
        </article>
      ))}
    </section>
  );
}

function RevenueCard({ period, setPeriod }) {
  const points = [32, 43, 38, 52, 48, 62, 57, 68, 63, 76, 71, 83];
  const max = 90;

  return (
    <article className="card revenue-card">
      <div className="card-heading">
        <div><p className="eyebrow">REVENUE</p><h2>$48,294</h2><p className="muted"><span className="change-up">+12.5%</span> from last month</p></div>
        <select value={period} onChange={(e) => setPeriod(e.target.value)} aria-label="Revenue period">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
      </div>

      <div className="chart">
        <div className="chart-y">
          <span>$50k</span><span>$40k</span><span>$30k</span><span>$20k</span><span>$10k</span><span>$0</span>
        </div>
        <div className="chart-area">
          <div className="grid-lines">{[0,1,2,3,4].map(i => <span key={i} />)}</div>
          <svg viewBox="0 0 600 240" preserveAspectRatio="none" className="line-chart" aria-label="Revenue chart">
            <defs>
              <linearGradient id="fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity=".20"/>
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d={areaPath(points, max)} fill="url(#fill)" />
            <path d={linePath(points, max)} fill="none" stroke="#6366f1" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round"/>
            {points.map((p, i) => <circle key={i} cx={12 + i * 52.5} cy={230 - (p / max) * 205} r="4" fill="#fff" stroke="#6366f1" strokeWidth="2" vectorEffect="non-scaling-stroke" />)}
          </svg>
          <div className="chart-x">{["May 01","May 05","May 10","May 15","May 20","May 25","May 30"].map(x => <span key={x}>{x}</span>)}</div>
        </div>
      </div>
    </article>
  );
}

function linePath(points, max) {
  return points.map((p, i) => `${i === 0 ? "M" : "L"} ${12 + i * 52.5} ${230 - (p / max) * 205}`).join(" ");
}
function areaPath(points, max) {
  return `${linePath(points, max)} L ${12 + (points.length - 1) * 52.5} 240 L 12 240 Z`;
}

function ActivityCard() {
  return (
    <article className="card activity-card">
      <div className="card-title-row"><div><p className="eyebrow">LIVE FEED</p><h3>Recent activity</h3></div><button className="more-btn"><MoreHorizontal size={19} /></button></div>
      <div className="activity-list">
        {activities.map(({ text, detail, time, icon: Icon }) => (
          <div className="activity-item" key={text}>
            <div className="activity-icon"><Icon size={16} /></div>
            <div className="activity-copy"><strong>{text}</strong><p>{detail}</p></div>
            <time>{time}</time>
          </div>
        ))}
      </div>
      <button className="text-btn">View all activity <span>→</span></button>
    </article>
  );
}

function OrdersCard({ orders }) {
  return (
    <article className="card orders-card">
      <div className="card-title-row">
        <div><p className="eyebrow">TRANSACTIONS</p><h3>Recent orders</h3></div>
        <button className="secondary-btn">View all orders <span>→</span></button>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Order</th><th>Customer</th><th>Product</th><th>Amount</th><th>Status</th><th>Date</th><th /></tr></thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td><strong className="order-id">{order.id}</strong></td>
                <td><div className="customer-cell"><div className="avatar avatar-blue">{order.avatar}</div><div><strong>{order.customer}</strong><span>{order.email}</span></div></div></td>
                <td>{order.product}</td>
                <td><strong>{order.amount}</strong></td>
                <td><Status status={order.status} /></td>
                <td className="date-cell">{order.date}</td>
                <td><button className="more-btn"><MoreHorizontal size={17} /></button></td>
              </tr>
            ))}
            {orders.length === 0 && <tr><td colSpan="7" className="empty-state">No matching orders found.</td></tr>}
          </tbody>
        </table>
      </div>
    </article>
  );
}

function Status({ status }) {
  const cls = status.toLowerCase();
  return <span className={`status ${cls}`}><span />{status}</span>;
}

function ProfileCard() {
  return (
    <article className="card profile-card">
      <div className="card-title-row"><div><p className="eyebrow">ACCOUNT</p><h3>User profile</h3></div><button className="more-btn"><MoreHorizontal size={19} /></button></div>
      <div className="profile-summary">
        <div className="avatar avatar-large avatar-purple">AM</div>
        <div><h4>Alok Mishra</h4><p>Administrator · alok@example.com</p><span className="online"><i /> Active now</span></div>
      </div>
      <div className="profile-stats">
        <div><strong>384</strong><span>Customers</span></div>
        <div><strong>1,284</strong><span>Orders</span></div>
        <div><strong>6.24%</strong><span>Conversion</span></div>
      </div>
      <button className="outline-btn">Edit profile</button>
    </article>
  );
}

function NotificationsCard({ onAction }) {
  return (
    <article className="card notifications-card">
      <div className="card-title-row"><div><p className="eyebrow">UPDATES</p><h3>Notifications</h3></div><button className="text-btn" onClick={onAction}>Mark all read</button></div>
      <div className="notification-row"><div className="notification-icon blue"><Bell size={17} /></div><div><strong>Weekly report is ready</strong><p>Your analytics report for this week is now available.</p><time>12 minutes ago</time></div></div>
      <div className="notification-row"><div className="notification-icon green"><CreditCard size={17} /></div><div><strong>Payment successful</strong><p>Payment of $249.00 was successfully processed.</p><time>34 minutes ago</time></div></div>
      <div className="notification-row"><div className="notification-icon orange"><Package size={17} /></div><div><strong>Inventory running low</strong><p>3 products have reached their low-stock threshold.</p><time>1 hour ago</time></div></div>
    </article>
  );
}

export default App;