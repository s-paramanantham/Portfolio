import React from 'react';
import {
  Activity,
  Cpu,
  Layers,
  Sparkles,
  Radio,
  Dna,
  UserCheck,
  Stethoscope,
  Building,
  CheckCircle2,
} from 'lucide-react';

import { useGenomicsProjectSectionViewModel } from './GenomicsProjectSection.vm';
import { PortfolioServiceInterface } from '../../../services/PortfolioService/PortfolioService.interface';
import { Badge } from '../../reusable/base/Badge/Badge';
import { GlassSurface } from '../../reusable/base/GlassSurface/GlassSurface';
import { Button } from '../../reusable/base/Button/Button';
import { AnimatedCounter } from '../../reusable/base/AnimatedCounter/AnimatedCounter';

export interface GenomicsProjectSectionProps {
  readonly portfolioService?: PortfolioServiceInterface;
}

export const GenomicsProjectSection: React.FC<GenomicsProjectSectionProps> = ({
  portfolioService,
}) => {
  const {
    activeTab,
    telemetry,
    isStreamingActive,
    displayedLogs,
    setActiveTab,
    toggleStreaming,
  } = useGenomicsProjectSectionViewModel({ portfolioService });

  return (
    <section
      id="genomics"
      aria-label="Genomics Healthcare Platform Deep Dive"
      className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
    >
      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-16 space-y-2.5 sm:space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
          Flagship Precision Healthcare Showcase
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Genomics-Based Healthcare Platform
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
          Mission-critical precision medicine platform scaling 100+ modules, 300+ production screens, 3-role portal (Patient, Pharmacist, Admin), and real-time streaming architectures at <strong className="text-white">ZEB</strong>.
        </p>
      </div>

      <GlassSurface intensity="high" borderGlow className="p-4 sm:p-6 lg:p-10 space-y-6 sm:space-y-8 w-full overflow-hidden">
        {/* Navigation Tabs */}
        <div
          role="tablist"
          aria-label="Genomics Project Tabs"
          className="flex items-center gap-1.5 sm:gap-2 border-b border-slate-800 pb-3 sm:pb-4 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth"
        >
          <button
            role="tab"
            aria-selected={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap min-h-[44px] shrink-0 touch-manipulation transition-all ${
              activeTab === 'overview'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-md shadow-cyan-500/10'
                : 'text-slate-400 hover:text-white border border-transparent hover:border-slate-800'
            }`}
          >
            <Dna className="w-4 h-4 shrink-0" />
            <span>3-Role System Architecture</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'streaming'}
            onClick={() => setActiveTab('streaming')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap min-h-[44px] shrink-0 touch-manipulation transition-all ${
              activeTab === 'streaming'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-md shadow-cyan-500/10'
                : 'text-slate-400 hover:text-white border border-transparent hover:border-slate-800'
            }`}
          >
            <Radio className="w-4 h-4 shrink-0" />
            <span>Real-Time Streaming &amp; Telemetry</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'ai'}
            onClick={() => setActiveTab('ai')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap min-h-[44px] shrink-0 touch-manipulation transition-all ${
              activeTab === 'ai'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-md shadow-cyan-500/10'
                : 'text-slate-400 hover:text-white border border-transparent hover:border-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>Generative AI &amp; Cloud (AWS Bedrock)</span>
          </button>
        </div>

        {/* Tab 1: System Overview & 3 Roles */}
        {activeTab === 'overview' && (
          <div className="space-y-6 sm:space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start lg:items-center">
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight leading-snug">
                  Medication Intelligence Driven by Patient Genetics
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Precision medicine platform converting raw sequencing data into real-time clinical decisions. Serves 3 distinct user roles with end-to-end clinical validation, consultation suites, and multi-tenant administration.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-center">
                    <span className="text-lg sm:text-xl font-bold font-mono text-cyan-400">
                      <AnimatedCounter value={100} suffix="+" />
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-slate-400 block mt-0.5">Modules</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-center">
                    <span className="text-lg sm:text-xl font-bold font-mono text-indigo-400">
                      <AnimatedCounter value={300} suffix="+" />
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-slate-400 block mt-0.5">Screens</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-center">
                    <span className="text-lg sm:text-xl font-bold font-mono text-purple-400">
                      <AnimatedCounter value={350} suffix="+" />
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-slate-400 block mt-0.5">APIs Integrated</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-center">
                    <span className="text-lg sm:text-xl font-bold font-mono text-emerald-400">
                      3 Roles
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-slate-400 block mt-0.5">RBAC Roles</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 p-4 sm:p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3.5 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400 uppercase">Interactive Patient Locus</span>
                  <Badge variant="cyan" size="sm">Active</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs gap-2">
                    <span className="text-slate-400 shrink-0">Analyzed Allele:</span>
                    <span className="font-mono text-cyan-300 font-bold truncate max-w-[55%] text-right">{telemetry?.activeAllele ?? 'CYP2D6 *4/*41'}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs gap-2">
                    <span className="text-slate-400 shrink-0">Metabolizer Profile:</span>
                    <span className="font-mono text-indigo-300 font-bold truncate max-w-[55%] text-right">{telemetry?.metabolizerStatus ?? 'Intermediate'}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-slate-300 leading-relaxed">
                    {telemetry?.recommendationSummary ?? 'Recommended dosage reduction with continuous monitoring.'}
                  </div>
                </div>
              </div>
            </div>

            {/* 3 User Roles Feature Architecture */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
              {/* Role 1: Patient Portal */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <Badge variant="cyan" size="sm">Role 1</Badge>
                </div>
                <h4 className="text-sm font-bold text-white">Patient Portal</h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Upload genomic reports &amp; generate personalized action plans.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>AI Drug Checker, Symptom Checker &amp; Guidelines modules.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Genetic test kit ordering, subscriptions, claims &amp; discounts.</span>
                  </li>
                </ul>
              </div>

              {/* Role 2: Pharmacist Suite */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <Badge variant="indigo" size="sm">Role 2</Badge>
                </div>
                <h4 className="text-sm font-bold text-white">Pharmacist Suite</h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                    <span>Clinical pharmacogenomic reviews &amp; dosage adjustment guidance.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                    <span>Integrated patient communication with live video &amp; real-time chat.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                    <span>Drug-drug &amp; drug-gene interaction risk evaluation.</span>
                  </li>
                </ul>
              </div>

              {/* Role 3: Admin & Multi-Tenant */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <Building className="w-4 h-4" />
                  </div>
                  <Badge variant="purple" size="sm">Role 3</Badge>
                </div>
                <h4 className="text-sm font-bold text-white">Admin &amp; Multi-Tenant</h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                    <span>Multi-tenant architecture &amp; organization workspace controls.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                    <span>Pharmacist patient assignment &amp; consultation payout management.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                    <span>HIPAA compliance logs, security audit trails &amp; access control.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Streaming Telemetry */}
        {activeTab === 'streaming' && (
          <div className="space-y-5 sm:space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-400 shrink-0" />
                  Dual-Stream Real-Time Architecture
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Server-Sent Events (SSE) for genomic analysis telemetry &amp; WebSockets for collaborative multi-clinician video/chat consultation rooms.
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={toggleStreaming}
                className="w-full sm:w-auto min-h-[44px] justify-center shrink-0"
                leftIcon={<Radio className={`w-3.5 h-3.5 ${isStreamingActive ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />}
              >
                {isStreamingActive ? 'Pause Live Stream' : 'Resume Live Stream'}
              </Button>
            </div>

            {/* Simulated Live Stream Terminal */}
            <div className="rounded-2xl bg-slate-950 border border-slate-800 p-3 sm:p-4 font-mono text-xs text-slate-300 space-y-1.5 sm:space-y-2 max-h-56 sm:max-h-64 overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between pb-2 border-b border-slate-900 text-slate-500 text-[10px] sm:text-[11px]">
                <span className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isStreamingActive ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
                  <span>{isStreamingActive ? 'LIVE TELEMETRY STREAMING' : 'STREAM PAUSED'}</span>
                </span>
                <span className="text-emerald-400 font-semibold">● 240 FPS TICK</span>
              </div>
              {displayedLogs.map((log, idx) => (
                <div key={idx} className="flex items-start gap-1.5 sm:gap-2 hover:bg-slate-900/40 p-1 rounded text-[11px] sm:text-xs leading-relaxed break-words">
                  <span className="text-slate-600 select-none shrink-0">[{idx + 1}]</span>
                  <span className={log.includes('ALERT') ? 'text-amber-300 font-semibold' : log.includes('BEDROCK') ? 'text-cyan-300' : 'text-slate-300'}>
                    {log}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Generative AI & Cloud */}
        {activeTab === 'ai' && (
          <div className="space-y-5 sm:space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="p-4 sm:p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white">AWS Bedrock Generative AI Assistant</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Synthesizes complex pharmacogenomic research papers and patient histories into plain-language clinician recommendations with sub-second response streaming.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1 sm:pt-2">
                  <Badge variant="purple" size="sm">AWS Bedrock</Badge>
                  <Badge variant="purple" size="sm">LLM Prompting</Badge>
                  <Badge variant="purple" size="sm">Python / FastAPI</Badge>
                </div>
              </div>

              <div className="p-4 sm:p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white">AWS Cognito 3-Role Auth &amp; HIPAA Security</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Enterprise identity management with fine-grained role-based access control across Patients, Pharmacists, and Admins with complete HIPAA audit logging.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1 sm:pt-2">
                  <Badge variant="cyan" size="sm">AWS Cognito</Badge>
                  <Badge variant="cyan" size="sm">HIPAA Ready</Badge>
                  <Badge variant="cyan" size="sm">3-Role RBAC</Badge>
                  <Badge variant="cyan" size="sm">Audit Logs</Badge>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="pt-4 sm:pt-6 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <span className="text-xs font-mono uppercase text-slate-400 flex items-center gap-2 shrink-0">
            <Layers className="w-4 h-4 text-cyan-400" />
            Core Technology Stack
          </span>
          <div className="flex flex-wrap gap-1.5">
            {['React', 'TypeScript', 'Tailwind CSS', 'Python', 'FastAPI', 'PostgreSQL', 'WebSockets', 'SSE', 'AWS Bedrock', 'AWS Cognito', 'HIPAA Logs'].map((tech) => (
              <Badge key={tech} variant="slate" size="sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </GlassSurface>
    </section>
  );
};



