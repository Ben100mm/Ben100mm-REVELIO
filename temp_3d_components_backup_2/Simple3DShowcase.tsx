'use client';

interface Simple3DShowcaseProps {
  className?: string;
}

export default function Simple3DShowcase({ className = '' }: Simple3DShowcaseProps) {
  return (
    <div className={`relative w-full h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 ${className}`}>
      {/* Fallback 3D-like visual using CSS */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Animated background shapes */}
          <div className="absolute inset-0 w-32 h-32 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute inset-0 w-24 h-24 bg-gradient-to-br from-accent-500/20 to-primary-500/20 rounded-full blur-lg animate-bounce" style={{animationDelay: '0.5s'}}></div>
          
          {/* Central 3D-like element */}
          <div className="relative w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl shadow-3d-xl animate-spin-slow flex items-center justify-center">
            <div className="w-12 h-12 bg-white/20 rounded-xl"></div>
          </div>
          
          {/* Orbiting elements */}
          <div className="absolute top-0 left-1/2 w-4 h-4 bg-primary-500 rounded-full animate-orbit" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-1/2 right-0 w-4 h-4 bg-accent-500 rounded-full animate-orbit" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-green-500 rounded-full animate-orbit" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-0 w-4 h-4 bg-orange-500 rounded-full animate-orbit" style={{animationDelay: '3s'}}></div>
        </div>
      </div>

      {/* Overlay info */}
      <div className="absolute top-4 left-4 pointer-events-none">
        <div className="card-glass backdrop-blur-xl p-3">
          <h3 className="text-sm font-semibold text-white mb-1">3D Showcase</h3>
          <p className="text-xs text-slate-300">
            Interactive 3D elements with advanced materials
          </p>
        </div>
      </div>

      {/* Loading indicator */}
      <div className="absolute bottom-4 right-4 pointer-events-none">
        <div className="flex items-center space-x-2 text-white/50 text-xs">
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
          <span>Loading 3D...</span>
        </div>
      </div>
    </div>
  );
}
