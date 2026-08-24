import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Linkedin,
  Github,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { ContactServiceInterface } from '../../../services/ContactService/ContactService.interface';
import { useContactSectionViewModel } from './ContactSection.vm';
import { Input } from '../../reusable/base/Input/Input';
import { Textarea } from '../../reusable/base/Textarea/Textarea';
import { Button } from '../../reusable/base/Button/Button';
import { GlassSurface } from '../../reusable/base/GlassSurface/GlassSurface';

export interface ContactSectionProps {
  readonly contactService?: ContactServiceInterface;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ contactService }) => {
  const {
    formData,
    errors,
    isSubmitting,
    isSuccess,
    statusMessage,
    socialInfo,
    handleFieldChange,
    handleSubmit,
    resetForm,
  } = useContactSectionViewModel({ contactService });

  return (
    <section
      id="contact"
      aria-label="Contact and Communication Gateway"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Cinematic Call to Action Headline */}
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-300 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider">
          Let&apos;s Build Together
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          Have something worth building?{' '}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-indigo-600 to-emerald-600 dark:from-cyan-400 dark:via-indigo-400 dark:to-emerald-400">
            Let&apos;s build it.
          </span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Open for software engineering opportunities, enterprise product development, and technical collaboration.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Direct Communication Channels */}
        <div className="lg:col-span-5 space-y-6">
          <GlassSurface intensity="high" borderGlow className="p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              Direct Channels
            </h3>

            <div className="space-y-4 text-sm">
              {/* Primary Email */}
              <a
                href={`mailto:${socialInfo.email}`}
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 hover:border-cyan-400 dark:hover:border-cyan-500/40 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all group shadow-sm dark:shadow-none"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase">Primary Email</span>
                  <span className="font-semibold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                    {socialInfo.email}
                  </span>
                </div>
              </a>

              {/* Alternative Email */}
              <a
                href={`mailto:${socialInfo.alternativeEmail}`}
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 hover:border-indigo-400 dark:hover:border-indigo-500/40 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all group shadow-sm dark:shadow-none"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase">Alternative Email</span>
                  <span className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                    {socialInfo.alternativeEmail}
                  </span>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:${socialInfo.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 hover:border-emerald-400 dark:hover:border-emerald-500/40 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all group shadow-sm dark:shadow-none"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase">Direct Phone</span>
                  <span className="font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors font-mono">
                    {socialInfo.phone}
                  </span>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 shadow-sm dark:shadow-none">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase">Location</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{socialInfo.location}</span>
                </div>
              </div>
            </div>

            {/* Social Profile Links */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <a
                href={socialInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 hover:bg-[#0077b5]/15 dark:bg-slate-800/70 dark:hover:bg-[#0077b5]/20 border border-slate-200 hover:border-[#0077b5]/50 dark:border-slate-700 dark:hover:border-[#0077b5]/50 text-slate-700 dark:text-slate-300 hover:text-[#0077b5] dark:hover:text-white transition-all text-xs font-semibold shadow-sm"
              >
                <Linkedin className="w-4 h-4 text-[#0077b5]" />
                LinkedIn
              </a>

              <a
                href={socialInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/70 dark:hover:bg-slate-700 border border-slate-200 hover:border-slate-400 dark:border-slate-700 dark:hover:border-slate-500 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all text-xs font-semibold shadow-sm"
              >
                <Github className="w-4 h-4 text-slate-900 dark:text-white" />
                GitHub
              </a>
            </div>
          </GlassSurface>
        </div>

        {/* Right Column: Direct Message Form */}
        <div className="lg:col-span-7">
          <GlassSurface intensity="high" borderGlow className="p-6 sm:p-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
              Send a Direct Message
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
              Have an opening or project discussion? Leave your details below.
            </p>

            {isSuccess ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-md shadow-emerald-500/10">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">Message Sent Successfully!</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">{statusMessage}</p>
                <Button variant="outline" size="sm" onClick={resetForm} className="mt-4">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    id="contact-name"
                    label="Your Name"
                    placeholder="e.g. Sarah Connor"
                    value={formData.name}
                    error={errors.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    disabled={isSubmitting}
                    required
                  />

                  <Input
                    id="contact-email"
                    label="Your Email"
                    type="email"
                    placeholder="sarah@example.com"
                    value={formData.email}
                    error={errors.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    disabled={isSubmitting}
                    required
                  />
                </div>

                <Input
                  id="contact-subject"
                  label="Subject"
                  placeholder="Full Stack Opportunity / Engineering Discussion"
                  value={formData.subject}
                  error={errors.subject}
                  onChange={(e) => handleFieldChange('subject', e.target.value)}
                  disabled={isSubmitting}
                  required
                />

                <Textarea
                  id="contact-message"
                  label="Message"
                  placeholder="Describe the opportunity, technical requirements, or inquiry..."
                  value={formData.message}
                  error={errors.message}
                  onChange={(e) => handleFieldChange('message', e.target.value)}
                  disabled={isSubmitting}
                  required
                />

                {statusMessage && !isSuccess && (
                  <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-500/40 text-xs text-red-700 dark:text-red-300">
                    {statusMessage}
                  </div>
                )}

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    isLoading={isSubmitting}
                    rightIcon={<Send className="w-4 h-4" />}
                  >
                    {isSubmitting ? 'Transmitting Message...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            )}
          </GlassSurface>
        </div>
      </div>
    </section>
  );
};
