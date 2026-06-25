export default function MetricsView({ theme }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-serif font-light mb-8">Visitor Metrics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`border ${theme.border} p-6 rounded opacity-90`}>
          <p className="text-xs font-mono opacity-75 uppercase mb-2">Total Visits</p>
          <p className="text-4xl font-bold">0</p>
        </div>
        <div className={`border ${theme.border} p-6 rounded opacity-90`}>
          <p className="text-xs font-mono opacity-75 uppercase mb-2">Unique Visitors</p>
          <p className="text-4xl font-bold">0</p>
        </div>
        <div className={`border ${theme.border} p-6 rounded opacity-90`}>
          <p className="text-xs font-mono opacity-75 uppercase mb-2">Avg Duration</p>
          <p className="text-4xl font-bold">0s</p>
        </div>
      </div>

      <div className={`mt-8 border ${theme.border} p-6 rounded opacity-75`}>
        <p className="text-xs font-mono opacity-75">Metrics tracking available when database integration is enabled.</p>
      </div>
    </div>
  );
}
