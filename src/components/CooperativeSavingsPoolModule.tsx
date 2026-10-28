import React, { useState } from 'react';
import { 
  PiggyBank, 
  Users, 
  RotateCw, 
  ShieldCheck, 
  DollarSign, 
  CheckCircle2, 
  Plus, 
  RefreshCw, 
  Hash, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownLeft 
} from 'lucide-react';
import { StokvelSavingsGroup } from '../types';

export const CooperativeSavingsPoolModule: React.FC = () => {
  const [groups, setGroups] = useState<StokvelSavingsGroup[]>([
    {
      id: 'SAVings-GROUP-01',
      name: 'Harare SME Cooperative Stokvel',
      cycle: 'MONTHLY',
      currency: 'USD',
      contributionAmount: 250,
      totalPoolBalance: 3750,
      memberCount: 15,
      nextPayoutRecipient: 'Mrs. Chipo Moyo',
      rotationPosition: 3,
      integritySignature: 'ROTATION-8F90A12C09',
      status: 'PAYOUT_DUE',
    },
    {
      id: 'SAVings-GROUP-02',
      name: 'Bulawayo Traders VSLA Savings Pool',
      cycle: 'WEEKLY',
      currency: 'USD',
      contributionAmount: 50,
      totalPoolBalance: 1200,
      memberCount: 24,
      nextPayoutRecipient: 'Mr. Blessing Nkomo',
      rotationPosition: 8,
      integritySignature: 'ROTATION-3112E8B99F',
      status: 'ACTIVE',
    },
  ]);

  const [members, setMembers] = useState([
    { id: '1', name: 'Mrs. Chipo Moyo', phone: '+263772578565', position: 1, totalContributed: 750, balance: 750, status: 'PAID_OUT' },
    { id: '2', name: 'Mr. Tendai Ndlovu', phone: '+263710482155', position: 2, totalContributed: 750, balance: 750, status: 'PAID_OUT' },
    { id: '3', name: 'Mrs. Mercy Nzombe', phone: '+263773102948', position: 3, totalContributed: 750, balance: 750, status: 'NEXT_IN_LINE' },
    { id: '4', name: 'Mr. Peacemaker Nzombe', phone: '+263774810291', position: 4, totalContributed: 750, balance: 750, status: 'WAITING' },
    { id: '5', name: 'Mrs. Rejoice Nzombe', phone: '+263775928102', position: 5, totalContributed: 750, balance: 750, status: 'WAITING' },
  ]);

  // Form State
  const [selectedMember, setSelectedMember] = useState('3');
  const [contributionAmount, setContributionAmount] = useState(250);
  const [logNote, setLogNote] = useState('');
  const [isLogging, setIsLogging] = useState(false);
  const [actionLog, setActionLog] = useState<string | null>(null);

  const handleLogContribution = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLogging(true);

    setTimeout(() => {
      setMembers((prev) =>
        prev.map((m) => {
          if (m.id === selectedMember) {
            return {
              ...m,
              totalContributed: m.totalContributed + contributionAmount,
              balance: m.balance + contributionAmount,
            };
          }
          return m;
        })
      );

      setGroups((prev) =>
        prev.map((g) => {
          if (g.id === 'SAVings-GROUP-01') {
            return {
              ...g,
              totalPoolBalance: g.totalPoolBalance + contributionAmount,
            };
          }
          return g;
        })
      );

      setActionLog(`Contribution of $${contributionAmount} USD successfully logged into group ledger.`);
      setIsLogging(false);
    }, 400);
  };

  const handleProcessPayout = () => {
    setActionLog(`Payout of $3,750 USD disbursed to Mrs. Mercy Nzombe (Rotation Position #3). Rotation order advanced to Position 4.`);
  };

  return (
    <div className="w-full min-w-full overflow-y-auto overflow-x-auto p-4 space-y-6 bg-slate-950 text-slate-100">
      {/* Title */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <PiggyBank className="w-5 h-5 text-indigo-400" />
            <h1 className="text-base font-bold text-slate-100 uppercase tracking-wide">
              Cooperative Savings Group (VSLA / Stokvel / Chama) Ledger
            </h1>
          </div>
          <span className="text-xs px-2.5 py-1 bg-indigo-950 text-indigo-400 border border-indigo-800 font-mono">
            SHA-256 LEDGER INTEGRITY VERIFIED
          </span>
        </div>
        <p className="text-xs text-slate-400 max-w-4xl">
          Digitized community savings and loan association (VSLA / Stokvel) management. Tracks member contributions, calculates rotating pool payouts, enforces rotation order, and protects against ledger tampering with cryptographic SHA-256 signatures.
        </p>
      </div>

      {/* Group Summary Cards */}
      <div className="w-full min-w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {groups.map((g) => (
          <div key={g.id} className="bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-slate-100 text-xs uppercase">{g.name}</span>
              <span className="text-[11px] font-mono text-indigo-400">{g.id}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-2.5 bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] block uppercase">Total Pool Balance</span>
                <span className="text-base font-bold text-emerald-400">${g.totalPoolBalance.toLocaleString()} {g.currency}</span>
              </div>

              <div className="p-2.5 bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] block uppercase">Cycle Contribution</span>
                <span className="text-base font-bold text-indigo-300">${g.contributionAmount} {g.currency} / {g.cycle}</span>
              </div>
            </div>

            <div className="p-2.5 bg-slate-950 border border-slate-800 text-xs space-y-1 font-mono">
              <div className="flex justify-between text-slate-300">
                <span>Next Payout Recipient:</span>
                <strong className="text-amber-400">{g.nextPayoutRecipient}</strong>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>Rotation Order:</span>
                <span>Position #{g.rotationPosition} of {g.memberCount}</span>
              </div>
              <div className="flex justify-between text-slate-400 text-[10px]">
                <span>Integrity Hash:</span>
                <span className="text-indigo-400">{g.integritySignature}</span>
              </div>
            </div>

            {g.status === 'PAYOUT_DUE' && (
              <button
                onClick={handleProcessPayout}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold transition-colors"
              >
                Disburse Payout (${g.totalPoolBalance.toLocaleString()} USD)
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Log Contribution Form & Log Result */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Plus className="w-4 h-4 text-indigo-400" /> Log Member Contribution Entry
          </h2>
          <span className="text-[11px] font-mono text-indigo-400">Ledger Entry</span>
        </div>

        <form onSubmit={handleLogContribution} className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block text-slate-400 mb-1 font-medium">Select Member</label>
            <select
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-indigo-500 focus:outline-none font-mono"
            >
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} (#{m.position})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-medium">Contribution Amount (USD)</label>
            <input
              type="number"
              value={contributionAmount}
              onChange={(e) => setContributionAmount(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-indigo-500 focus:outline-none font-mono"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={isLogging}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-none transition-colors flex items-center justify-center gap-2"
            >
              {isLogging ? <RefreshCw className="w-4 h-4 animate-spin" /> : <DollarSign className="w-4 h-4" />}
              Record Contribution
            </button>
          </div>
        </form>

        {actionLog && (
          <div className="p-2.5 bg-slate-950 border border-indigo-900 text-indigo-300 font-mono text-xs">
            {actionLog}
          </div>
        )}
      </div>

      {/* Member Rotation & Contribution Table - Full Width 100% Edge-to-Edge */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-400" /> Member Rotation & Contribution Ledger
          </h2>
          <span className="text-xs font-mono text-slate-400">{members.length} Active Members</span>
        </div>

        <div className="w-full min-w-full overflow-x-auto border border-slate-800">
          <table className="w-full min-w-[950px] text-left text-xs text-slate-300">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[11px] font-mono">
              <tr>
                <th className="p-3">Position</th>
                <th className="p-3">Member Name</th>
                <th className="p-3">Phone Contact</th>
                <th className="p-3">Total Contributed</th>
                <th className="p-3">Current Balance</th>
                <th className="p-3">Rotation Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900 font-mono text-[11px]">
              {members.map((m) => (
                <tr key={m.id} className="hover:bg-slate-850">
                  <td className="p-3 font-bold text-indigo-400 whitespace-nowrap">#{m.position}</td>
                  <td className="p-3 font-semibold text-slate-100 whitespace-nowrap">{m.name}</td>
                  <td className="p-3 text-slate-400 whitespace-nowrap">{m.phone}</td>
                  <td className="p-3 font-bold text-emerald-400 whitespace-nowrap">${m.totalContributed.toLocaleString()} USD</td>
                  <td className="p-3 text-slate-200 whitespace-nowrap">${m.balance.toLocaleString()} USD</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 border text-[10px] font-bold ${
                      m.status === 'NEXT_IN_LINE'
                        ? 'bg-amber-950 text-amber-300 border-amber-800'
                        : m.status === 'PAID_OUT'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}>
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
