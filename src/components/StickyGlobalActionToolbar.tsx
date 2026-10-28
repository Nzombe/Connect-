import React from 'react';
import { 
  CheckSquare, 
  Square, 
  Trash2, 
  Archive, 
  RefreshCw, 
  Download, 
  Filter, 
  Layers, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface StickyGlobalActionToolbarProps {
  totalCount: number;
  selectedCount: number;
  onSelectAll?: () => void;
  onClearSelection?: () => void;
  onBulkDelete?: () => void;
  onBulkArchive?: () => void;
  onRefresh?: () => void;
  onExport?: () => void;
  moduleTitle?: string;
  isRefreshing?: boolean;
  extraActions?: React.ReactNode;
}

export const StickyGlobalActionToolbar: React.FC<StickyGlobalActionToolbarProps> = ({
  totalCount,
  selectedCount,
  onSelectAll,
  onClearSelection,
  onBulkDelete,
  onBulkArchive,
  onRefresh,
  onExport,
  moduleTitle = 'Module Records',
  isRefreshing = false,
  extraActions,
}) => {
  const isAllSelected = totalCount > 0 && selectedCount === totalCount;

  return (
    <div className="sticky top-0 z-30 w-full min-w-full bg-slate-900/95 backdrop-blur-md border-b-2 border-emerald-600/40 p-2.5 mb-4 shadow-xl transition-all font-mono">
      <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
        {/* Left Controls: Select All & Status Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-2.5 py-1.5">
            <button
              type="button"
              onClick={isAllSelected ? onClearSelection : onSelectAll}
              className="flex items-center gap-1.5 text-slate-200 hover:text-emerald-400 font-bold"
              title={isAllSelected ? "Deselect All Items" : "Select All Items"}
            >
              {isAllSelected ? (
                <CheckSquare className="w-4 h-4 text-emerald-400" />
              ) : selectedCount > 0 ? (
                <CheckSquare className="w-4 h-4 text-emerald-500 opacity-70" />
              ) : (
                <Square className="w-4 h-4 text-slate-500" />
              )}
              <span>{isAllSelected ? 'Deselect All' : 'Select All'}</span>
            </button>
            <span className="text-slate-600">|</span>
            <span className="text-[11px] text-slate-400">
              <strong className="text-emerald-400 font-bold">{selectedCount}</strong> of {totalCount} selected
            </span>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 font-bold text-[11px]">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            {moduleTitle}
          </span>
        </div>

        {/* Right Controls: Bulk Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {extraActions}

          {/* Refresh Action */}
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold flex items-center gap-1.5 transition-colors"
              title="Refresh Module Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden md:inline">Sync & Refresh</span>
            </button>
          )}

          {/* Export Action */}
          {onExport && (
            <button
              type="button"
              onClick={onExport}
              className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold flex items-center gap-1.5 transition-colors"
              title="Export Selected Items"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden md:inline">Export</span>
            </button>
          )}

          {/* Bulk Archive Action */}
          {onBulkArchive && (
            <button
              type="button"
              onClick={onBulkArchive}
              disabled={selectedCount === 0}
              className={`px-3 py-1.5 border font-bold flex items-center gap-1.5 transition-colors ${
                selectedCount > 0
                  ? 'bg-amber-950/80 hover:bg-amber-900 border-amber-800 text-amber-300'
                  : 'bg-slate-950 border-slate-850 text-slate-600 cursor-not-allowed opacity-60'
              }`}
              title="Bulk Archive Selected"
            >
              <Archive className="w-3.5 h-3.5" />
              <span>Bulk Archive</span>
            </button>
          )}

          {/* Bulk Delete Action */}
          {onBulkDelete && (
            <button
              type="button"
              onClick={onBulkDelete}
              disabled={selectedCount === 0}
              className={`px-3 py-1.5 border font-bold flex items-center gap-1.5 transition-colors ${
                selectedCount > 0
                  ? 'bg-red-950 hover:bg-red-900 border-red-800 text-red-300'
                  : 'bg-slate-950 border-slate-850 text-slate-600 cursor-not-allowed opacity-60'
              }`}
              title="Bulk Delete Selected"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Bulk Delete ({selectedCount})</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
