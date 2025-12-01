import React from 'react';
import { 
  ArrowUp, ArrowDown, MoreHorizontal, Plus, Send, 
  Download, Clock, CreditCard, Wallet, Target,
  Briefcase, Home
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { StatGroup } from '../types';

// --- Types & Data for Widgets ---

const COLORS = ['#0D211C', '#B6F09C', '#e2e8f0', '#f1f5f9'];

const BAR_DATA = [
  { name: 'Jan', income: 4000, expense: 2400 },
  { name: 'Feb', income: 3000, expense: 1398 },
  { name: 'Mar', income: 2000, expense: 5800 },
  { name: 'Apr', income: 2780, expense: 3908 },
  { name: 'May', income: 1890, expense: 4800 },
  { name: 'Jun', income: 6000, expense: 4000 }, // Highlighted in design
  { name: 'Jul', income: 3490, expense: 4300 },
  { name: 'Aug', income: 4000, expense: 2400 },
  { name: 'Sep', income: 5000, expense: 1398 },
  { name: 'Oct', income: 4000, expense: 2400 },
  { name: 'Nov', income: 3000, expense: 1398 },
  { name: 'Dec', income: 4500, expense: 2800 },
];

const DONUT_DATA = [
  { name: 'Rent & Living', value: 2100, color: '#0D211C' },
  { name: 'Investment', value: 525, color: '#B6F09C' },
  { name: 'Education', value: 420, color: '#CBD5E1' },
  { name: 'Food', value: 280, color: '#E2E8F0' },
  { name: 'Entertainment', value: 175, color: '#F1F5F9' },
];

// --- Components ---

export const PipelineCard: React.FC = () => {
  return (
    <div className="bg-[#0D211C] rounded-[2rem] p-6 text-white relative overflow-hidden h-full flex flex-col justify-between shadow-xl shadow-[#0D211C]/20">
      {/* Texture */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#B6F09C]/5 rounded-full blur-3xl -translate-y-32 translate-x-12"></div>
      
      <div className="flex justify-between items-start relative z-10">
        <div className="flex gap-2">
           <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
             <div className="w-4 h-4 rounded-full bg-[#B6F09C]"></div>
           </div>
           <div className="w-4 h-8 rounded-full border-2 border-white/10"></div>
        </div>
        <Clock className="text-slate-400 w-6 h-6" />
      </div>

      <div className="relative z-10 mt-6">
        <p className="text-slate-400 text-sm mb-1">Andrew Forbist</p>
        <h3 className="text-3xl font-bold mb-6">Total Pipeline</h3>
        
        <div className="flex items-end justify-between">
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Balance Amount</p>
            <p className="text-3xl font-bold">$562,000</p>
          </div>
          <div className="flex gap-4 text-right">
             <div>
               <p className="text-[10px] text-slate-400 uppercase">EXP</p>
               <p className="text-sm font-bold">11/29</p>
             </div>
             <div>
               <p className="text-[10px] text-slate-400 uppercase">CVV</p>
               <p className="text-sm font-bold">323</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MiniStatCard: React.FC<{
  icon: any;
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
}> = ({ icon: Icon, label, value, trend, trendUp }) => {
  return (
    <div className="bg-white rounded-[1.5rem] p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
          <Icon className="w-5 h-5 text-slate-600" />
        </div>
        <button className="text-slate-300 hover:text-slate-500">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
      
      <div className="mb-1">
        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
          trendUp ? 'bg-[#B6F09C] text-[#0D211C]' : 'bg-rose-100 text-rose-600'
        }`}>
          {trendUp ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
          {trend}
        </span>
      </div>
      
      <h3 className="text-2xl font-bold text-[#0D211C] mb-1">{value}</h3>
      <p className="text-xs text-slate-400 font-medium">{label}</p>
    </div>
  );
};

export const ActionButtons: React.FC<{ onAiClick: () => void }> = ({ onAiClick }) => {
  const actions = [
    { icon: Plus, label: 'Top Up' },
    { icon: Send, label: 'Transfer' },
    { icon: Download, label: 'Request' },
    { icon: Clock, label: 'History' },
  ];

  return (
    <div className="flex gap-6 justify-between md:justify-start">
      {actions.map((action) => (
        <button key={action.label} className="flex flex-col items-center gap-2 group">
          <div className="w-14 h-14 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:bg-[#B6F09C] group-hover:border-[#B6F09C] transition-all duration-300">
            <action.icon className="w-6 h-6 text-[#0D211C]" />
          </div>
          <span className="text-xs font-medium text-slate-500">{action.label}</span>
        </button>
      ))}
      {/* AI Button special */}
       <button onClick={onAiClick} className="flex flex-col items-center gap-2 group ml-auto md:ml-6">
          <div className="w-14 h-14 rounded-full bg-[#0D211C] flex items-center justify-center shadow-sm group-hover:scale-105 transition-all duration-300">
            <Target className="w-6 h-6 text-[#B6F09C]" />
          </div>
          <span className="text-xs font-medium text-[#0D211C]">AI Insights</span>
        </button>
    </div>
  );
};

export const CashflowChart: React.FC = () => {
  return (
    <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-[#0D211C]">Cashflow</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-bold text-[#0D211C]">$562,000</span>
            <span className="text-xs text-slate-400">Total Balance</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#0D211C]"></div>
            <span className="text-slate-600 font-medium">Income</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#B6F09C]"></div>
            <span className="text-slate-600 font-medium">Expense</span>
          </div>
          <select className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-600 outline-none">
            <option>This Year</option>
          </select>
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={BAR_DATA} barGap={4}>
            <Tooltip 
              cursor={{fill: '#f1f5f9'}}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
            />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{fontSize: 10, fill: '#94a3b8'}} 
              dy={10}
            />
            <Bar 
              dataKey="income" 
              fill="#0D211C" 
              radius={[4, 4, 4, 4]} 
              barSize={12}
            />
            <Bar 
              dataKey="expense" 
              fill="#B6F09C" 
              radius={[4, 4, 4, 4]} 
              barSize={12}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const DailyLimit: React.FC = () => {
  return (
    <div className="bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-[#0D211C]">Daily Limit</h3>
        <button><MoreHorizontal className="text-slate-400 w-5 h-5" /></button>
      </div>
      <div className="flex justify-between items-end mb-2">
         <p className="text-xs font-medium text-slate-600">
           <span className="text-[#0D211C] font-bold">$2,500.00</span> spent of $20,000.00
         </p>
         <span className="text-xs font-bold text-[#0D211C]">12.5%</span>
      </div>
      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-[#0D211C] rounded-full w-[12.5%]"></div>
      </div>
    </div>
  );
};

export const SavingPlans: React.FC = () => {
  const plans = [
    { icon: Wallet, label: 'Emergency Fund', current: 5000, target: 10000, percent: 50 },
    { icon: Target, label: 'Vacation Fund', current: 3000, target: 5000, percent: 60 },
    { icon: Home, label: 'Home Down Payment', current: 7250, target: 20000, percent: 36.25 },
  ];

  return (
    <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-bold text-[#0D211C]">Saving Plans</h3>
          <p className="text-xs text-slate-400">Total Savings <span className="text-[#0D211C] font-bold">$84,500</span></p>
        </div>
        <button className="text-xs font-medium text-slate-500 hover:text-[#0D211C]">+ Add Plan</button>
      </div>
      
      <div className="space-y-6">
        {plans.map((plan) => (
          <div key={plan.label}>
             <div className="flex justify-between items-start mb-2">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center">
                   <plan.icon className="w-4 h-4 text-slate-500" />
                 </div>
                 <span className="text-sm font-semibold text-[#0D211C]">{plan.label}</span>
               </div>
               <button><MoreHorizontal className="w-4 h-4 text-slate-300" /></button>
             </div>
             
             <div className="flex justify-between text-[10px] text-slate-400 mb-1.5">
               <span className="font-medium text-[#0D211C]">${plan.current.toLocaleString()} <span className="text-slate-400 font-normal">{plan.percent}%</span></span>
               <span>Target: ${plan.target.toLocaleString()}</span>
             </div>
             
             <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
               <div className="h-full bg-[#B6F09C] rounded-full" style={{ width: `${plan.percent}%` }}></div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const RightSidebar: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Statistic Donut */}
      <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-[#0D211C]">Statistic</h3>
          <select className="text-xs font-medium text-slate-500 bg-transparent outline-none">
            <option>This Month</option>
          </select>
        </div>
        
        <div className="flex justify-between text-xs mb-6 px-2">
           <span className="text-slate-400">Income ($4,800)</span>
           <span className="text-[#0D211C] font-bold border-b-2 border-[#B6F09C] pb-0.5">Expense ($3,500)</span>
        </div>

        <div className="relative h-48 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={DONUT_DATA}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                {DONUT_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
             <span className="text-[10px] text-slate-400">Total Expense</span>
             <span className="text-xl font-bold text-[#0D211C]">$3,500</span>
          </div>
        </div>

        <div className="space-y-3">
          {DONUT_DATA.map((item) => (
             <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#0D211C] px-1.5 py-0.5 rounded bg-slate-50 min-w-[32px] text-center">
                    {Math.round((item.value / 3500) * 100)}%
                  </span>
                  <span className="text-slate-600 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-[#0D211C]">${item.value}</span>
             </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-[#0D211C]">Recent Activity</h3>
          <button><MoreHorizontal className="text-slate-400 w-5 h-5" /></button>
        </div>
        
        <div className="space-y-6 relative">
           {/* Timeline line */}
           <div className="absolute left-[15px] top-8 bottom-0 w-px bg-slate-100"></div>

           <div>
             <p className="text-xs font-semibold text-slate-400 mb-4 pl-10">Today</p>
             <div className="space-y-4">
               {[
                 { name: 'Jamie Smith', action: 'updated account settings', time: '16:05', img: 1 },
                 { name: 'Alex Johnson', action: 'logged in', time: '13:05', img: 2 },
                 { name: 'Morgan Lee', action: 'added a new savings goal', time: '02:05', img: 3 },
               ].map((act, i) => (
                 <div key={i} className="flex gap-3 relative">
                   <div className="relative z-10 w-8 h-8 rounded-full border-2 border-white">
                      <img src={`https://picsum.photos/seed/${act.img}/32/32`} className="rounded-full w-full h-full object-cover" />
                      {i === 0 && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#B6F09C] border border-white rounded-full"></div>}
                   </div>
                   <div>
                     <p className="text-xs text-slate-600 leading-snug">
                       <span className="font-bold text-[#0D211C]">{act.name}</span> {act.action}
                     </p>
                     <p className="text-[10px] text-slate-400 mt-0.5">{act.time}</p>
                   </div>
                 </div>
               ))}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};