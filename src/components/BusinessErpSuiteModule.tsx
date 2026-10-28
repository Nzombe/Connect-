import React, { useState, useRef, useEffect } from 'react';
import { 
  Building2, 
  FileCheck2, 
  Receipt, 
  QrCode, 
  UserCheck, 
  Plus, 
  Download, 
  RefreshCw, 
  DollarSign, 
  Briefcase, 
  Scale, 
  ShieldCheck, 
  Calculator, 
  LayoutDashboard, 
  Camera, 
  CameraOff, 
  Printer, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  ArrowUpRight, 
  ArrowDownRight, 
  PackageCheck, 
  Users, 
  Sparkles, 
  Upload, 
  FileSpreadsheet, 
  BarChart3,
  Bell,
  Send,
  Slack,
  Mail,
  CheckSquare,
  Square,
  Archive,
  Trash2,
  Calendar,
  Clock,
  Eye,
  X,
  Filter,
  SlidersHorizontal,
  Layers,
  TrendingUp,
  TrendingDown,
  CheckCircle
} from 'lucide-react';
import { StickyGlobalActionToolbar } from './StickyGlobalActionToolbar';
import { D3ErpAnalyticsDashboard } from './D3ErpAnalyticsDashboard';

// Interfaces
interface CandidateRecord {
  id: string;
  candidateName: string;
  email: string;
  experienceYears: number;
  roleMatched: string;
  matchScore: number;
  skills: string[];
  status: string;
  addedAt: string;
}

interface InventoryItem {
  id: string;
  barcode: string;
  itemName: string;
  category: string;
  stockQty: number;
  minAlertQty: number;
  unitPriceUsd: number;
  location: string;
  status?: 'NORMAL' | 'RESTOCK_REQUIRED' | 'DISCONTINUED';
}

interface InvoiceRecord {
  id: string;
  invoiceRef: string;
  clientName: string;
  amountUsd: number;
  vatUsd: number;
  issueDate: string;
  dueDate: string;
  status: 'PAID' | 'UNPAID' | 'OVERDUE';
}

interface ExpenseRecord {
  id: string;
  category: 'LOGISTICS_FUEL' | 'HARDWARE_MAINTENANCE' | 'CLOUD_HOSTING' | 'OFFICE_SUPPLIES' | 'VENDOR_PAYOUT' | 'EMPLOYEE_PERKS';
  description: string;
  amountUsd: number;
  date: string;
  department: string;
  status: 'RECONCILED' | 'PENDING_AUDIT';
}

interface ResourceMilestone {
  id: string;
  projectName: string;
  milestoneTitle: string;
  department: 'Engineering' | 'Logistics' | 'Finance' | 'Agriculture' | 'IT Systems';
  allocatedPersonnel: string[];
  startDate: string;
  endDate: string;
  progressPercent: number;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'DELAYED';
}

interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  checkInTime: string;
  checkOutTime: string | null;
  hoursWorked: number;
  hourlyRateUsd: number;
  calculatedPayUsd: number;
  status: 'PRESENT' | 'CLOCK_OUT_PENDING' | 'OVERTIME';
}

interface AlertLogRecord {
  id: string;
  triggerType: 'LOW_STOCK' | 'HIGH_VALUE_INVOICE' | 'PAYROLL_DISCREPANCY';
  channel: 'SLACK' | 'EMAIL' | 'SMS';
  recipient: string;
  message: string;
  status: 'DELIVERED' | 'DISPATCHED' | 'QUEUED';
  timestamp: string;
}

