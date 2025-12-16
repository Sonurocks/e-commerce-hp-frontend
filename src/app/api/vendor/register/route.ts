import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and phone are required' },
        { status: 400 }
      );
    }

    // Forward the request to the backend API
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.1.8:6060';
    const apiUrl = `${backendUrl}/api/v1/vendor/auth/register`;

    console.log('Attempting to call backend API:', apiUrl);
    console.log('Request body:', { name: body.name, email: body.email, phone: body.phone, organizationName: body.organizationName });

    let response;
    try {
      // Add timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: body.name,
          email: body.email,
          phone: body.phone,
          organizationName: body.organizationName,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (fetchError: any) {
      console.error('Fetch error:', fetchError);
      
      if (fetchError.name === 'AbortError') {
        return NextResponse.json(
          { 
            error: 'Connection timeout',
            message: 'The backend server took too long to respond. Please check if the API server is running.'
          },
          { status: 504 }
        );
      }
      
      return NextResponse.json(
        { 
          error: 'Network error',
          message: `Cannot connect to backend server at ${apiUrl}. Please check if the server is running and accessible. Error: ${fetchError.message}`
        },
        { status: 503 }
      );
    }

    // Try to parse response as JSON, but handle non-JSON responses
    let data;
    const contentType = response.headers.get('content-type');
    const text = await response.text();
    
    if (contentType && contentType.includes('application/json')) {
      try {
        data = text ? JSON.parse(text) : {};
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        console.error('Response text:', text);
        data = { 
          error: 'Invalid response format',
          message: 'Backend returned invalid JSON response',
          rawResponse: text.substring(0, 200) // First 200 chars for debugging
        };
      }
    } else {
      // If response is not JSON, use text as message
      data = { 
        message: text || `Backend returned status ${response.status}`,
        status: response.status
      };
    }

    // Return the response from the backend with appropriate status
    return NextResponse.json(data, { status: response.status });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Vendor registration API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process registration request',
        message: error.message || 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

