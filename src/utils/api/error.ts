export function handleApiError(error: unknown): Error {
  // Log error for debugging
  console.error('API Error:', {
    name: error instanceof Error ? error.name : 'Unknown',
    message: error instanceof Error ? error.message : 'Unknown error',
    error
  });

  // Return user-friendly error
  if (error instanceof Error) {
    if (error.message.includes('Server error: 500')) {
      return new Error('The server encountered an error. Please try again later.');
    }
    if (error.message.includes('Server error: 404')) {
      return new Error('The requested service is not available.');
    }
    return error;
  }

  return new Error('An unexpected error occurred. Please try again later.');
}