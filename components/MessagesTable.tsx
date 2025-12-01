import React from 'react';
import { Message, LeadStatus } from '../types';
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';

interface MessagesTableProps {
  messages: Message[];
}

// Helper to map status to design badge styles
const StatusBadge: React.FC<{ status: LeadStatus; text: string }> = ({ status, text }) => {
  const styles = {
    [LeadStatus.Ignored]: 'bg-rose-50 text-rose-500 border-rose-100', // Failed
    [LeadStatus.Booked]: 'bg-emerald-50 text-emerald-600 border-emerald-100', // Completed
    [LeadStatus.Opened]: 'bg-amber-50 text-amber-600 border-amber-100', // Pending
    [LeadStatus.Replied]: 'bg-blue-50 text-blue-600 border-blue-100', 
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold border ${styles[status] || styles[LeadStatus.Opened]}`}>
      {text}
    </span>
  );
};

export const MessagesTable: React.FC<MessagesTableProps> = ({ messages }) => {
  return (
    <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-[#0D211C] text-lg">Recent Transactions</h3>
        <div className="flex gap-2">
           <button className="flex items-center gap-1 px-3 py-1.5 bg-slate-50 rounded-lg text-xs font-medium text-slate-600">
             This Month <ArrowUpDown className="w-3 h-3" />
           </button>
           <button className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400">
             <MoreHorizontal className="w-5 h-5" />
           </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs text-slate-400 border-b border-slate-50">
              <th className="pb-3 font-medium pl-2">Transaction Name <ArrowUpDown className="inline w-3 h-3 ml-1" /></th>
              <th className="pb-3 font-medium">Date & Time <ArrowUpDown className="inline w-3 h-3 ml-1" /></th>
              <th className="pb-3 font-medium">Amount <ArrowUpDown className="inline w-3 h-3 ml-1" /></th>
              <th className="pb-3 font-medium">Note <ArrowUpDown className="inline w-3 h-3 ml-1" /></th>
              <th className="pb-3 font-medium">Status <ArrowUpDown className="inline w-3 h-3 ml-1" /></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {messages.map((msg) => (
              <tr key={msg.id} className="group hover:bg-slate-50/50 transition-colors">
                <td className="py-4 pl-2">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#0D211C]">{msg.lead.name}</span>
                    <span className="text-[10px] text-slate-400">{msg.lead.email}</span>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-[#0D211C]">{msg.date}</span>
                    <span className="text-[10px] text-slate-400">04:28:48</span>
                  </div>
                </td>
                <td className="py-4">
                  <span className="text-sm font-bold text-[#0D211C]">{msg.organization}</span>
                </td>
                <td className="py-4">
                   <span className="text-xs text-slate-500 block max-w-[140px] truncate" title={msg.messagePreview}>
                     {msg.messagePreview}
                   </span>
                </td>
                <td className="py-4">
                  <StatusBadge status={msg.status} text={msg.tags[0]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
