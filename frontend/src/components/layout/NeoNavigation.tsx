'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  NeoButton, 
  NeoGlass, 
  NeoBadge 
} from '@/components/neo-materialism';

export default function NeoNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="neo-nav-primary sticky top-0 z-50">
      <div className="flex items-center h-16">
        {/* Logo - Extreme Left */}
        <Link href="/" className="flex items-center space-x-3 flex-shrink-0 pl-4 sm:pl-6 lg:pl-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">R</span>
          </div>
          <span className="neo-heading-4 neo-text-holographic">Revelio</span>
        </Link>

        {/* Center Navigation */}
        <div className="hidden md:flex items-center justify-center flex-1 space-x-1 mx-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive(item.href)
                  ? 'neo-nav-link-active'
                  : 'neo-nav-link'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions - Extreme Right */}
        <div className="hidden md:flex items-center space-x-4 flex-shrink-0 pr-4 sm:pr-6 lg:pr-8">
          <Link href="/auth/login">
            <NeoButton variant="ghost" size="sm">
              Sign In
            </NeoButton>
          </Link>
          <Link href="/auth/register">
            <NeoButton variant="primary" size="sm" glow>
              Get Started
            </NeoButton>
          </Link>
        </div>

        {/* Mobile Menu Button - Extreme Right */}
        <button
          className="md:hidden p-2 text-slate-300 hover:text-white transition-colors duration-200 flex-shrink-0 ml-auto mr-4 sm:mr-6 lg:mr-8"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 px-4 sm:px-6 lg:px-8">
          <NeoGlass variant="dark" className="p-4 rounded-2xl">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-slate-600/50 space-y-2">
                <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <NeoButton variant="ghost" size="sm" fullWidth>
                    Sign In
                  </NeoButton>
                </Link>
                <Link href="/auth/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <NeoButton variant="primary" size="sm" fullWidth>
                    Get Started
                  </NeoButton>
                </Link>
              </div>
            </div>
          </NeoGlass>
        </div>
      )}
    </nav>
  );
}
