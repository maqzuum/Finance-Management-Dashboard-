import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area
} from 'recharts';
import { X, Sparkles } from 'lucide-react';

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  insight: string;
}

const data = [
  { name: 'Mon', sent: 40, replied: 24, booked: 2 },
  { name: 'Tue', sent: 30, replied: 13, booked: 5 },
  { name: 'Wed', sent: 50, replied: 28, booked: 4 },
  { name: 'Thu', sent: 27, replied: 39, booked: 8 },
  { name: 'Fri', sent: 18, replied: 48, booked: 6 },
  { name: 'Sat', sent: 23, replied: 38, booked: 3 },
  { name: 'Sun', sent: 34, replied: 43, booked: 7 },
];

export const AnalysisModal: React.FC<AnalysisModalProps> = ({ isOpen, onClose, insight }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-100 rounded-lg">
               <Sparkles className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">AI Dashboard Analysis</h2>
              <p className="text-sm text-slate-500">Real-time insights powered by Gemini</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        
        <div className="p-6 space-y-8">
          
          {/* Gemini Insight Box */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100">
            <h3 className="text-sm font-semibold text-indigo-900 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Gemini Insight
            </h3>
            <p className="text-slate-700 leading-relaxed text-sm md:text-base">
              {insight || "Loading insights..."}
            </p>
          </div>

          {/* Charts Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <h4 className="text-sm font-semibold text-slate-700 mb-4">Outreach vs Replies</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorReplied" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Area type="monotone" dataKey="sent" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorSent)" />
                    <Area type="monotone" dataKey="replied" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorReplied)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

             <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <h4 className="text-sm font-semibold text-slate-700 mb-4">Conversion Trend</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Line type="monotone" dataKey="booked" stroke="#0ea5e9" strokeWidth={3} dot={{r: 4, fill: '#0ea5e9', strokeWidth: 2, stroke: '#fff'}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
