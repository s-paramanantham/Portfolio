import React from 'react';
import { ArrowUp, Terminal, Linkedin, Github, Mail } from 'lucide-react';
import { useFooterViewModel } from './Footer.vm';

export const Footer: React.FC = () => {
  const { currentYear, socialInfo, scrollToTop } = useFooterViewModel();

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/80 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-600/30 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-bold text-white tracking-tight">PARAMANANTHAM S</p>
            <p className="text-xs text-slate-400">Full Stack Developer &bull; {socialInfo.location}</p>
          </div>
        </div>

        {/* Quick Social Links */}
        <div className="flex items-center gap-4 text-slate-400">
          <a
            href={socialInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-2 hover:text-cyan-400 hover:bg-slate-900 rounded-lg transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={socialInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2 hover:text-cyan-400 hover:bg-slate-900 rounded-lg transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${socialInfo.email}`}
            aria-label="Email"
            className="p-2 hover:text-cyan-400 hover:bg-slate-900 rounded-lg transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Copyright & Scroll to Top */}
        <div className="flex items-center gap-4">
          <p className="text-xs text-slate-500 font-mono">
            &copy; {currentYear} Paramanantham S. All rights reserved.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
