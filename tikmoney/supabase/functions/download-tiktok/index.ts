import { createClient } from 'npm:@supabase/supabase-js@2.39.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

interface TikTokResponse {
  url: string;
  title: string;
  author: string;
  downloadUrl: string;
}

interface RequestBody {
  url: string;
  format: 'mp4' | 'mp3';
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url, format }: RequestBody = await req.json();

    if (!url) {
      return new Response(
        JSON.stringify({ error: 'URL is required' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }

    // Validate TikTok URL
    const tiktokUrlPattern = /^https?:\/\/((?:vm|vt|www)\.)?tiktok\.com\//i;
    if (!tiktokUrlPattern.test(url)) {
      return new Response(
        JSON.stringify({ error: 'Invalid TikTok URL' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }

    // Here we would integrate with TikTok's API or a third-party service
    // For now, we'll return a mock response
    const mockResponse: TikTokResponse = {
      url: url,
      title: 'Sample TikTok Video',
      author: '@example',
      downloadUrl: `https://example.com/video.${format}`,
    };

    return new Response(
      JSON.stringify(mockResponse),
      {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Failed to process video'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
});