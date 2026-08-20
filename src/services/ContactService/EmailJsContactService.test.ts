import { describe, it, expect, vi, beforeEach } from 'vitest';
import emailjs from '@emailjs/browser';
import { EmailJsContactService } from './EmailJsContactService';
import { ContactMessagePayloadBo } from './bo/ContactMessage.bo';

vi.mock('@emailjs/browser', () => ({
  default: {
    send: vi.fn(),
  },
}));

describe('EmailJsContactService', () => {
  const dummyPayload: ContactMessagePayloadBo = {
    name: 'Sarah Connor',
    email: 'sarah@example.com',
    subject: 'Engineering Discussion',
    message: 'Hello, looking to collaborate on a full stack project.',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls emailjs.send with mapped template parameters when keys are provided', async () => {
    const mockSend = vi.mocked(emailjs.send);
    mockSend.mockResolvedValueOnce({
      status: 200,
      text: 'OK',
    });

    const service = new EmailJsContactService('service_123', 'template_456', 'pubkey_789');
    const result = await service.sendMessage(dummyPayload);

    expect(mockSend).toHaveBeenCalledWith(
      'service_123',
      'template_456',
      expect.objectContaining({
        name: 'Sarah Connor',
        from_name: 'Sarah Connor',
        email: 'sarah@example.com',
        reply_to: 'sarah@example.com',
        subject: 'Engineering Discussion',
        message: 'Hello, looking to collaborate on a full stack project.',
        content: 'Hello, looking to collaborate on a full stack project.',
      }),
      'pubkey_789'
    );

    expect(result.success).toBe(true);
    expect(result.message).toContain('Sarah Connor');
  });

  it('falls back to simulation mode when keys are missing', async () => {
    const service = new EmailJsContactService('', '', '');
    const result = await service.sendMessage(dummyPayload);

    expect(emailjs.send).not.toHaveBeenCalled();
    expect(result.success).toBe(true);
    expect(result.message).toContain('Simulated dev mode');
  });

  it('throws formatted error when emailjs.send fails', async () => {
    const mockSend = vi.mocked(emailjs.send);
    mockSend.mockRejectedValueOnce(new Error('Network error'));

    const service = new EmailJsContactService('service_123', 'template_456', 'pubkey_789');

    await expect(service.sendMessage(dummyPayload)).rejects.toThrow(
      /Network error/i
    );
  });
});
