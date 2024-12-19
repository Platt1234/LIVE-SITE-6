import nodemailer from 'nodemailer';

// Create reusable transporter with improved configuration
export const createEmailTransporter = () => {
  // Validate required environment variables
  const requiredVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'SMTP_FROM'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
      minVersion: 'TLSv1.2',
    },
    pool: true,
    maxConnections: 3,
    maxMessages: 50,
    rateDelta: 1500,
    rateLimit: 3,
  });
};

export async function verifyEmailConfig(): Promise<void> {
  try {
    const transporter = createEmailTransporter();
    await transporter.verify();
  } catch (error) {
    throw new Error(
      error instanceof Error 
        ? `Email configuration error: ${error.message}`
        : 'Failed to verify email configuration'
    );
  }
}