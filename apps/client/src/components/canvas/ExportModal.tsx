type ExportModalProps = {
  onExport: (format: "png" | "jpeg") => void;
  onClose: () => void;
};

export function ExportModal({ onExport, onClose }: ExportModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-80 rounded-xl border-2 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="mb-4 text-xl font-bold">Export Whiteboard</h2>
        <div className="mb-6 space-y-4">
          <button
            onClick={() => onExport("png")}
            className="w-full rounded-lg border-2 border-black bg-blue-300 py-3 font-bold transition-all hover:bg-blue-400 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            Export as PNG
          </button>
          <button
            onClick={() => onExport("jpeg")}
            className="w-full rounded-lg border-2 border-black bg-green-300 py-3 font-bold transition-all hover:bg-green-400 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            Export as JPEG
          </button>
        </div>
        <button
          onClick={onClose}
          className="w-full rounded-lg border-2 border-black bg-gray-200 py-2 font-medium transition-all hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
