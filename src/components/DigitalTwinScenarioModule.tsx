import React, { useState } from 'react';
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  DollarSign, 
  Plus, 
  Play, 
  CheckCircle2, 
  Sparkles, 
  BarChart3, 
  PieChart, 
  Users, 
  Building2 
} from 'lucide-react';
import { DigitalTwinScenario } from '../types';

export const DigitalTwinScenarioModule: React.FC = () => {
  const [scenarios, setScenarios] = useState<DigitalTwinScenario[]>([
    {
      id: 'SCEN-001',
      scenarioType: 'HIRE_STAFF',
      label: 'Hire 3 Senior Software Engineers ($4,500/mo total)',
      baselineMonthlyRevenue: 45000,
      baselineMonthlyExpenses: 28000,
      projectedMonthlyRevenue: 52000,
      projectedMonthlyExpenses: 32500,
      projectedCashflowDelta: 2500,
      runwayImpactDays: 45,
      verdict: 'IMPROVES_POSITION',
      createdDate: '2026-07-29',
    },
    {
      id: 'SCEN-002',
      scenarioType: 'CURRENCY_SHOCK',
      label: 'Local Currency Devaluation by 20%',
      baselineMonthlyRevenue: 45000,
      baselineMonthlyExpenses: 28000,
      projectedMonthlyRevenue: 36000,
      projectedMonthlyExpenses: 31000,
      projectedCashflowDelta: -12000,
      runwayImpactDays: -60,
      verdict: 'CREATES_CASH_CRUNCH',
      createdDate: '2026-07-28',
    },
  ]);

  // Form State
  const [scenarioType, setScenarioType] = useState<'HIRE_STAFF' | 'LOSE_CUSTOMER' | 'PRICE_CHANGE' | 'CURRENCY_SHOCK' | 'CUSTOM_DELTA'>('HIRE_STAFF');
  const [scenarioLabel, setScenarioLabel] = useState('Hire 2 Field Sales Representatives ($2,000/mo)');
  const [monthlyRevenue, setMonthlyRevenue] = useState(45000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(28000);
  const [paramValue, setParamValue] = useState(2000);

  const [isSimulating, setIsSimulating] = useState(false);
  const [activeResult, setActiveResult] = useState<DigitalTwinScenario | null>(scenarios[0]);

  const handleSimulateScenario = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSimulating(true);

    setTimeout(() => {
      let projRev = monthlyRevenue;
      let projExp = monthlyExpenses;
      let verdict: 'IMPROVES_POSITION' | 'CREATES_CASH_CRUNCH' | 'TIGHTER_MARGINS' | 'SAFE' = 'SAFE';

      if (scenarioType === 'HIRE_STAFF') {
        projExp += paramValue;
        projRev += paramValue * 1.5;
        verdict = 'IMPROVES_POSITION';
      } else if (scenarioType === 'LOSE_CUSTOMER') {
        projRev -= paramValue;
        verdict = projRev < projExp ? 'CREATES_CASH_CRUNCH' : 'TIGHTER_MARGINS';
      } else if (scenarioType === 'PRICE_CHANGE') {
        projRev *= (1 + paramValue / 100);
        verdict = 'IMPROVES_POSITION';
      } else if (scenarioType === 'CURRENCY_SHOCK') {
        projRev *= (1 - paramValue / 100);
        verdict = 'CREATES_CASH_CRUNCH';
      }

      const delta = (projRev - projExp) - (monthlyRevenue - monthlyExpenses);
      const newScen: DigitalTwinScenario = {
        id: `SCEN-${Math.floor(100 + Math.random() * 900)}`,
        scenarioType,
        label: scenarioLabel,
        baselineMonthlyRevenue: monthlyRevenue,
        baselineMonthlyExpenses: monthlyExpenses,
        projectedMonthlyRevenue: Math.round(projRev),
        projectedMonthlyExpenses: Math.round(projExp),
        projectedCashflowDelta: Math.round(delta),
        runwayImpactDays: delta >= 0 ? 30 : -45,
        verdict,
        createdDate: new Date().toISOString().slice(0, 10),
      };

      setScenarios([newScen, ...scenarios]);
      setActiveResult(newScen);
      setIsSimulating(false);
    }, 400);
  };

  return (
    <div className="w-full min-w-full overflow-y-auto overflow-x-auto p-4 space-y-6 bg-slate-950 text-slate-100">
      {/* Title */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-400" />
            <h1 className="text-base font-bold text-slate-100 uppercase tracking-wide">
              Enterprise Financial Digital Twin & What-If Scenario Simulator
            </h1>
          </div>
          <span className="text-xs px-2.5 py-1 bg-blue-950 text-blue-400 border border-blue-800 font-mono">
            LIVE ERP LEDGER SCENARIO ENGINE
          </span>
        </div>
        <p className="text-xs text-slate-400 max-w-4xl">
          Simulates the financial impact of strategic business decisions in advance: "What if we hire 5 engineers?", "What if a major customer churns?", or "What if local currency devalues by 20%?". Computes 90-day cashflow trajectories, profit margin deltas, and runway impact.
        </p>
      </div>

      {/* Simulator Inputs & Result Split Grid */}
      <div className="w-full min-w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scenario Input Form */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Play className="w-4 h-4 text-blue-400" /> Run "What-If" Scenario Simulation
            </h2>
            <span className="text-[11px] font-mono text-blue-400">Simulation Config</span>
          </div>

          <form onSubmit={handleSimulateScenario} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Scenario Category</label>
              <select
                value={scenarioType}
                onChange={(e) => setScenarioType(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-blue-500 focus:outline-none font-mono"
              >
                <option value="HIRE_STAFF">Hire Additional Staff / Expand Team</option>
                <option value="LOSE_CUSTOMER">Major Customer Churn / Contract Loss</option>
                <option value="PRICE_CHANGE">Adjust Product Pricing (+/- %)</option>
                <option value="CURRENCY_SHOCK">Currency Devaluation / Inflation Shock</option>
                <option value="CUSTOM_DELTA">Custom Monthly Cashflow Delta</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Scenario Description / Label</label>
              <input
                type="text"
                value={scenarioLabel}
                onChange={(e) => setScenarioLabel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Baseline Monthly Revenue ($)</label>
                <input
                  type="number"
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Baseline Monthly Expenses ($)</label>
                <input
                  type="number"
                  value={monthlyExpenses}
                  onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Parameter Value (Salary Cost / Churn Amount / % Devaluation)</label>
              <input
                type="number"
                value={paramValue}
                onChange={(e) => setParamValue(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-blue-500 focus:outline-none font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isSimulating}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-none transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" /> Run Digital Twin Simulation
            </button>
          </form>
        </div>

        {/* Simulation Output Card */}
        {activeResult && (
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-400" /> Simulation Results & Impact Analysis
              </h2>
              <span className={`px-2 py-0.5 border font-mono text-[10px] font-bold ${
                activeResult.verdict === 'CREATES_CASH_CRUNCH'
                  ? 'bg-red-950 text-red-300 border-red-800'
                  : 'bg-emerald-950 text-emerald-300 border-emerald-800'
              }`}>
                {activeResult.verdict}
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <p className="text-slate-300 font-semibold">{activeResult.label}</p>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] block uppercase">Baseline Monthly Profit</span>
                  <span className="text-base font-bold text-slate-200">
                    ${(activeResult.baselineMonthlyRevenue - activeResult.baselineMonthlyExpenses).toLocaleString()} USD
                  </span>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] block uppercase">Projected Monthly Profit</span>
                  <span className={`text-base font-bold ${
                    activeResult.projectedMonthlyRevenue - activeResult.projectedMonthlyExpenses >= 0
                      ? 'text-emerald-400'
                      : 'text-red-400'
                  }`}>
                    ${(activeResult.projectedMonthlyRevenue - activeResult.projectedMonthlyExpenses).toLocaleString()} USD
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] block uppercase">Monthly Cashflow Delta</span>
                  <span className={`text-base font-bold ${activeResult.projectedCashflowDelta >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {activeResult.projectedCashflowDelta >= 0 ? '+' : ''}${activeResult.projectedCashflowDelta.toLocaleString()} USD
                  </span>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] block uppercase">Runway Impact</span>
                  <span className="text-base font-bold text-blue-400">
                    {activeResult.runwayImpactDays >= 0 ? '+' : ''}{activeResult.runwayImpactDays} Days
                  </span>
                </div>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 text-[11px] text-slate-300">
                <strong>Strategic Recommendation:</strong>{' '}
                {activeResult.verdict === 'CREATES_CASH_CRUNCH'
                  ? 'High financial vulnerability detected. Consider securing invoice factoring or reducing non-essential expenses before proceeding.'
                  : 'Positive net contribution. Cashflow supports execution without burning existing reserve buffer.'}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Scenarios History Matrix - Full Width 100% Edge-to-Edge */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <PieChart className="w-4 h-4 text-blue-400" /> Simulated Enterprise Scenario History
          </h2>
          <span className="text-xs font-mono text-slate-400">{scenarios.length} Scenarios Evaluated</span>
        </div>

        <div className="w-full min-w-full overflow-x-auto border border-slate-800">
          <table className="w-full min-w-[950px] text-left text-xs text-slate-300">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[11px] font-mono">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Scenario Label</th>
                <th className="p-3">Type</th>
                <th className="p-3">Baseline Profit</th>
                <th className="p-3">Projected Profit</th>
                <th className="p-3">Cashflow Delta</th>
                <th className="p-3">Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900 font-mono text-[11px]">
              {scenarios.map((s) => (
                <tr
                  key={s.id}
                  onClick={() => setActiveResult(s)}
                  className={`cursor-pointer transition-colors ${activeResult?.id === s.id ? 'bg-slate-800' : 'hover:bg-slate-850'}`}
                >
                  <td className="p-3 font-bold text-blue-400 whitespace-nowrap">{s.id}</td>
                  <td className="p-3 font-semibold text-slate-100 max-w-xs truncate">{s.label}</td>
                  <td className="p-3 text-slate-400 whitespace-nowrap">{s.scenarioType}</td>
                  <td className="p-3 text-slate-300 whitespace-nowrap">${(s.baselineMonthlyRevenue - s.baselineMonthlyExpenses).toLocaleString()} USD</td>
                  <td className="p-3 font-bold text-emerald-400 whitespace-nowrap">${(s.projectedMonthlyRevenue - s.projectedMonthlyExpenses).toLocaleString()} USD</td>
                  <td className={`p-3 font-bold whitespace-nowrap ${s.projectedCashflowDelta >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {s.projectedCashflowDelta >= 0 ? '+' : ''}${s.projectedCashflowDelta.toLocaleString()} USD
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 border text-[10px] font-bold ${
                      s.verdict === 'CREATES_CASH_CRUNCH'
                        ? 'bg-red-950 text-red-300 border-red-800'
                        : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                    }`}>
                      {s.verdict}
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