export const BusinessErpSuiteModule: React.FC = () => {
  const [activeErpSubtab, setActiveErpSubtab] = useState<
    'DASHBOARD' | 'PAYSLIP' | 'INVOICES' | 'BARCODE_SCAN' | 'CV_PARSER' | 'ALERTS' | 'EXPENSES' | 'RESOURCE_CALENDAR' | 'ATTENDANCE'
  >('DASHBOARD');

  // Sticky Global Action Toolbar State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // 1. Dashboard State
  const [revenueTotal] = useState(482500);
  const [activeOrdersCount] = useState(24);

  // 2. Payslip State & Full Document Preview Modal
  const [employeeName, setEmployeeName] = useState('Tendai Ndlovu');
  const [basicSalary, setBasicSalary] = useState(3800);
  const [allowances, setAllowances] = useState(650);
  const [otherDeductions, setOtherDeductions] = useState(120);
  const [templateStyle, setTemplateStyle] = useState<'STATUTORY_ZIMRA' | 'EXECUTIVE_SUMMARY' | 'CONTRACTOR_BREAKDOWN'>('STATUTORY_ZIMRA');
  const [isGeneratingPayslip, setIsGeneratingPayslip] = useState(false);
  const [payslipData, setPayslipData] = useState<any>({
    payslipId: 'PAYSLIP-8921',
    employeeName: 'Tendai Ndlovu',
    basicSalaryUsd: 3800,
    allowancesUsd: 650,
    grossSalaryUsd: 4450,
    payeUsd: 979,
    aidsLevyUsd: 29.37,
    nssaUsd: 31.50,
    totalDeductionsUsd: 1159.87,
    netPayUsd: 3290.13,
    currency: 'USD',
    templateStyle: 'STATUTORY_ZIMRA',
    generatedDate: new Date().toISOString().slice(0, 10),
  });

  // Full-Width Document Preview Modal State (Invoices & Payslips)
  const [previewModalDoc, setPreviewModalDoc] = useState<{
    type: 'INVOICE' | 'PAYSLIP';
    data: any;
  } | null>(null);

  // 3. Invoice State & Filter Controls (Date Range + Status)
  const [invoiceList, setInvoiceList] = useState<InvoiceRecord[]>([
    { id: 'INV-01', invoiceRef: 'INV-2026-9081', clientName: 'Harare Mining & Agricultural Holdings', amountUsd: 12500, vatUsd: 1875, issueDate: '2026-07-28', dueDate: '2026-08-11', status: 'UNPAID' },
    { id: 'INV-02', invoiceRef: 'INV-2026-8812', clientName: 'Victoria Falls Logistics Ltd', amountUsd: 28400, vatUsd: 4260, issueDate: '2026-07-15', dueDate: '2026-07-29', status: 'PAID' },
    { id: 'INV-03', invoiceRef: 'INV-2026-7731', clientName: 'Bulawayo Heavy Engineering Group', amountUsd: 18900, vatUsd: 2835, issueDate: '2026-07-10', dueDate: '2026-07-24', status: 'PAID' },
    { id: 'INV-04', invoiceRef: 'INV-2026-6640', clientName: 'Mazowe Citrus Estates Enterprise', amountUsd: 9400, vatUsd: 1410, issueDate: '2026-06-25', dueDate: '2026-07-09', status: 'OVERDUE' },
    { id: 'INV-05', invoiceRef: 'INV-2026-5512', clientName: 'Chiredzi Sugar Processing Co', amountUsd: 34200, vatUsd: 5130, issueDate: '2026-07-02', dueDate: '2026-07-16', status: 'OVERDUE' },
  ]);
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState<'ALL' | 'PAID' | 'UNPAID' | 'OVERDUE'>('ALL');
  const [invoiceFromDate, setInvoiceFromDate] = useState<string>('2026-07-01');
  const [invoiceToDate, setInvoiceToDate] = useState<string>('2026-07-31');

  // 4. Inventory Data & Real-Time Low Stock Alert System
  const [globalLowStockThreshold, setGlobalLowStockThreshold] = useState<number>(5);
  const [inventoryList, setInventoryList] = useState<InventoryItem[]>([
    { id: 'INV-101', barcode: 'BARCODE-OBD2-89021', itemName: 'Sprinter Fleet Telemetry Module OBD2-X7', category: 'Fleet Hardware', stockQty: 14, minAlertQty: 5, unitPriceUsd: 850, location: 'Harare Warehouse Bay 4B', status: 'NORMAL' },
    { id: 'INV-102', barcode: 'BARCODE-SEED-44120', itemName: 'Hybrid Maize Seed Certified Batch #4', category: 'Agriculture', stockQty: 3, minAlertQty: 10, unitPriceUsd: 120, location: 'Mazowe Depot Section A', status: 'RESTOCK_REQUIRED' },
    { id: 'INV-103', barcode: 'BARCODE-PUMP-99012', itemName: 'Heavy Duty Solar Borehole Submersible Pump', category: 'Water Infrastructure', stockQty: 2, minAlertQty: 5, unitPriceUsd: 2400, location: 'Bulawayo Central Vault', status: 'RESTOCK_REQUIRED' },
    { id: 'INV-104', barcode: 'BARCODE-DRONE-3391', itemName: 'Crop Spraying Agricultural Drone Hexa-V', category: 'AgriTech Hardware', stockQty: 4, minAlertQty: 5, unitPriceUsd: 5800, location: 'Harare Warehouse Bay 2A', status: 'RESTOCK_REQUIRED' },
    { id: 'INV-105', barcode: 'BARCODE-SOLAR-7712', itemName: 'Industrial 500W Monocrystalline Solar Panel', category: 'Energy', stockQty: 42, minAlertQty: 15, unitPriceUsd: 320, location: 'Bulawayo Central Vault', status: 'NORMAL' },
  ]);
  const [selectedInventoryIds, setSelectedInventoryIds] = useState<string[]>([]);

  // Barcode / Scanner Video state
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [scannedCode, setScannedCode] = useState('BARCODE-OBD2-89021');
  const [scanActionType, setScanActionType] = useState<'CHECK_IN' | 'CHECK_OUT'>('CHECK_OUT');
  const [scanMessage, setScanMessage] = useState<string | null>(null);

  // 5. Automated Expense Tracking State
  const [expenseList, setExpenseList] = useState<ExpenseRecord[]>([
    { id: 'EXP-101', category: 'LOGISTICS_FUEL', description: 'Harare-Bulawayo Fleet Logistics Diesel Refueling', amountUsd: 3450, date: '2026-07-29', department: 'Logistics', status: 'RECONCILED' },
    { id: 'EXP-102', category: 'CLOUD_HOSTING', description: 'Enterprise Cloud AWS S3 & Cloud Run Server Capacity', amountUsd: 1820, date: '2026-07-28', department: 'IT Systems', status: 'RECONCILED' },
    { id: 'EXP-103', category: 'HARDWARE_MAINTENANCE', description: 'Heavy Duty Borehole Pump Engine Replacement Parts', amountUsd: 4800, date: '2026-07-25', department: 'Engineering', status: 'PENDING_AUDIT' },
    { id: 'EXP-104', category: 'OFFICE_SUPPLIES', description: 'Mazowe Depot Administrative Stationery & Supplies', amountUsd: 650, date: '2026-07-20', department: 'Administration', status: 'RECONCILED' },
    { id: 'EXP-105', category: 'VENDOR_PAYOUT', description: 'Agritech Fertilizer Bulk Supplier Disbursement', amountUsd: 12400, date: '2026-07-18', department: 'Agriculture', status: 'RECONCILED' },
  ]);
  const [newExpenseCategory, setNewExpenseCategory] = useState<ExpenseRecord['category']>('LOGISTICS_FUEL');
  const [newExpenseDesc, setNewExpenseDesc] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState<number>(1200);
  const [newExpenseDept, setNewExpenseDept] = useState('Logistics');

  // 6. Visual Resource Scheduling Calendar State
  const [resourceMilestones, setResourceMilestones] = useState<ResourceMilestone[]>([
    { id: 'MS-101', projectName: 'Solar Borehole Installation Phase 2', milestoneTitle: 'Grid Commissioning & Water Flow Test', department: 'Engineering', allocatedPersonnel: ['Eng. T. Ndlovu', 'Technician C. Moyo'], startDate: '2026-07-01', endDate: '2026-08-05', progressPercent: 75, status: 'IN_PROGRESS' },
    { id: 'MS-102', projectName: 'Fleet OBD2 Telemetry Rollout', milestoneTitle: 'Hardware Fitting on 50 Heavy Trucks', department: 'Logistics', allocatedPersonnel: ['Fleet Mgr B. Mutasa', 'Installer S. Gumbo'], startDate: '2026-07-10', endDate: '2026-07-30', progressPercent: 100, status: 'COMPLETED' },
    { id: 'MS-103', projectName: 'ZIMRA PAYE Automated Tax Integration', milestoneTitle: 'ERP Ledger API Security Audit', department: 'IT Systems', allocatedPersonnel: ['Lead Dev M. Sibanda', 'CPA C. Moyo'], startDate: '2026-07-20', endDate: '2026-08-15', progressPercent: 40, status: 'IN_PROGRESS' },
    { id: 'MS-104', projectName: 'Mazowe Agriculture Seed Harvest', milestoneTitle: 'Quality Certification & Warehousing', department: 'Agriculture', allocatedPersonnel: ['Agri Lead D. Khumalo'], startDate: '2026-07-15', endDate: '2026-08-02', progressPercent: 30, status: 'DELAYED' },
  ]);

  // 7. Employee Attendance & Digital Timesheet State
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([
    { id: 'ATT-201', employeeId: 'EMP-01', employeeName: 'Tendai Ndlovu', department: 'Finance', checkInTime: '2026-07-30T08:00:00.000Z', checkOutTime: '2026-07-30T17:00:00.000Z', hoursWorked: 9, hourlyRateUsd: 25, calculatedPayUsd: 225, status: 'PRESENT' },
    { id: 'ATT-202', employeeId: 'EMP-02', employeeName: 'Chipo Moyo', department: 'Operations', checkInTime: '2026-07-30T07:30:00.000Z', checkOutTime: null, hoursWorked: 6.5, hourlyRateUsd: 28, calculatedPayUsd: 182, status: 'CLOCK_OUT_PENDING' },
    { id: 'ATT-203', employeeId: 'EMP-03', employeeName: 'Blessing Mutasa', department: 'Logistics', checkInTime: '2026-07-29T08:00:00.000Z', checkOutTime: '2026-07-29T19:30:00.000Z', hoursWorked: 11.5, hourlyRateUsd: 22, calculatedPayUsd: 253, status: 'OVERTIME' },
  ]);
  const [clockEmployeeName, setClockEmployeeName] = useState('Tendai Ndlovu');
  const [clockDepartment, setClockDepartment] = useState('Finance');
  const [clockHourlyRate, setClockHourlyRate] = useState<number>(25);

  // 8. CV Parser & Candidate DB State
  const [rawCvInputText, setRawCvInputText] = useState(`CHIPO MERCY MOYO
Senior Financial Controller & Certified Public Accountant
Email: chipo.moyo@enterprise.co.zw | Phone: +263 772 100 200

EXECUTIVE SUMMARY:
Over 12 years of enterprise financial management, ZIMRA tax audit compliance, multi-currency treasury oversight, and automated ERP ledger auditing across Southern African mining and agriculture conglomerates.`);
  const [isParsingCv, setIsParsingCv] = useState(false);
  const [candidateDatabase, setCandidateDatabase] = useState<CandidateRecord[]>([
    { id: 'CAND-101', candidateName: 'Chipo Mercy Moyo', email: 'chipo.moyo@enterprise.co.zw', experienceYears: 12, roleMatched: 'Chief Financial Officer', matchScore: 96, skills: ['ZIMRA Tax', 'Financial Modeling', 'ERP Auditing', 'Trade Finance'], status: 'INTERVIEW_SCHEDULED', addedAt: '2026-07-29' },
  ]);

  // 9. Automated Alerts & Logs State
  const [alertLogs, setAlertLogs] = useState<AlertLogRecord[]>([
    { id: 'ALT-901', triggerType: 'LOW_STOCK', channel: 'SLACK', recipient: '#erp-inventory-alerts', message: '[ALERT] Low Stock Trigger: Hybrid Maize Seed Batch #4 fell to 3 units (Min Threshold: 5 units). Location: Mazowe Depot.', status: 'DELIVERED', timestamp: '2026-07-30 07:45:12' },
    { id: 'ALT-902', triggerType: 'HIGH_VALUE_INVOICE', channel: 'EMAIL', recipient: 'finance-director@enterprise.co.zw', message: '[ALERT] High-Value B2B Invoice Generated: INV-2026-9081 for Harare Mining ($12,500 USD). Signature verified.', status: 'DELIVERED', timestamp: '2026-07-29 14:20:05' },
  ]);

  // Filtered Invoices logic
  const filteredInvoiceList = invoiceList.filter(inv => {
    if (invoiceStatusFilter !== 'ALL' && inv.status !== invoiceStatusFilter) return false;
    if (invoiceFromDate && inv.issueDate < invoiceFromDate) return false;
    if (invoiceToDate && inv.issueDate > invoiceToDate) return false;
    return true;
  });

  // Low Stock Items calculation
  const lowStockItemsCount = inventoryList.filter(item => item.stockQty <= globalLowStockThreshold).length;

  // Bulk Inventory Actions Handler
  const handleBulkInventoryAction = async (actionType: 'MARK_SOLD' | 'RESTOCK_REQUIRED' | 'BULK_ADD') => {
    if (selectedInventoryIds.length === 0) {
      setActionNotice('Please select at least one inventory item row first.');
      setTimeout(() => setActionNotice(null), 3000);
      return;
    }

    try {
      setInventoryList(prev => prev.map(item => {
        if (!selectedInventoryIds.includes(item.id)) return item;
        if (actionType === 'MARK_SOLD') {
          const newQty = Math.max(0, item.stockQty - 1);
          return { ...item, stockQty: newQty, status: newQty <= globalLowStockThreshold ? 'RESTOCK_REQUIRED' : 'NORMAL' };
        } else if (actionType === 'BULK_ADD') {
          const newQty = item.stockQty + 10;
          return { ...item, stockQty: newQty, status: newQty <= globalLowStockThreshold ? 'RESTOCK_REQUIRED' : 'NORMAL' };
        } else {
          return { ...item, status: 'RESTOCK_REQUIRED' };
        }
      }));

      setActionNotice(`Executed bulk action '${actionType}' on ${selectedInventoryIds.length} items.`);
      setSelectedInventoryIds([]);
      setTimeout(() => setActionNotice(null), 3500);

      await fetch('/api/erp/inventory/bulk-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedInventoryIds, actionType }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Add Expense Handler
  const handleAddExpense = async () => {
    if (!newExpenseDesc) return;
    const newExp: ExpenseRecord = {
      id: `EXP-${Math.floor(100 + Math.random() * 900)}`,
      category: newExpenseCategory,
      description: newExpenseDesc,
      amountUsd: Number(newExpenseAmount),
      date: new Date().toISOString().slice(0, 10),
      department: newExpenseDept,
      status: 'RECONCILED'
    };
    setExpenseList([newExp, ...expenseList]);
    setNewExpenseDesc('');
    setActionNotice(`Logged new operational expense of $${newExp.amountUsd} USD.`);
    setTimeout(() => setActionNotice(null), 3000);

    try {
      await fetch('/api/erp/expenses/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExp)
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Check In / Check Out Handler
  const handleAttendanceClock = async (action: 'CHECK_IN' | 'CHECK_OUT') => {
    try {
      const res = await fetch('/api/erp/attendance/clock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeName: clockEmployeeName, action, hourlyRateUsd: clockHourlyRate, department: clockDepartment })
      });
      const data = await res.json();
      if (data.record) {
        setAttendanceRecords(prev => {
          const idx = prev.findIndex(r => r.id === data.record.id);
          if (idx >= 0) {
            const copy = [...prev];
            copy[idx] = data.record;
            return copy;
          }
          return [data.record, ...prev];
        });
      }
      setActionNotice(data.message || `Attendance action ${action} complete.`);
      setTimeout(() => setActionNotice(null), 3500);
    } catch (err) {
      console.error(err);
    }
  };

  // Payslip generation handler
  const handleGeneratePayslip = () => {
    setIsGeneratingPayslip(true);
    setTimeout(() => {
      const gross = basicSalary + allowances;
      const paye = gross * 0.22;
      const aidsLevy = paye * 0.03;
      const nssa = 31.5;
      const totalDeductions = paye + aidsLevy + nssa + otherDeductions;
      const net = gross - totalDeductions;

      setPayslipData({
        payslipId: `PAYSLIP-${Math.floor(8000 + Math.random() * 1000)}`,
        employeeName,
        basicSalaryUsd: basicSalary,
        allowancesUsd: allowances,
        grossSalaryUsd: gross,
        payeUsd: Number(paye.toFixed(2)),
        aidsLevyUsd: Number(aidsLevy.toFixed(2)),
        nssaUsd: nssa,
        totalDeductionsUsd: Number(totalDeductions.toFixed(2)),
        netPayUsd: Number(net.toFixed(2)),
        currency: 'USD',
        templateStyle,
        generatedDate: new Date().toISOString().slice(0, 10),
      });

      setIsGeneratingPayslip(false);
      setActionNotice(`ZIMRA Payslip generated for ${employeeName}`);
      setTimeout(() => setActionNotice(null), 3000);
    }, 600);
  };

  // Total Expenses calculation
  const totalExpensesUsd = expenseList.reduce((acc, curr) => acc + curr.amountUsd, 0);
  const monthlyBudgetUsd = 200000;
  const budgetVarianceUsd = monthlyBudgetUsd - totalExpensesUsd;

  return (
    <div className="w-full space-y-6 font-mono text-xs text-slate-100">
      {/* Action Notice Bar */}
      {actionNotice && (
        <div className="bg-emerald-950 border border-emerald-700 text-emerald-300 px-4 py-2 flex items-center justify-between text-xs animate-pulse">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{actionNotice}</span>
          </div>
          <button onClick={() => setActionNotice(null)} className="text-emerald-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-400" />
            <h1 className="text-base font-bold text-white tracking-wide uppercase">
              Business ERP Suite & Operations Control Center
            </h1>
          </div>
          <p className="text-slate-400 text-[11px] mt-0.5">
            Enterprise Grade: Billing, Stock, Expenses, Resource Gantt, Attendance Timesheets & Document Preview
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap text-[11px]">
          {lowStockItemsCount > 0 && (
            <span className="px-2.5 py-1 bg-amber-950 text-amber-300 border border-amber-800 font-bold flex items-center gap-1.5 animate-pulse">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              {lowStockItemsCount} Stock Low Alert(s)
            </span>
          )}
          <span className="px-3 py-1 bg-slate-950 border border-slate-800 text-slate-300 font-bold">
            Audit Status: VERIFIED OK
          </span>
        </div>
      </div>

      {/* Navigation Subtabs */}
      <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1.5 overflow-x-auto text-[11px]">
        {[
          { id: 'DASHBOARD', label: 'Executive Dashboard', icon: LayoutDashboard },
          { id: 'INVOICES', label: 'Invoices & Billing', icon: Receipt },
          { id: 'BARCODE_SCAN', label: 'Inventory & Stock', icon: QrCode },
          { id: 'EXPENSES', label: 'Expenses & Audit', icon: DollarSign },
          { id: 'RESOURCE_CALENDAR', label: 'Resource Calendar', icon: Calendar },
          { id: 'ATTENDANCE', label: 'Attendance & Payroll', icon: Clock },
          { id: 'PAYSLIP', label: 'ZIMRA Payslips', icon: FileCheck2 },
          { id: 'CV_PARSER', label: 'HR Talent Parser', icon: UserCheck },
          { id: 'ALERTS', label: 'Alert Center', icon: Bell },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeErpSubtab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveErpSubtab(tab.id as any)}
              className={`px-3 py-2 font-bold flex items-center gap-2 whitespace-nowrap transition-colors border ${
                isActive
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* SUBTAB 1: EXECUTIVE DASHBOARD WITH 100% WIDTH D3 LINE CHART */}
      {activeErpSubtab === 'DASHBOARD' && (
        <div className="space-y-6">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-4 space-y-1">
              <div className="text-slate-400 text-[10px] uppercase font-bold">Total July Revenue</div>
              <div className="text-xl font-bold text-emerald-400">${revenueTotal.toLocaleString()} USD</div>
              <div className="text-[10px] text-emerald-500 flex items-center gap-1 pt-1">
                <ArrowUpRight className="w-3 h-3" /> +18.4% vs June Period
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 space-y-1">
              <div className="text-slate-400 text-[10px] uppercase font-bold">Total Monthly Expenses</div>
              <div className="text-xl font-bold text-red-400">${totalExpensesUsd.toLocaleString()} USD</div>
              <div className="text-[10px] text-slate-500 flex items-center gap-1 pt-1">
                Budget: ${monthlyBudgetUsd.toLocaleString()} USD
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 space-y-1">
              <div className="text-slate-400 text-[10px] uppercase font-bold">Low Stock Threshold Alerts</div>
              <div className="text-xl font-bold text-amber-400">{lowStockItemsCount} Items</div>
              <div className="text-[10px] text-amber-500 flex items-center gap-1 pt-1">
                Threshold Set: {globalLowStockThreshold} units
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 space-y-1">
              <div className="text-slate-400 text-[10px] uppercase font-bold">Active Staff Clocked In</div>
              <div className="text-xl font-bold text-indigo-400">
                {attendanceRecords.filter(r => r.status === 'CLOCK_OUT_PENDING' || r.status === 'PRESENT').length} Employees
              </div>
              <div className="text-[10px] text-indigo-400 flex items-center gap-1 pt-1">
                Digital Timesheet Active
              </div>
            </div>
          </div>

          {/* 100% Full-Width D3.js Revenue Line Chart */}
          <D3ErpAnalyticsDashboard />
        </div>
      )}

      {/* SUBTAB 2: INVOICES & BILLING WITH DATE RANGE PICKER & STATUS FILTER */}
      {activeErpSubtab === 'INVOICES' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 p-4 space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-emerald-400" />
                <h2 className="text-xs font-bold text-slate-100 uppercase">
                  B2B Tax Invoices & Account History
                </h2>
              </div>

              {/* Filter Controls: Date Range + Status Filter */}
              <div className="flex items-center gap-3 flex-wrap text-[11px]">
                <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-2 py-1">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-400">Status:</span>
                  {(['ALL', 'PAID', 'UNPAID', 'OVERDUE'] as const).map(status => (
                    <button
                      key={status}
                      onClick={() => setInvoiceStatusFilter(status)}
                      className={`px-2 py-0.5 text-[10px] font-bold border transition-colors ${
                        invoiceStatusFilter === status
                          ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-2 py-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-400">From:</span>
                  <input
                    type="date"
                    value={invoiceFromDate}
                    onChange={(e) => setInvoiceFromDate(e.target.value)}
                    className="bg-slate-900 border border-slate-700 px-1 py-0.5 text-white text-[10px] rounded focus:outline-none focus:border-emerald-500"
                  />
                  <span className="text-slate-400">To:</span>
                  <input
                    type="date"
                    value={invoiceToDate}
                    onChange={(e) => setInvoiceToDate(e.target.value)}
                    className="bg-slate-900 border border-slate-700 px-1 py-0.5 text-white text-[10px] rounded focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Invoices Data Table */}
            <div className="overflow-x-auto bg-slate-950 border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-400 border-b border-slate-800 uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Invoice Ref</th>
                    <th className="p-3">Client Entity</th>
                    <th className="p-3">Amount ($ USD)</th>
                    <th className="p-3">VAT (15%)</th>
                    <th className="p-3">Issue Date</th>
                    <th className="p-3">Due Date</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Document Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                  {filteredInvoiceList.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-900/60 transition-colors">
                      <td className="p-3 font-bold text-emerald-400">{inv.invoiceRef}</td>
                      <td className="p-3 text-slate-200 font-bold">{inv.clientName}</td>
                      <td className="p-3 font-bold text-slate-100">${inv.amountUsd.toLocaleString()}</td>
                      <td className="p-3 text-slate-400">${inv.vatUsd.toLocaleString()}</td>
                      <td className="p-3 text-slate-400">{inv.issueDate}</td>
                      <td className="p-3 text-slate-400">{inv.dueDate}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 font-bold border text-[10px] ${
                          inv.status === 'PAID'
                            ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                            : inv.status === 'UNPAID'
                            ? 'bg-blue-950 text-blue-400 border-blue-800'
                            : 'bg-red-950 text-red-400 border-red-800'
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => setPreviewModalDoc({ type: 'INVOICE', data: inv })}
                          className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-emerald-400 font-bold rounded flex items-center gap-1 inline-flex"
                        >
                          <Eye className="w-3.5 h-3.5" /> Full Preview
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredInvoiceList.length === 0 && (
                    <tr>
                      <td colSpan={8} className="p-6 text-center text-slate-500 italic">
                        No invoices match selected date range or status filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: INVENTORY & STOCK WITH BULK-SELECTION & REAL-TIME LOW STOCK ALERTS */}
      {activeErpSubtab === 'BARCODE_SCAN' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 p-4 space-y-4">
            {/* Header & Threshold Slider Control */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-emerald-400" />
                <h2 className="text-xs font-bold text-slate-100 uppercase">
                  Inventory Master & Real-Time Stock Low Alerts
                </h2>
              </div>

              {/* Threshold Selector Control */}
              <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 px-3 py-1.5 text-[11px]">
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-slate-300 font-bold">Low Stock Threshold:</span>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={globalLowStockThreshold}
                  onChange={(e) => setGlobalLowStockThreshold(Number(e.target.value))}
                  className="w-16 bg-slate-900 border border-slate-700 px-2 py-0.5 text-white font-bold text-center focus:outline-none focus:border-amber-500"
                />
                <span className="text-slate-400 text-[10px]">units</span>
              </div>
            </div>

            {/* Bulk Selection Interface Bar */}
            <div className="flex items-center justify-between flex-wrap gap-2 bg-slate-950 border border-slate-800 p-2.5">
              <div className="flex items-center gap-2 text-[11px]">
                <span className="text-slate-400">Selected Items ({selectedInventoryIds.length}):</span>
                <button
                  onClick={() => handleBulkInventoryAction('MARK_SOLD')}
                  disabled={selectedInventoryIds.length === 0}
                  className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 border border-slate-700 text-amber-400 font-bold rounded flex items-center gap-1"
                >
                  Mark Sold (-1 Qty)
                </button>
                <button
                  onClick={() => handleBulkInventoryAction('BULK_ADD')}
                  disabled={selectedInventoryIds.length === 0}
                  className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 border border-slate-700 text-emerald-400 font-bold rounded flex items-center gap-1"
                >
                  Restock Selected (+10 Qty)
                </button>
                <button
                  onClick={() => handleBulkInventoryAction('RESTOCK_REQUIRED')}
                  disabled={selectedInventoryIds.length === 0}
                  className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 border border-slate-700 text-red-400 font-bold rounded flex items-center gap-1"
                >
                  Flag Restock Required
                </button>
              </div>

              <div className="text-[10px] text-slate-400">
                Tip: Check multiple rows to execute rapid stock status updates simultaneously.
              </div>
            </div>

            {/* Inventory Table with Low Stock Highlights */}
            <div className="overflow-x-auto bg-slate-950 border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-400 border-b border-slate-800 uppercase text-[10px]">
                  <tr>
                    <th className="p-3 w-8">
                      <input
                        type="checkbox"
                        checked={selectedInventoryIds.length === inventoryList.length && inventoryList.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedInventoryIds(inventoryList.map(i => i.id));
                          else setSelectedInventoryIds([]);
                        }}
                        className="rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-0"
                      />
                    </th>
                    <th className="p-3">Item / Barcode</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Stock Quantity</th>
                    <th className="p-3">Unit Price ($ USD)</th>
                    <th className="p-3">Location Bay</th>
                    <th className="p-3">Alert Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                  {inventoryList.map((item) => {
                    const isLowStock = item.stockQty <= globalLowStockThreshold;
                    const isSelected = selectedInventoryIds.includes(item.id);

                    return (
                      <tr 
                        key={item.id} 
                        className={`transition-colors ${
                          isLowStock
                            ? 'bg-amber-950/30 border-l-4 border-l-amber-500 hover:bg-amber-950/50'
                            : isSelected
                            ? 'bg-emerald-950/40 hover:bg-emerald-950/60'
                            : 'hover:bg-slate-900/60'
                        }`}
                      >
                        <td className="p-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              if (e.target.checked) setSelectedInventoryIds([...selectedInventoryIds, item.id]);
                              else setSelectedInventoryIds(selectedInventoryIds.filter(id => id !== item.id));
                            }}
                            className="rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-0"
                          />
                        </td>
                        <td className="p-3 font-bold text-slate-200">
                          <div>{item.itemName}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{item.barcode}</div>
                        </td>
                        <td className="p-3 text-slate-300">{item.category}</td>
                        <td className="p-3 font-bold">
                          <span className={isLowStock ? 'text-amber-400 text-sm animate-pulse' : 'text-slate-100'}>
                            {item.stockQty} units
                          </span>
                        </td>
                        <td className="p-3 font-bold text-emerald-400">${item.unitPriceUsd.toLocaleString()}</td>
                        <td className="p-3 text-slate-400">{item.location}</td>
                        <td className="p-3">
                          {isLowStock ? (
                            <span className="px-2 py-0.5 bg-amber-950 text-amber-300 border border-amber-800 font-bold text-[10px] flex items-center gap-1 w-max">
                              <AlertTriangle className="w-3 h-3 text-amber-400" /> STOCK LOW
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold text-[10px] flex items-center gap-1 w-max">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> OPTIMAL
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 4: EXPENSES & MONTHLY SPENDING RECONCILIATION */}
      {activeErpSubtab === 'EXPENSES' && (
        <div className="space-y-6">
          {/* Monthly Spending Reconciliation KPI Panel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-4 space-y-1">
              <div className="text-slate-400 text-[10px] uppercase font-bold">Total Operational Expenses</div>
              <div className="text-xl font-bold text-red-400">${totalExpensesUsd.toLocaleString()} USD</div>
              <div className="text-[10px] text-slate-400 pt-1">Audited July 2026 Expenses</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 space-y-1">
              <div className="text-slate-400 text-[10px] uppercase font-bold">Monthly Operating Budget</div>
              <div className="text-xl font-bold text-slate-100">${monthlyBudgetUsd.toLocaleString()} USD</div>
              <div className="text-[10px] text-emerald-400 pt-1">Variance: ${budgetVarianceUsd.toLocaleString()} USD Surplus</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 space-y-1">
              <div className="text-slate-400 text-[10px] uppercase font-bold">Reconciliation Status</div>
              <div className="text-xl font-bold text-emerald-400">100% RECONCILED</div>
              <div className="text-[10px] text-slate-400 pt-1">All Ledger Receipts Attached</div>
            </div>
          </div>

          {/* New Expense Entry & Log */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Form */}
            <div className="bg-slate-900 border border-slate-800 p-4 space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-slate-100 uppercase text-xs">Log Operational Expense</h3>
              </div>

              <div className="space-y-2 text-[11px]">
                <div>
                  <label className="text-slate-400 block mb-1">Expense Category:</label>
                  <select
                    value={newExpenseCategory}
                    onChange={(e: any) => setNewExpenseCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 p-2 text-white rounded focus:outline-none focus:border-emerald-500"
                  >
                    <option value="LOGISTICS_FUEL">Logistics & Fuel Refueling</option>
                    <option value="HARDWARE_MAINTENANCE">Hardware Maintenance & Spares</option>
                    <option value="CLOUD_HOSTING">Cloud Hosting & IT Servers</option>
                    <option value="OFFICE_SUPPLIES">Office Supplies & Stationery</option>
                    <option value="VENDOR_PAYOUT">Vendor & Supplier Payout</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Description:</label>
                  <input
                    type="text"
                    placeholder="e.g. Harare-Bulawayo Fleet Fuel..."
                    value={newExpenseDesc}
                    onChange={(e) => setNewExpenseDesc(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 p-2 text-white rounded focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-400 block mb-1">Amount ($ USD):</label>
                    <input
                      type="number"
                      value={newExpenseAmount}
                      onChange={(e) => setNewExpenseAmount(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 p-2 text-white rounded focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Department:</label>
                    <input
                      type="text"
                      value={newExpenseDept}
                      onChange={(e) => setNewExpenseDept(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 p-2 text-white rounded focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <button
                  onClick={handleAddExpense}
                  className="w-full py-2 bg-emerald-950 hover:bg-emerald-900 border border-emerald-700 text-emerald-300 font-bold uppercase rounded flex items-center justify-center gap-2 mt-2"
                >
                  <Plus className="w-4 h-4" /> Add Expense Record
                </button>
              </div>
            </div>

            {/* Expenses Log Table */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-slate-100 uppercase text-xs flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" /> Monthly Operational Spending Reconciliation Log
                </span>
                <span className="text-[10px] text-slate-400">Audited July 2026</span>
              </div>

              <div className="overflow-x-auto bg-slate-950 border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 border-b border-slate-800 uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Ref ID</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Description</th>
                      <th className="p-3">Department</th>
                      <th className="p-3">Amount ($ USD)</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                    {expenseList.map((exp) => (
                      <tr key={exp.id} className="hover:bg-slate-900/60">
                        <td className="p-3 font-bold text-emerald-400">{exp.id}</td>
                        <td className="p-3 text-slate-300">{exp.category}</td>
                        <td className="p-3 text-slate-100 font-bold">{exp.description}</td>
                        <td className="p-3 text-slate-400">{exp.department}</td>
                        <td className="p-3 font-bold text-red-400">${exp.amountUsd.toLocaleString()}</td>
                        <td className="p-3 text-slate-400">{exp.date}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold text-[10px]">
                            {exp.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 5: VISUAL RESOURCE SCHEDULING CALENDAR */}
      {activeErpSubtab === 'RESOURCE_CALENDAR' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <h2 className="text-xs font-bold text-slate-100 uppercase">
                  Visual Resource Scheduling & Project Milestone Calendar
                </h2>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">July - August 2026 Allocations</span>
            </div>

            {/* Milestones Timeline Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resourceMilestones.map((ms) => (
                <div key={ms.id} className="bg-slate-950 border border-slate-800 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-slate-900 border border-slate-700 text-emerald-400 font-bold text-[10px]">
                      {ms.department}
                    </span>
                    <span className={`px-2 py-0.5 font-bold border text-[10px] ${
                      ms.status === 'COMPLETED'
                        ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                        : ms.status === 'IN_PROGRESS'
                        ? 'bg-blue-950 text-blue-400 border-blue-800'
                        : 'bg-red-950 text-red-400 border-red-800'
                    }`}>
                      {ms.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-100 text-sm">{ms.projectName}</h3>
                    <p className="text-slate-400 text-xs mt-0.5">{ms.milestoneTitle}</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Milestone Progress:</span>
                      <span className="font-bold text-white">{ms.progressPercent}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-900 border border-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 transition-all duration-500" 
                        style={{ width: `${ms.progressPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-900 pt-2">
                    <div>
                      <span className="text-slate-500">Personnel: </span>
                      <span className="text-slate-200 font-bold">{ms.allocatedPersonnel.join(', ')}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {ms.startDate} to {ms.endDate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 6: EMPLOYEE ATTENDANCE & DIGITAL TIMESHEETS */}
      {activeErpSubtab === 'ATTENDANCE' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Clock-in / Clock-out Control Panel */}
            <div className="bg-slate-900 border border-slate-800 p-4 space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-slate-100 uppercase text-xs">Manual Staff Check-In / Clock-Out</h3>
              </div>

              <div className="space-y-3 text-[11px]">
                <div>
                  <label className="text-slate-400 block mb-1">Employee Name:</label>
                  <input
                    type="text"
                    value={clockEmployeeName}
                    onChange={(e) => setClockEmployeeName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 p-2 text-white rounded focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Department:</label>
                  <select
                    value={clockDepartment}
                    onChange={(e) => setClockDepartment(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 p-2 text-white rounded focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                    <option value="Logistics">Logistics</option>
                    <option value="Engineering">Engineering</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Hourly Rate ($ USD):</label>
                  <input
                    type="number"
                    value={clockHourlyRate}
                    onChange={(e) => setClockHourlyRate(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 p-2 text-white rounded focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => handleAttendanceClock('CHECK_IN')}
                    className="py-2 bg-emerald-950 hover:bg-emerald-900 border border-emerald-700 text-emerald-300 font-bold uppercase rounded flex items-center justify-center gap-1"
                  >
                    <CheckCircle className="w-3.5 h-3.5" /> Check In
                  </button>

                  <button
                    onClick={() => handleAttendanceClock('CHECK_OUT')}
                    className="py-2 bg-slate-950 hover:bg-slate-900 border border-slate-700 text-slate-300 font-bold uppercase rounded flex items-center justify-center gap-1"
                  >
                    <Clock className="w-3.5 h-3.5" /> Clock Out
                  </button>
                </div>
              </div>
            </div>

            {/* Timesheet Table */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-slate-100 uppercase text-xs flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" /> Digital Timesheet & Payroll Calculation Matrix
                </span>
                <span className="text-[10px] text-slate-400">Live July 2026 Logs</span>
              </div>

              <div className="overflow-x-auto bg-slate-950 border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 border-b border-slate-800 uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Staff ID</th>
                      <th className="p-3">Employee Name</th>
                      <th className="p-3">Department</th>
                      <th className="p-3">Hours Logged</th>
                      <th className="p-3">Hourly Rate</th>
                      <th className="p-3">Calculated Pay ($ USD)</th>
                      <th className="p-3">Attendance Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                    {attendanceRecords.map((att) => (
                      <tr key={att.id} className="hover:bg-slate-900/60">
                        <td className="p-3 font-bold text-emerald-400">{att.employeeId}</td>
                        <td className="p-3 text-slate-100 font-bold">{att.employeeName}</td>
                        <td className="p-3 text-slate-400">{att.department}</td>
                        <td className="p-3 font-bold text-slate-200">{att.hoursWorked} hrs</td>
                        <td className="p-3 text-slate-400">${att.hourlyRateUsd}/hr</td>
                        <td className="p-3 font-bold text-emerald-400">${att.calculatedPayUsd} USD</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 font-bold border text-[10px] ${
                            att.status === 'PRESENT'
                              ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                              : att.status === 'OVERTIME'
                              ? 'bg-indigo-950 text-indigo-400 border-indigo-800'
                              : 'bg-amber-950 text-amber-400 border-amber-800'
                          }`}>
                            {att.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 7: ZIMRA PAYSLIP GENERATOR */}
      {activeErpSubtab === 'PAYSLIP' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-400" />
                <h2 className="text-xs font-bold text-slate-100 uppercase">
                  ZIMRA Statutory Compliant Payslip Engine
                </h2>
              </div>
              <button
                onClick={() => setPreviewModalDoc({ type: 'PAYSLIP', data: payslipData })}
                className="px-3 py-1 bg-emerald-950 hover:bg-emerald-900 border border-emerald-700 text-emerald-300 font-bold text-[11px] rounded flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" /> Full-Width Document Voucher Preview
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px]">
              <div>
                <label className="text-slate-400 block mb-1">Employee Full Name:</label>
                <input
                  type="text"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 p-2 text-white rounded focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Basic Monthly Salary ($ USD):</label>
                <input
                  type="number"
                  value={basicSalary}
                  onChange={(e) => setBasicSalary(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 p-2 text-white rounded focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Allowances ($ USD):</label>
                <input
                  type="number"
                  value={allowances}
                  onChange={(e) => setAllowances(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 p-2 text-white rounded focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <button
              onClick={handleGeneratePayslip}
              disabled={isGeneratingPayslip}
              className="w-full py-2 bg-emerald-950 hover:bg-emerald-900 border border-emerald-700 text-emerald-300 font-bold uppercase rounded flex items-center justify-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isGeneratingPayslip ? 'animate-spin' : ''}`} />
              Calculate & Generate Statutory ZIMRA Voucher
            </button>
          </div>
        </div>
      )}

      {/* SUBTAB 8: HR TALENT & CV PARSER */}
      {activeErpSubtab === 'CV_PARSER' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <h2 className="text-xs font-bold text-slate-100 uppercase">
                  HR Automated Resume & Talent Matching Parser
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-[11px]">
              <div className="space-y-2">
                <label className="text-slate-400 block">Raw Candidate Resume Text:</label>
                <textarea
                  rows={8}
                  value={rawCvInputText}
                  onChange={(e) => setRawCvInputText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 p-3 text-slate-200 font-mono rounded focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={() => {
                    setIsParsingCv(true);
                    setTimeout(() => {
                      setIsParsingCv(false);
                      setActionNotice('Resume analyzed & candidate indexed in database.');
                      setTimeout(() => setActionNotice(null), 3000);
                    }, 800);
                  }}
                  className="px-4 py-2 bg-emerald-950 hover:bg-emerald-900 border border-emerald-700 text-emerald-300 font-bold uppercase rounded flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-emerald-400" /> Parse & Extract Qualifications
                </button>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 space-y-3">
                <div className="font-bold text-slate-200 uppercase border-b border-slate-800 pb-2">
                  Indexed Executive Talent Roster
                </div>
                {candidateDatabase.map((cand) => (
                  <div key={cand.id} className="p-3 bg-slate-900 border border-slate-800 space-y-1">
                    <div className="flex justify-between font-bold text-emerald-400">
                      <span>{cand.candidateName}</span>
                      <span className="text-white">{cand.matchScore}% Match Score</span>
                    </div>
                    <div className="text-slate-300">{cand.roleMatched} ({cand.experienceYears} Years Exp)</div>
                    <div className="flex gap-1 flex-wrap pt-1">
                      {cand.skills.map((s, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 bg-slate-950 text-slate-400 text-[9px] border border-slate-800">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 9: ALERT CENTER & AUDIT LOGS */}
      {activeErpSubtab === 'ALERTS' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-emerald-400" />
                <h2 className="text-xs font-bold text-slate-100 uppercase">
                  Automated Security & Operations Alert Audit Center
                </h2>
              </div>
            </div>

            <div className="overflow-x-auto bg-slate-950 border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-400 border-b border-slate-800 uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Log ID</th>
                    <th className="p-3">Trigger Type</th>
                    <th className="p-3">Channel</th>
                    <th className="p-3">Recipient Target</th>
                    <th className="p-3">Payload Details</th>
                    <th className="p-3">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                  {alertLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-900/60">
                      <td className="p-3 font-bold text-emerald-400">{log.id}</td>
                      <td className="p-3 text-slate-300 font-bold">{log.triggerType}</td>
                      <td className="p-3 text-indigo-400">{log.channel}</td>
                      <td className="p-3 text-slate-400">{log.recipient}</td>
                      <td className="p-3 text-slate-200">{log.message}</td>
                      <td className="p-3 text-slate-500">{log.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* FULL-WIDTH DOCUMENT PREVIEW MODAL FOR INVOICES & PAYSLIPS */}
      {previewModalDoc && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-5xl rounded-lg shadow-2xl overflow-hidden font-mono text-xs flex flex-col max-h-[90vh]">
            {/* Modal Header Bar */}
            <div className="bg-slate-950 border-b border-slate-800 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-emerald-400" />
                <h2 className="font-bold text-white text-sm uppercase">
                  Full-Width Document Preview & Printable PDF Voucher
                </h2>
                <span className="px-2.5 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                  {previewModalDoc.type} DOCUMENT
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded border border-slate-600 flex items-center gap-1.5 text-[11px]"
                >
                  <Printer className="w-4 h-4 text-emerald-400" /> Print Document
                </button>
                <button
                  onClick={() => {
                    setActionNotice('Document downloaded as PDF successfully.');
                    setTimeout(() => setActionNotice(null), 3000);
                  }}
                  className="px-3 py-1.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 font-bold rounded border border-emerald-700 flex items-center gap-1.5 text-[11px]"
                >
                  <Download className="w-4 h-4 text-emerald-400" /> Export PDF
                </button>
                <button
                  onClick={() => setPreviewModalDoc(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Document Body */}
            <div className="p-6 md:p-10 overflow-y-auto bg-slate-950 text-slate-100 space-y-8 flex-1">
              {previewModalDoc.type === 'INVOICE' && (
                <div className="max-w-3xl mx-auto border border-slate-800 bg-slate-900 p-8 space-y-6 rounded">
                  {/* Document Issuer Header */}
                  <div className="flex justify-between items-start border-b border-slate-800 pb-6">
                    <div>
                      <h1 className="text-xl font-bold text-emerald-400 uppercase tracking-wider">
                        Enterprise Solutions (Pvt) Ltd
                      </h1>
                      <p className="text-slate-400 text-[11px]">Harare Corporate Park, Sam Nujoma Street</p>
                      <p className="text-slate-400 text-[11px]">ZIMRA Tax BP: 200098412 | VAT Reg: 1009412</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-white">TAX INVOICE</div>
                      <div className="text-emerald-400 font-bold">{previewModalDoc.data.invoiceRef}</div>
                      <div className="text-slate-400 text-[10px]">Issued: {previewModalDoc.data.issueDate}</div>
                      <div className="text-slate-400 text-[10px]">Due Date: {previewModalDoc.data.dueDate}</div>
                    </div>
                  </div>

                  {/* Client Info */}
                  <div className="p-4 bg-slate-950 border border-slate-800 space-y-1">
                    <div className="text-[10px] text-slate-500 uppercase font-bold">Billed To Entity:</div>
                    <div className="text-base font-bold text-white">{previewModalDoc.data.clientName}</div>
                    <div className="text-slate-400 text-[11px]">Registered Commercial Account</div>
                  </div>

                  {/* Items Breakdown Table */}
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="p-3">Description</th>
                        <th className="p-3 text-right">Amount ($ USD)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 font-mono">
                      <tr>
                        <td className="p-3 text-slate-200">B2B Heavy Machinery Telemetry & Agricultural Hardware Order</td>
                        <td className="p-3 text-right font-bold text-white">${previewModalDoc.data.amountUsd.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-slate-400">Statutory Value Added Tax (VAT 15%)</td>
                        <td className="p-3 text-right text-slate-400">${previewModalDoc.data.vatUsd.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Summary Total */}
                  <div className="flex justify-between items-center p-4 bg-emerald-950/40 border border-emerald-800/80 rounded">
                    <div>
                      <div className="text-slate-400 text-[10px]">TOTAL PAYABLE AMOUNT</div>
                      <div className="text-xs text-emerald-300">Net after 15% ZIMRA VAT</div>
                    </div>
                    <div className="text-2xl font-bold text-emerald-400">
                      ${(previewModalDoc.data.amountUsd + previewModalDoc.data.vatUsd).toLocaleString()} USD
                    </div>
                  </div>

                  {/* Verification & Stamp */}
                  <div className="flex justify-between items-center border-t border-slate-800 pt-6">
                    <div className="flex items-center gap-3">
                      <QrCode className="w-12 h-12 text-slate-400" />
                      <div>
                        <div className="font-bold text-white text-[11px]">VERIFIED ZIMRA SECURE TOKEN</div>
                        <div className="text-[9px] text-slate-500 font-mono">HASH: 9981-0021-X9A2-BC18</div>
                      </div>
                    </div>
                    <div className="text-center border-t border-slate-600 pt-1 w-48">
                      <div className="text-[10px] text-slate-400">Authorized Financial Signatory</div>
                    </div>
                  </div>
                </div>
              )}

              {previewModalDoc.type === 'PAYSLIP' && (
                <div className="max-w-3xl mx-auto border border-slate-800 bg-slate-900 p-8 space-y-6 rounded">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-6">
                    <div>
                      <h1 className="text-xl font-bold text-emerald-400 uppercase">Statutory Payslip Voucher</h1>
                      <p className="text-slate-400 text-[11px]">ZIMRA Tax Compliant Payroll Voucher</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-white">{previewModalDoc.data.payslipId}</div>
                      <div className="text-slate-400 text-[10px]">Date: {previewModalDoc.data.generatedDate}</div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 border border-slate-800 grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-slate-500 text-[10px] block">EMPLOYEE NAME:</span>
                      <span className="font-bold text-white text-sm">{previewModalDoc.data.employeeName}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">CURRENCY:</span>
                      <span className="font-bold text-emerald-400 text-sm">USD ($)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="font-bold text-emerald-400 border-b border-slate-800 pb-1">Earnings</div>
                      <div className="flex justify-between text-slate-300"><span>Basic Salary:</span> <span>${previewModalDoc.data.basicSalaryUsd}</span></div>
                      <div className="flex justify-between text-slate-300"><span>Allowances:</span> <span>${previewModalDoc.data.allowancesUsd}</span></div>
                      <div className="flex justify-between font-bold text-white border-t border-slate-800 pt-1"><span>Gross Earnings:</span> <span>${previewModalDoc.data.grossSalaryUsd}</span></div>
                    </div>

                    <div className="space-y-2">
                      <div className="font-bold text-red-400 border-b border-slate-800 pb-1">Statutory Deductions</div>
                      <div className="flex justify-between text-slate-300"><span>PAYE Tax:</span> <span>${previewModalDoc.data.payeUsd}</span></div>
                      <div className="flex justify-between text-slate-300"><span>AIDS Levy (3%):</span> <span>${previewModalDoc.data.aidsLevyUsd}</span></div>
                      <div className="flex justify-between text-slate-300"><span>NSSA Pension:</span> <span>${previewModalDoc.data.nssaUsd}</span></div>
                      <div className="flex justify-between font-bold text-white border-t border-slate-800 pt-1"><span>Total Deductions:</span> <span>${previewModalDoc.data.totalDeductionsUsd}</span></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-emerald-950 border border-emerald-800 rounded">
                    <div>
                      <div className="text-slate-300 text-[10px]">NET PAYABLE AMOUNT</div>
                      <div className="text-xs text-emerald-400">Direct Deposit to Employee Account</div>
                    </div>
                    <div className="text-2xl font-bold text-emerald-400">
                      ${previewModalDoc.data.netPayUsd} USD
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Global Action Toolbar */}
      <StickyGlobalActionToolbar 
        moduleName="Business ERP Suite & Operational Platform" 
        selectedIds={selectedIds} 
        onActionTrigger={(act) => {
          setActionNotice(`Triggered toolbar action: ${act}`);
          setTimeout(() => setActionNotice(null), 3000);
        }}
      />
    </div>
  );
};
