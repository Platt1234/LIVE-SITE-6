export interface ConsultationFormData {
  name: string;
  email: string;
  type: string;
  otherType: string;
  query: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}