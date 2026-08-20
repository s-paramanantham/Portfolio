import React from 'react';
import {
  Database,
  Cpu,
  Sparkles,
  Radio,
  Cloud,
  Shield,
  Zap,
  Boxes,
} from 'lucide-react';

interface TechItem {
  readonly name: string;
  readonly category: string;
  readonly icon: React.ReactNode;
  readonly color: string;
}

const ReactLogo: React.FC = () => (
  <svg viewBox="0 0 115.3 100" className="w-4 h-4 text-cyan-400 fill-current">
    <ellipse cx="57.65" cy="50" rx="16.5" ry="46" transform="rotate(30 57.65 50)" fill="none" stroke="currentColor" strokeWidth="6" />
    <ellipse cx="57.65" cy="50" rx="16.5" ry="46" transform="rotate(90 57.65 50)" fill="none" stroke="currentColor" strokeWidth="6" />
    <ellipse cx="57.65" cy="50" rx="16.5" ry="46" transform="rotate(150 57.65 50)" fill="none" stroke="currentColor" strokeWidth="6" />
    <circle cx="57.65" cy="50" r="8" />
  </svg>
);

const TypeScriptLogo: React.FC = () => (
  <svg viewBox="0 0 32 32" className="w-4 h-4 rounded-sm">
    <rect width="32" height="32" fill="#3178C6" rx="4" />
    <path d="M18.8 19.4c.5.8 1.2 1.4 2.2 1.4 1 0 1.5-.5 1.5-1.1 0-1.7-5-1.5-5-5.2 0-2.4 1.8-3.9 4.3-3.9 1.6 0 2.8.6 3.6 1.8l-1.9 1.2c-.4-.6-1-1-1.7-1-.8 0-1.3.4-1.3 1 0 1.5 5 1.4 5 5.1 0 2.5-1.9 4.1-4.6 4.1-2 0-3.5-.8-4.4-2.3l2.3-1.1zm-8.8-8.4h9.8v2.3h-3.6v9.4H13.6v-9.4H10V11z" fill="#fff" />
  </svg>
);

const PythonLogo: React.FC = () => (
  <svg viewBox="0 0 110 110" className="w-4 h-4">
    <path d="M54.2 3.6C30.2 3.6 31.7 14 31.7 14l.03 10.8h23.1v3.3H22.3s-14.7-1.7-14.7 22.3 12.8 23.2 12.8 23.2h7.7v-10.9s-.4-12.8 12.6-12.8h21.4s12.2.2 12.2-11.8V15.7s1.8-12.1-20.1-12.1zm-12.4 7.2a3.8 3.8 0 1 1 0 7.6 3.8 3.8 0 0 1 0-7.6z" fill="#387EB8" />
    <path d="M55.8 106.4c24 0 22.5-10.4 22.5-10.4l-.03-10.8H55.2v-3.3h32.5s14.7 1.7 14.7-22.3-12.8-23.2-12.8-23.2h-7.7v10.9s.4 12.8-12.6 12.8H47.9s-12.2-.2-12.2 11.8v22.2s-1.8 12.1 20.1 12.1zm12.4-7.2a3.8 3.8 0 1 1 0-7.6 3.8 3.8 0 0 1 0 7.6z" fill="#FFE052" />
  </svg>
);

const NodeLogo: React.FC = () => (
  <svg viewBox="0 0 32 32" className="w-4 h-4">
    <path d="M16 2l13.5 7.8v15.6L16 33.2 2.5 25.4V9.8L16 2z" fill="#5FA04E" />
    <path d="M16 4.3L4.5 11v13.4L16 31.1l11.5-6.7V11L16 4.3z" fill="#333" />
  </svg>
);

const TECH_ITEMS: readonly TechItem[] = [

  { name: 'Node.js', category: 'Backend Runtime', icon: <NodeLogo />, color: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300' },
  { name: 'Express.js', category: 'REST APIs (200+)', icon: <Zap className="w-4 h-4 text-emerald-400" />, color: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300' },
  { name: 'TypeScript', category: 'Type Safety', icon: <TypeScriptLogo />, color: 'border-blue-500/30 bg-blue-950/20 text-blue-300' },
  { name: 'Python', category: 'Backend Engine', icon: <PythonLogo />, color: 'border-amber-500/30 bg-amber-950/20 text-amber-300' },
  { name: 'FastAPI', category: 'High-Perf Async', icon: <Zap className="w-4 h-4 text-teal-400" />, color: 'border-teal-500/30 bg-teal-950/20 text-teal-300' },
  { name: 'SQL Server (SSMS)', category: 'Enterprise DB', icon: <Database className="w-4 h-4 text-indigo-400" />, color: 'border-indigo-500/30 bg-indigo-950/20 text-indigo-300' },
  { name: 'PostgreSQL', category: 'Relational DB', icon: <Database className="w-4 h-4 text-cyan-400" />, color: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-300' },
  { name: 'React', category: 'UI (300+ Screens)', icon: <ReactLogo />, color: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-300' },
  { name: 'Tailwind CSS', category: 'Responsive Design', icon: <Sparkles className="w-4 h-4 text-cyan-400" />, color: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-300' },
  { name: 'AWS Bedrock', category: 'Generative AI', icon: <Sparkles className="w-4 h-4 text-purple-400" />, color: 'border-purple-500/30 bg-purple-950/20 text-purple-300' },
  { name: 'AWS Cognito', category: '3-Role RBAC', icon: <Shield className="w-4 h-4 text-purple-400" />, color: 'border-purple-500/30 bg-purple-950/20 text-purple-300' },
  { name: 'WebSockets', category: 'Real-Time Sync', icon: <Radio className="w-4 h-4 text-amber-400" />, color: 'border-amber-500/30 bg-amber-950/20 text-amber-300' },
  { name: 'Server-Sent Events (SSE)', category: 'Live Telemetry', icon: <Radio className="w-4 h-4 text-emerald-400" />, color: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300' },
  { name: 'Microsoft Graph API', category: 'Cloud Collaboration', icon: <Cloud className="w-4 h-4 text-blue-400" />, color: 'border-blue-500/30 bg-blue-950/20 text-blue-300' },
  { name: 'Slack Enterprise API', category: 'Migration Discovery', icon: <Boxes className="w-4 h-4 text-pink-400" />, color: 'border-pink-500/30 bg-pink-950/20 text-pink-300' },
  { name: 'Docker', category: 'Containers', icon: <Cpu className="w-4 h-4 text-blue-400" />, color: 'border-blue-500/30 bg-blue-950/20 text-blue-300' },
];


export const TechMarquee: React.FC = () => {
  // Duplicate list to achieve continuous seamless marquee loop
  const marqueeItems = [...TECH_ITEMS, ...TECH_ITEMS];

  return (
    <div
      aria-label="Running Core Technologies"
      className="relative w-full overflow-hidden py-4 sm:py-6 border-y border-slate-800/80 bg-slate-950/40 backdrop-blur-sm"
    >
      {/* Left/Right Vignette Gradient Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#030712] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#030712] to-transparent z-10 pointer-events-none" />

      {/* Infinite Horizontal Running Marquee */}
      <div className="animate-marquee flex items-center gap-3 sm:gap-4 select-none">
        {marqueeItems.map((tech, idx) => (
          <div
            key={`${tech.name}-${idx}`}
            className={`flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-xl border backdrop-blur-md transition-all hover:scale-105 ${tech.color}`}
          >
            <span className="shrink-0">{tech.icon}</span>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-bold text-white tracking-tight whitespace-nowrap">
                {tech.name}
              </span>
              <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">
                {tech.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
