import React from 'react';
import { Menu, X, Terminal, ArrowUpRight } from 'lucide-react';
import { useNavigationBarViewModel } from './NavigationBar.vm';
import { PortfolioServiceInterface } from '../../../../services/PortfolioService/PortfolioService.interface';
import { ThemeToggle } from '../../base/ThemeToggle/ThemeToggle';

export interface NavigationBarProps {
  readonly portfolioService?: PortfolioServiceInterface;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ portfolioService }) => {
  const {
    activeSection,
    isScrolled,
    isMobileMenuOpen,
    navItems,
    toggleMobileMenu,
    closeMobileMenu,
    handleNavClick,
  } = useNavigationBarViewModel({ portfolioService });

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-lg dark:shadow-2xl dark:shadow-cyan-950/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Signature */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home', 'home');
            }}
            className="flex items-center gap-2.5 group outline-none focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded-lg p-1"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-600/30 border border-cyan-500/30 dark:border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:border-cyan-400/60 group-hover:scale-105 transition-all">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                PARAMANANTHAM S
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 tracking-wider">
                SOFTWARE ENGINEER &bull; FULL STACK
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md p-1.5 rounded-full border border-slate-200 dark:border-slate-800/80 shadow-inner"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.sectionId;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href, item.sectionId);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 outline-none focus:outline-none focus:ring-0 focus-visible:ring-1 focus-visible:ring-cyan-400 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/15 to-indigo-500/15 dark:from-cyan-500/20 dark:to-indigo-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-400/50 dark:border-cyan-500/40 shadow-sm shadow-cyan-500/10 font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop Action CTA & Theme Toggle */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact', 'contact');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all outline-none focus:outline-none focus:ring-0 focus-visible:ring-1 focus-visible:ring-cyan-400 active:scale-95"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Right Controls: Theme Toggle + Hamburger Menu */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />

            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 outline-none focus:outline-none focus:ring-0 focus-visible:ring-1 focus-visible:ring-cyan-400"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-label="Mobile Navigation Menu"
          className="md:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-fadeIn shadow-2xl"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.sectionId;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href, item.sectionId);
                }}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-400/50 dark:border-cyan-500/30 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <div className="pt-3">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact', 'contact');
                closeMobileMenu();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-semibold shadow-lg shadow-cyan-500/20"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
