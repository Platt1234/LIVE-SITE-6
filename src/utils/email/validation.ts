import { EmailData } from './types';

export function validateEmailData(data: EmailData): { isValid: boolean; error?: string } {
  if (!data.name?.trim()) {
    return { isValid: false, error: 'Name is required' };
  }

  if (!data.email?.trim()) {
    return { isValid: false, error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { isValid: false, error: 'Invalid email format' };
  }

  if (!data.type?.trim()) {
    return { isValid: false, error: 'Type is required' };
  }

  if (data.type === 'other' && !data.otherType?.trim()) {
    return { isValid: false, error: 'Please specify the type' };
  }

  if (!data.query?.trim()) {
    return { isValid: false, error: 'Query is required' };
  }

  return { isValid: true };
}