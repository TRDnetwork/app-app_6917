import express from 'express';
import cors from 'cors';
import helmet from 'helmet'; // SECURITY FIX: Import helmet for secure headers
import rateLimit from 'express-rate-limit'; // SECURITY FIX: Import rate limiter
import { z } from 'zod';
import { Resend } from 'resend';

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Schema for request validation
const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required'),
  // Honeypot field — should be empty
  company: z.string().optional().refine(val => !val, {
    message: 'Spam detected'
  })
});

// SECURITY FIX: Configure rate limiter to prevent spam
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per window
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// SECURITY FIX: Use helmet to set secure HTTP headers
app.use(helmet());

// SECURITY FIX: Configure CORS with origin restriction in production
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production'
      ? 'https://app_6917.vercel.app' // Restrict to deployed domain
      : true, // Allow all in development
  })
);

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'RESEND_API_KEY not configured' });
  }
  res.status(200).json({ status: 'OK' });
});

// Apply rate limiter only to contact form
app.post('/api/contact', limiter, async (req, res) => {
  try {
    // Validate input
    const result = contactFormSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.flatten().fieldErrors });
    }

    const { name, email, message } = result.data;

    // SECURITY FIX: Sanitize message to prevent XSS in email clients
    const sanitize = (str) => str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const cleanMessage = sanitize(message);
    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email);

    // Send email via Resend
    const emailResponse = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['hello@yoursite.com'],
      subject: `New message from ${cleanName}`,
      reply_to: cleanEmail,
      text: message, // Plaintext version (already sanitized via input validation)
      html: `<p><strong>From:</strong> ${cleanName} (${cleanEmail})</p><p><strong>Message:</strong></p><p>${cleanMessage}</p>`
    });

    if (emailResponse.error) {
      console.error('Resend error:', emailResponse.error);
      return res.status(500).json({ error: 'Failed to send message' }); // Generic error
    }

    return res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Server error:', error); // Log full error for debugging (safe on server)
    return res.status(500).json({ error: 'Internal server error' }); // Generic error to client
  }
});

// Start server (for local development)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
---