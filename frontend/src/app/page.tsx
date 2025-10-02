export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated Background - Using Usage Guide System */}
      <div className="absolute inset-0 bg-primary-gradient opacity-90"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-primary-400/20 to-accent-400/20 rounded-full blur-xl float-element"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-accent-400/20 to-primary-400/20 rounded-full blur-2xl float-element" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-br from-primary-300/20 to-accent-300/20 rounded-full blur-lg float-element" style={{animationDelay: '4s'}}></div>
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-block mb-8">
            <h1 className="heading-1 text-gradient animate-fade-in">
              Welcome to{' '}
              <span className="relative">
                Revelio
                <div className="absolute -inset-2 bg-gradient-to-r from-primary-600/20 to-accent-600/20 rounded-2xl blur-lg animate-pulse-slow"></div>
              </span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-white mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up" style={{textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'}}>
            A creator-powered marketplace where writers, artists, and storytellers get paid for impact — 
            blending authentic research with brand partnerships, distributed natively across social platforms.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-scale-in" style={{animationDelay: '0.3s'}}>
            <button className="btn-primary-cta text-lg px-10 py-4">
              Get Started as Creator
            </button>
            <button className="btn-secondary-cta text-lg px-10 py-4">
              Find Creators
            </button>
          </div>
        </div>
        
        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="card-elevated group animate-slide-up" style={{animationDelay: '0.1s'}}>
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto shadow-3d-lg group-hover:shadow-glow-primary transition-all duration-500 transform group-hover:scale-110">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
            <h3 className="heading-6 text-slate-900 mb-4">For Creators</h3>
            <p className="text-slate-600 leading-relaxed">
              Get paid opportunities, expand your audience, and build authority in your niche. 
              Every platform now offers a payout with our revolutionary performance-based system.
            </p>
            <div className="mt-6 flex items-center text-primary-600 font-semibold group-hover:text-accent-600 transition-colors duration-300">
              <span>Learn More</span>
              <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
          
          <div className="card-elevated group animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto shadow-3d-lg group-hover:shadow-glow-accent transition-all duration-500 transform group-hover:scale-110">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <h3 className="heading-6 text-slate-900 mb-4">For Brands</h3>
            <p className="text-slate-600 leading-relaxed">
              Access authentic, expert-level content creators who can make complex topics 
              digestible for social audiences with measurable ROI.
            </p>
            <div className="mt-6 flex items-center text-accent-600 font-semibold group-hover:text-primary-600 transition-colors duration-300">
              <span>Learn More</span>
              <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
          
          <div className="card-elevated group animate-slide-up" style={{animationDelay: '0.3s'}}>
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-3d-lg group-hover:shadow-lg group-hover:shadow-green-500/50 transition-all duration-500 transform group-hover:scale-110">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="heading-6 text-slate-900 mb-4">For Consumers</h3>
            <p className="text-slate-600 leading-relaxed">
              Receive high-quality, trustworthy content instead of shallow ad posts 
              or random influencer takes from verified experts.
            </p>
            <div className="mt-6 flex items-center text-green-600 font-semibold group-hover:text-emerald-600 transition-colors duration-300">
              <span>Learn More</span>
              <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-32 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="card-glass text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">500+</div>
              <div className="text-slate-600">Active Creators</div>
            </div>
            <div className="card-glass text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">$2.5M+</div>
              <div className="text-slate-600">Creator Earnings</div>
            </div>
            <div className="card-glass text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">50M+</div>
              <div className="text-slate-600">Content Views</div>
            </div>
            <div className="card-glass text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">98%</div>
              <div className="text-slate-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
