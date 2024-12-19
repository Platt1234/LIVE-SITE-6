import { ConsultationFormData } from '../../types/consultation';
import { handleApiError } from './error';

const API_ENDPOINTS = {
  CONSULTATION: process.env.NODE_ENV === 'production' 
    ? 'https://api.platteneye.co.uk/consultation'  // Replace with your actual production API
    : '/api/submit-consultation'
};

export async function submitConsultation(data: ConsultationFormData): Promise<void> {
  try {
    const response = await fetch(API_ENDPOINTS.CONSULTATION, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        error: `Server error: ${response.status}`
      }));
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || 'Failed to submit consultation request');
    }
  } catch (error) {
    throw handleApiError(error);
  }
}