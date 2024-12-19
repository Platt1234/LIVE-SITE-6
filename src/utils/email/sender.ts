import { createEmailTransporter, verifyEmailConfig } from './config';
import { EmailData } from './types';
import { createConsultationEmail } from './templates';
import { validateEmailData } from './validation';

export async function sendConsultationEmail(data: EmailData): Promise<void> {
  try {
    // Validate email data
    const validation = validateEmailData(data);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    // Verify email configuration
    await verifyEmailConfig();

    const transporter = createEmailTransporter();
    const { subject, html } = createConsultationEmail(data);
    
    // Send notification emails
    const notificationEmails = ['joseph@platteneye.co.uk', 'daniel@platteneye.co.uk'];
    await Promise.all(notificationEmails.map(email => 
      transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject,
        html,
      })
    ));

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: data.email,
      subject: 'Consultation Request Received - Platteneye Capital',
      html: `
        <h2>Thank you for your consultation request</h2>
        <p>Dear ${data.name},</p>
        <p>We have received your inquiry and our team will get back to you within 24 hours.</p>
        <br>
        <p>Best regards,<br>Platteneye Capital Team</p>
      `,
    });
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error(
      error instanceof Error 
        ? error.message
        : 'Failed to send email. Please try again later.'
    );
  }
}