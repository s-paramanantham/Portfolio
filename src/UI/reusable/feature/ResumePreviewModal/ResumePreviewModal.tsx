import React from 'react';
import {
  Download,
  Printer,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  FileText,
  FileCode,
  Briefcase,
  GraduationCap,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Github,
  ExternalLink,
} from 'lucide-react';
import { useResumePreviewModalViewModel } from './ResumePreviewModal.vm';
import { Modal } from '../../base/Modal/Modal';
import { Badge } from '../../base/Badge/Badge';

export interface ResumePreviewModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export const ResumePreviewModal: React.FC<ResumePreviewModalProps> = ({ isOpen, onClose }) => {
  const {
    activeTab,
    zoom,
    pdfUrl,
    pdfFileName,
    socialInfo,
    setActiveTab,
    zoomIn,
    zoomOut,
    resetZoom,
    handlePrint,
  } = useResumePreviewModalViewModel({ isOpen, onClose });

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="4xl">
      <div className="flex flex-col space-y-4">
        {/* Top Control Bar: Format Switcher & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          {/* Format Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950/80 p-1 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar max-w-full shadow-inner">
            <button
              type="button"
              onClick={() => setActiveTab('pdf')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'pdf'
                  ? 'bg-gradient-to-r from-cyan-500/15 to-indigo-500/15 dark:from-cyan-500/20 dark:to-indigo-500/20 text-cyan-800 dark:text-cyan-300 border border-cyan-400/60 dark:border-cyan-500/40 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-transparent'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Official PDF Document</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('formatted')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'formatted'
                  ? 'bg-gradient-to-r from-cyan-500/15 to-indigo-500/15 dark:from-cyan-500/20 dark:to-indigo-500/20 text-cyan-800 dark:text-cyan-300 border border-cyan-400/60 dark:border-cyan-500/40 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-transparent'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Structured Executive Summary</span>
            </button>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap justify-end">
            {/* Zoom Controls (Active in Formatted View) */}
            {activeTab === 'formatted' && (
              <div className="hidden sm:flex items-center gap-1 bg-slate-100 dark:bg-slate-950/80 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs shadow-sm">
                <button
                  type="button"
                  onClick={zoomOut}
                  aria-label="Zoom out"
                  className="p-1 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-[11px] min-w-[36px] text-center">{zoom}%</span>
                <button
                  type="button"
                  onClick={zoomIn}
                  aria-label="Zoom in"
                  className="p-1 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={resetZoom}
                  aria-label="Reset zoom"
                  className="p-1 hover:text-slate-900 dark:hover:text-white transition-colors ml-1"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            )}

            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-300 dark:border-cyan-500/40 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Open in Tab</span>
            </a>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <a
              href={pdfUrl}
              download={pdfFileName}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* Viewport Content Area */}
        <div className="min-h-[55vh] max-h-[72vh] overflow-y-auto custom-scrollbar bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 p-2 sm:p-4">
          {activeTab === 'pdf' && (
            <div className="w-full h-full flex flex-col space-y-3">
              <iframe
                src={`${pdfUrl}#toolbar=1`}
                title="Paramanantham Official Resume PDF"
                className="w-full h-[65vh] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-inner"
              />
            </div>
          )}
          {activeTab === 'formatted' && (
            <div
              className="mx-auto bg-white dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-8 max-w-3xl shadow-xl dark:shadow-2xl space-y-6 transition-transform origin-top"
              style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
            >
              {/* Document Header */}
              <div className="border-b border-slate-200 dark:border-slate-800 pb-5 text-center sm:text-left space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      PARAMANANTHAM S
                    </h1>
                    <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 mt-0.5">
                      Software Engineer &bull; Full Stack Developer
                    </p>
                  </div>
                  <Badge variant="cyan" size="sm">
                    2+ Years Enterprise Experience
                  </Badge>
                </div>

                {/* Contact Bar */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 text-xs text-slate-700 dark:text-slate-300 font-mono">
                  <a
                    href={`mailto:${socialInfo.email}`}
                    className="flex items-center gap-1.5 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>{socialInfo.email}</span>
                  </a>
                  <span className="text-slate-600 hidden sm:inline">&bull;</span>
                  <a
                    href={`tel:${socialInfo.phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{socialInfo.phone}</span>
                  </a>
                  <span className="text-slate-600 hidden sm:inline">&bull;</span>
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{socialInfo.location}</span>
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-400 font-mono">
                  <a
                    href={socialInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-cyan-300 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-[#0077b5]" />
                    <span>linkedin.com/in/s-paramanantham</span>
                  </a>
                  <span className="text-slate-600 hidden sm:inline">&bull;</span>
                  <a
                    href={socialInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-cyan-300 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5 text-white" />
                    <span>github.com/s-paramanantham</span>
                  </a>
                </div>
              </div>

              {/* Professional Summary */}
              <div className="space-y-2">
                <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Professional Summary
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Software Engineer &amp; Full Stack Developer with 2+ years of enterprise experience architecting mission-critical platforms. Proven track record developing 200+ Node.js/Express.js REST APIs with SQL Server data staging, delivering 300+ production React/TypeScript healthcare modules, and executing multi-terabyte enterprise data migrations with zero throttling incidents.
                </p>
              </div>

              {/* Technical Competencies */}
              <div className="space-y-3">
                <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5" />
                  Technical Competencies
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
                    <span className="font-bold text-white block">Backend &amp; APIs</span>
                    <p className="text-slate-400">Node.js, Express.js, Python, FastAPI, RESTful APIs, Microservices</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
                    <span className="font-bold text-white block">Frontend &amp; UI</span>
                    <p className="text-slate-400">React, TypeScript, Tailwind CSS, JavaScript (ES6+), HTML5/CSS3</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
                    <span className="font-bold text-white block">3rd-Party &amp; Real-Time</span>
                    <p className="text-slate-400">LiveKit, EPIC EHR (FHIR), Convesio Pay, Swell, Google/MS Calendar, WebSockets, SSE</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
                    <span className="font-bold text-white block">Databases &amp; Cloud</span>
                    <p className="text-slate-400">SQL Server, PostgreSQL, AWS Bedrock AI, AWS Cognito, Azure</p>
                  </div>
                </div>
              </div>

              {/* Professional Experience */}
              <div className="space-y-4">
                <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" />
                  Work Experience
                </h2>

                {/* Role 1: ZEB */}
                <div className="space-y-2 border-l-2 border-cyan-500/40 pl-3 sm:pl-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        Software Engineer / Full Stack Developer
                      </h3>
                      <p className="text-xs font-semibold text-cyan-300">ZEB (Sister Company of AVASOFT)</p>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">May 2026 – August 2026</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 leading-relaxed">
                    <li>Engineered genomics-based healthcare platform with 100+ application modules and 300+ production screens.</li>
                    <li>Integrated 3rd-party platforms: Convesio Pay (payments &amp; claims), Swell (test kit eCommerce), LiveKit (HD video consultations), Google &amp; Microsoft Calendar (auto scheduling), and EPIC EHR (clinical records).</li>
                    <li>Developed 3-role portal (Patient, Pharmacist, Admin) with live video/chat consultations and test kit workflows.</li>
                    <li>Integrated real-time WebSockets and SSE streaming for live clinician collaboration and genomic telemetry.</li>
                    <li>Integrated AWS Bedrock generative AI assistant workflows with Python/FastAPI backend and AWS Cognito auth.</li>
                  </ul>
                </div>

                {/* Role 2: AVASOFT Migration Engineer */}
                <div className="space-y-2 border-l-2 border-indigo-500/40 pl-3 sm:pl-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        Migration Engineer (Software Engineer)
                      </h3>
                      <p className="text-xs font-semibold text-indigo-300">AVASOFT</p>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">March 2025 – March 2026</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 leading-relaxed">
                    <li>Developed 200+ REST APIs using Node.js, Express.js, TypeScript, and SQL Server (SSMS) for Slack to Teams migration.</li>
                    <li>Engineered automated inventory discovery and corporate export ingestion using Slack Enterprise APIs.</li>
                    <li>Automated Microsoft Teams channel creation, message attribution, and OneDrive/SharePoint asset synchronization.</li>
                    <li>Migrated 500+ users, 100K+ messages, and 2TB+ enterprise data with zero throttling incidents.</li>
                  </ul>
                </div>

                {/* Role 3: AVASOFT Trainee */}
                <div className="space-y-2 border-l-2 border-slate-700 pl-3 sm:pl-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white">Trainee Engineer</h3>
                      <p className="text-xs font-semibold text-slate-400">AVASOFT</p>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">Sept 2024 – Feb 2025</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 leading-relaxed">
                    <li>Full-stack intensive training in React, TypeScript, Node.js, Express.js, and SQL databases.</li>
                    <li>Developed reusable UI component libraries and participated in agile team sprints with Git workflows.</li>
                  </ul>
                </div>
              </div>

              {/* Education */}
              <div className="space-y-2">
                <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" />
                  Education
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs">
                  <div>
                    <span className="font-bold text-white">Bachelor of Science (B.Sc.) in Computer Science</span>
                    <p className="text-slate-600 dark:text-slate-400">Government Arts &amp; Science College, Kadayanallur</p>
                  </div>
                  <div className="text-[11px] font-mono text-cyan-700 dark:text-cyan-300 font-semibold mt-1 sm:mt-0">
                    Graduated with Distinction (84%) &bull; 2020 – 2023
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
