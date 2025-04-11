import { Home, Wallet, Repeat, BarChart, Settings, Gift, Layout, HelpCircle, TrendingUp, LineChart } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="bg-black text-white h-screen w-64 p-6 flex flex-col justify-between border-r border-white/10">
      {/* Top Brand */}
      <div>
        <h1 className="text-xl font-bold text-white mb-10 flex items-center gap-2">
          <span className="w-3 h-3 bg-orange-500 rounded-full" /> Cryptolink
        </h1>

        {/* Main Section */}
        <div>
          <h2 className="text-xs text-gray-500 mb-2">MAIN</h2>
          <nav className="flex flex-col gap-1 text-sm">
            <SidebarItem icon={<Home size={18} />} label="Dashboard" active />
            <SidebarItem icon={<Wallet size={18} />} label="Wallet" />
            <SidebarItem icon={<Repeat size={18} />} label="Transactions" />
            <SidebarItem icon={<TrendingUp size={18} />} label="Trading" />
            <SidebarItem icon={<BarChart size={18} />} label="Analytics" badge="NEW" />
            <SidebarItem icon={<LineChart size={18} />} label="Markets" badge="NEW" />
          </nav>
        </div>

        {/* Other Section */}
        <div className="mt-6">
          <h2 className="text-xs text-gray-500 mb-2">OTHER</h2>
          <nav className="flex flex-col gap-1 text-sm">
            <SidebarItem icon={<Settings size={18} />} label="Settings" />
            <SidebarItem icon={<Gift size={18} />} label="Rewards" />
            <SidebarItem icon={<Layout size={18} />} label="Appearance" />
            <SidebarItem icon={<HelpCircle size={18} />} label="Support" />
          </nav>
        </div>
      </div>
    </aside>
  );
};

const SidebarItem = ({ icon, label, badge, active }) => (
  <div
    className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer 
    ${active ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
  >
    <div className="flex items-center gap-3">
      {icon}
      <span>{label}</span>
    </div>
    {badge && <span className="text-orange-500 text-xs font-semibold">{badge}</span>}
  </div>
);

export default Sidebar;
