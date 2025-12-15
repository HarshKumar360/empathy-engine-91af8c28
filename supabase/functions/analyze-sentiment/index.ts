import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Analyzing sentiment for message:', message.substring(0, 50) + '...');

    const systemPrompt = `You are an expert sentiment analyzer for customer support conversations. Analyze the customer's message and provide:

1. sentiment: One of "positive", "neutral", "warning", "negative", or "escalated"
   - positive: Customer is happy, grateful, or satisfied
   - neutral: Customer is calm, asking questions normally
   - warning: Customer is showing signs of frustration or impatience
   - negative: Customer is clearly upset or frustrated
   - escalated: Customer is very angry, threatening, or demanding escalation

2. buddyMessage: A brief, empathetic message to guide the support agent (max 100 chars)

3. quickReplies: An array of 2-3 suggested responses the agent can use (each max 150 chars)

4. suggestionType: One of "empathy", "quick-reply", "alert", or "celebration"
   - empathy: When customer needs understanding
   - quick-reply: General helpful suggestions
   - alert: When sentiment is warning/negative/escalated
   - celebration: When customer sentiment improves to positive

Respond ONLY with valid JSON in this exact format:
{
  "sentiment": "string",
  "buddyMessage": "string",
  "quickReplies": ["string", "string"],
  "suggestionType": "string"
}`;

    const conversationContext = conversationHistory 
      ? `Previous messages:\n${conversationHistory.map((m: any) => `${m.sender}: ${m.content}`).join('\n')}\n\nLatest customer message: ${message}`
      : `Customer message: ${message}`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: conversationContext }
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'AI usage limit reached. Please add credits.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    console.log('AI response:', content);

    // Parse the JSON response
    let analysis;
    try {
      // Extract JSON from the response (handle potential markdown code blocks)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      // Return a fallback response
      analysis = {
        sentiment: 'neutral',
        buddyMessage: 'Analyzing customer sentiment...',
        quickReplies: ['Thank you for reaching out!', 'I\'d be happy to help with that.'],
        suggestionType: 'quick-reply'
      };
    }

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-sentiment function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      // Return fallback data so UI doesn't break
      sentiment: 'neutral',
      buddyMessage: 'Unable to analyze sentiment right now.',
      quickReplies: [],
      suggestionType: 'quick-reply'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
