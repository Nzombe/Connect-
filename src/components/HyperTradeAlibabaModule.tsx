import React, { useState } from 'react';
import { 
  Globe, 
  ShieldCheck, 
  Truck, 
  DollarSign, 
  Award, 
  Zap, 
  CheckCircle2, 
  RefreshCw, 
  Plus, 
  Building2, 
  Anchor, 
  FileCheck, 
  Sparkles, 
  Layers 
} from 'lucide-react';
import { GlobalTradeEscrowDeal } from '../types';

export const HyperTradeAlibabaModule: React.FC = () => {
  const [escrowDeals, setEscrowDeals] = useState<GlobalTradeEscrowDeal[]>([
    {
      id: 'ESCROW-99104',
      dealTitle: '50,000 Units Industrial Micro-Capacitors (Zero-Capacitance Drift)',
      buyerCompany: 'Apex Global Robotics Inc (California, US)',
      sellerCompany: 'Shenzhen High-Tech Components (Shenzhen, China)',
      totalValueUsd: 145000,
      escrowStatus: 'ESCROW_FUNDED',
      customsStatus: 'CLEARED',
      factoryAuditRating: 'AAA+',
    },
    {
      id: 'ESCROW-88201',
      dealTitle: '100 Metric Tons High-Purity Lithium Carbonate Powder',
      buyerCompany: 'Hamburg Energy Solutions GMBH (Germany)',
      sellerCompany: 'Santiago Mining & Chemical Corp (Chile)',
      totalValueUsd: 890000,
      escrowStatus: 'QUALITY_VERIFIED',
      customsStatus: 'IN_INSPECTION',
      factoryAuditRating: 'AAA+',
    },
  ]);

  // Escrow Creator Form State
  const [dealTitleInput, setDealTitleInput] = useState('');
  const [buyerInput, setBuyerInput] = useState('Apex Global Trade LLC');
  const [sellerInput, setSellerInput] = useState('Tokyo Industrial Precision Ltd');
  const [valueInput, setValueInput] = useState(75000);
  const [isCreatingEscrow, setIsCreatingEscrow] = useState(false);
  const [escrowLog, setEscrowLog] = useState<string | null>(null);

  // Logistics Freight Calculator State
  const [originPort, setOriginPort] = useState('Shanghai (CNSHA)');
  const [destPort, setDestPort] = useState('Rotterdam (NLRTM)');
  const [containerWeightKg, setContainerWeightKg] = useState(12000);
  const [freightQuote, setFreightQuote] = useState<{ costUsd: number; transitDays: number; carbonTonnes: number } | null>({
    costUsd: 3450,
    transitDays: 22,
    carbonTonnes: 1.8,
  });

  // Reverse Auction Bidding Engine State
  const [auctionTopic, setAuctionTopic] = useState('500 Gross Custom CNC Aluminium Enclosures');
  const [supplierBids, setSupplierBids] = useState([
    { supplierName: 'Precision Metal Works (Shenzhen)', bidPriceUsd: 28500, leadTimeDays: 14, auditScore: 'AAA+' },
    { supplierName: 'Bavaria Machining GMBH (Munich)', bidPriceUsd: 31200, leadTimeDays: 10, auditScore: 'AAA+' },
    { supplierName: 'Osaka Industrial Alloys (Osaka)', bidPriceUsd: 29800, leadTimeDays: 12, auditScore: 'A+' },
  ]);

  const handleCreateEscrowDeal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealTitleInput) return;
    setIsCreatingEscrow(true);
    setEscrowLog(null);

    try {
      const res = await fetch('/api/trade/create-escrow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dealTitle: dealTitleInput,
          buyerCompany: buyerInput,
          sellerCompany: sellerInput,
          totalValueUsd: valueInput,
        }),
      });
      const data = await res.json();
      if (data.deal) {
        setEscrowDeals([data.deal, ...escrowDeals]);
        setEscrowLog(data.auditLog || `Escrow Contract ${data.deal.id} activated.`);
        setDealTitleInput('');
      }
    } catch (err: any) {
      setEscrowLog(`Escrow error: ${err.message}`);
    } finally {
      setIsCreatingEscrow(false);
    }
  };

  const calculateFreightEstimate = () => {
    const cost = Math.round(1800 + (containerWeightKg / 1000) * 120);
    const days = originPort.includes('Shanghai') && destPort.includes('Rotterdam') ? 22 : 16;
    setFreightQuote({ costUsd: cost, transitDays: days, carbonTonnes: Number((cost / 1900).toFixed(2)) });
  };

  return (
    <div className="w-full min-w-full overflow-y-auto overflow-x-auto p-4 space-y-6 bg-slate-950 text-slate-100">
      {/* Title */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-amber-400" />
            <h1 className="text-base font-bold text-slate-100 uppercase tracking-wide">
              Connect AI Hyper-Trade Engine (Alibaba-Surpassing Global Enterprise Protocol)
            </h1>
          </div>
          <span className="text-xs px-2.5 py-1 bg-amber-950 text-amber-400 border border-amber-800 font-mono">
            ZERO-FEE SMART ESCROW & FACTORY AUDIT MATRIX
          </span>
        </div>
        <p className="text-xs text-slate-400 max-w-4xl">
          Break global trade barriers with multi-currency smart contract escrow, instant maritime freight logistics estimates, verified factory audit ratings, and reverse auction supplier bidding with zero intermediary commissions.
        </p>
      </div>

      {/* Escrow Contract Creator & Freight Calculator Split Grid */}
      <div className="w-full min-w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Zero-Fee Escrow Smart Contract Creator */}
        <div className="w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Issue Smart Contract Trade Escrow
            </h2>
            <span className="text-[11px] font-mono text-emerald-400">0% Intermediary Fee</span>
          </div>

          <form onSubmit={handleCreateEscrowDeal} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Trade Commodity / Contract Title</label>
              <input
                type="text"
                placeholder="e.g. 20,000 Units High-Voltage Energy Storage Modules"
                value={dealTitleInput}
                onChange={(e) => setDealTitleInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Buyer Enterprise Entity</label>
                <input
                  type="text"
                  value={buyerInput}
                  onChange={(e) => setBuyerInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Seller Manufacturing Plant</label>
                <input
                  type="text"
                  value={sellerInput}
                  onChange={(e) => setSellerInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Escrow Settlement Value (USD)</label>
              <input
                type="number"
                value={valueInput}
                onChange={(e) => setValueInput(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-emerald-500 focus:outline-none font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isCreatingEscrow}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-none transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isCreatingEscrow ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
              Deploy Smart Escrow Contract
            </button>

            {escrowLog && (
              <div className="p-2.5 bg-slate-950 border border-emerald-900/80 text-emerald-300 rounded-none font-mono text-xs">
                {escrowLog}
              </div>
            )}
          </form>
        </div>

        {/* Global Freight Logistics & Customs Clearance Tracker */}
        <div className="w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-400" /> Maritime Freight & Customs Route Calculator
            </h2>
            <span className="text-[11px] font-mono text-amber-400">Real-Time Port Telemetry</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Origin Sea Port</label>
                <select
                  value={originPort}
                  onChange={(e) => setOriginPort(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-amber-500 focus:outline-none font-mono"
                >
                  <option value="Shanghai (CNSHA)">Shanghai Port (CNSHA)</option>
                  <option value="Shenzhen (CNSZX)">Shenzhen Port (CNSZX)</option>
                  <option value="Yokohama (JPYOK)">Yokohama Port (JPYOK)</option>
                  <option value="Singapore (SGSIN)">Singapore Port (SGSIN)</option>
                  <option value="Mombasa (KEMBA)">Mombasa Port (KEMBA)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Destination Sea Port</label>
                <select
                  value={destPort}
                  onChange={(e) => setDestPort(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-amber-500 focus:outline-none font-mono"
                >
                  <option value="Rotterdam (NLRTM)">Rotterdam Port (NLRTM)</option>
                  <option value="Hamburg (DEHAM)">Hamburg Port (DEHAM)</option>
                  <option value="Los Angeles (USLAX)">Los Angeles Port (USLAX)</option>
                  <option value="Durban (ZADUR)">Durban Port (ZADUR)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Cargo Weight (Kilograms)</label>
              <input
                type="number"
                value={containerWeightKg}
                onChange={(e) => setContainerWeightKg(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-amber-500 focus:outline-none font-mono"
              />
            </div>

            <button
              onClick={calculateFreightEstimate}
              className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-none transition-colors flex items-center justify-center gap-2"
            >
              <Anchor className="w-4 h-4" /> Calculate Freight Route & Transit Telemetry
            </button>

            {freightQuote && (
              <div className="p-3 bg-slate-950 border border-amber-900/80 text-amber-200 rounded-none font-mono text-xs grid grid-cols-3 gap-2 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Est. Freight Cost:</span>
                  <span className="text-sm font-bold text-emerald-400">${freightQuote.costUsd} USD</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Port Transit:</span>
                  <span className="text-sm font-bold text-amber-400">{freightQuote.transitDays} Days</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Carbon Footprint:</span>
                  <span className="text-sm font-bold text-blue-400">{freightQuote.carbonTonnes} T CO2</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Supplier Reverse Auction Bidding Engine */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" /> Supplier Reverse Auction Bidding Engine
          </h2>
          <span className="text-[11px] font-mono text-cyan-400">Lowest Price Guaranteed</span>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between bg-slate-950 border border-slate-800 p-3">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Active RFP Tender Contract:</span>
              <span className="font-bold text-slate-100 text-sm">{auctionTopic}</span>
            </div>
            <span className="px-2.5 py-1 bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono text-xs">
              LIVE REVERSE AUCTION
            </span>
          </div>

          <div className="w-full overflow-x-auto border border-slate-800">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[11px] font-mono">
                <tr>
                  <th className="p-2.5">Bidding Supplier Factory</th>
                  <th className="p-2.5">Bid Price (USD)</th>
                  <th className="p-2.5">Guaranteed Lead Time</th>
                  <th className="p-2.5">Factory Audit Score</th>
                  <th className="p-2.5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900 font-mono text-[11px]">
                {supplierBids.map((b, idx) => (
                  <tr key={idx} className="hover:bg-slate-850">
                    <td className="p-2.5 font-semibold text-slate-100">{b.supplierName}</td>
                    <td className="p-2.5 text-emerald-400 font-bold">${b.bidPriceUsd.toLocaleString()} USD</td>
                    <td className="p-2.5 text-amber-400">{b.leadTimeDays} days</td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 bg-blue-950 text-blue-400 border border-blue-800 text-[10px]">
                        {b.auditScore}
                      </span>
                    </td>
                    <td className="p-2.5">
                      <button className="px-2.5 py-1 bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-[10px]">
                        Award Tender Contract
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Escrow Smart Contracts Matrix Table - Full Width 100% Edge-to-Edge */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Active Global Trade Escrow Smart Contracts Matrix
          </h2>
          <span className="text-xs font-mono text-slate-400">{escrowDeals.length} Escrow Accounts</span>
        </div>

        <div className="w-full min-w-full overflow-x-auto border border-slate-800">
          <table className="w-full min-w-[850px] text-left text-xs text-slate-300">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[11px] font-mono">
              <tr>
                <th className="p-3">Escrow ID</th>
                <th className="p-3">Commodity / Deal Title</th>
                <th className="p-3">Buyer Enterprise</th>
                <th className="p-3">Seller Plant</th>
                <th className="p-3">Value (USD)</th>
                <th className="p-3">Customs</th>
                <th className="p-3">Escrow Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900">
              {escrowDeals.map((d) => (
                <tr key={d.id} className="hover:bg-slate-850">
                  <td className="p-3 font-mono text-emerald-400 font-bold whitespace-nowrap">{d.id}</td>
                  <td className="p-3 font-semibold text-slate-100 max-w-xs truncate">{d.dealTitle}</td>
                  <td className="p-3 text-slate-300 text-[11px] whitespace-nowrap">{d.buyerCompany}</td>
                  <td className="p-3 text-slate-300 text-[11px] whitespace-nowrap">{d.sellerCompany}</td>
                  <td className="p-3 font-mono text-emerald-400 font-bold whitespace-nowrap">${d.totalValueUsd.toLocaleString()} USD</td>
                  <td className="p-3 font-mono text-amber-400 text-[11px] whitespace-nowrap">{d.customsStatus}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono text-[10px]">
                      {d.escrowStatus}
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
