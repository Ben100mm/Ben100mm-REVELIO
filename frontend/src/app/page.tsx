'use client';

import dynamic from 'next/dynamic';
import { 
  NeoCard, 
  NeoButton, 
  NeoGlass, 
  NeoBadge,
  NeoProgress 
} from '@/components/neo-materialism';


export default function Home() {
  return (
    <main className="relative">
      {/* Neo-Materialism Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="absolute inset-0 bg-mesh opacity-5"></div>
      
      {/* Main Content Container */}
      <div className="neo-container neo-section">
        {/* Hero Section */}
        <section className="text-center mb-24">
          <div className="mb-12">
            <h1 className="neo-heading-1 neo-text-holographic mb-8 neo-animate-fade-in">
              Welcome to{' '}
              <span className="neo-text-glow">
                Revelio
              </span>
            </h1>
          </div>
          
          <p className="neo-text-large text-slate-300 mb-12 max-w-4xl mx-auto neo-animate-slide-up">
            A creator-powered marketplace where writers, artists, and storytellers get paid for impact — 
            blending authentic research with brand partnerships, distributed natively across social platforms.
          </p>
          
        </section>
        
        {/* Key Benefits Section */}
        <section className="mb-24">
          <h2 className="neo-heading-2 neo-text-glow text-center mb-12">
            The{' '}
            <span className="neo-text-holographic">Creator Economy</span>{' '}
            Revolution
          </h2>
          
          <div className="neo-grid-2 neo-spacing-xl max-w-5xl mx-auto">
            <NeoCard variant="elevated" glow className="neo-card-feature neo-animate-slide-up">
              <div className="neo-card-feature-icon">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="neo-heading-3 text-white mb-4">Get Paid for Impact</h3>
              <p className="neo-text-body text-slate-300 mb-6">
                Our revolutionary performance-based system ensures creators get paid based on real engagement and impact, 
                not just follower count. Every platform now offers meaningful payouts.
              </p>
              <NeoButton variant="primary" size="md" glow>
                Start Earning Today
              </NeoButton>
            </NeoCard>
            
            <NeoCard variant="interactive" energy className="neo-card-feature neo-animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="neo-card-feature-icon">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="neo-heading-3 text-white mb-4">Authentic Content</h3>
              <p className="neo-text-body text-slate-300 mb-6">
                Connect with verified experts who create meaningful, research-backed content that 
                actually helps your audience instead of shallow promotional posts.
              </p>
              <NeoButton variant="accent" size="md" energy>
                Advertise requirements
              </NeoButton>
            </NeoCard>
          </div>
        </section>


        {/* Impact Metrics */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="neo-heading-3 neo-text-glow mb-6">
              Making{' '}
              <span className="neo-text-holographic">Real Impact</span>
            </h2>
            <p className="neo-text-large text-slate-300 max-w-2xl mx-auto">
              Our creators are already changing the game with authentic, meaningful content
            </p>
          </div>
          
          <div className="neo-grid-3 neo-spacing-lg max-w-4xl mx-auto">
            <NeoCard variant="glass" className="text-center p-8 neo-animate-fade-in neo-stagger-1">
              <div className="neo-heading-2 neo-text-holographic mb-2">$2.5M+</div>
              <div className="neo-text-body text-slate-300 mb-4">Creator Earnings</div>
              <NeoProgress value={92} color="green" variant="energy" />
            </NeoCard>
            
            <NeoCard variant="glass" className="text-center p-8 neo-animate-fade-in neo-stagger-2">
              <div className="neo-heading-2 neo-text-holographic mb-2">500+</div>
              <div className="neo-text-body text-slate-300 mb-4">Active Creators</div>
              <NeoProgress value={85} color="blue" variant="crystal" />
            </NeoCard>
            
            <NeoCard variant="glass" className="text-center p-8 neo-animate-fade-in neo-stagger-3">
              <div className="neo-heading-2 neo-text-holographic mb-2">98%</div>
              <div className="neo-text-body text-slate-300 mb-4">Satisfaction Rate</div>
              <NeoProgress value={98} color="purple" variant="glow" />
            </NeoCard>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="neo-heading-3 neo-text-glow mb-6">
              How{' '}
              <span className="neo-text-holographic">Revelio</span>{' '}
              Works
            </h2>
            <p className="neo-text-large text-slate-300 max-w-2xl mx-auto">
              Simple, transparent, and designed for real creators making real impact
            </p>
          </div>
          
          <div className="neo-grid-3 neo-spacing-lg max-w-5xl mx-auto">
            <NeoCard variant="glass" className="text-center p-6 neo-animate-fade-in neo-stagger-1">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <h3 className="neo-heading-4 text-white mb-3">Create & Share</h3>
              <p className="neo-text-small text-slate-300">
                Share your expertise through authentic, research-backed content across all your platforms
              </p>
            </NeoCard>
            
            <NeoCard variant="glass" className="text-center p-6 neo-animate-fade-in neo-stagger-2">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <h3 className="neo-heading-4 text-white mb-3">Measure Impact</h3>
              <p className="neo-text-small text-slate-300">
                Our AI tracks real engagement, not just vanity metrics, to measure true audience impact
              </p>
            </NeoCard>
            
            <NeoCard variant="glass" className="text-center p-6 neo-animate-fade-in neo-stagger-3">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <h3 className="neo-heading-4 text-white mb-3">Get Paid</h3>
              <p className="neo-text-small text-slate-300">
                Earn based on actual impact and engagement, with transparent payouts every month
              </p>
            </NeoCard>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <NeoCard variant="elevated" glow className="p-12 max-w-4xl mx-auto">
            <h2 className="neo-heading-2 neo-text-holographic mb-6">
              Ready to{' '}
              <span className="neo-text-glow">Get Started</span>?
            </h2>
            <p className="neo-text-large text-slate-300 mb-8">
              Join the creator economy revolution and start earning based on real impact, not just follower count.
            </p>
            
            {/* User Type Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Creator CTA */}
              <NeoCard variant="interactive" className="p-8 text-center hover:scale-105 transition-transform duration-200">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </div>
                <h3 className="neo-heading-3 text-white mb-3">For Creators</h3>
                <p className="neo-text-body text-slate-300 mb-6">
                  Create authentic content and get paid based on real engagement and impact.
                </p>
                <NeoButton 
                  variant="primary" 
                  size="lg" 
                  glow 
                  className="w-full"
                  onClick={() => window.location.href = '/auth/register?type=creator'}
                >
                  Sign Up as Creator
                </NeoButton>
              </NeoCard>

              {/* Brand CTA */}
              <NeoCard variant="interactive" className="p-8 text-center hover:scale-105 transition-transform duration-200">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="neo-heading-3 text-white mb-3">For Businesses</h3>
                <p className="neo-text-body text-slate-300 mb-6">
                  Connect with verified creators and boost your content with authentic partnerships.
                </p>
                <NeoButton variant="accent" size="lg" energy className="w-full">
                  Sign Up as Business
                </NeoButton>
              </NeoCard>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <NeoBadge variant="success">Free to Start</NeoBadge>
              <NeoBadge variant="info">No Credit Card Required</NeoBadge>
            </div>

            {/* Demo Access */}
            <div className="text-center">
              <p className="neo-text-small text-slate-400 mb-3">
                Want to explore first? Try our demo workspaces
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <NeoButton 
                  variant="ghost" 
                  size="sm"
                  onClick={() => window.location.href = '/auth/login'}
                  className="text-blue-400 hover:text-blue-300"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Creator Demo
                </NeoButton>
                <NeoButton 
                  variant="ghost" 
                  size="sm"
                  onClick={() => window.location.href = '/auth/login'}
                  className="text-purple-400 hover:text-purple-300"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Brand Demo
                </NeoButton>
              </div>
            </div>
          </NeoCard>
        </section>
      </div>
    </main>
  );
}