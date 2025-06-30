"use server";

interface SearchSuggestionsResponse {
  success: boolean;
  data?: {
    suggestions: Array<{
      text: string;
      category: string;
      type: string;
    }>;
  };
}

export async function getSearchSuggestions(query: string, limit: number = 5): Promise<SearchSuggestionsResponse> {
  try {
    if (!query || query.trim() === '') {
      return {
        success: true,
        data: {
          suggestions: []
        }
      };
    }

    const searchParams = new URLSearchParams({
      q: query.trim(),
      limit: limit.toString()
    });

    const apiUrl = process.env.API_GATEWAY_URL;
    const response = await fetch(`${apiUrl}/api/search/suggestions?${searchParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return {
        success: false,
        data: {
          suggestions: []
        }
      };
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Search suggestions error:', error);
    return {
      success: false,
      data: {
        suggestions: []
      }
    };
  }
}