import React, { useState } from 'react';
import { 
  Tv, 
  Wind, 
  Lock, 
  Unlock, 
  Zap, 
  Thermometer, 
  Droplets, 
  Power, 
  ShieldCheck, 
  Cpu, 
  Sliders, 
  RefreshCw, 
  Building2, 
  Home, 
  Server, 
  AlertTriangle, 
  Plus, 
  CheckCircle2, 
  Radio 
} from 'lucide-react';
import { SmartApplianceIoT } from '../types';

export const SmartAppliancesIotModule: React.FC = () => {
  const [appliances, setAppliances] = useState<SmartApplianceIoT[]>([
    {
      id: 'iot-101',
      name: 'HQ Suite VRF HVAC Climate Control',
      location: 'HQ Executive Office',
      category: 'HVAC Climate',
      status: 'ONLINE',
      powerState: true,
      powerConsumptionWatts: 1420,
      temperatureCelsius: 21.5,
      humidityPercent: 45,
      fanSpeedPercent: 65,
      ipAddress: '192.168.10.42',
      lastUpdated: 'Just now',
    },
    {
      id: 'iot-102',
      name: 'Biometric Access Control & Smart Lock',
      location: 'HQ Executive Office',
      category: 'Security & Smart Access',
      status: 'ONLINE',
      powerState: true,
      powerConsumptionWatts: 12,
      doorLocked: true,
      ipAddress: '192.168.10.88',
      lastUpdated: '1 min ago',
    },
    {
      id: 'iot-103',
      name: 'Data Center Primary Chillers & Air Handling',
      location: 'Data Center Facility',
      category: 'HVAC Climate',
      status: 'ONLINE',
      powerState: true,
      powerConsumptionWatts: 4800,
      temperatureCelsius: 18.0,
      humidityPercent: 38,
      fanSpeedPercent: 90,
      ipAddress: '10.0.4.15',
      lastUpdated: 'Just now',
    },
    {
      id: 'iot-104',
      name: 'Warehouse Alpha High-Bay LED Grid',
      location: 'Warehouse Alpha',
      category: 'Energy & Lighting',
      status: 'ONLINE',
      powerState: true,
      powerConsumptionWatts: 850,
      ipAddress: '192.168.20.104',
      lastUpdated: '3 mins ago',
    },
    {
      id: 'iot-105',
      name: 'Executive Residence Smart Thermostat & Solar Inverter',
      location: 'Residential Smart Home',
      category: 'Industrial Appliance',
      status: 'ONLINE',
      powerState: true,
      powerConsumptionWatts: 320,
      temperatureCelsius: 22.0,
      humidityPercent: 50,
      ipAddress: '192.168.1.150',
      lastUpdated: '5 mins ago',
    },
    {
      id: 'iot-106',
      name: 'Automated High-Capacity Espresso Bar',
      location: 'HQ Executive Office',
      category: 'Industrial Appliance',
      status: 'ONLINE',
      powerState: false,
      powerConsumptionWatts: 0,
      ipAddress: '192.168.10.99',
      lastUpdated: '12 mins ago',
    },
  ]);

  const [locationFilter, setLocationFilter] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [controlLog, setControlLog] = useState<string | null>(null);
  const [isAiEcoMode, setIsAiEcoMode] = useState(false);

  // Form State for Adding New Smart Appliance
  const [newName, setNewName] = useState('');
  const [newLocation, setNewLocation] = useState('HQ Executive Office');
  const [newCategory, setNewCategory] = useState<'HVAC Climate' | 'Security & Smart Access' | 'Energy & Lighting' | 'Office Server & Power' | 'Industrial Appliance'>('HVAC Climate');
  const [newIp, setNewIp] = useState('192.168.10.120');
  const [isAdding, setIsAdding] = useState(false);

  // Toggle Power
  const handleTogglePower = (id: string) => {
    setAppliances((prev) =>
      prev.map((app) => {
        if (app.id === id) {
          const newState = !app.powerState;
          const newWatts = newState ? (app.category === 'HVAC Climate' ? 1200 : 150) : 0;
          setControlLog(`Appliance "${app.name}" power set to ${newState ? 'ON' : 'OFF'}. Power draw: ${newWatts}W.`);
          return {
            ...app,
            powerState: newState,
            powerConsumptionWatts: newWatts,
            lastUpdated: 'Just now',
          };
        }
        return app;
      })
    );
  };

  // Toggle Lock/Unlock
  const handleToggleLock = (id: string) => {
    setAppliances((prev) =>
      prev.map((app) => {
        if (app.id === id && app.doorLocked !== undefined) {
          const newLock = !app.doorLocked;
          setControlLog(`Biometric Smart Lock "${app.name}" state updated: ${newLock ? 'LOCKED (Secure)' : 'UNLOCKED (Access Granted)'}.`);
          return {
            ...app,
            doorLocked: newLock,
            lastUpdated: 'Just now',
          };
        }
        return app;
      })
    );
  };

  // Adjust Temperature
  const handleAdjustTemp = (id: string, delta: number) => {
    setAppliances((prev) =>
      prev.map((app) => {
        if (app.id === id && app.temperatureCelsius !== undefined) {
          const newTemp = Number((app.temperatureCelsius + delta).toFixed(1));
          setControlLog(`Set HVAC temperature setpoint for "${app.name}" to ${newTemp}°C.`);
          return {
            ...app,
            temperatureCelsius: newTemp,
            lastUpdated: 'Just now',
          };
        }
        return app;
      })
    );
  };

  // Toggle AI Eco Mode
  const handleToggleAiEco = () => {
    const nextEco = !isAiEcoMode;
    setIsAiEcoMode(nextEco);
    if (nextEco) {
      setAppliances((prev) =>
        prev.map((app) => ({
          ...app,
          powerConsumptionWatts: app.powerState ? Math.round(app.powerConsumptionWatts * 0.75) : 0,
          temperatureCelsius: app.temperatureCelsius ? Number((app.temperatureCelsius + 1.5).toFixed(1)) : undefined,
          lastUpdated: 'Just now (AI Eco Optimized)',
        }))
      );
      setControlLog('AI Eco-Energy Saver activated. All HVAC setpoints & power consumption optimized by 25%.');
    } else {
      setControlLog('AI Eco-Energy Saver deactivated. Appliances restored to peak performance profile.');
    }
  };

  const handleAddAppliance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    setIsAdding(true);

    const newApp: SmartApplianceIoT = {
      id: `iot-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newName,
      location: newLocation,
      category: newCategory,
      status: 'ONLINE',
      powerState: true,
      powerConsumptionWatts: newCategory === 'HVAC Climate' ? 1100 : 180,
      temperatureCelsius: newCategory === 'HVAC Climate' ? 22.0 : undefined,
      humidityPercent: newCategory === 'HVAC Climate' ? 45 : undefined,
      doorLocked: newCategory === 'Security & Smart Access' ? true : undefined,
      ipAddress: newIp,
      lastUpdated: 'Just now',
    };

    setAppliances([newApp, ...appliances]);
    setControlLog(`Provisioned new IoT Appliance "${newName}" at ${newLocation}.`);
    setNewName('');
    setIsAdding(false);
  };

  // Calculate Metrics
  const filteredAppliances = appliances.filter((app) => {
    const matchLoc = locationFilter === 'ALL' || app.location === locationFilter;
    const matchCat = selectedCategory === 'ALL' || app.category === selectedCategory;
    return matchLoc && matchCat;
  });

  const totalWatts = appliances.reduce((sum, app) => sum + (app.powerState ? app.powerConsumptionWatts : 0), 0);
  const activeCount = appliances.filter((app) => app.powerState).length;

  return (
    <div className="w-full min-w-full overflow-y-auto overflow-x-auto p-4 space-y-6 bg-slate-950 text-slate-100">
      {/* Title */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-teal-400" />
            <h1 className="text-base font-bold text-slate-100 uppercase tracking-wide">
              House & Office Smart Appliances IoT Control & Telemetry Hub
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleAiEco}
              className={`px-3 py-1 font-mono text-xs border flex items-center gap-1.5 transition-colors ${
                isAiEcoMode
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-700 font-bold animate-pulse'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              {isAiEcoMode ? 'AI Eco-Saver: ACTIVE (-25% Power)' : 'Enable AI Eco-Energy Saver'}
            </button>
            <span className="text-xs px-2.5 py-1 bg-teal-950 text-teal-400 border border-teal-800 font-mono">
              MQTT / MATTER / ZIGBEE 3.0 PROTOCOL
            </span>
          </div>
        </div>
        <p className="text-xs text-slate-400 max-w-4xl">
          Centralized remote management and telemetry monitoring for all executive office, warehouse, data center, and residential smart home appliances. Adjust HVAC thermostats, operate biometric smart locks, monitor solar power draw, and override relay switches in real time.
        </p>
      </div>

      {/* Real-time Telemetry Stats Row */}
      <div className="w-full min-w-full grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-3 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-mono block">Active Power Load</span>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold font-mono text-teal-400">{totalWatts.toLocaleString()} W</span>
            <Zap className="w-5 h-5 text-teal-400" />
          </div>
          <span className="text-[10px] text-slate-500 font-mono">Live Circuit Draw</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-mono block">Active Appliances</span>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold font-mono text-emerald-400">{activeCount} / {appliances.length}</span>
            <Power className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="text-[10px] text-slate-500 font-mono">Power Relays Engaged</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-mono block">Data Center Ambient</span>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold font-mono text-blue-400">18.0 °C</span>
            <Thermometer className="w-5 h-5 text-blue-400" />
          </div>
          <span className="text-[10px] text-slate-500 font-mono">Target: 18.5 °C (Optimal)</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-mono block">Security Lock Status</span>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold font-mono text-emerald-400">100% SECURE</span>
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="text-[10px] text-slate-500 font-mono">Biometrics Active</span>
        </div>
      </div>

      {/* Control Action Log Notice Banner */}
      {controlLog && (
        <div className="p-3 bg-slate-900 border border-teal-800 text-teal-300 text-xs font-mono flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
            <span>{controlLog}</span>
          </div>
          <button onClick={() => setControlLog(null)} className="text-slate-500 hover:text-slate-300 text-xs">Dismiss</button>
        </div>
      )}

      {/* Filter and Provisioning Split Grid */}
      <div className="w-full min-w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Provision New Smart Appliance */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Plus className="w-4 h-4 text-teal-400" /> Register Smart Appliance / Sensor
            </h2>
            <span className="text-[11px] font-mono text-teal-400">IoT Gateway</span>
          </div>

          <form onSubmit={handleAddAppliance} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Appliance / Sensor Name</label>
              <input
                type="text"
                placeholder="e.g. Conference Room Smart Blinds & AC"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Location Facility</label>
              <select
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-teal-500 focus:outline-none font-mono"
              >
                <option value="HQ Executive Office">HQ Executive Office</option>
                <option value="Warehouse Alpha">Warehouse Alpha</option>
                <option value="Data Center Facility">Data Center Facility</option>
                <option value="Residential Smart Home">Residential Smart Home</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Appliance Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-teal-500 focus:outline-none font-mono"
              >
                <option value="HVAC Climate">HVAC Climate Control</option>
                <option value="Security & Smart Access">Security & Smart Access</option>
                <option value="Energy & Lighting">Energy & Smart Lighting</option>
                <option value="Office Server & Power">Office Server & Power</option>
                <option value="Industrial Appliance">Industrial Appliance</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Static IP / MAC Address</label>
              <input
                type="text"
                value={newIp}
                onChange={(e) => setNewIp(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-teal-500 focus:outline-none font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isAdding}
              className="w-full py-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-none transition-colors flex items-center justify-center gap-2"
            >
              <Radio className="w-4 h-4" /> Pair Device to IoT Hub
            </button>
          </form>
        </div>

        {/* Filters & Location Selection */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-teal-400" /> Filter Facility View
            </h2>
            <span className="text-[11px] font-mono text-slate-400">Showing {filteredAppliances.length} Devices</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1.5 font-medium uppercase font-mono text-[10px]">Filter By Facility Location</label>
              <div className="flex flex-wrap gap-2">
                {['ALL', 'HQ Executive Office', 'Warehouse Alpha', 'Data Center Facility', 'Residential Smart Home'].map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setLocationFilter(loc)}
                    className={`px-3 py-1.5 border font-mono text-xs transition-colors ${
                      locationFilter === loc
                        ? 'bg-teal-950 border-teal-600 text-teal-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {loc === 'ALL' ? 'All Facilities' : loc}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1.5 font-medium uppercase font-mono text-[10px]">Filter By Appliance Type</label>
              <div className="flex flex-wrap gap-2">
                {['ALL', 'HVAC Climate', 'Security & Smart Access', 'Energy & Lighting', 'Industrial Appliance'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 border font-mono text-xs transition-colors ${
                      selectedCategory === cat
                        ? 'bg-teal-950 border-teal-600 text-teal-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* IoT Devices Matrix & Live Control Table - Full Width 100% Edge-to-Edge */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-4 h-4 text-teal-400" /> Registered IoT Appliances & Live Controls Matrix
          </h2>
          <span className="text-xs font-mono text-slate-400">{filteredAppliances.length} Active Nodes</span>
        </div>

        <div className="w-full min-w-full overflow-x-auto border border-slate-800">
          <table className="w-full min-w-[950px] text-left text-xs text-slate-300">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[11px] font-mono">
              <tr>
                <th className="p-3">Device Name</th>
                <th className="p-3">Facility Location</th>
                <th className="p-3">Category</th>
                <th className="p-3">IP Address</th>
                <th className="p-3">Telemetry State</th>
                <th className="p-3">Power Draw</th>
                <th className="p-3">Live Remote Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900 font-mono text-[11px]">
              {filteredAppliances.map((app) => (
                <tr key={app.id} className="hover:bg-slate-850">
                  <td className="p-3 font-semibold text-slate-100 whitespace-nowrap">{app.name}</td>
                  <td className="p-3 text-slate-300 whitespace-nowrap">{app.location}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 bg-slate-950 text-teal-400 border border-slate-800 text-[10px]">
                      {app.category}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400 whitespace-nowrap">{app.ipAddress}</td>
                  <td className="p-3 whitespace-nowrap">
                    <div className="space-y-0.5">
                      {app.temperatureCelsius !== undefined && (
                        <div className="text-blue-400 font-bold">Temp: {app.temperatureCelsius}°C</div>
                      )}
                      {app.humidityPercent !== undefined && (
                        <div className="text-slate-400 text-[10px]">Humidity: {app.humidityPercent}%</div>
                      )}
                      {app.doorLocked !== undefined && (
                        <div className={app.doorLocked ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                          {app.doorLocked ? 'LOCKED' : 'UNLOCKED'}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-3 font-bold text-amber-400 whitespace-nowrap">
                    {app.powerState ? `${app.powerConsumptionWatts} W` : '0 W (OFF)'}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleTogglePower(app.id)}
                        className={`px-2.5 py-1 text-[10px] font-mono font-bold flex items-center gap-1 transition-colors ${
                          app.powerState
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                        }`}
                      >
                        <Power className="w-3 h-3" />
                        {app.powerState ? 'ON' : 'OFF'}
                      </button>

                      {app.temperatureCelsius !== undefined && (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleAdjustTemp(app.id, -0.5)}
                            className="px-1.5 py-0.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200"
                          >
                            -
                          </button>
                          <span className="text-[10px] text-blue-300">{app.temperatureCelsius}°C</span>
                          <button
                            onClick={() => handleAdjustTemp(app.id, 0.5)}
                            className="px-1.5 py-0.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200"
                          >
                            +
                          </button>
                        </div>
                      )}

                      {app.doorLocked !== undefined && (
                        <button
                          onClick={() => handleToggleLock(app.id)}
                          className={`px-2 py-1 text-[10px] font-mono flex items-center gap-1 ${
                            app.doorLocked
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : 'bg-amber-950 text-amber-400 border border-amber-800'
                          }`}
                        >
                          {app.doorLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                          {app.doorLocked ? 'Lock' : 'Unlock'}
                        </button>
                      )}
                    </div>
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
