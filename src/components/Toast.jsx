export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-50 p-4 rounded shadow-2xl border flex items-center space-x-3 transition-all duration-300 ${
      message.type === 'success' ? 'bg-emerald-50 border-emerald-300 text-emerald-950' :
      message.type === 'error' ? 'bg-rose-50 border-rose-300 text-rose-950' :
      'bg-stone-900 border-stone-800 text-stone-100'
    }`}>
      <span className="w-2 h-2 rounded-full bg-current animate-ping"></span>
      <p className="text-xs font-mono font-medium">{message.text}</p>
    </div>
  );
}
