import { PortfolioServiceInterface } from './PortfolioService.interface';
import { ProjectBo } from './bo/Project.bo';
import { CareerMilestoneBo } from './bo/CareerJourney.bo';
import { ScaleMetricBo } from './bo/ScaleMetric.bo';
import { CapabilityCategoryBo } from './bo/Capability.bo';
import { ExperienceIntroBo } from './bo/ExperienceIntro.bo';
import { AboutDetailsBo } from './bo/Education.bo';
import { GenomicsTelemetryBo } from './bo/GenomicsTelemetry.bo';
import { NavigationItemBo } from './bo/Navigation.bo';

export class MockPortfolioService implements PortfolioServiceInterface {
  private readonly mockProjects: readonly ProjectBo[] = [
    {
      id: 'genomics-healthcare-platform',
      title: 'Genomics-Based Healthcare Platform',
      category: 'Genomics & Healthcare',
      subtitle: 'Precision Medicine, 3-Role Clinical Intelligence & HIPAA-Compliant Platform',
      summary:
        'Large-scale enterprise precision medicine system serving Patients, Pharmacists, and Admins across 100+ modules and 300+ production screens. Features genomic report analysis, AI-driven drug/symptom/guideline checkers, LiveKit HD video consultations, Swell eCommerce & Convesio Pay kit ordering, Google & Microsoft Calendar scheduling, EPIC EHR health records integration, and multi-tenant admin management with Python/FastAPI backend and React frontend.',
      description: [
        'Engineered 300+ production screens and 100+ modules using React, TypeScript, and Tailwind CSS with strict React MVVM architecture.',
        'Implemented 3-role portal: Patients (upload genomic reports, generate action plans, AI drug/symptom/guideline checkers, order test kits via Swell & Convesio Pay, subscriptions, claims & coupons), Pharmacists (clinical reviews, LiveKit HD video & chat consultations, pharmacogenomic alerts, EPIC EHR integration), and Admins (multi-tenant management, pharmacist assignments, payouts, HIPAA audit logs).',
        'Integrated 3rd-party ecosystems: Convesio Pay for secure healthcare payments & claims, Swell for headless test kit eCommerce, LiveKit for WebRTC audio/video consultations, Google & Microsoft Calendar for automated consultation scheduling, and EPIC EHR for clinical health records synchronization.',
        'Integrated dual-stream real-time communications: WebSockets for live video/chat consultations & clinician collaboration, and SSE for real-time genomic sequence analysis telemetry.',
        'Integrated AWS Bedrock generative AI assistants with Python/FastAPI async streaming and AWS Cognito 3-role authentication.',
        'Contributed to PostgreSQL database schema design, indexing, query optimization, and validated/debugged backend Python/FastAPI business logic.',
      ],
      technologies: [
        'React',
        'TypeScript',
        'Tailwind CSS',
        'LiveKit',
        'EPIC EHR',
        'Convesio Pay',
        'Swell',
        'Google & Microsoft Calendar',
        'Python',
        'FastAPI',
        'PostgreSQL',
        'WebSockets',
        'SSE',
        'AWS Cognito',
        'AWS Bedrock',
        'HIPAA Logs',
      ],
      metrics: [
        { label: 'Application Modules', value: '100+' },
        { label: 'Production Screens', value: '300+' },
        { label: 'APIs Integrated', value: '350+' },
        { label: 'User Roles Supported', value: '3 Roles' },
      ],
      keyHighlights: [
        'Patient portal with AI Drug, Symptom & Clinical Guidelines checkers',
        'Pharmacist consultation suite with LiveKit HD video & chat and EPIC EHR charting',
        'Convesio Pay & Swell seamless test kit checkout and subscription billing',
        'Google & Microsoft Calendar bi-directional appointment scheduling',
        'Admin multi-tenant management, pharmacist allocation & HIPAA audit logging',
        'Dual-stream WebSockets & SSE with AWS Bedrock AI and Python/FastAPI',
      ],
      integrations: [
        'Convesio Pay',
        'Swell',
        'LiveKit',
        'Google & Microsoft Calendar',
        'EPIC EHR',
        'AWS Bedrock',
        'AWS Cognito',
        'PostgreSQL',
        'WebSockets',
        'SSE',
        'HIPAA Logs',
      ],
      isFeatured: true,
      badgeText: 'Flagship Healthcare System',
    },
    {
      id: 'slack-teams-migration-platform',
      title: 'Slack → Microsoft Teams Migration Platform',
      category: 'Enterprise Migration',
      subtitle: 'Production-Ready Enterprise Collaboration & Cloud Storage Migration',
      summary:
        'Enterprise migration application moving 500+ users, 100K+ chats, attachments, and channels across 2 US organizations with 2TB+ data volume, 200+ Node.js/Express APIs, and zero throttling incidents.',
      description: [
        'Developed 200+ Node.js, Express.js, and TypeScript REST APIs with SQL Server (SSMS) data staging and transaction integrity.',
        'Integrated Slack Enterprise API with an innovative extraction solution for slow-timing corporate export mode and full workspace inventory discovery.',
        'Automated Microsoft Teams channel creation, chat history mapping with preserved timestamps/user attribution, and file uploads to OneDrive and SharePoint.',
        'Built Super Admin management portal supporting Client ID & Secrets authentication, batch migration scheduling, and live telemetry.',
        'Eliminated API throttling with an adaptive sliding-window rate-limiter managing Microsoft Graph HTTP 429 Retry-After headers.',
      ],
      technologies: [
        'React',
        'TypeScript',
        'Tailwind CSS',
        'Node.js',
        'Express.js',
        'SQL Server',
        'SSMS',
        'Microsoft Graph API',
        'Slack Enterprise API',
        'Azure',
        'OneDrive',
        'SharePoint',
      ],
      metrics: [
        { label: 'APIs Developed', value: '200+' },
        { label: 'Users Migrated', value: '500+' },
        { label: 'Chats & Messages', value: '100K+' },
        { label: 'Data Volume', value: '2TB+' },
      ],
      keyHighlights: [
        '200+ Node.js & Express.js REST APIs developed with SQL Server staging',
        'Slack Enterprise API corporate export mode & full inventory discovery',
        'Automated Teams channel creation & OneDrive / SharePoint file ingestion',
        'Super Admin portal with Client ID/Secret auth and scheduled batch migration',
      ],
      integrations: ['Microsoft Graph API', 'Slack Enterprise API', 'SQL Server', 'OneDrive', 'SharePoint', 'Azure'],
      isFeatured: true,
      badgeText: 'Enterprise Migration Suite',
    },
  ];


