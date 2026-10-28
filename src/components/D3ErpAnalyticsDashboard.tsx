import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart as PieChartIcon, 
  RefreshCw, 
  DollarSign, 
  ArrowUpRight, 
  Package, 
  Calendar,
  Layers
} from 'lucide-react';

interface RevenuePoint {
  date: string;
  revenue: number;
  ordersCount: number;
}

interface CategoryTurnover {
  category: string;
  turnoverRatio: number;
  stockValuationUsd: number;
  color: string;
}

export const D3ErpAnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '12M'>('30D');
  const [hoveredPoint, setHoveredPoint] = useState<RevenuePoint | null>(null);

  const revenueSvgRef = useRef<SVGSVGElement | null>(null);
  const turnoverSvgRef = useRef<SVGSVGElement | null>(null);

  // Daily revenue trend dataset for current month (July 2026 - 30 daily points)
  const [dailyRevenueData] = useState<RevenuePoint[]>([
    { date: '2026-07-01', revenue: 12400, ordersCount: 8 },
    { date: '2026-07-02', revenue: 14100, ordersCount: 9 },
    { date: '2026-07-03', revenue: 13800, ordersCount: 9 },
    { date: '2026-07-04', revenue: 15900, ordersCount: 11 },
    { date: '2026-07-05', revenue: 16200, ordersCount: 12 },
    { date: '2026-07-06', revenue: 18400, ordersCount: 14 },
    { date: '2026-07-07', revenue: 17500, ordersCount: 13 },
    { date: '2026-07-08', revenue: 19100, ordersCount: 15 },
    { date: '2026-07-09', revenue: 21000, ordersCount: 16 },
    { date: '2026-07-10', revenue: 20500, ordersCount: 15 },
    { date: '2026-07-11', revenue: 22800, ordersCount: 18 },
    { date: '2026-07-12', revenue: 24100, ordersCount: 19 },
    { date: '2026-07-13', revenue: 23500, ordersCount: 17 },
    { date: '2026-07-14', revenue: 25900, ordersCount: 20 },
    { date: '2026-07-15', revenue: 28400, ordersCount: 22 },
    { date: '2026-07-16', revenue: 27200, ordersCount: 21 },
    { date: '2026-07-17', revenue: 29800, ordersCount: 24 },
    { date: '2026-07-18', revenue: 31200, ordersCount: 25 },
    { date: '2026-07-19', revenue: 30500, ordersCount: 23 },
    { date: '2026-07-20', revenue: 32900, ordersCount: 26 },
    { date: '2026-07-21', revenue: 34100, ordersCount: 28 },
    { date: '2026-07-22', revenue: 33800, ordersCount: 27 },
    { date: '2026-07-23', revenue: 36200, ordersCount: 30 },
    { date: '2026-07-24', revenue: 38500, ordersCount: 32 },
    { date: '2026-07-25', revenue: 37900, ordersCount: 31 },
    { date: '2026-07-26', revenue: 40200, ordersCount: 34 },
    { date: '2026-07-27', revenue: 42100, ordersCount: 36 },
    { date: '2026-07-28', revenue: 41500, ordersCount: 35 },
    { date: '2026-07-29', revenue: 44800, ordersCount: 38 },
    { date: '2026-07-30', revenue: 47200, ordersCount: 40 },
  ]);

  const [categoryTurnoverData] = useState<CategoryTurnover[]>([
    { category: 'Fleet OBD2 Telemetry', turnoverRatio: 8.4, stockValuationUsd: 142000, color: '#10b981' },
    { category: 'Hybrid Maize & Agri Seeds', turnoverRatio: 12.1, stockValuationUsd: 85000, color: '#3b82f6' },
    { category: 'Borehole Solar Pumps', turnoverRatio: 6.2, stockValuationUsd: 195000, color: '#f59e0b' },
    { category: 'Mining Heavy Spares', turnoverRatio: 4.8, stockValuationUsd: 260000, color: '#8b5cf6' },
    { category: 'Consumer Retail Goods', turnoverRatio: 15.3, stockValuationUsd: 45000, color: '#ec4899' },
  ]);

  // 100% Full-Width D3 Line Chart Render for Daily Revenue Trends
  useEffect(() => {
    if (!revenueSvgRef.current) return;

    const svg = d3.select(revenueSvgRef.current);
    svg.selectAll('*').remove(); // Clear previous render

    const width = 1000;
    const height = 300;
    const margin = { top: 25, right: 35, bottom: 45, left: 65 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const parseTime = d3.timeParse('%Y-%m-%d');
    interface FormattedItem {
      raw: RevenuePoint;
      date: Date;
      revenue: number;
      ordersCount: number;
    }
    const formattedData: FormattedItem[] = dailyRevenueData.map((d) => ({
      raw: d,
      date: parseTime(d.date) || new Date(),
      revenue: d.revenue,
      ordersCount: d.ordersCount,
    }));

    const dateExtent = d3.extent(formattedData, (d: FormattedItem) => d.date) as [Date, Date];
    const xScale = d3
      .scaleTime()
      .domain(dateExtent[0] && dateExtent[1] ? dateExtent : [new Date('2026-07-01'), new Date('2026-07-30')])
      .range([0, innerWidth]);

    const maxRevenue = d3.max(formattedData, (d: FormattedItem) => d.revenue) || 50000;
    const yScale = d3
      .scaleLinear()
      .domain([0, maxRevenue * 1.15])
      .range([innerHeight, 0]);

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add SVG Linear Gradient Fill for Area
    const defs = svg.append('defs');
    const gradient = defs
      .append('linearGradient')
      .attr('id', 'full-width-revenue-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    gradient
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#10b981')
      .attr('stop-opacity', 0.45);

    gradient
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#10b981')
      .attr('stop-opacity', 0.02);

    // Area Generator
    const area = d3
      .area<FormattedItem>()
      .x((d) => xScale(d.date))
      .y0(innerHeight)
      .y1((d) => yScale(d.revenue))
      .curve(d3.curveMonotoneX);

    // Line Generator
    const line = d3
      .line<FormattedItem>()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.revenue))
      .curve(d3.curveMonotoneX);

    // Grid lines
    g.append('g')
      .attr('class', 'grid')
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(-innerWidth)
          .tickFormat(() => '')
      )
      .selectAll('line')
      .attr('stroke', '#1e293b')
      .attr('stroke-dasharray', '3,3');

    // Append Area Path
    g.append('path')
      .datum(formattedData)
      .attr('fill', 'url(#full-width-revenue-gradient)')
      .attr('d', area);

    // Append Line Path
    g.append('path')
      .datum(formattedData)
      .attr('fill', 'none')
      .attr('stroke', '#10b981')
      .attr('stroke-width', 3.5)
      .attr('d', line);

    // Append Interactive Data Circles with Hover Tooltips
    const circles = g
      .selectAll('.dot')
      .data(formattedData)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', (d: FormattedItem) => xScale(d.date))
      .attr('cy', (d: FormattedItem) => yScale(d.revenue))
      .attr('r', 4.5)
      .attr('fill', '#022c22')
      .attr('stroke', '#34d399')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer');

    circles
      .on('mouseover', (event, d) => {
        d3.select(event.currentTarget).attr('r', 7).attr('fill', '#34d399');
        setHoveredPoint(d.raw);
      })
      .on('mouseout', (event) => {
        d3.select(event.currentTarget).attr('r', 4.5).attr('fill', '#022c22');
        setHoveredPoint(null);
      });

    // X-Axis
    const xAxis = d3.axisBottom(xScale).ticks(10).tickFormat(d3.timeFormat('%d %b') as any);
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis)
      .attr('color', '#64748b')
      .selectAll('text')
      .style('fill', '#94a3b8')
      .style('font-family', 'monospace')
      .style('font-size', '10px');

    // Y-Axis
    const yAxis = d3.axisLeft(yScale).ticks(6).tickFormat((d) => `$${(Number(d) / 1000).toFixed(0)}k`);
    g.append('g')
      .call(yAxis)
      .attr('color', '#64748b')
      .selectAll('text')
      .style('fill', '#94a3b8')
      .style('font-family', 'monospace')
      .style('font-size', '10px');

  }, [dailyRevenueData, timeRange]);

  // Donut Chart Render for Stock Turnover
  useEffect(() => {
    if (!turnoverSvgRef.current) return;

    const svg = d3.select(turnoverSvgRef.current);
    svg.selectAll('*').remove();

    const width = 360;
    const height = 260;
    const radius = Math.min(width, height) / 2 - 20;

    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const pie = d3
      .pie<CategoryTurnover>()
      .value((d) => d.stockValuationUsd)
      .sort(null);

    const arc = d3
      .arc<d3.PieArcDatum<CategoryTurnover>>()
      .innerRadius(radius * 0.55)
      .outerRadius(radius);

    const arcs = g
      .selectAll('.arc')
      .data(pie(categoryTurnoverData))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs
      .append('path')
      .attr('d', arc as any)
      .attr('fill', (d) => d.data.color)
      .attr('stroke', '#020617')
      .attr('stroke-width', 2);

    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.2em')
      .style('fill', '#f8fafc')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .style('font-family', 'monospace')
      .text('$727,000');

    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.2em')
      .style('fill', '#94a3b8')
      .style('font-size', '10px')
      .style('font-family', 'monospace')
      .text('TOTAL INVENTORY');

  }, [categoryTurnoverData]);

  return (
    <div className="w-full min-w-full space-y-4 font-mono text-xs">
      {/* Top Header Control */}
      <div className="flex items-center justify-between flex-wrap gap-2 bg-slate-900 border border-slate-800 p-3">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-emerald-400" />
          <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wide">
            D3.js Real-Time Daily Revenue & Stock Analytics Engine
          </h2>
        </div>

        <div className="flex items-center gap-2 text-[11px]">
          <span className="text-slate-400">Timeframe:</span>
          {(['7D', '30D', '12M'] as const).map((rng) => (
            <button
              key={rng}
              onClick={() => setTimeRange(rng)}
              className={`px-2.5 py-1 font-bold border transition-colors ${
                timeRange === rng
                  ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                  : 'bg-slate-950 text-slate-400 border-slate-800'
              }`}
            >
              {rng}
            </button>
          ))}
        </div>
      </div>

      {/* 100% Full-Width D3 Line Chart Section */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-100 uppercase text-xs flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" /> Current Month Daily Revenue Trend Curve (July 2026)
            </span>
            <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px]">
              100% FULL-WIDTH D3.JS
            </span>
          </div>

          {hoveredPoint ? (
            <div className="bg-emerald-950 border border-emerald-700 px-3 py-1 text-emerald-300 font-mono text-[11px] flex items-center gap-3">
              <span>Date: <strong className="text-white">{hoveredPoint.date}</strong></span>
              <span>Revenue: <strong className="text-emerald-400">${hoveredPoint.revenue.toLocaleString()} USD</strong></span>
              <span>Orders: <strong className="text-white">{hoveredPoint.ordersCount}</strong></span>
            </div>
          ) : (
            <span className="text-[10px] text-slate-400 font-mono">Hover points for precise daily breakdown</span>
          )}
        </div>

        {/* 100% Width Responsive SVG Canvas */}
        <div className="w-full min-w-full bg-slate-950 border border-slate-800 p-2 overflow-hidden">
          <svg 
            ref={revenueSvgRef} 
            viewBox="0 0 1000 300" 
            preserveAspectRatio="xMidYMid meet" 
            className="w-full h-auto min-w-full block" 
          />
        </div>
      </div>

      {/* Secondary Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Category Valuation Donut Chart */}
        <div className="lg:col-span-1 bg-slate-900 border border-slate-800 p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-slate-200 uppercase text-[11px] flex items-center gap-1.5">
              <PieChartIcon className="w-3.5 h-3.5 text-indigo-400" /> Stock Category Valuation
            </span>
          </div>

          <div className="flex justify-center bg-slate-950 border border-slate-800 p-2">
            <svg ref={turnoverSvgRef} width={360} height={260} className="max-w-full" />
          </div>

          <div className="space-y-1.5 pt-1 text-[10px]">
            {categoryTurnoverData.map((cat) => (
              <div key={cat.category} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 inline-block" style={{ backgroundColor: cat.color }} />
                  <span className="text-slate-300">{cat.category}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-100">${(cat.stockValuationUsd / 1000).toFixed(0)}k</span>
                  <span className="text-slate-500 ml-1">({cat.turnoverRatio}x turn)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial KPI Summary & Reconciliation Matrix */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-slate-200 uppercase text-[11px] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-400" /> Monthly Financial Reconciliation Matrix
            </span>
            <span className="text-[10px] text-slate-400">July 2026 Audit Period</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-950 border border-slate-800">
              <div className="text-slate-400 text-[10px]">Total B2B Billing</div>
              <div className="text-base font-bold text-emerald-400">$842,500 USD</div>
              <div className="text-[9px] text-slate-500">Invoices & Contracts</div>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-800">
              <div className="text-slate-400 text-[10px]">Operational Expenses</div>
              <div className="text-base font-bold text-red-400">$164,200 USD</div>
              <div className="text-[9px] text-slate-500">Logistics & Payroll</div>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-800">
              <div className="text-slate-400 text-[10px]">Net Operating Surplus</div>
              <div className="text-base font-bold text-indigo-400">$678,300 USD</div>
              <div className="text-[9px] text-slate-500">80.5% Gross Margin</div>
            </div>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-800 space-y-2 text-[11px]">
            <div className="font-bold text-slate-200 border-b border-slate-800 pb-1 flex justify-between">
              <span>Audited Compliance Metrics</span>
              <span className="text-emerald-400">PASSED 100%</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>ZIMRA Tax Deductions Withheld:</span>
              <span className="text-slate-100 font-bold">$18,420 USD</span>
            </div>
            <div className="flex justify-between text-slate-400"><span>Stock Valuation (S3 Storage Ledger):</span> <span className="text-slate-100 font-bold">$727,000 USD</span></div>
            <div className="flex justify-between text-slate-400"><span>Average Payment Turnaround (Days):</span> <span className="text-slate-100 font-bold">14.2 Days</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};
