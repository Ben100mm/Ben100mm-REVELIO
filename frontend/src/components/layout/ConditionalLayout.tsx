'use client';

import { usePathname } from 'next/navigation';
import NeoNavigation from './NeoNavigation';
import NeoFooter from './NeoFooter';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  
  // Define dashboard paths where we want to hide the global header and footer
  const isDashboardPage = pathname?.startsWith('/creator/dashboard') || 
                         pathname?.startsWith('/brand/dashboard') ||
                         pathname?.startsWith('/creator/onboarding') ||
                         pathname?.startsWith('/creator/setup') ||
                         pathname?.startsWith('/creator/verification') ||
                         pathname?.startsWith('/creator/workspace-selection') ||
                         pathname?.startsWith('/brand/onboarding') ||
                         pathname?.startsWith('/brand/setup') ||
                         pathname?.startsWith('/brand/workspace-type');

  if (isDashboardPage) {
    // For dashboard pages, render only the children without global header/footer
    return <>{children}</>;
  }

  // For all other pages, render with global header and footer
  return (
    <div className="min-h-screen flex flex-col">
      <NeoNavigation />
      <main className="flex-1">
        {children}
      </main>
      <NeoFooter />
    </div>
  );
}
