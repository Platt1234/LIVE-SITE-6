import { EmailData, EmailTemplate } from './types';

export function createConsultationEmail(data: EmailData): EmailTemplate {
  return {
    subject: `New Consultation Request from ${data.name}`,
    html: `
      <h2>New Consultation Request</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Type:</strong> ${data.type === 'other' ? data.otherType : data.type}</p>
      <p><strong>Query:</strong></p>
      <p>${data.query.replace(/\n/g, '<br>')}</p>
    `
  };
}