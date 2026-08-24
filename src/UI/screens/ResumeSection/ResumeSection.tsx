import React from 'react';
import {
  FileText,
  Download,
  CheckCircle2,
  Eye,
  Award,
  Sparkles,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { useResumeSectionViewModel } from './ResumeSection.vm';
import { GlassSurface } from '../../reusable/base/GlassSurface/GlassSurface';
import { Badge } from '../../reusable/base/Badge/Badge';
import { ResumePreviewModal } from '../../reusable/feature/ResumePreviewModal/ResumePreviewModal';

export const ResumeSection: React.FC = () => {
  const {
    resumeUrl,
    resumeFileName,
    highlights,
    coreCompetencies,
    isPreviewOpen,
    openPreview,
    closePreview,
  } = useResumeSectionViewModel();

  return (
    <section
      id="resume"
      aria-label="Curriculum Vitae and Resume Download"
      className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
    >
      <GlassSurface intensity="high" borderGlow className="p-6 sm:p-10 lg:p-12 relative overflow-hidden">
        {/* Ambient Decorative Lighting */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Narrative & Action */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <Badge variant="cyan" size="md" icon={<FileText className="w-3.5 h-3.5" />}>
                Curriculum Vitae &bull; Enterprise Profile
              </Badge>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Download Verified Engineering Resume
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Comprehensive overview of production experience across <strong className="text-cyan-600 dark:text-cyan-300 font-semibold">Node.js / Express</strong>, <strong className="text-amber-600 dark:text-amber-300 font-semibold">Python / FastAPI</strong>, <strong className="text-cyan-600 dark:text-cyan-300 font-semibold">React / TypeScript</strong>, 3rd-party integrations (<strong className="text-emerald-600 dark:text-emerald-300 font-semibold">LiveKit, EPIC EHR, Convesio Pay, Swell</strong>), and enterprise cloud migrations at <strong className="text-slate-900 dark:text-white">ZEB</strong> and <strong className="text-slate-900 dark:text-white">AVASOFT</strong>.
            </p>

            {/* Core Competencies Badges */}
            <div className="space-y-2.5">
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Core Verified Competencies
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {coreCompetencies.map((comp) => (
                  <Badge
                    key={comp}
                    variant="slate"
                    size="sm"
                    icon={<CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />}
                  >
                    {comp}
                  </Badge>
                ))}
              </div>
            </div>


            {/* Download CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href={resumeUrl}
                download={resumeFileName}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-indigo-700 hover:from-cyan-400 hover:to-indigo-600 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 min-h-[48px]"
              >
                <Download className="w-4 h-4" />
                <span>Download Official Resume (PDF)</span>
              </a>

              <button
                type="button"
                onClick={openPreview}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm text-cyan-800 dark:text-cyan-300 hover:text-slate-900 dark:hover:text-white bg-cyan-50 dark:bg-cyan-950/40 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 border border-cyan-300 dark:border-cyan-500/40 hover:border-cyan-400 transition-all outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 min-h-[48px] cursor-pointer"
              >
                <Eye className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Preview Resume (PDF)</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Highlights Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/90 p-5 sm:p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                  <Award className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>Production Credentials</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  VERIFIED
                </span>
              </div>

              {/* Highlight Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {highlights.map((item) => (
                  <div
                    key={item.title}
                    className="p-3.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/60 space-y-1 hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-sm dark:shadow-none"
                  >
                    <div className="text-base font-extrabold font-mono text-cyan-600 dark:text-cyan-400">
                      {item.value}
                    </div>
                    <div className="text-xs font-semibold text-slate-900 dark:text-white">{item.title}</div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">{item.description}</p>
                  </div>
                ))}
              </div>

              {/* Bottom Quick Contact Prompt */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-900 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                  Available for full-time opportunities
                </span>
                <a
                  href="#contact"
                  className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-semibold flex items-center gap-1 transition-colors"
                >
                  Contact <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </GlassSurface>

      {/* Resume Document Preview Modal supporting DOCX and PDF */}
      <ResumePreviewModal isOpen={isPreviewOpen} onClose={closePreview} />
    </section>
  );
};
