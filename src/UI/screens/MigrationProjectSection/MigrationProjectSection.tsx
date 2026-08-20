import React from 'react';
import {
  Database,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Play,
  RotateCcw,
  KeyRound,
  CalendarClock,
} from 'lucide-react';

import { useMigrationProjectSectionViewModel } from './MigrationProjectSection.vm';
import { Badge } from '../../reusable/base/Badge/Badge';
import { GlassSurface } from '../../reusable/base/GlassSurface/GlassSurface';
import { Button } from '../../reusable/base/Button/Button';
import { AnimatedCounter } from '../../reusable/base/AnimatedCounter/AnimatedCounter';

export const MigrationProjectSection: React.FC = () => {
  const {
    activeStage,
    setActiveStage,
    isSimulatingMigration,
    migrationProgress,
    simulationStatus,
    startSimulation,
  } = useMigrationProjectSectionViewModel();

  return (
    <section
      id="migration"
      aria-label="Enterprise Slack to Teams Migration Platform"
      className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
    >
      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-16 space-y-2.5 sm:space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
          Enterprise Cloud Migration Case Study
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Slack &rarr; Microsoft Teams Migration Platform
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
          Production-grade enterprise migration solution with 200+ Node.js/Express REST APIs, automated inventory discovery, Slack corporate export ingestion, and OneDrive/SharePoint uploads engineered at <strong className="text-white">AVASOFT</strong>.
        </p>
      </div>

      <GlassSurface intensity="high" borderGlow className="p-4 sm:p-6 lg:p-10 space-y-6 sm:space-y-8 w-full overflow-hidden">
        {/* Interactive 3-Stage Pipeline Diagram */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-400 shrink-0" />
              Interactive Data Transformation Pipeline
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={startSimulation}
              disabled={isSimulatingMigration}
              className="w-full sm:w-auto min-h-[44px] justify-center shrink-0"
              leftIcon={
                isSimulatingMigration ? (
                  <RotateCcw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                ) : (
                  <Play className="w-3.5 h-3.5 text-cyan-400" />
                )
              }
            >
              {isSimulatingMigration ? `Simulating (${migrationProgress}%)` : 'Run Pipeline Simulation'}
            </Button>
          </div>

          {/* Progress Bar & Status */}
          <div className="space-y-2 mb-6">
            <div className="w-full bg-slate-950/80 rounded-full h-2.5 border border-slate-800 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-400 h-full transition-all duration-300 rounded-full"
                style={{ width: `${migrationProgress}%` }}
                role="progressbar"
                aria-valuenow={migrationProgress}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-2 truncate pr-2 text-cyan-300 font-medium">
                <span className={`w-2 h-2 rounded-full shrink-0 ${isSimulatingMigration ? 'bg-cyan-400 animate-ping' : 'bg-emerald-400'}`} />
                <span className="truncate">{simulationStatus}</span>
              </span>
              <span className="shrink-0 font-bold text-slate-300">{migrationProgress}%</span>
            </div>
          </div>


          {/* 3 Pipeline Stages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Stage 1: Slack Source */}
            <div
              onClick={() => setActiveStage('source')}
              className={`p-4 sm:p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                activeStage === 'source'
                  ? 'bg-slate-800/80 border-cyan-400 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase text-slate-400">Step 1: Ingestion</span>
                <Badge variant="cyan" size="sm">Slack Enterprise API</Badge>
              </div>
              <h4 className="text-base font-bold text-white">Slack Workspace Ingestion</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Innovated for slow-timing corporate export mode and automated inventory discovery: users, channels, DMs, attachments, threads, and timestamps.
              </p>
            </div>

            {/* Stage 2: Processing Engine */}
            <div
              onClick={() => setActiveStage('processing')}
              className={`p-4 sm:p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                activeStage === 'processing'
                  ? 'bg-slate-800/80 border-indigo-400 shadow-lg shadow-indigo-500/10'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase text-slate-400">Step 2: Engine</span>
                <Badge variant="indigo" size="sm">200+ Node/Express APIs</Badge>
              </div>
              <h4 className="text-base font-bold text-white">Transformation &amp; SQL Staging</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                200+ Node.js &amp; Express APIs normalized user IDs, reformatted Rich Text/Markdown payloads, and staged 2TB+ data in SQL Server via SSMS.
              </p>
            </div>

            {/* Stage 3: MS Teams Destination */}
            <div
              onClick={() => setActiveStage('destination')}
              className={`p-4 sm:p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                activeStage === 'destination'
                  ? 'bg-slate-800/80 border-emerald-400 shadow-lg shadow-emerald-500/10'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase text-slate-400">Step 3: Destination</span>
                <Badge variant="emerald" size="sm">Teams &amp; OneDrive</Badge>
              </div>
              <h4 className="text-base font-bold text-white">Teams Channel &amp; File Ingestion</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Automated Teams channel/chat creation with preserved timestamps and uploaded attachments to OneDrive &amp; SharePoint with 100% data fidelity.
              </p>
            </div>
          </div>
        </div>

        {/* Quantified Metrics Highlight */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-slate-800">
          <div className="p-3 sm:p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-center">
            <span className="text-2xl sm:text-3xl font-mono font-bold text-indigo-400">
              <AnimatedCounter value={200} suffix="+" />
            </span>
            <span className="text-xs text-slate-300 font-semibold mt-1">APIs Developed</span>
            <span className="text-[11px] text-slate-500 mt-0.5">Node.js &amp; Express.js</span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-center">
            <span className="text-2xl sm:text-3xl font-mono font-bold text-cyan-400">
              <AnimatedCounter value={500} suffix="+" />
            </span>
            <span className="text-xs text-slate-300 font-semibold mt-1">Users Supported</span>
            <span className="text-[11px] text-slate-500 mt-0.5">2 US-based organizations</span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-center">
            <span className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400">
              <AnimatedCounter value={100} suffix="K+" />
            </span>
            <span className="text-xs text-slate-300 font-semibold mt-1">Chats Migrated</span>
            <span className="text-[11px] text-slate-500 mt-0.5">Channels &amp; DMs</span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-center">
            <span className="text-2xl sm:text-3xl font-mono font-bold text-amber-400">
              <AnimatedCounter value={2} suffix="TB+" />
            </span>
            <span className="text-xs text-slate-300 font-semibold mt-1">Data Volume</span>
            <span className="text-[11px] text-slate-500 mt-0.5">0 Throttling Incidents</span>
          </div>
        </div>

        {/* Technical Highlights Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-slate-800">
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Super Admin Management &amp; Rate-Limiting
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <KeyRound className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>Client ID &amp; Client Secrets authentication with organization inventory validation.</span>
              </li>
              <li className="flex items-start gap-2">
                <CalendarClock className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>Super Admin portal for scheduling batch migrations and real-time execution monitoring.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>Dynamic sliding-window rate-limiter monitoring Microsoft Graph HTTP 429 Retry-After headers.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-400" />
              Enterprise Full-Stack Technology Stack
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {['React', 'TypeScript', 'Node.js', 'Express.js', 'SQL Server', 'SSMS', 'Microsoft Graph API', 'Slack Enterprise API', 'OneDrive', 'SharePoint', 'Azure'].map((tech) => (
                <Badge key={tech} variant="slate" size="sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </GlassSurface>
    </section>
  );
};

