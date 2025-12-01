import React from 'react';
import { 
  Home, Inbox, List, Users, Calendar, BarChart2, 
  CheckSquare, PieChart, Lock, Gem
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const mainNav = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: Inbox, label: 'Inbox', badge: 99 },
    { icon: BarChart2, label: 'Transactions' }, // Mapped to Sequences
    { icon: List, label: 'Invoices' }, // Mapped to Prospects
    { icon: Users, label: 'Cards' }, // Mapped to Meetings
    { icon: Calendar, label: 'Saving Plans' }, // Mapped to Pipeline
    { icon: CheckSquare, label: 'Investments' }, // Mapped to Tasks
    { icon: PieChart, label: 'Insights' },
  ];

  return (
    <div className="w-64 h-screen bg-white flex flex-col fixed left-0 top-0 z-20 hidden lg:flex border-r border-slate-100">
      {/* Logo Area */}
      <div className="p-8 flex items-center gap-3">
        <div className="w-8 h-8 bg-[#0D211C] rounded-lg grid grid-cols-2 gap-1 p-1.5">
          <div className="bg-[#B6F09C] rounded-sm"></div>
          <div className="bg-[#B6F09C] rounded-full"></div>
          <div className="bg-[#B6F09C] rounded-full"></div>
          <div className="bg-[#B6F09C] rounded-sm"></div>
        </div>
        <span className="font-bold text-xl text-[#0D211C] tracking-tight">COINEST</span>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-4 space-y-2 custom-scrollbar">
        {mainNav.map((item) => (
          <button 
            key={item.label}
            className={`w-full flex items-center justify-between px-4 py-3.5 text-sm font-medium rounded-2xl transition-all duration-200 ${
              item.active 
                ? 'bg-[#B6F09C] text-[#0D211C] shadow-sm shadow-lime-200' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-[#0D211C]'
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon className={`w-5 h-5 ${item.active ? 'text-[#0D211C]' : 'text-slate-400'}`} />
              {item.label}
            </div>
            {item.badge && (
              <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Get Pro Card */}
      <div className="p-4 mt-auto">
        <div className="bg-[#0D211C] rounded-3xl p-6 relative overflow-hidden text-center">
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-white/5 rounded-full -translate-x-12 -translate-y-12"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-white/5 rounded-full translate-x-8 translate-y-8"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-4">
              <Lock className="w-5 h-5 text-[#B6F09C]" />
            </div>
            <h4 className="text-white font-medium text-sm mb-2">Gain full access</h4>
            <p className="text-slate-400 text-xs mb-4">Get detailed analytics and graphs</p>
            <button className="bg-[#B6F09C] text-[#0D211C] text-xs font-bold py-3 px-6 rounded-xl w-full hover:bg-[#a3d94d] transition-colors">
              Get Pro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};