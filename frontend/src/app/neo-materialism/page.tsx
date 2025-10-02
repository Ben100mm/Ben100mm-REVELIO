import dynamic from 'next/dynamic';

const NeoMaterialismShowcase = dynamic(() => import('@/components/neo-materialism/NeoMaterialismShowcase'), {
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="neo-pulse-glow w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 animate-spin"></div>
        <p className="text-white/70">Loading Neo-Materialism Components...</p>
      </div>
    </div>
  ),
  ssr: false
});

export default function NeoMaterialismPage() {
  return <NeoMaterialismShowcase />;
}
