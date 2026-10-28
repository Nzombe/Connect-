import React, { useState } from 'react';
import { ShoppingBag, Search, ShieldCheck, Truck, DollarSign, FileText, Send, RefreshCw, Layers } from 'lucide-react';
import { MarketplaceProduct, RequestForQuotation } from '../types';

export const GlobalMarketplaceModule: React.FC = () => {
  const [products] = useState<MarketplaceProduct[]>([
    {
      id: 'prod-1',
      title: 'Automated Industrial CNC Milling Machine 5-Axis',
      category: 'Industrial Machinery',
      supplier: 'Zhengzhou Heavy Machinery Corp',
      country: 'China',
      moq: 1,
      unitPriceUsd: 28500.0,
      tradeAssurance: true,
      rating: 4.9,
      leadTimeDays: 21,
      specifications: { Power: '15kW', SpindleSpeed: '12000 RPM', Precision: '0.005mm' },
    },
    {
      id: 'prod-2',
      title: 'Lithium Iron Phosphate (LiFePO4) Battery Cells 3.2V 280Ah',
      category: 'Energy & Storage',
      supplier: 'Shenzhen Energy Storage Tech Ltd',
      country: 'China',
      moq: 100,
      unitPriceUsd: 42.5,
      tradeAssurance: true,
      rating: 4.8,
      leadTimeDays: 10,
      specifications: { Voltage: '3.2V', Capacity: '280Ah', CycleLife: '6000 cycles' },
    },
    {
      id: 'prod-3',
      title: 'High-Speed Automated SMT Pick and Place Machine',
      category: 'Electronics Manufacturing',
      supplier: 'Jiangsu Precision Robotics Co',
      country: 'China',
      moq: 1,
      unitPriceUsd: 19800.0,
      tradeAssurance: true,
      rating: 4.9,
      leadTimeDays: 14,
      specifications: { MountingSpeed: '45000 CPH', ComponentSize: '0201 to 40x40mm' },
    },
    {
      id: 'prod-4',
      title: 'Biodegradable PLA Resin Pellets Grade A Wholesale',
      category: 'Raw Materials & Chemicals',
      supplier: 'Ningbo Bio-Plastics Materials Ltd',
      country: 'China',
      moq: 5000,
      unitPriceUsd: 1.85,
      tradeAssurance: true,
      rating: 4.7,
      leadTimeDays: 7,
      specifications: { MeltIndex: '10g/10min', Density: '1.24g/cm3' },
    },
  ]);

  const [rfqList, setRfqList] = useState<RequestForQuotation[]>([
    {
      id: 'rfq-991',
      productName: 'Custom Aluminum Extrusion Profiles 6063-T5',
      quantity: 10000,
      targetPriceUsd: 2.15,
      destinationCountry: 'Germany',
      status: 'Quoted',
      createdAt: '2026-07-28',
      quotesCount: 4,
    },
    {
      id: 'rfq-992',
      productName: 'Medical Grade Disposable NBR Gloves Box of 100',
      quantity: 50000,
      targetPriceUsd: 2.8,
      destinationCountry: 'United States',
      status: 'Open',
      createdAt: '2026-07-29',
      quotesCount: 2,
    },
  ]);

  // RFQ Submission & AI Quote Generator state
  const [rfqProductName, setRfqProductName] = useState('');
  const [rfqQuantity, setRfqQuantity] = useState(2000);
  const [rfqTargetPrice, setRfqTargetPrice] = useState(15.0);
  const [rfqDestination, setRfqDestination] = useState('Germany');

  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleCreateRfq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rfqProductName) return;

    setIsEvaluating(true);
    setAiAnalysis(null);

    try {
      const res = await fetch('/api/marketplace/generate-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: rfqProductName,
          quantity: rfqQuantity,
          targetPriceUsd: rfqTargetPrice,
          destinationCountry: rfqDestination,
        }),
      });
      const data = await res.json();
      setAiAnalysis(data.analysis);

      const newRfq: RequestForQuotation = {
        id: `rfq-${Date.now().toString().slice(-4)}`,
        productName: rfqProductName,
        quantity: rfqQuantity,
        targetPriceUsd: rfqTargetPrice,
        destinationCountry: rfqDestination,
        status: 'Open',
        createdAt: new Date().toISOString().split('T')[0],
        quotesCount: 1,
      };

      setRfqList([newRfq, ...rfqList]);
    } catch (err: any) {
      console.error('RFQ Error:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="w-full min-w-full overflow-y-auto overflow-x-auto p-4 space-y-6 bg-slate-950 text-slate-100">
      {/* Title */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h1 className="text-base font-bold text-slate-100 uppercase tracking-wide">
              Connect AI Global B2B Marketplace (Alibaba Grade)
            </h1>
          </div>
          <span className="text-xs px-2.5 py-1 bg-amber-950 text-amber-400 border border-amber-800 font-mono">
            TRADE ASSURANCE ESCROW ACTIVE
          </span>
        </div>
        <p className="text-xs text-slate-400 max-w-4xl">
          Wholesale supplier catalog, automated Request for Quotations (RFQ), AI quote calculations, trade escrow protection, and international freight logistics.
        </p>
      </div>

      {/* RFQ Generator Form & AI Valuation */}
      <div className="w-full min-w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submit RFQ */}
        <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Send className="w-4 h-4 text-amber-400" /> Submit Global RFQ & AI Quote Valuation
            </h2>
            <span className="text-[11px] text-slate-400 font-mono">Wholesale Sourcing</span>
          </div>

          <form onSubmit={handleCreateRfq} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Product / Component Name</label>
              <input
                type="text"
                placeholder="e.g. Solar Inverter 10kW Hybrid Three Phase"
                value={rfqProductName}
                onChange={(e) => setRfqProductName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Quantity (Units)</label>
                <input
                  type="number"
                  value={rfqQuantity}
                  onChange={(e) => setRfqQuantity(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-amber-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Target Price (USD)</label>
                <input
                  type="number"
                  step="0.01"
                  value={rfqTargetPrice}
                  onChange={(e) => setRfqTargetPrice(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-amber-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Destination Country</label>
                <input
                  type="text"
                  value={rfqDestination}
                  onChange={(e) => setRfqDestination(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isEvaluating}
              className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-none transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isEvaluating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Calculating AI Trade Quote...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Broadcast RFQ to Verified Suppliers
                </>
              )}
            </button>
          </form>
        </div>

        {/* AI Trade Quote Analysis Display */}
        <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> AI Trade Sourcing & Freight Estimate
            </h2>
            <span className="text-[11px] text-emerald-400 font-mono">Verified Supplier Match</span>
          </div>

          {aiAnalysis ? (
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-none">
                  <span className="text-slate-400 block text-[10px] font-mono">ESTIMATED UNIT COST</span>
                  <span className="text-base font-bold text-emerald-400 font-mono">
                    ${aiAnalysis.estimatedUnitCost} USD
                  </span>
                </div>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-none">
                  <span className="text-slate-400 block text-[10px] font-mono">ESTIMATED SEA FREIGHT</span>
                  <span className="text-base font-bold text-cyan-400 font-mono">
                    ${aiAnalysis.estimatedFreightUsd} USD
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono text-[11px]">
                <div className="p-2 bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">Customs Tariff Estimate: </span>
                  <span className="text-amber-400 font-bold">{aiAnalysis.dutyTaxPercentage}%</span>
                </div>
                <div className="p-2 bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">Logistics Lead Time: </span>
                  <span className="text-slate-100 font-bold">{aiAnalysis.deliveryLeadDays} Days</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950 border border-amber-900/60 rounded-none space-y-1">
                <span className="text-[10px] font-mono text-amber-400 block font-semibold">
                  CONNECT AI RECOMMENDATION
                </span>
                <p className="text-slate-200 text-xs">{aiAnalysis.aiRecommendation}</p>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-slate-500 font-mono text-xs border border-dashed border-slate-800">
              Submit an RFQ above to run instant AI price benchmark, freight estimation, and trade assurance contract matching.
            </div>
          )}
        </div>
      </div>

      {/* Supplier Product Catalog - Full Width 100% */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Verified Supplier Product Catalog
          </h2>
          <span className="text-xs font-mono text-slate-400">{products.length} Direct Factory Catalog Items</span>
        </div>

        <div className="w-full min-w-full overflow-x-auto border border-slate-800">
          <table className="w-full min-w-[950px] text-left text-xs text-slate-300">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[11px] font-mono">
              <tr>
                <th className="p-3">Product Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Supplier Name</th>
                <th className="p-3">Country</th>
                <th className="p-3">MOQ</th>
                <th className="p-3">Unit Price (USD)</th>
                <th className="p-3">Trade Protection</th>
                <th className="p-3">Lead Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-850 transition-colors">
                  <td className="p-3 font-semibold text-slate-100 whitespace-nowrap">{p.title}</td>
                  <td className="p-3 text-cyan-400 whitespace-nowrap">{p.category}</td>
                  <td className="p-3 text-slate-300 whitespace-nowrap">{p.supplier}</td>
                  <td className="p-3 text-slate-400 whitespace-nowrap">{p.country}</td>
                  <td className="p-3 font-mono text-slate-200 whitespace-nowrap">{p.moq} units</td>
                  <td className="p-3 font-mono text-amber-400 font-bold whitespace-nowrap">${p.unitPriceUsd.toFixed(2)}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 bg-amber-950 text-amber-400 border border-amber-800 font-mono text-[10px] flex items-center gap-1 w-fit">
                      <ShieldCheck className="w-3 h-3" /> TRADE ASSURANCE ESCROW
                    </span>
                  </td>
                  <td className="p-3 text-slate-300 whitespace-nowrap">{p.leadTimeDays} days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Active RFQs Directory - Full Width 100% */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Active Requests for Quotations (RFQs)
          </h2>
          <span className="text-xs font-mono text-slate-400">{rfqList.length} Active RFQs</span>
        </div>

        <div className="w-full min-w-full overflow-x-auto border border-slate-800">
          <table className="w-full min-w-[800px] text-left text-xs text-slate-300">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[11px] font-mono">
              <tr>
                <th className="p-3">RFQ ID</th>
                <th className="p-3">Requested Product</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Target Price</th>
                <th className="p-3">Destination</th>
                <th className="p-3">Received Quotes</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900">
              {rfqList.map((rfq) => (
                <tr key={rfq.id} className="hover:bg-slate-850 transition-colors">
                  <td className="p-3 font-mono text-amber-400 font-bold whitespace-nowrap">{rfq.id}</td>
                  <td className="p-3 font-medium text-slate-100 whitespace-nowrap">{rfq.productName}</td>
                  <td className="p-3 font-mono text-slate-200 whitespace-nowrap">{rfq.quantity.toLocaleString()} units</td>
                  <td className="p-3 font-mono text-emerald-400 whitespace-nowrap">${rfq.targetPriceUsd.toFixed(2)}</td>
                  <td className="p-3 text-slate-300 whitespace-nowrap">{rfq.destinationCountry}</td>
                  <td className="p-3 font-mono text-cyan-400 whitespace-nowrap">{rfq.quotesCount} supplier quotes</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono text-[10px]">
                      {rfq.status}
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