  private readonly mockCareerJourney: readonly CareerMilestoneBo[] = [
    {
      id: 'zeb-analyst-fullstack',
      company: 'ZEB',
      officialRole: 'Analyst',
      engineeringRole: 'Software Engineer / Full Stack Developer',
      period: 'May 2026 – August 2026',
      duration: '4 mos',
      location: 'Chennai, India',
      isCurrent: true,
      companyDescription:
        'ZEB (sister company of AVASOFT) — Engineering cutting-edge healthcare and genomics products.',
      keyResponsibilities: [
        'Built and scaled large-scale genomics-based healthcare system featuring 100+ modules and 300+ production screens using React, TypeScript, and Tailwind CSS.',
        'Integrated key 3rd-party platforms: Convesio Pay (payments & claims), Swell (test kit eCommerce), LiveKit (HD video consultations), Google & Microsoft Calendar (automated scheduling), and EPIC EHR (clinical health records).',
        'Implemented 3-role portal (Patient, Pharmacist, Admin) covering AI Drug/Symptom/Guidelines checkers, video & chat consultations, test kit ordering, and multi-tenant admin management.',
        'Integrated dual-stream real-time communications using WebSockets for live clinician video/chat collaboration and SSE for live genomic analysis streaming.',
        'Integrated AWS Bedrock generative AI assistant workflows with Python/FastAPI backend and AWS Cognito role-based authentication.',
        'Contributed to PostgreSQL database schema design, query optimization, and validated/debugged backend Python/FastAPI business logic.',
      ],
      technicalOwnership: [
        'Frontend Architecture (300+ screens & 100+ modules)',
        '3rd-Party Integrations (Convesio Pay, Swell, LiveKit, Google/MS Calendar, EPIC EHR)',
        '3-Role Healthcare Portal (Patient, Pharmacist, Admin)',
        'Real-Time Streaming & Consultation (LiveKit, WebSockets & SSE)',
        'Cloud & AI Integrations (AWS Bedrock, Cognito)',
        'PostgreSQL Database Schemas & Python Logic Validation',
      ],
      technologies: [
        'React',
        'TypeScript',
        'Tailwind CSS',
        'LiveKit',
        'EPIC EHR',
        'Convesio Pay',
        'Swell',
        'Google & Microsoft Calendar',
        'Python',
        'FastAPI',
        'PostgreSQL',
        'WebSockets',
        'SSE',
        'AWS Cognito',
        'AWS Bedrock',
        'HIPAA Logs',
      ],
      quantifiedImpact: [
        '100+ application modules engineered',
        '300+ production screens delivered',
        '5 enterprise 3rd-party integrations deployed (Convesio Pay, Swell, LiveKit, Calendar APIs, EPIC EHR)',
        '350+ REST, WebSockets & SSE APIs integrated',
        '3 user roles supported (Patient / Pharmacist / Admin)',
      ],
    },
    {
      id: 'avasoft-migration-engineer',
      company: 'AVASOFT',
      officialRole: 'Migration Engineer',
      engineeringRole: 'Software Engineer (Migration & Backend APIs)',
      period: 'March 2025 – March 2026',
      duration: '1 yr',
      location: 'Chennai, India',
      isCurrent: false,
      companyDescription:
        'AVASOFT — Leading enterprise software and cloud migration solutions provider.',
      keyResponsibilities: [
        'Developed 200+ REST APIs using Node.js, Express.js, TypeScript, and SQL Server (SSMS) for enterprise-scale Slack to Teams migration.',
        'Innovated solution for slow-timing corporate export mode and automated workspace inventory discovery using Slack Enterprise API.',
        'Engineered automated Microsoft Teams channel and chat creation with preserved timestamps/user attribution, and uploaded files to OneDrive and SharePoint.',
        'Built Super Admin management portal with Client ID/Secret authentication, batch migration scheduling, and real-time telemetry.',
        'Migrated 500+ users, 100K+ chats, attachments, and channels across 2 US organizations with 2TB+ data and zero throttling incidents.',
      ],
      technicalOwnership: [
        '200+ Node.js & Express.js REST APIs',
        'Slack Enterprise API & Corporate Export Ingestion',
        'Teams, OneDrive & SharePoint Destination Mapping',
        'Super Admin Portal & Migration Scheduler',
        'SQL Server Data Staging & Rate-Limiter Engine',
      ],
      technologies: [
        'React',
        'TypeScript',
        'Node.js',
        'Express.js',
        'SQL Server',
        'SSMS',
        'Microsoft Graph API',
        'Slack Enterprise API',
        'Azure',
        'OneDrive',
        'SharePoint',
      ],
      quantifiedImpact: [
        '200+ Node.js/Express.js REST APIs developed',
        '500+ enterprise users migrated seamlessly',
        '100K+ chat messages & threads transferred',
        '2TB+ data processed with zero throttling incidents',
      ],
    },
    {
      id: 'avasoft-trainee-engineer',
      company: 'AVASOFT',
      officialRole: 'Trainee Engineer',
      engineeringRole: 'Software Engineer Trainee / Full Stack Trainee',
      period: 'Sept 2024 – Feb 2025',
      duration: '6 mos',
      location: 'Chennai, India',
      isCurrent: false,
      companyDescription:
        'AVASOFT — Accelerated foundational engineering program.',
      keyResponsibilities: [
        'Intensive training and hands-on full-stack development across JavaScript, TypeScript, React, Node.js, and SQL databases.',
        'Developed foundational internal tools and reusable component libraries following clean architecture.',
        'Collaborated on agile development teams practicing automated testing, code reviews, and Git workflows.',
      ],
      technicalOwnership: [
        'Reusable Component Libraries',
        'Client-side State Management',
        'RESTful API Integrations',
      ],
      technologies: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'SQL', 'HTML5/CSS3', 'Git'],
      quantifiedImpact: [
        'Mastered enterprise full-stack development stack',
        'Graduated with top marks to Migration Engineer role',
      ],
    },
  ];

  private readonly mockScaleMetrics: readonly ScaleMetricBo[] = [
    {
      id: 'metric-experience',
      numericValue: 2,
      suffix: '+',
      label: 'Years of Experience',
      description: 'Building enterprise software & mission-critical systems',
      category: 'Development',
      iconName: 'Cpu',
    },
    {
      id: 'metric-screens',
      numericValue: 500,
      suffix: '+',
      label: 'Production Screens',
      description: 'Delivered with React, TypeScript & Tailwind CSS',
      category: 'Development',
      iconName: 'Monitor',
    },
    {
      id: 'metric-modules',
      numericValue: 100,
      suffix: '+',
      label: 'Application Modules',
      description: 'Engineered for genomics healthcare platform',
      category: 'Development',
      iconName: 'Layers',
    },
    {
      id: 'metric-apis-developed',
      numericValue: 200,
      suffix: '+',
      label: 'APIs Developed',
      description: 'Node.js, Express.js, TypeScript & SQL Server / Postgres',
      category: 'Development',
      iconName: 'Server',
    },
    {
      id: 'metric-apis-integrated',
      numericValue: 350,
      suffix: '+',
      label: 'APIs Integrated',
      description: 'REST, WebSockets, SSE & AWS Bedrock / Cognito',
      category: 'Integration',
      iconName: 'Code2',
    },
    {
      id: 'metric-users',
      numericValue: 500,
      suffix: '+',
      label: 'Users Migrated',
      description: 'Zero data loss across 2 US enterprise clients',
      category: 'Migration',
      iconName: 'Users',
    },
    {
      id: 'metric-messages',
      numericValue: 100,
      suffix: 'K+',
      label: 'Chats & Messages Migrated',
      description: 'Transferred with full metadata fidelity',
      category: 'Migration',
      iconName: 'MessageSquare',
    },
    {
      id: 'metric-data',
      numericValue: 2,
      suffix: 'TB+',
      label: 'Enterprise Data Migrated',
      description: 'Files, channels, and message archives',
      category: 'Migration',
      iconName: 'Database',
    },
  ];

  private readonly mockCapabilities: readonly CapabilityCategoryBo[] = [
    {
      id: 'backend',
      title: 'Backend Engineering',
      description: 'High-performance API services, data ingestion pipelines, and RESTful architectures.',
      iconName: 'Server',
      skills: [
        { name: 'Node.js', proficiency: 'Core Production', context: 'Data ingestion workers, ETL pipelines, microservices, batch schedulers', isHighlighted: true },
        { name: 'Express.js', proficiency: 'Core Production', context: '200+ REST APIs developed, middleware, routing, rate limiting, auth', isHighlighted: true },
        { name: 'Python', proficiency: 'Core Production', context: 'FastAPI backend services, clinical logic & AI pipelines', isHighlighted: true },
        { name: 'FastAPI', proficiency: 'Core Production', context: 'High-performance async APIs, Bedrock streaming & REST endpoints', isHighlighted: true },
        { name: 'TypeScript (Backend)', proficiency: 'Core Production', context: 'Type-safe controllers, services, DTOs & BOs, enterprise validation', isHighlighted: true },
        { name: 'RESTful API Design', proficiency: 'Core Production', context: '200+ endpoints developed, 350+ endpoints integrated, OpenAPI specs', isHighlighted: true },
      ],
    },
    {
      id: 'frontend',
      title: 'Frontend Engineering',
      description: 'Modern, performant, and accessible user interfaces built at enterprise scale.',
      iconName: 'Layout',
      skills: [
        { name: 'React', proficiency: 'Core Production', context: '500+ production screens, custom hooks, React MVVM pattern', isHighlighted: true },
        { name: 'TypeScript', proficiency: 'Core Production', context: 'Strict zero-any typing across all models, services, ViewModels', isHighlighted: true },
        { name: 'JavaScript (ES6+)', proficiency: 'Core Production', context: 'Asynchronous patterns, closures, event loop optimization' },
        { name: 'Tailwind CSS', proficiency: 'Core Production', context: 'Design tokens, animations, responsive layouts, mobile-first design', isHighlighted: true },
        { name: 'HTML5 & Semantic Web', proficiency: 'Core Production', context: 'WCAG AA accessibility, ARIA landmarks, SEO optimization' },
        { name: 'CSS3 & Responsive Design', proficiency: 'Core Production', context: 'Mobile-first layouts, animations, flexbox & grid' },
      ],
    },
    {
      id: 'database',
      title: 'Databases & Storage',
      description: 'Relational data modeling, SQL optimization, and large-scale data staging.',
      iconName: 'Database',
      skills: [
        { name: 'SQL Server', proficiency: 'Core Production', context: '2TB+ migration data staging, stored procedures, SSMS indexing', isHighlighted: true },
        { name: 'PostgreSQL', proficiency: 'Core Production', context: 'Healthcare relational schemas, query tuning, indexing', isHighlighted: true },
        { name: 'SSMS', proficiency: 'Core Production', context: 'Database profiling, execution plan analysis, backup orchestration', isHighlighted: true },
        { name: 'Database Migrations', proficiency: 'Advanced', context: 'Zero-downtime schema migrations and transactional rollbacks' },
      ],
    },
    {
      id: 'cloud',
      title: 'Cloud & DevOps',
      description: 'Enterprise cloud infrastructure, security identity, and automated CI/CD.',
      iconName: 'Cloud',
      skills: [
        { name: 'AWS Cognito', proficiency: 'Core Production', context: 'User pools, identity tokens, 3-role RBAC (Patient/Pharmacist/Admin)', isHighlighted: true },
        { name: 'AWS Bedrock', proficiency: 'Core Production', context: 'Generative AI assistant integration for clinician workflows', isHighlighted: true },
        { name: 'Microsoft Azure', proficiency: 'Advanced', context: 'Blob storage, App Services, Graph API enterprise apps' },
        { name: 'Git & GitHub', proficiency: 'Core Production', context: 'Branching strategies, code reviews, automated CI/CD workflows' },
      ],
    },
    {
      id: 'integrations',
      title: '3rd-Party & Healthcare Ecosystems',
      description: 'Production integrations with clinical EHRs, WebRTC video, billing gateways, and enterprise calendars.',
      iconName: 'Code2',
      skills: [
        { name: 'LiveKit (WebRTC)', proficiency: 'Core Production', context: 'Ultra-low latency HD audio/video consultation rooms with multi-party support', isHighlighted: true },
        { name: 'EPIC EHR (FHIR/HL7)', proficiency: 'Core Production', context: 'Electronic Health Record synchronization, clinical observations, HIPAA compliance', isHighlighted: true },
        { name: 'Convesio Pay', proficiency: 'Core Production', context: 'Secure payment gateway, insurance claims, coupons & transaction processing', isHighlighted: true },
        { name: 'Swell eCommerce', proficiency: 'Core Production', context: 'Headless eCommerce for genomic test kits, subscriptions & checkout flows', isHighlighted: true },
        { name: 'Google & MS Calendar APIs', proficiency: 'Core Production', context: 'Bi-directional calendar synchronization & automated appointment scheduling', isHighlighted: true },
        { name: 'Slack & Teams Graph APIs', proficiency: 'Core Production', context: 'Enterprise workspace extraction, channel creation & chat metadata mapping', isHighlighted: true },
      ],
    },
    {
      id: 'realtime',
      title: 'Real-Time & AI Systems',
      description: 'Low-latency bi-directional streaming, consultation rooms, and generative intelligence.',
      iconName: 'Zap',
      skills: [
        { name: 'LiveKit Video/Audio', proficiency: 'Core Production', context: 'WebRTC ultra-low-latency real-time video consultation suites', isHighlighted: true },
        { name: 'WebSockets', proficiency: 'Core Production', context: 'Bi-directional real-time clinician & patient video/chat consultation rooms', isHighlighted: true },
        { name: 'Server-Sent Events (SSE)', proficiency: 'Core Production', context: 'One-way live genomic sequence data telemetry streaming', isHighlighted: true },
        { name: 'Generative AI Integration', proficiency: 'Core Production', context: 'AWS Bedrock LLM prompting, streaming tokens, medical report synthesis', isHighlighted: true },
      ],
    },
    {
      id: 'testing',
      title: 'Testing & Quality',
      description: 'Automated unit, component, and integration test suites ensuring 100% reliability.',
      iconName: 'ShieldCheck',
      skills: [
        { name: 'Vitest / Jest', proficiency: 'Core Production', context: 'ViewModel unit testing, service mock testing, test runners' },
        { name: 'React Testing Library', proficiency: 'Core Production', context: 'User-centric component interaction testing, accessibility assertions' },
        { name: 'TypeScript Static Analysis', proficiency: 'Core Production', context: 'Strict compilation checks with zero any policy' },
      ],
    },
    {
      id: 'scripting',
      title: 'Scripting & Utilities',
      description: 'Automation tools and data normalization utilities.',
      iconName: 'Terminal',
      skills: [
        { name: 'Shell / Bash Scripting', proficiency: 'Advanced', context: 'Build automation, environment orchestration, data validation' },
        { name: 'Postman / API Testing', proficiency: 'Core Production', context: 'Automated API collection tests, load simulation' },
      ],
    },
  ];

  private readonly mockExperienceIntro: ExperienceIntroBo = {
    tagline: '2+ Years of Proven Engineering Execution',
    narrative:
      'Software Engineer & Full Stack Developer with deep expertise in modern React/TypeScript architectures, Node/Express & Python/FastAPI microservices, high-throughput cloud migrations, and real-time streaming systems.',
    architectureSummary:
      'Proven record architecting enterprise healthcare platforms with 300+ production screens, developing 200+ Node/Express APIs, and executing 2TB+ data migrations with zero throttling incidents.',
    metrics: [
      { value: 2, suffix: '+ Years', label: 'Engineering Experience', subtext: 'AVASOFT & ZEB' },
      { value: 500, suffix: '+', label: 'Production Screens', subtext: 'React & TypeScript' },
      { value: 200, suffix: '+', label: 'APIs Developed', subtext: 'Node.js, Express.js, REST' },
      { value: 350, suffix: '+', label: 'APIs Integrated', subtext: 'REST, WebSockets, SSE' },
    ],
  };

  private readonly mockAboutDetails: AboutDetailsBo = {
    education: {
      degree: 'Bachelor of Science (B.Sc.) in Computer Science',
      institution: 'Government Arts & Science College, Kadayanallur',
      period: '2020 – 2023',
      score: '84%',
      location: 'Tamil Nadu, India',
      highlights: [
        'Graduated with distinction (84% aggregate score)',
        'Specialized in Data Structures, Algorithms, Database Management, and Object-Oriented Software Design',
        'Led student technical seminars and coding workshops',
      ],
    },
    coreValues: [
      {
        title: 'Architectural Rigor',
        description: 'Clean separation of concerns with React MVVM, strict type safety, zero any, and comprehensive unit test coverage.',
      },
      {
        title: 'High-Throughput Engineering',
        description: 'Resilient data pipelines with adaptive rate-limiting, zero throttling, and optimal database query indexing.',
      },
      {
        title: 'User-First Precision',
        description: 'Crafting responsive, accessible, 60fps user experiences with Tailwind CSS and intuitive state management.',
      },
    ],
  };

  private readonly mockGenomicsTelemetry: GenomicsTelemetryBo = {
    logs: [
      '[SSE-STREAM] Initiating genomic variant stream for CYP2D6 locus...',
      '[FASTAPI-BACKEND] Parsing VCF sequence file: chromosome 22:42,126,498-42,130,838',
      '[BEDROCK-AI] Evaluating allele *4/*41 intermediate metabolizer risk profile...',
      '[WEBSOCKET-ROOM] Clinician & Pharmacist joined live patient consultation room',
      '[ALERT-ENGINE] Pharmacogenomic guidance generated: Adjust dosage by -30% for Codeine',
      '[HIPAA-AUDIT] Stored telemetry & consultation record #GEN-99482 with 100% HIPAA compliance',
    ],
    activeAllele: 'CYP2D6 *4/*41',
    metabolizerStatus: 'Intermediate Metabolizer',
    recommendationSummary: 'Recommended dosage reduction of 30% with continuous clinical monitoring.',
  };

  private readonly mockNavigationItems: readonly NavigationItemBo[] = [
    { id: 'home', label: 'Home', href: '#home', sectionId: 'home' },
    { id: 'experience', label: 'Experience', href: '#experience', sectionId: 'experience' },
    { id: 'scale', label: 'Scale & Performance', href: '#scale', sectionId: 'scale' },
    { id: 'projects', label: 'Projects', href: '#projects', sectionId: 'projects' },
    { id: 'capabilities', label: 'Capabilities', href: '#capabilities', sectionId: 'capabilities' },
    { id: 'about', label: 'About', href: '#about', sectionId: 'about' },
    { id: 'contact', label: 'Contact', href: '#contact', sectionId: 'contact' },
  ];


  public async getProjects(): Promise<readonly ProjectBo[]> {
    return this.mockProjects;
  }

  public async getFeaturedProjects(): Promise<readonly ProjectBo[]> {
    return this.mockProjects.filter((p) => p.isFeatured);
  }

  public async getCareerJourney(): Promise<readonly CareerMilestoneBo[]> {
    return this.mockCareerJourney;
  }

  public async getScaleMetrics(): Promise<readonly ScaleMetricBo[]> {
    return this.mockScaleMetrics;
  }

  public async getCapabilities(): Promise<readonly CapabilityCategoryBo[]> {
    return this.mockCapabilities;
  }

  public async getExperienceIntro(): Promise<ExperienceIntroBo> {
    return this.mockExperienceIntro;
  }

  public async getAboutDetails(): Promise<AboutDetailsBo> {
    return this.mockAboutDetails;
  }

  public async getGenomicsTelemetry(): Promise<GenomicsTelemetryBo> {
    return this.mockGenomicsTelemetry;
  }

  public async getNavigationItems(): Promise<readonly NavigationItemBo[]> {
    return this.mockNavigationItems;
  }
}
