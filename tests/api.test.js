import { describe, it, expect, vi } from 'vitest';
import { handler } from '../public/api/contact';

// Mock Resend
vi.mock('resend', () => ({
  Resend: vi.fn(() => ({
    emails: {
      send: vi.fn(),
    },
  })),
}));

// Mock environment variables
vi.stubEnv('RESEND_API_KEY', 'test-key');

describe('Contact API', () => {
  it('rejects non-POST requests', async () => {
    const req = { method: 'GET', body: {} };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    
    await handler(req, res);
    
    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ error: 'Method not allowed' });
  });

  it('validates required fields', async () => {
    const req = { 
      method: 'POST', 
      body: { name: '', email: 'invalid', message: '' } 
    };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    
    await handler(req, res);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Missing required fields' });
  });

  it('sends email successfully with valid data', async () => {
    const mockSend = vi.fn().mockResolvedValue({ data: 'sent' });
    
    vi.mocked(Resend).mockImplementation(() => ({
      emails: { send: mockSend },
    }));

    const req = { 
      method: 'POST', 
      body: { 
        name: 'John Doe', 
        email: 'john@example.com', 
        message: 'Hello' 
      } 
    };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    
    await handler(req, res);
    
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: ['jane.doe@example.com'],
        subject: 'New message from John Doe',
        text: expect.stringContaining('Hello')
      })
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
  });

  it('handles email sending errors', async () => {
    const mockSend = vi.fn().mockRejectedValue(new Error('Send failed'));
    
    vi.mocked(Resend).mockImplementation(() => ({
      emails: { send: mockSend },
    }));

    const req = { 
      method: 'POST', 
      body: { 
        name: 'John Doe', 
        email: 'john@example.com', 
        message: 'Hello' 
      } 
    };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    
    await handler(req, res);
    
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Send failed' });
  });
});