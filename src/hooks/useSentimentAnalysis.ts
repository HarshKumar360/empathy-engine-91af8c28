import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SentimentLevel, BuddySuggestion, Message } from '@/types/chat';
import { useToast } from '@/hooks/use-toast';

interface SentimentAnalysisResult {
  sentiment: SentimentLevel;
  buddyMessage: string;
  quickReplies: string[];
  suggestionType: 'empathy' | 'quick-reply' | 'alert' | 'celebration';
}

export function useSentimentAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const analyzeSentiment = useCallback(async (
    message: string,
    conversationHistory: Message[]
  ): Promise<SentimentAnalysisResult | null> => {
    setIsAnalyzing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('analyze-sentiment', {
        body: { 
          message,
          conversationHistory: conversationHistory.slice(-5).map(m => ({
            sender: m.sender,
            content: m.content
          }))
        }
      });

      if (error) {
        console.error('Sentiment analysis error:', error);
        toast({
          title: "Sentiment analysis unavailable",
          description: "Using fallback sentiment detection.",
          variant: "destructive",
        });
        return null;
      }

      return data as SentimentAnalysisResult;
    } catch (err) {
      console.error('Failed to analyze sentiment:', err);
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  }, [toast]);

  const createBuddySuggestion = useCallback((
    result: SentimentAnalysisResult
  ): BuddySuggestion => {
    return {
      id: `suggestion-${Date.now()}`,
      type: result.suggestionType,
      message: result.buddyMessage,
      quickReplies: result.quickReplies.length > 0 ? result.quickReplies : undefined,
      timestamp: new Date(),
    };
  }, []);

  return {
    analyzeSentiment,
    createBuddySuggestion,
    isAnalyzing,
  };
}
