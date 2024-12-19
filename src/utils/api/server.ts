import { VercelResponse } from '@vercel/node';

export function handleServerError(error: unknown, res: VercelResponse) {
  console.error('Server Error:', error);

  if (error instanceof Error) {
    // Handle specific error types
    if (error.message.includes('configuration')) {
      return res.status(503).json({ 
        error: 'Service temporarily unavailable. Please try again later.' 
      });
    }
    
    if (error.message.includes('rate limit')) {
      return res.status(429).json({ 
        error: 'Too many requests. Please try again later.' 
      });
    }

    return res.status(500).json({ 
      error: 'An unexpected error occurred. Please try again later.' 
    });
  }

  return res.status(500).json({ 
    error: 'Internal server error' 
  });
}