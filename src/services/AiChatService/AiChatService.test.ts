import { describe, it, expect } from 'vitest';
import { AiChatService } from './AiChatService';

describe('AiChatService Knowledge Engine', () => {
  const service = new AiChatService();

  it('provides initial greeting with suggested action chips', () => {
    const greeting = service.getInitialGreeting();
    expect(greeting.sender).toBe('assistant');
    expect(greeting.text).toContain('Parama AI');
    expect(greeting.actions).toBeDefined();
    expect(greeting.actions?.length).toBeGreaterThan(0);
  });

  it('provides quick recruiter prompt suggestions', () => {
    const prompts = service.getQuickPrompts();
    expect(prompts.length).toBeGreaterThan(3);
    expect(prompts).toContain('Who is Parama & what is his focus?');
  });

  it('answers 3rd-party integrations queries accurately', async () => {
    const response = await service.sendMessage('Tell me about your 3rd party integrations');
    expect(response.text).toContain('Convesio Pay');
    expect(response.text).toContain('Swell Commerce');
    expect(response.text).toContain('LiveKit');
    expect(response.text).toContain('Google & Microsoft Calendar');
    expect(response.text).toContain('EPIC EHR (FHIR)');
  });

  it('answers AVASOFT migration queries with scale metrics', async () => {
    const response = await service.sendMessage('What did you build at AVASOFT?');
    expect(response.text).toContain('200+ REST APIs');
    expect(response.text).toContain('2TB+');
    expect(response.text).toContain('Slack');
    expect(response.text).toContain('Teams');
  });

  it('answers technical stack questions accurately', async () => {
    const response = await service.sendMessage('What is your tech stack?');
    expect(response.text).toContain('React');
    expect(response.text).toContain('TypeScript');
    expect(response.text).toContain('Node.js');
    expect(response.text).toContain('SQL Server');
  });

  it('answers casual greetings like "hey" or "hi"', async () => {
    const response = await service.sendMessage('hey');
    expect(response.text).toContain('Hello and welcome');
    expect(response.actions?.length).toBeGreaterThan(0);
  });

  it('answers identity queries like "who are you" or "name"', async () => {
    const response = await service.sendMessage('who made you?');
    expect(response.text).toContain('Parama AI (Genius)');
    expect(response.text).toContain('Paramanantham');
  });

  it('answers gratitude queries with polite guidance', async () => {
    const response = await service.sendMessage('thank you so much!');
    expect(response.text).toContain("You're very welcome");
  });
});
