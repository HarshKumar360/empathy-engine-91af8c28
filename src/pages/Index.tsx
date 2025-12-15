import { useState, useEffect } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { ChatList } from '@/components/ChatList';
import { ChatWindow } from '@/components/ChatWindow';
import { EmptyState } from '@/components/EmptyState';
import { mockConversations, mockCustomerInfo } from '@/data/mockData';
import { Conversation, Message, SentimentLevel } from '@/types/chat';
import { useToast } from '@/hooks/use-toast';
import { useSentimentAnalysis } from '@/hooks/useSentimentAnalysis';

const Index = () => {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const { toast } = useToast();
  const { analyzeSentiment, createBuddySuggestion, isAnalyzing } = useSentimentAnalysis();

  const activeConversation = conversations.find(c => c.id === activeConversationId);
  const activeCustomer = activeConversationId ? mockCustomerInfo[activeConversationId] : null;

  // Analyze sentiment for the last customer message when conversation changes
  useEffect(() => {
    if (!activeConversation) return;
    
    const lastCustomerMessage = [...activeConversation.messages]
      .reverse()
      .find(m => m.sender === 'customer');
    
    if (lastCustomerMessage && !lastCustomerMessage.sentiment) {
      analyzeLastMessage(lastCustomerMessage, activeConversation);
    }
  }, [activeConversationId]);

  const analyzeLastMessage = async (message: Message, conversation: Conversation) => {
    const result = await analyzeSentiment(message.content, conversation.messages);
    
    if (result) {
      const newSuggestion = createBuddySuggestion(result);
      
      setConversations(prev =>
        prev.map(conv => {
          if (conv.id !== conversation.id) return conv;
          
          // Update message sentiment
          const updatedMessages = conv.messages.map(m =>
            m.id === message.id ? { ...m, sentiment: result.sentiment } : m
          );
          
          // Add to sentiment history if changed
          const shouldAddToHistory = conv.currentSentiment !== result.sentiment;
          
          return {
            ...conv,
            messages: updatedMessages,
            currentSentiment: result.sentiment,
            sentimentHistory: shouldAddToHistory 
              ? [...conv.sentimentHistory, { timestamp: new Date(), level: result.sentiment }]
              : conv.sentimentHistory,
            buddySuggestions: [...conv.buddySuggestions, newSuggestion],
          };
        })
      );

      // Show celebration toast when sentiment improves
      if (result.suggestionType === 'celebration') {
        toast({
          title: "Customer sentiment improving! 🎉",
          description: "Great job! Your empathetic response is working.",
        });
      }
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!activeConversationId) return;

    const newMessage: Message = {
      id: `${activeConversationId}-${Date.now()}`,
      content,
      sender: 'agent',
      timestamp: new Date(),
    };

    setConversations(prev => 
      prev.map(conv => {
        if (conv.id !== activeConversationId) return conv;
        
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: content.slice(0, 50) + (content.length > 50 ? '...' : ''),
          lastMessageTime: new Date(),
        };
      })
    );

    toast({
      title: "Message sent! ✨",
      description: isAnalyzing ? "Analyzing sentiment..." : "Sentiment Buddy is ready.",
    });

    // Simulate customer response after a delay (for demo purposes)
    setTimeout(() => {
      simulateCustomerResponse(activeConversationId);
    }, 2000);
  };

  const simulateCustomerResponse = async (conversationId: string) => {
    const responses = [
      "Thanks for your help! This is exactly what I needed.",
      "I'm still not sure this solves my problem...",
      "This is frustrating. I've been waiting too long for a resolution.",
      "Oh that makes sense! I appreciate your patience.",
      "I need to speak with a manager about this issue.",
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    const customerMessage: Message = {
      id: `${conversationId}-customer-${Date.now()}`,
      content: randomResponse,
      sender: 'customer',
      timestamp: new Date(),
    };

    setConversations(prev => 
      prev.map(conv => {
        if (conv.id !== conversationId) return conv;
        return {
          ...conv,
          messages: [...conv.messages, customerMessage],
          lastMessage: randomResponse.slice(0, 50) + (randomResponse.length > 50 ? '...' : ''),
          lastMessageTime: new Date(),
          unreadCount: conv.id === activeConversationId ? 0 : conv.unreadCount + 1,
        };
      })
    );

    // Analyze the new customer message
    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation) {
      const result = await analyzeSentiment(randomResponse, [...conversation.messages, customerMessage]);
      
      if (result) {
        const newSuggestion = createBuddySuggestion(result);
        
        setConversations(prev =>
          prev.map(conv => {
            if (conv.id !== conversationId) return conv;
            
            const updatedMessages = conv.messages.map(m =>
              m.id === customerMessage.id ? { ...m, sentiment: result.sentiment } : m
            );
            
            return {
              ...conv,
              messages: updatedMessages,
              currentSentiment: result.sentiment,
              sentimentHistory: [...conv.sentimentHistory, { timestamp: new Date(), level: result.sentiment }],
              buddySuggestions: [...conv.buddySuggestions, newSuggestion],
            };
          })
        );

        if (result.suggestionType === 'celebration') {
          toast({
            title: "Customer sentiment improving! 🎉",
            description: "Your empathetic response made a difference!",
          });
        } else if (result.suggestionType === 'alert') {
          toast({
            title: "⚠️ Sentiment Alert",
            description: result.buddyMessage,
            variant: "destructive",
          });
        }
      }
    }
  };

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
    
    // Clear unread count
    setConversations(prev =>
      prev.map(conv =>
        conv.id === id ? { ...conv, unreadCount: 0 } : conv
      )
    );
  };

  const activeChats = conversations.filter(c => c.isActive).length;
  const resolvedCount = conversations.filter(c => !c.isActive).length;

  return (
    <div className="h-screen flex flex-col bg-background">
      <DashboardHeader
        activeChats={activeChats}
        totalResolved={resolvedCount}
        avgSentiment="😊"
      />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Chat List Sidebar */}
        <aside className="w-80 bg-card border-r border-border shrink-0">
          <ChatList
            conversations={conversations}
            activeConversationId={activeConversationId}
            onSelectConversation={handleSelectConversation}
          />
        </aside>

        {/* Main Content */}
        {activeConversation && activeCustomer ? (
          <ChatWindow
            conversation={activeConversation}
            customer={activeCustomer}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default Index;
