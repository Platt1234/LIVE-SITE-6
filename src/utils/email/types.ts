export interface EmailData {
  name: string;
  email: string;
  type: string;
  otherType?: string;
  query: string;
}

export interface EmailTemplate {
  subject: string;
  html: string;
}