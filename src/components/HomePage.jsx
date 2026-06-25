export default function HomePage({ theme, onEnter }) {
  return (
    <div style={{ backgroundColor: theme.bg }} className={`min-h-screen ${theme.text} font-sans flex flex-col`}>
      <header className={`${theme.header} backdrop-blur-md border-b ${theme.border} px-6 py-4 flex items-center justify-between sticky top-0 z-40`}>
        <div>
          <h1 className="font-serif text-lg tracking-wider uppercase font-semibold">{adminCreds?.title || 'OBSVR'}</h1>
          <p className="text-[10px] uppercase font-mono tracking-widest opacity-50">{adminCreds?.subtitle || theme.subtitle}</p>
        </div>
      </header>

      <main className="flex-grow max-w-6xl mx-auto px-6 py-16 md:py-24 w-full flex flex-col justify-center">
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-serif font-light mb-6 leading-tight">
            Classified Archive System
          </h2>
          <p className="text-lg opacity-75 mb-8 leading-relaxed max-w-2xl">
            Secure digital repository for artifact cataloging, visitor analytics, and administrative control. Multi-theme support for organizational compliance.
          </p>
          <button 
            onClick={onEnter}
            className={`${theme.primary} px-8 py-3 rounded font-mono text-xs tracking-widest uppercase`}
          >
            Enter Gallery
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          <div>
            <h3 className="font-serif text-2xl mb-4 font-medium">Features</h3>
            <ul className="space-y-3 font-mono text-sm opacity-75">
              <li>✓ Artifact cataloging & management</li>
              <li>✓ Real-time visitor metrics</li>
              <li>✓ Multi-theme dashboard styles</li>
              <li>✓ Customizable titles & branding</li>
              <li>✓ Secure authentication & recovery</li>
              <li>✓ Local data storage & export</li>
            </ul>
          </div>
          <div className={`border ${theme.border} rounded p-8 opacity-75`}>
            <h3 className="font-serif text-2xl mb-4 font-medium">Getting Started</h3>
            <ol className="space-y-3 font-mono text-sm opacity-75">
              <li>1. Browse the public gallery</li>
              <li>2. Click Login in the header</li>
              <li>3. Use admin / admin</li>
              <li>4. Manage case files in dashboard</li>
              <li>5. Customize theme & settings</li>
            </ol>
          </div>
        </div>
      </main>

      <footer className={`border-t ${theme.border} mt-24 py-8 text-center opacity-50 font-mono text-xs`}>
        <p>© 2026 OBSVR Archive System</p>
      </footer>
    </div>
  );
}
