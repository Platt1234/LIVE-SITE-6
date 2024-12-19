import { VercelRequest, VercelResponse } from '@vercel/node';
import { EmailData } from '../src/utils/email/types';
import { validateEmailData } from '../src/utils/email/validation';
import { sendConsultationEmail } from '../src/utils/email/sender';
import { handleServerError } from '../src/utils/api/server';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', process.env.NODE_ENV === 'production' 
    ? 'https://platteneye.co.uk' 
    : '*'
  );
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // Validate method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Rate limiting check
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    if (await isRateLimited(clientIp)) {
      return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }

    const emailData: EmailData = req.body;
    
    // Validate request data
    const validation = validateEmailData(emailData);
    if (!validation.isValid) {
      return res.status(400).json({ error: validation.error });
    }

    // Send emails
    await sendConsultationEmail(emailData);
    
    return res.status(200).json({ 
      success: true,
      message: 'Consultation request submitted successfully'
    });
  } catch (error) {
    return handleServerError(error, res);
  }
}

// Simple in-memory rate limiting
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;
const requestCounts = new Map<string, { count: number; timestamp: number }>();

async function isRateLimited(clientIp: string | string[]): Promise<boolean> {
  const ip = Array.isArray(clientIp) ? clientIp[0] : clientIp;
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;

  // Clean up old entries
  for (const [key, value] of requestCounts.entries()) {
    if (value.timestamp < windowStart) {
      requestCounts.delete(key);
    }
  }

  // Get or create record for this IP
  const record = requestCounts.get(ip) || { count: 0, timestamp: now };

  // Reset if outside window
  if (record.timestamp < windowStart) {
    record.count = 0;
    record.timestamp = now;
  }

  // Increment and check
  record.count++;
  requestCounts.set(ip, record);

  return record.count > MAX_REQUESTS;
}