import React, { useState } from 'react';
import { 
  Cpu, 
  Gauge, 
  AlertTriangle, 
  ShieldCheck, 
  Search, 
  Activity, 
  Battery, 
  Thermometer, 
  Wrench, 
  RefreshCw, 
  CheckCircle2, 
  Car, 
  Zap, 
  FileText 
} from 'lucide-react';
import { Obd2TelemetryReading } from '../types';

export const Obd2EngineDiagnosticsModule: React.FC = () => {
  const [readings, setReadings] = useState<Obd2TelemetryReading[]>([
    {
      id: 'READ-9901',
      deviceId: 'OBD2-DONGLE-01',
      vehicleLabel: 'Toyota Hilux 2.8 GD-6 (Commercial Fleet)',
      vin: 'AHTBB3CD102984122',
      rpm: 2450,
      coolantTempC: 108, // Warning: High coolant
      speedKph: 85,
      batteryVoltage: 13.8,
      oilPressureKpa: 340,
      misfireCount: 2,
      dtcCodes: ['P0118', 'P0301'],
      healthScore: 68,
      status: 'WARNING',
      recordedAt: '2026-07-29T05:15:00Z',
    },
    {
      id: 'READ-9900',
      deviceId: 'OBD2-DONGLE-02',
      vehicleLabel: 'Mercedes-Benz Sprinter 316 CDI (Delivery Van)',
      vin: 'WDB9066351N491028',
      rpm: 1850,
      coolantTempC: 88,
      speedKph: 100,
      batteryVoltage: 14.1,
      oilPressureKpa: 380,
      misfireCount: 0,
      dtcCodes: [],
      healthScore: 98,
      status: 'OPTIMAL',
      recordedAt: '2026-07-29T05:10:00Z',
    },
  ]);

  // Code Decoder State
  const [codeQuery, setCodeQuery] = useState('P0300');
  const [decodedInfo, setDecodedInfo] = useState<{
    code: string;
    description: string;
    system: string;
    severity: string;
    action: string;
  } | null>({
    code: 'P0300',
    description: 'Random/Multiple Cylinder Misfire Detected',
    system: 'Ignition / Fuel',
    severity: 'CRITICAL',
    action: 'Inspect spark plugs, ignition coils, and fuel injectors immediately. Sustained misfiring risks damaging the catalytic converter.',
  });

  // VIN Inspector State
  const [vinInput, setVinInput] = useState('1G1YY22U915100001');
  const [vinResult, setVinResult] = useState<{
    make: string;
    model: string;
    year: number;
    recalls: string[];
  } | null>({
    make: 'Chevrolet',
    model: 'Corvette Z06',
    year: 2021,
    recalls: ['NHTSA Recall 21V902: Seatbelt Retractor Assembly Locking Defect (Remedy Available)'],
  });

  const [activeReading, setActiveReading] = useState<Obd2TelemetryReading>(readings[0]);

  const handleDecodeDtc = (e: React.FormEvent) => {
    e.preventDefault();
    const dtcMap: Record<string, any> = {
      P0100: { desc: 'Mass Air Flow (MAF) Sensor Circuit Malfunction', sys: 'Intake/Fuel', sev: 'WARNING', act: 'Inspect MAF sensor wiring and clean sensor element.' },
      P0118: { desc: 'Engine Coolant Temperature Sensor Circuit High Input', sys: 'Cooling', sev: 'CRITICAL', act: 'Check engine coolant level and thermostat before driving further.' },
      P0300: { desc: 'Random/Multiple Cylinder Misfire Detected', sys: 'Ignition', sev: 'CRITICAL', act: 'Replace spark plugs or coils immediately.' },
      P0420: { desc: 'Catalyst System Efficiency Below Threshold (Bank 1)', sys: 'Emissions', sev: 'WARNING', act: 'Inspect O2 sensors and catalytic converter.' },
    };

    const code = codeQuery.toUpperCase().strip?.() || codeQuery.toUpperCase();
    const match = dtcMap[code] || {
      desc: 'Generic Powertrain Fault Code',
      sys: 'Powertrain',
      sev: 'INFO',
      act: 'Refer to vehicle workshop manual for detailed troubleshooting.',
    };

    setDecodedInfo({
      code,
      description: match.desc,
      system: match.sys,
      severity: match.sev,
      action: match.act,
    });
  };

  const handleVinLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setVinResult({
      make: 'Toyota',
      model: 'Land Cruiser Prado',
      year: 2023,
      recalls: ['NHTSA Recall 23V104: Fuel Pump Lower Pressure Impeller Inspection'],
    });
  };

  return (
    <div className="w-full min-w-full overflow-y-auto overflow-x-auto p-4 space-y-6 bg-slate-950 text-slate-100">
      {/* Title */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-teal-400" />
            <h1 className="text-base font-bold text-slate-100 uppercase tracking-wide">
              OBD2 Vehicle Telemetry & SAE J2012 Engine Diagnostics Hub
            </h1>
          </div>
          <span className="text-xs px-2.5 py-1 bg-teal-950 text-teal-400 border border-teal-800 font-mono">
            READ-ONLY TELEMETRY & RECALL INSPECTOR
          </span>
        </div>
        <p className="text-xs text-slate-400 max-w-4xl">
          Real-time OBD2 vehicle telemetry monitoring, fault code decoder (SAE J2012 standard P0000-P0999), and NHTSA VIN safety recall scanner. Safely inspects engine RPM, coolant temperature, oil pressure, and battery voltage without modifying vehicle ECU controls.
        </p>
      </div>

      {/* Live Gauges Banner */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2 font-mono">
            <Gauge className="w-4 h-4 text-teal-400" /> Active Vehicle Telemetry: {activeReading.vehicleLabel}
          </span>
          <span className="text-xs font-mono text-emerald-400 font-bold">Health Score: {activeReading.healthScore}/100</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 font-mono text-xs">
          <div className="p-3 bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] block uppercase">Engine RPM</span>
            <span className="text-base font-bold text-teal-300">{activeReading.rpm} RPM</span>
          </div>

          <div className={`p-3 bg-slate-950 border ${activeReading.coolantTempC > 100 ? 'border-amber-700 bg-amber-950/20' : 'border-slate-800'} space-y-1`}>
            <span className="text-slate-400 text-[10px] block uppercase">Coolant Temp</span>
            <span className={`text-base font-bold ${activeReading.coolantTempC > 100 ? 'text-amber-400' : 'text-teal-300'}`}>
              {activeReading.coolantTempC}°C
            </span>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] block uppercase">Speed</span>
            <span className="text-base font-bold text-teal-300">{activeReading.speedKph} km/h</span>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] block uppercase">Battery Voltage</span>
            <span className="text-base font-bold text-teal-300">{activeReading.batteryVoltage} V</span>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] block uppercase">Oil Pressure</span>
            <span className="text-base font-bold text-teal-300">{activeReading.oilPressureKpa} kPa</span>
          </div>
        </div>
      </div>

      {/* Code Decoder & VIN Inspector Split Grid */}
      <div className="w-full min-w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SAE J2012 Fault Code Decoder */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Wrench className="w-4 h-4 text-teal-400" /> SAE J2012 Fault Code Decoder
            </h2>
            <span className="text-[11px] font-mono text-teal-400">Diagnostic Analyzer</span>
          </div>

          <form onSubmit={handleDecodeDtc} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Input Diagnostic Trouble Code (DTC)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. P0300, P0118, P0420"
                  value={codeQuery}
                  onChange={(e) => setCodeQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-teal-500 focus:outline-none font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-none shrink-0"
                >
                  Decode
                </button>
              </div>
            </div>

            {decodedInfo && (
              <div className="p-3 bg-slate-950 border border-teal-900 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1">
                  <span className="font-bold text-teal-300">{decodedInfo.code}</span>
                  <span className="px-2 py-0.5 bg-red-950 text-red-300 border border-red-800 text-[10px]">
                    {decodedInfo.severity}
                  </span>
                </div>
                <p className="text-slate-200 font-semibold">{decodedInfo.description}</p>
                <p className="text-slate-400 text-[11px]">System: {decodedInfo.system}</p>
                <div className="p-2 bg-slate-900 border border-slate-800 text-amber-300 text-[11px]">
                  <strong>Action Plan:</strong> {decodedInfo.action}
                </div>
              </div>
            )}
          </form>
        </div>

        {/* VIN & Safety Recall Inspector */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Car className="w-4 h-4 text-blue-400" /> NHTSA VIN & Safety Recall Inspector
            </h2>
            <span className="text-[11px] font-mono text-blue-400">VIN Validator</span>
          </div>

          <form onSubmit={handleVinLookup} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Input 17-Character VIN</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={vinInput}
                  onChange={(e) => setVinInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-blue-500 focus:outline-none font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-none shrink-0"
                >
                  Lookup VIN
                </button>
              </div>
            </div>

            {vinResult && (
              <div className="p-3 bg-slate-950 border border-blue-900 space-y-2 text-xs font-mono">
                <div className="font-bold text-blue-300">
                  {vinResult.year} {vinResult.make} {vinResult.model}
                </div>
                <div className="text-[11px] text-slate-300 space-y-1">
                  <span className="font-bold text-slate-200 block">Active Safety Recalls:</span>
                  {vinResult.recalls.map((r, i) => (
                    <div key={i} className="p-2 bg-red-950/40 border border-red-800 text-red-300">
                      {r}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Vehicle Fleet Telemetry Matrix - Full Width 100% Edge-to-Edge */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-teal-400" /> Monitored Fleet Telemetry Matrix
          </h2>
          <span className="text-xs font-mono text-slate-400">{readings.length} Vehicles Online</span>
        </div>

        <div className="w-full min-w-full overflow-x-auto border border-slate-800">
          <table className="w-full min-w-[950px] text-left text-xs text-slate-300">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[11px] font-mono">
              <tr>
                <th className="p-3">Device ID</th>
                <th className="p-3">Vehicle</th>
                <th className="p-3">VIN</th>
                <th className="p-3">RPM / Speed</th>
                <th className="p-3">Coolant</th>
                <th className="p-3">DTC Codes</th>
                <th className="p-3">Health Score</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900 font-mono text-[11px]">
              {readings.map((r) => (
                <tr
                  key={r.id}
                  onClick={() => setActiveReading(r)}
                  className={`cursor-pointer transition-colors ${activeReading.id === r.id ? 'bg-slate-800' : 'hover:bg-slate-850'}`}
                >
                  <td className="p-3 font-bold text-teal-400 whitespace-nowrap">{r.deviceId}</td>
                  <td className="p-3 text-slate-100 font-semibold max-w-xs truncate">{r.vehicleLabel}</td>
                  <td className="p-3 text-slate-400 whitespace-nowrap">{r.vin}</td>
                  <td className="p-3 text-slate-300 whitespace-nowrap">{r.rpm} RPM / {r.speedKph} km/h</td>
                  <td className="p-3 font-bold text-amber-400 whitespace-nowrap">{r.coolantTempC}°C</td>
                  <td className="p-3 text-red-400 whitespace-nowrap">
                    {r.dtcCodes.length ? r.dtcCodes.join(', ') : 'None'}
                  </td>
                  <td className="p-3 font-bold text-emerald-400 whitespace-nowrap">{r.healthScore}/100</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 border text-[10px] ${
                      r.status === 'OPTIMAL'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : 'bg-amber-950 text-amber-300 border-amber-800'
                    }`}>
                      {r.status}
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
