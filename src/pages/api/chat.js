import { getChatResponse } from '@/lib/groq';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    // Validate messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // Limit conversation history to last 10 messages to save tokens
    const recentMessages = messages.slice(-10);

    // Get response from Groq
    const response = await getChatResponse(recentMessages);

    return res.status(200).json({ 
      message: response,
      success: true 
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    
    // Handle specific error types
    if (error.status === 429) {
      return res.status(429).json({ 
        error: 'Too many requests. Please wait a moment and try again.',
        success: false 
      });
    }

    if (error.status === 401) {
      return res.status(500).json({ 
        error: 'AI service configuration error.',
        success: false 
      });
    }

    return res.status(500).json({ 
      error: 'Failed to get AI response. Please try again.',
      success: false 
    });
  }
}
