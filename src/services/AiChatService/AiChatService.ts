import { AiChatServiceInterface } from './AiChatService.interface';
import { ChatMessageBo, ChatMessageMapper } from './bo/ChatMessage.bo';
import { ChatMessageDto } from './dto/ChatMessage.dto';
import { Logger } from '../../helpers/Logger';

export class AiChatService implements AiChatServiceInterface {
  private static instance: AiChatService | null = null;

  public static getInstance(): AiChatService {
    if (!AiChatService.instance) {
      AiChatService.instance = new AiChatService();
    }
    return AiChatService.instance;
  }

  public static reset(): void {
    AiChatService.instance = null;
  }

  public getQuickPrompts(): readonly string[] {
    return [
      'Who is Parama & what is his focus?',
      'Tell me about his 5 ZEB 3rd-party integrations',
      'What did he build at AVASOFT?',
      'What are his core technical skills?',
      'Download his official resume',
    ];
  }

  public getInitialGreeting(): ChatMessageBo {
    const greetingDto: ChatMessageDto = {
      id: 'msg-greeting',
      sender: 'assistant',
      text: "👋 Hi! I'm **Parama AI (Genius)**, your interactive portfolio copilot.\n\nI can answer questions about Paramanantham's enterprise engineering background, production systems (*ZEB Precision Genomics & AVASOFT Slack-to-Teams Migration*), **5 third-party integrations**, technical skills, or navigate you directly to any section!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actions: [
        { label: '🚀 Explore ZEB Genomics', actionType: 'navigate', target: '#genomics' },
        { label: '⚡ Slack ➜ Teams Case Study', actionType: 'navigate', target: '#migration' },
        { label: '📄 View PDF Resume', actionType: 'navigate', target: '#resume' },
        { label: '📬 Direct Contact', actionType: 'navigate', target: '#contact' },
      ],
    };
    return ChatMessageMapper.toBo(greetingDto);
  }

  public async sendMessage(userQuery: string): Promise<ChatMessageBo> {
    Logger.info('Processing AI Chat query', { query: userQuery });

    // Simulate micro-delay for realistic typing feel
    await new Promise((resolve) => setTimeout(resolve, 350));

    const query = userQuery.toLowerCase().trim();
    const responseDto = this.evaluateIntent(query);

    return ChatMessageMapper.toBo(responseDto);
  }

  private evaluateIntent(query: string): ChatMessageDto {
    const id = `msg-${Date.now()}`;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Casual Greetings & Salutations
    if (
      query === 'hi' ||
      query === 'hey' ||
      query === 'hello' ||
      query.startsWith('hi ') ||
      query.startsWith('hey ') ||
      query.startsWith('hello ') ||
      query.includes('good morning') ||
      query.includes('good afternoon') ||
      query.includes('good evening') ||
      query === 'yo' ||
      query === 'sup' ||
      query.includes('namaste') ||
      query.includes('vanakkam')
    ) {
      return {
        id,
        sender: 'assistant',
        text: "👋 **Hello and welcome!**\n\nI'm **Parama AI (Genius)**, Paramanantham's portfolio assistant. What would you like to explore today?\n\n- 🏥 **5 ZEB 3rd-Party Integrations** (*Convesio Pay, Swell, LiveKit, Calendar, EPIC EHR*)\n- ⚡ **AVASOFT Enterprise Migration** (*200+ Node APIs, 2TB+ data*)\n- 🛠️ **Technical Stack & Skills** (*React, TypeScript, Node.js, Python, SQL Server*)\n- 📄 **Official PDF Resume & Contact**",
        timestamp,
        actions: [
          { label: '🚀 Explore ZEB Genomics', actionType: 'navigate', target: '#genomics' },
          { label: '⚡ Slack ➜ Teams Case Study', actionType: 'navigate', target: '#migration' },
          { label: '📄 View PDF Resume', actionType: 'navigate', target: '#resume' },
          { label: '📬 Direct Contact', actionType: 'navigate', target: '#contact' },
        ],
      };
    }

    // 2. Identity / Name / Creator
    if (
      query.includes('your name') ||
      query.includes('who are you') ||
      query.includes('what are you') ||
      query === 'name' ||
      query.includes('who made you') ||
      query.includes('who built you') ||
      query.includes('who created you')
    ) {
      return {
        id,
        sender: 'assistant',
        text: "🤖 I am **Parama AI (Genius)** — an intelligent, client-side portfolio copilot crafted specifically to help recruiters, engineering leaders, and clients discover **Paramanantham's** technical achievements, enterprise case studies, and engineering capabilities in real time.",
        timestamp,
        actions: [
          { label: '👨‍💻 About Paramanantham', actionType: 'navigate', target: '#about' },
          { label: '📄 View PDF Resume', actionType: 'navigate', target: '#resume' },
        ],
      };
    }

    // 3. Gratitude & Pleasantries
    if (
      query.includes('thank') ||
      query.includes('thanks') ||
      query.includes('awesome') ||
      query.includes('great job') ||
      query.includes('cool') ||
      query.includes('perfect')
    ) {
      return {
        id,
        sender: 'assistant',
        text: "You're very welcome! 😊 Feel free to explore the interactive case studies or connect with Parama directly for full stack engineering opportunities.",
        timestamp,
        actions: [
          { label: '📬 Send Direct Message', actionType: 'navigate', target: '#contact' },
          { label: '📄 Download Verified PDF', actionType: 'navigate', target: '#resume' },
        ],
      };
    }

    // 4. Help & Capabilities
    if (query === 'help' || query.includes('what can you do') || query.includes('features')) {
      return {
        id,
        sender: 'assistant',
        text: "Here is what I can do for you:\n\n1. **Deep-Dive into Case Studies:** Explain ZEB's 5 third-party integrations & AVASOFT's 200+ Node.js migration APIs.\n2. **Break Down Technical Stack:** Review proficiency across React, TypeScript, Node.js, Python, SQL Server, and AWS.\n3. **Quick Navigation:** Jump directly to any section on this page.\n4. **Download Verified PDF Resume:** Instant access to Paramanantham's official credentials.",
        timestamp,
        actions: [
          { label: '🏥 ZEB 3rd-Party Integrations', actionType: 'navigate', target: '#genomics' },
          { label: '⚡ Slack ➜ Teams Case Study', actionType: 'navigate', target: '#migration' },
          { label: '📄 Download PDF Resume', actionType: 'navigate', target: '#resume' },
          { label: '📬 Contact Channels', actionType: 'navigate', target: '#contact' },
        ],
      };
    }

    // 5. ZEB 3rd Party Integrations & Ecosystem
    if (
      query.includes('integration') ||
      query.includes('3rd') ||
      query.includes('third party') ||
      query.includes('convesio') ||
      query.includes('swell') ||
      query.includes('livekit') ||
      query.includes('calendar') ||
      query.includes('epic') ||
      query.includes('ehr') ||
      query.includes('fhir')
    ) {
      return {
        id,
        sender: 'assistant',
        text: '### 🏥 5 Enterprise 3rd-Party Integrations at ZEB:\n\nParamanantham integrated 5 critical enterprise systems into the precision genomics clinical portal:\n\n1. **Convesio Pay:** Secure payment gateway with PCI DSS compliance, claims processing, and automated billing.\n2. **Swell Commerce:** Headless eCommerce engine powering genomic test kit checkout and recurring subscriptions.\n3. **LiveKit:** WebRTC ultra-low-latency real-time video/audio consultations between clinical geneticists and patients.\n4. **Google & Microsoft Calendar:** Bi-directional real-time appointment sync with timezone normalization.\n5. **EPIC EHR (FHIR):** Bidirectional clinical data sync preserving HL7/FHIR security standards.',
        timestamp,
        actions: [
          { label: '🚀 Open ZEB Integrations Tab', actionType: 'navigate', target: '#genomics' },
          { label: '🛠️ View Technical Capabilities', actionType: 'navigate', target: '#capabilities' },
        ],
      };
    }

    // 6. Who is Parama / Overview / About
    if (
      query.includes('who is') ||
      query.includes('about') ||
      query.includes('summary') ||
      query.includes('intro') ||
      query.includes('background') ||
      query.includes('parama') ||
      query.includes('experience')
    ) {
      return {
        id,
        sender: 'assistant',
        text: '### 👨‍💻 Paramanantham S — Full Stack Software Engineer\n\n- **Experience:** 2+ years building enterprise cloud migration platforms and clinical precision genomics portals.\n- **Companies:** **ZEB** (*Software Engineer & Frontend Lead*) & **AVASOFT** (*Full Stack Engineer*).\n- **Core Engineering:** React, TypeScript, Tailwind CSS, Node.js, Express.js, Python, SQL Server, WebSockets, and AWS.\n- **Education:** B.Sc. in Computer Science (Graduated with **84% Distinction**).',
        timestamp,
        actions: [
          { label: '📈 View Career Timeline', actionType: 'navigate', target: '#journey' },
          { label: '🎓 View Academic Foundation', actionType: 'navigate', target: '#about' },
          { label: '📄 Download Official PDF', actionType: 'navigate', target: '#resume' },
        ],
      };
    }

    // 7. AVASOFT Slack to Teams Migration Platform
    if (
      query.includes('avasoft') ||
      query.includes('migration') ||
      query.includes('slack') ||
      query.includes('teams') ||
      query.includes('200') ||
      query.includes('api') ||
      query.includes('2tb')
    ) {
      return {
        id,
        sender: 'assistant',
        text: '### ⚡ AVASOFT Slack ➜ Teams Migration Platform:\n\n- **200+ REST APIs:** Built in Node.js & Express.js for full workspace data normalization.\n- **Inventory Discovery:** Ingested Slack users, public/private channels, direct messages, file attachments, and timestamps.\n- **Super Admin Engine:** Batch scheduling portal with automated organization credential verification.\n- **Scale & Reliability:** Migrated **2TB+** data across 500+ users & 100K+ chats with **0 throttling incidents** via sliding-window rate limiters.',
        timestamp,
        actions: [
          { label: '⚡ Interactive Pipeline Demo', actionType: 'navigate', target: '#migration' },
          { label: '📊 View Scale Metrics', actionType: 'navigate', target: '#scale' },
        ],
      };
    }

    // 8. ZEB Precision Genomics Platform
    if (
      query.includes('zeb') ||
      query.includes('genomics') ||
      query.includes('precision') ||
      query.includes('telemetry') ||
      query.includes('300') ||
      query.includes('screen')
    ) {
      return {
        id,
        sender: 'assistant',
        text: '### 🧬 ZEB Precision Healthcare & Genomics Portal:\n\n- **300+ Production Screens:** Engineered complex responsive clinical modules with React, TypeScript, and Tailwind CSS.\n- **Live Streaming Telemetry:** Integrated WebSockets and SSE pipelines to stream real-time genomic sequencing and patient telemetry.\n- **Sub-100ms Latency:** Optimized high-volume clinical dashboards for fast genomic data visualization.',
        timestamp,
        actions: [
          { label: '🧬 Explore ZEB Portal Details', actionType: 'navigate', target: '#genomics' },
          { label: '📈 View Scale Numbers', actionType: 'navigate', target: '#scale' },
        ],
      };
    }

    // 9. Technical Skills & Capabilities
    if (
      query.includes('skill') ||
      query.includes('tech stack') ||
      query.includes('technology') ||
      query.includes('frontend') ||
      query.includes('backend') ||
      query.includes('database') ||
      query.includes('react') ||
      query.includes('node') ||
      query.includes('python') ||
      query.includes('sql')
    ) {
      return {
        id,
        sender: 'assistant',
        text: '### 🛠️ Technical Competencies:\n\n- **Frontend:** React, TypeScript, Tailwind CSS, MVVM Pattern, WebSockets, WebRTC, SSE.\n- **Backend:** Node.js, Express.js, Python, FastAPI, REST API Architecture, JWT/OAuth2.\n- **Integrations:** Convesio Pay, Swell, LiveKit, Google/MS Calendar, EPIC EHR (FHIR).\n- **Databases:** SQL Server (SSMS), PostgreSQL, Redis, MongoDB.\n- **Cloud & DevOps:** AWS Bedrock, AWS Cognito, Docker, Git, CI/CD, Vite, Vitest.',
        timestamp,
        actions: [
          { label: '🔍 Filter Skills in Drawer', actionType: 'navigate', target: '#capabilities' },
          { label: '📄 See Verified Resume', actionType: 'navigate', target: '#resume' },
        ],
      };
    }

    // 10. Resume / PDF Download
    if (
      query.includes('resume') ||
      query.includes('cv') ||
      query.includes('download') ||
      query.includes('pdf')
    ) {
      return {
        id,
        sender: 'assistant',
        text: "### 📄 Verified Engineering Resume\n\nYou can preview or download Paramanantham's official verified PDF resume directly. It contains verified project impact, production metrics, and technical competencies.",
        timestamp,
        actions: [
          { label: '📄 Go to Resume Section', actionType: 'navigate', target: '#resume' },
          { label: '📥 Download PDF Directly', actionType: 'external', target: '/Paramanantham_Resume.pdf' },
        ],
      };
    }

    // 11. Contact / Hire / Email / Phone
    if (
      query.includes('contact') ||
      query.includes('hire') ||
      query.includes('email') ||
      query.includes('phone') ||
      query.includes('reach') ||
      query.includes('linkedin') ||
      query.includes('location')
    ) {
      return {
        id,
        sender: 'assistant',
        text: '### 📬 Direct Channels & Location:\n\n- **Primary Email:** [paramanandham2003@gmail.com](mailto:paramanandham2003@gmail.com)\n- **Direct Phone:** [+91 93602 46685](tel:+919360246685)\n- **Location:** Tamil Nadu, India\n- **LinkedIn:** [linkedin.com/in/s-paramanantham](https://www.linkedin.com/in/s-paramanantham)\n- **GitHub:** [github.com/s-paramanantham](https://github.com/s-paramanantham)\n\nYou can also transmit a direct message via the contact form!',
        timestamp,
        actions: [
          { label: '📬 Open Direct Message Form', actionType: 'navigate', target: '#contact' },
        ],
      };
    }

    // 12. Education / College
    if (
      query.includes('education') ||
      query.includes('college') ||
      query.includes('degree') ||
      query.includes('bsc') ||
      query.includes('graduate') ||
      query.includes('score')
    ) {
      return {
        id,
        sender: 'assistant',
        text: '### 🎓 Academic Foundation:\n\n- **Degree:** Bachelor of Science (B.Sc.) in Computer Science\n- **Institution:** Government Arts & Science College, Kadayanallur\n- **Period:** 2020 – 2023\n- **Score:** **84% with Distinction**\n- **Foundation:** Data Structures, Algorithms, Software Engineering, Object-Oriented Design.',
        timestamp,
        actions: [
          { label: '🎓 View Academic Background', actionType: 'navigate', target: '#about' },
        ],
      };
    }

    // Default Fallback
    return {
      id,
      sender: 'assistant',
      text: "I can help you explore Paramanantham's work! Here are some key topics you might be interested in:\n\n- **ZEB 3rd-Party Integrations** (*Convesio Pay, Swell, LiveKit, Calendar, EPIC EHR*)\n- **AVASOFT Migration Case Study** (*200+ Node APIs, 2TB+ data*)\n- **Tech Stack & Capabilities** (*React, TypeScript, Node.js, Python, SQL Server*)\n- **Download Resume (PDF)** or **Direct Contact Details**",
      timestamp,
      actions: [
        { label: '🏥 ZEB 3rd-Party Integrations', actionType: 'navigate', target: '#genomics' },
        { label: '⚡ AVASOFT Case Study', actionType: 'navigate', target: '#migration' },
        { label: '📄 Resume & Credentials', actionType: 'navigate', target: '#resume' },
        { label: '📬 Contact Info', actionType: 'navigate', target: '#contact' },
      ],
    };
  }
}
