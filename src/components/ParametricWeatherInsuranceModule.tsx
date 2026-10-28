import React, { useState } from 'react';
import { 
  CloudRain, 
  Sun, 
  ShieldCheck, 
  Zap, 
  AlertTriangle, 
  DollarSign, 
  RefreshCw, 
  CheckCircle2, 
  Building2, 
  Thermometer, 
  Plus, 
  Sparkles, 
  Radio, 
  TrendingDown 
} from 'lucide-react';
import { ParametricInsurancePolicy } from '../types';

export const ParametricWeatherInsuranceModule: React.FC = () => {
  const [policies, setPolicies] = useState<ParametricInsurancePolicy[]>([
    {
      id: 'POL-ZW-9910',
      policyType: 'DROUGHT',
      location: 'Mazowe Agri Region (Zimbabwe)',
      triggerMetric: 'Rolling 30-Day Rainfall < 20mm',
      thresholdMm: 20,
      coverageAmountUsd: 50000,
      premiumAmountUsd: 1800,
      resilienceScoreSnapshot: 78,
      underwritingPartner: 'Old Mutual Reinsurance',
      status: 'ACTIVE',
      startDate: '2026-06-01',
      endDate: '2026-11-30',
      rolling30dRainfallMm: 14.5, // Below 20mm -> Triggered!
    },
    {
      id: 'POL-KE-8842',
      policyType: 'EXCESS_RAINFALL',
      location: 'Mombasa Port Logistics Zone (Kenya)',
      triggerMetric: 'Single Day Rainfall > 150mm',
      thresholdMm: 150,
      coverageAmountUsd: 120000,
      premiumAmountUsd: 3600,
      resilienceScoreSnapshot: 84,
      underwritingPartner: 'Munich Re Climate Fund',
      status: 'ACTIVE',
      startDate: '2026-05-15',
      endDate: '2026-12-31',
      rolling30dRainfallMm: 85.0,
    },
    {
      id: 'POL-ZA-7711',
      policyType: 'CYCLONE',
      location: 'Durban Shipping Terminal (South Africa)',
      triggerMetric: 'Wind Speed > 120km/h',
      thresholdMm: 200,
      coverageAmountUsd: 250000,
      premiumAmountUsd: 6500,
      resilienceScoreSnapshot: 92,
      underwritingPartner: 'Hollard Specialty Risks',
      status: 'TRIGGERED_PAYOUT',
      startDate: '2026-01-01',
      endDate: '2026-12-31',
      rolling30dRainfallMm: 210.0,
    },
  ]);

  // Quote Generator Form State
  const [policyType, setPolicyType] = useState<'DROUGHT' | 'EXCESS_RAINFALL' | 'CYCLONE' | 'FROST_SURGE'>('DROUGHT');
  const [location, setLocation] = useState('Harare Agri Belt');
  const [coverageUsd, setCoverageUsd] = useState(75000);
  const [thresholdMm, setThresholdMm] = useState(25);
  const [isQuoting, setIsQuoting] = useState(false);
  const [quoteResult, setQuoteResult] = useState<{ premiumUsd: number; multiplier: number; score: number } | null>({
    premiumUsd: 2400,
    multiplier: 1.1,
    score: 82,
  });

  const [payoutLog, setPayoutLog] = useState<string | null>(null);

  const handleCalculateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setIsQuoting(true);
    setTimeout(() => {
      const baseRate = policyType === 'DROUGHT' ? 0.035 : 0.045;
      const score = Math.floor(70 + Math.random() * 25);
      const mult = score > 85 ? 0.85 : 1.15;
      const premium = Math.round(coverageUsd * baseRate * mult);
      setQuoteResult({ premiumUsd: premium, multiplier: mult, score });
      setIsQuoting(false);
    }, 500);
  };

  const handleBindPolicy = () => {
    if (!quoteResult) return;
    const newPolicy: ParametricInsurancePolicy = {
      id: `POL-${Math.floor(10000 + Math.random() * 90000)}`,
      policyType,
      location,
      triggerMetric: `${policyType} < ${thresholdMm}mm`,
      thresholdMm,
      coverageAmountUsd: coverageUsd,
      premiumAmountUsd: quoteResult.premiumUsd,
      resilienceScoreSnapshot: quoteResult.score,
      underwritingPartner: 'Old Mutual Reinsurance',
      status: 'ACTIVE',
      startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date(Date.now() + 180 * 86400000).toISOString().slice(0, 10),
      rolling30dRainfallMm: thresholdMm + 12,
    };
    setPolicies([newPolicy, ...policies]);
    setPayoutLog(`Policy ${newPolicy.id} bound & activated underwritten by Old Mutual.`);
  };

  const handleSimulateDroughtTrigger = (id: string) => {
    setPolicies((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          setPayoutLog(`PARAMETRIC TRIGGER FIRED! Satellite telemetry confirmed rainfall dropped to 12.0mm. Auto-disbursed $${p.coverageAmountUsd.toLocaleString()} USD to account.`);
          return {
            ...p,
            status: 'TRIGGERED_PAYOUT',
            rolling30dRainfallMm: 12.0,
          };
        }
        return p;
      })
    );
  };

  return (
    <div className="w-full min-w-full overflow-y-auto overflow-x-auto p-4 space-y-6 bg-slate-950 text-slate-100">
      {/* Title */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <CloudRain className="w-5 h-5 text-amber-400" />
            <h1 className="text-base font-bold text-slate-100 uppercase tracking-wide">
              Parametric Climate & Weather-Index Insurance Engine
            </h1>
          </div>
          <span className="text-xs px-2.5 py-1 bg-amber-950 text-amber-400 border border-amber-800 font-mono">
            ZERO-LOSS CLAIMS AUTO-PAYOUT PROTOCOL
          </span>
        </div>
        <p className="text-xs text-slate-400 max-w-4xl">
          Automated, satellite-telemetry-driven parametric weather insurance for agricultural, logistics, and industrial operations. Payouts are automatically triggered when rainfall or weather metrics cross predefined thresholds without requiring manual loss claims or adjusters.
        </p>
      </div>

      {/* Quote Generator & Satellite Telemetry Split Grid */}
      <div className="w-full min-w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Parametric Policy Quote Generator */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> Instant Parametric Coverage Quote
            </h2>
            <span className="text-[11px] font-mono text-amber-400">Resilience-Based Pricing</span>
          </div>

          <form onSubmit={handleCalculateQuote} className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Parametric Hazard Type</label>
                <select
                  value={policyType}
                  onChange={(e) => setPolicyType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-amber-500 focus:outline-none font-mono"
                >
                  <option value="DROUGHT">Drought / Rainfall Deficit</option>
                  <option value="EXCESS_RAINFALL">Excess Rainfall / Flood Surge</option>
                  <option value="CYCLONE">Tropical Cyclone / Extreme Wind</option>
                  <option value="FROST_SURGE">Frost / Temperature Plunge</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Target Location / Facility</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Coverage Limit (USD)</label>
                <input
                  type="number"
                  value={coverageUsd}
                  onChange={(e) => setCoverageUsd(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-amber-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Trigger Threshold (mm Rainfall)</label>
                <input
                  type="number"
                  value={thresholdMm}
                  onChange={(e) => setThresholdMm(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-amber-500 focus:outline-none font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isQuoting}
              className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-none transition-colors flex items-center justify-center gap-2"
            >
              {isQuoting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
              Compute Underwriting Premium
            </button>
          </form>

          {quoteResult && (
            <div className="p-3 bg-slate-950 border border-amber-900/80 text-amber-200 rounded-none space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-slate-200">Resilience Score: {quoteResult.score}/100</span>
                <span className="font-mono text-emerald-400 font-bold">Annual Premium: ${quoteResult.premiumUsd.toLocaleString()} USD</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Underwritten by Old Mutual Reinsurance. If satellite telemetry detects 30-day rolling rainfall under {thresholdMm}mm, ${coverageUsd.toLocaleString()} USD will automatically disburse to your account.
              </p>
              <button
                onClick={handleBindPolicy}
                className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold"
              >
                Bind Policy & Activate Telemetry Tracking
              </button>
            </div>
          )}
        </div>

        {/* Telemetry Status Box */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-none flex flex-col justify-between space-y-4">
          <div className="border-b border-slate-800 pb-2 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200 uppercase font-mono">
              Satellite Telemetry Status
            </span>
            <span className="text-[11px] font-mono text-emerald-400">NASA / ERA5 Live</span>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div className="p-2.5 bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Telemetry Feed:</span>
              <span className="text-emerald-400 font-bold">ONLINE</span>
            </div>
            <div className="p-2.5 bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Underwriting Vault:</span>
              <span className="text-blue-400 font-bold">SOLVENT</span>
            </div>
            <div className="p-2.5 bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Auto-Payout Engine:</span>
              <span className="text-amber-400 font-bold">ENGAGED</span>
            </div>
          </div>

          {payoutLog && (
            <div className="p-2.5 bg-slate-950 border border-emerald-900 text-emerald-300 font-mono text-[11px]">
              {payoutLog}
            </div>
          )}
        </div>
      </div>

      {/* Active Parametric Policies Table - Full Width 100% Edge-to-Edge */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" /> Active Parametric Weather Insurance Policies
          </h2>
          <span className="text-xs font-mono text-slate-400">{policies.length} Active Contracts</span>
        </div>

        <div className="w-full min-w-full overflow-x-auto border border-slate-800">
          <table className="w-full min-w-[950px] text-left text-xs text-slate-300">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[11px] font-mono">
              <tr>
                <th className="p-3">Policy ID</th>
                <th className="p-3">Hazard Type</th>
                <th className="p-3">Location / Facility</th>
                <th className="p-3">Trigger Metric</th>
                <th className="p-3">Live Telemetry</th>
                <th className="p-3">Coverage Limit</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900 font-mono text-[11px]">
              {policies.map((p) => (
                <tr key={p.id} className="hover:bg-slate-850">
                  <td className="p-3 font-bold text-amber-400 whitespace-nowrap">{p.id}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 bg-slate-950 text-amber-400 border border-slate-800 text-[10px]">
                      {p.policyType}
                    </span>
                  </td>
                  <td className="p-3 text-slate-200 whitespace-nowrap">{p.location}</td>
                  <td className="p-3 text-slate-300 whitespace-nowrap">{p.triggerMetric}</td>
                  <td className="p-3 font-bold text-blue-400 whitespace-nowrap">
                    {p.rolling30dRainfallMm} mm (30d)
                  </td>
                  <td className="p-3 font-bold text-emerald-400 whitespace-nowrap">
                    ${p.coverageAmountUsd.toLocaleString()} USD
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 border text-[10px] ${
                      p.status === 'TRIGGERED_PAYOUT'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800 font-bold'
                        : 'bg-blue-950 text-blue-300 border-blue-800'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    {p.status === 'ACTIVE' && (
                      <button
                        onClick={() => handleSimulateDroughtTrigger(p.id)}
                        className="px-2.5 py-1 bg-amber-600 hover:bg-amber-500 text-white font-mono text-[10px]"
                      >
                        Simulate Telemetry Trigger
                      </button>
                    )}
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
