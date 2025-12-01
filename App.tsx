import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { MessagesTable } from './components/MessagesTable';
import { AnalysisModal } from './components/AnalysisModal';
import { 
  PipelineCard, MiniStatCard, ActionButtons, 
  CashflowChart, DailyLimit, SavingPlans, RightSidebar 
} from './components/DashboardWidgets';
import { StatGroup, Message, LeadStatus } from './types';
import { generateDashboardInsight } from './services/geminiService';
import { 
  Search, Bell, ChevronDown, Menu, User, 
  TrendingUp, TrendingDown, DollarSign
} from 'lucide-react';

const MOCK_STATS: StatGroup[] = [
  {
    title: 'Outreach sent',
    metrics: [
      { label: 'Drafted', value: 42, trendPercentage: 14, trendDirection: 'up' },
      { label: 'Sent', value: 68, trendPercentage: 17, trendDirection: 'up' },
    ]
  },
  // ... other stats are used for logic but not displayed directly in new design
];

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    lead: { name: 'Electricity Bill', email: 'Payments', avatarUrl: 'https://picsum.photos/seed/1/32/32' },
    messagePreview: 'Payment for monthly electricity bill',
    date: '2028-03-01',
    status: LeadStatus.Ignored, // Failed
    organization: '$295.81', // Amount
    tags: ['Failed']
  },
  {
    id: '2',
    lead: { name: 'Weekly Groceries', email: 'Shopping', avatarUrl: 'https://picsum.photos/seed/2/32/32' },
    messagePreview: 'Groceries shopping at local supermarket',
    date: '2028-03-04',
    status: LeadStatus.Booked, // Completed
    organization: '$204.07',
    tags: ['Completed']
  },
  {
    id: '3',
    lead: { name: 'Movie Night', email: 'Entertainment', avatarUrl: 'https://picsum.photos/seed/3/32/32' },
    messagePreview: 'Tickets for movies and snacks',
    date: '2028-02-27',
    status: LeadStatus.Opened, // Pending
    organization: '$97.84',
    tags: ['Pending']
  },
  {
    id: '4',
    lead: { name: 'Medical Check-up', email: 'Healthcare', avatarUrl: 'https://picsum.photos/seed/4/32/32' },
    messagePreview: 'Routine health check-up and medications',
    date: '2028-02-07',
    status: LeadStatus.Opened,
    organization: '$323.33',
    tags: ['Pending']
  },
  {
    id: '5',
    lead: { name: 'Italian Restaurant', email: 'Dining Out', avatarUrl: 'https://picsum.photos/seed/5/32/32' },
    messagePreview: 'Dining out with family at a local restaurant',
    date: '2028-02-11',
    status: LeadStatus.Opened,
    organization: '$226.25',
    tags: ['Pending']
  },
];

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
  const [insight, setInsight] = useState('');
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);

  const handleGenerateInsights = async () => {
    setIsAnalysisOpen(true);
    if (!insight) {
      setIsLoadingInsight(true);
      const generatedInsight = await generateDashboardInsight(MOCK_STATS, MOCK_MESSAGES);
      setInsight(generatedInsight);
      setIsLoadingInsight(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      <Sidebar />
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 min-w-0 p-4 lg:p-8">
        
        {/* Header */}
        <header className="flex items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
             <button 
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-[#0D211C]">Dashboard</h1>
          </div>

          <div className="flex items-center gap-6 flex-1 justify-end">
            <div className="relative hidden md:block w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search placeholder" 
                className="w-full bg-slate-100 border-none rounded-full pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#B6F09C]"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 cursor-pointer" />
            </div>

            <div className="flex items-center gap-3">
               <button className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50">
                 <div className="w-5 h-5 flex items-center justify-center font-bold">...</div>
               </button>
               <button className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 relative">
                 <Bell className="w-5 h-5" />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
               </button>
               
               <div className="flex items-center gap-2 pl-2">
                 <span className="hidden md:block font-bold text-[#0D211C] text-sm">Andrew Forbist</span>
                 <img src="https://picsum.photos/seed/user/40/40" className="w-10 h-10 rounded-full border-2 border-[#B6F09C]" />
               </div>
            </div>
          </div>
        </header>

        {/* Dashboard Grid Layout */}
        <div className="flex flex-col xl:flex-row gap-8">
          
          {/* Left Column (Main) */}
          <div className="flex-1 min-w-0 space-y-8">
            
            {/* Row 1: Card + Stats */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-5 h-[280px]">
                <PipelineCard />
              </div>
              <div className="md:col-span-7 grid grid-cols-3 gap-4">
                 <MiniStatCard 
                   icon={DollarSign} label="Total Income" value="$78,000" trend="+1.78%" trendUp={true} 
                 />
                 <MiniStatCard 
                   icon={TrendingDown} label="Total Expense" value="$43,000" trend="-1.78%" trendUp={false} 
                 />
                 <MiniStatCard 
                   icon={TrendingUp} label="Total Savings" value="$56,000" trend="+1.24%" trendUp={true} 
                 />
              </div>
            </div>

            {/* Row 2: Actions + Chart */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
               <div className="md:col-span-4">
                 <ActionButtons onAiClick={handleGenerateInsights} />
                 <div className="mt-8">
                   <DailyLimit />
                 </div>
               </div>
               <div className="md:col-span-8">
                 <CashflowChart />
               </div>
            </div>

            {/* Row 3: Savings + Transactions */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-4">
                <SavingPlans />
              </div>
              <div className="md:col-span-8">
                <MessagesTable messages={MOCK_MESSAGES} />
              </div>
            </div>

          </div>

          {/* Right Column (Sidebar) */}
          <div className="w-full xl:w-[320px] shrink-0">
             <RightSidebar />
          </div>

        </div>
      </main>

      <AnalysisModal 
        isOpen={isAnalysisOpen} 
        onClose={() => setIsAnalysisOpen(false)} 
        insight={insight}
      />
    </div>
  );
};

export default App;
