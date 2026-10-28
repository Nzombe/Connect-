import React, { useState } from 'react';
import { 
  Archive, 
  FileText, 
  FolderArchive, 
  Lock, 
  Download, 
  CheckSquare, 
  Square, 
  ShieldCheck, 
  RefreshCw, 
  HardDrive, 
  FileCode, 
  Key, 
  Database 
} from 'lucide-react';

interface SelectableFile {
  id: string;
  name: string;
  source: 'Google Drive' | 'Local Storage' | 'ERP Vault';
  sizeKb: number;
  type: string;
  updatedAt: string;
}

export const BulkDocumentExporterModule: React.FC = () => {
  const [fileList, setFileList] = useState<SelectableFile[]>([
    { id: 'FILE-01', name: 'Master_Supply_Agreement_2026.pdf', source: 'Google Drive', sizeKb: 2450, type: 'PDF Document', updatedAt: '2026-07-28' },
    { id: 'FILE-02', name: 'ZIMRA_PAYE_Tax_Filing_Q2.pdf', source: 'ERP Vault', sizeKb: 1120, type: 'PDF Document', updatedAt: '2026-07-27' },
    { id: 'FILE-03', name: 'Annual_Financial_Audit_Ledger.xlsx', source: 'Local Storage', sizeKb: 4800, type: 'Excel Spreadsheet', updatedAt: '2026-07-25' },
    { id: 'FILE-04', name: 'Alibaba_B2B_Escrow_Contract_Sealed.pdf', source: 'Google Drive', sizeKb: 3100, type: 'PDF Document', updatedAt: '2026-07-22' },
    { id: 'FILE-05', name: 'Stokvel_Cooperative_Ledger_2026.csv', source: 'Local Storage', sizeKb: 850, type: 'CSV Document', updatedAt: '2026-07-20' },
  ]);

  const [selectedFileIds, setSelectedFileIds] = useState<string[]>(['FILE-01', 'FILE-02', 'FILE-03']);
  const [encryptionPassword, setEncryptionPassword] = useState('RejoiceVault2026#');
  const [compressionFormat, setCompressionFormat] = useState<'ZIP' | '7Z' | 'TAR_GZ'>('ZIP');
  const [isExporting, setIsExporting] = useState(false);
  const [exportResult, setExportResult] = useState<{
    archiveId: string;
    fileCount: number;
    encryptedHash: string;
    downloadUrl: string;
    archivedAt: string;
  } | null>(null);

  const toggleSelectFile = (id: string) => {
    if (selectedFileIds.includes(id)) {
      setSelectedFileIds(selectedFileIds.filter((fId) => fId !== id));
    } else {
      setSelectedFileIds([...selectedFileIds, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedFileIds.length === fileList.length) {
      setSelectedFileIds([]);
    } else {
      setSelectedFileIds(fileList.map((f) => f.id));
    }
  };

  const handleRunBulkExport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFileIds.length) return;
    setIsExporting(true);

    try {
      const selectedNames = fileList.filter((f) => selectedFileIds.includes(f.id)).map((f) => f.name);
      const res = await fetch('/api/documents/bulk-export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          files: selectedNames,
          encryptionPassword,
          compressionFormat,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setExportResult({
          archiveId: data.archiveId,
          fileCount: data.fileCount,
          encryptedHash: data.encryptedHash,
          downloadUrl: data.downloadUrl,
          archivedAt: data.archivedAt,
        });
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  const selectedSizeTotalKb = fileList
    .filter((f) => selectedFileIds.includes(f.id))
    .reduce((acc, curr) => acc + curr.sizeKb, 0);

  return (
    <div className="w-full min-w-full overflow-y-auto overflow-x-auto p-4 space-y-6 bg-slate-950 text-slate-100">
      {/* Header */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Archive className="w-5 h-5 text-indigo-400" />
            <h1 className="text-base font-bold text-slate-100 uppercase tracking-wide">
              Cross-Storage Bulk Document Exporter & AES-256 Encrypted Archival Utility
            </h1>
          </div>
          <span className="text-xs px-2.5 py-1 bg-indigo-950 text-indigo-400 border border-indigo-800 font-mono">
            MILITARY-GRADE AES-256-GCM ENCRYPTION
          </span>
        </div>
        <p className="text-xs text-slate-400 max-w-4xl">
          Select and compress multiple documents across Google Drive, Local Storage, and ERP Vaults into a single password-protected, AES-256-GCM encrypted batch archive for offline legal compliance and enterprise backup.
        </p>
      </div>

      {/* Control Bar & Export Config Grid */}
      <div className="w-full min-w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Encryption & Format Form */}
        <div className="lg:col-span-1 bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Lock className="w-4 h-4 text-indigo-400" /> Archival Encryption Settings
            </h2>
            <span className="text-[11px] font-mono text-indigo-400">Security Vault</span>
          </div>

          <form onSubmit={handleRunBulkExport} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Archive Password (AES-256 Key)</label>
              <input
                type="password"
                value={encryptionPassword}
                onChange={(e) => setEncryptionPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-indigo-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Compression Format</label>
              <select
                value={compressionFormat}
                onChange={(e) => setCompressionFormat(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-indigo-500 focus:outline-none font-mono"
              >
                <option value="ZIP">ZIP (.zip) - Standard Cross-Platform</option>
                <option value="7Z">7Z (.7z) - Maximum Compression Ratio</option>
                <option value="TAR_GZ">TAR.GZ (.tar.gz) - Linux / Server Backup</option>
              </select>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800 font-mono text-[11px] space-y-1 text-slate-300">
              <div className="flex justify-between">
                <span>Selected Files:</span>
                <span className="text-indigo-400 font-bold">{selectedFileIds.length} Files</span>
              </div>
              <div className="flex justify-between">
                <span>Uncompressed Size:</span>
                <span className="text-slate-200">{(selectedSizeTotalKb / 1024).toFixed(2)} MB</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isExporting || selectedFileIds.length === 0}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-none transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isExporting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <FolderArchive className="w-4 h-4" />}
              Compress & Export Encrypted Batch
            </button>
          </form>

          {exportResult && (
            <div className="p-3 bg-slate-950 border border-emerald-900 text-emerald-300 font-mono text-xs space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" /> Batch Archive Ready
              </div>
              <p className="text-[11px] text-slate-300">
                {exportResult.fileCount} files packaged into {exportResult.archiveId}. Hash: {exportResult.encryptedHash}
              </p>
              <a
                href={exportResult.downloadUrl}
                download
                className="block w-full text-center py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
              >
                Download {exportResult.archiveId}.zip
              </a>
            </div>
          )}
        </div>

        {/* File Selection Table - Full Width 100% Edge-to-Edge */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-4 rounded-none space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-400" /> Select Storage Documents for Archival
            </h2>
            <button
              onClick={toggleSelectAll}
              className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700 text-[11px] font-mono"
            >
              {selectedFileIds.length === fileList.length ? 'Deselect All' : 'Select All Files'}
            </button>
          </div>

          <div className="w-full min-w-full overflow-x-auto border border-slate-800">
            <table className="w-full min-w-[700px] text-left text-xs text-slate-300">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[11px] font-mono">
                <tr>
                  <th className="p-3 w-10 text-center">Select</th>
                  <th className="p-3">File Name</th>
                  <th className="p-3">Source Location</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Size</th>
                  <th className="p-3">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900 font-mono text-[11px]">
                {fileList.map((f) => {
                  const isSelected = selectedFileIds.includes(f.id);
                  return (
                    <tr
                      key={f.id}
                      onClick={() => toggleSelectFile(f.id)}
                      className={`cursor-pointer transition-colors ${isSelected ? 'bg-indigo-950/30' : 'hover:bg-slate-850'}`}
                    >
                      <td className="p-3 text-center">
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-indigo-400 inline-block" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-600 inline-block" />
                        )}
                      </td>
                      <td className="p-3 font-semibold text-slate-100 max-w-xs truncate">{f.name}</td>
                      <td className="p-3 text-slate-300 whitespace-nowrap">
                        <span className="px-2 py-0.5 bg-slate-950 border border-slate-800 text-slate-400">
                          {f.source}
                        </span>
                      </td>
                      <td className="p-3 text-slate-400 whitespace-nowrap">{f.type}</td>
                      <td className="p-3 font-bold text-indigo-300 whitespace-nowrap">{(f.sizeKb / 1024).toFixed(2)} MB</td>
                      <td className="p-3 text-slate-400 whitespace-nowrap">{f.updatedAt}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
