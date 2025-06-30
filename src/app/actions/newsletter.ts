"use server";

interface NewsletterResponse {
  success: boolean;
  message: string;
  data?: {
    email: string;
    subscribedAt: string;
  };
}

export async function subscribeToNewsletter(email: string): Promise<NewsletterResponse> {
  try {
    // Validate email
    if (!email || !email.includes('@')) {
      return {
        success: false,
        message: 'Please provide a valid email address'
      };
    }

    const apiUrl = process.env.API_GATEWAY_URL;
    const response = await fetch(`${apiUrl}/api/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    console.error(response);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || `HTTP error! status: ${response.status}`
      };
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return {
      success: false,
      message: 'Failed to connect to newsletter service. Please try again later.'
    };
  }
} 