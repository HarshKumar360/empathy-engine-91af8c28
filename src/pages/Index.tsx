import { useState, useEffect } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { ChatList } from '@/components/ChatList';
import { ChatWindow } from '@/components/ChatWindow';
import { EmptyState } from '@/components/EmptyState';
import { PriorityQueuePanel } from '@/components/PriorityQueuePanel';
import { mockConversations, mockCustomerInfo, mockNotifications } from '@/data/mockData';
import { Conversation, Message, SentimentLevel, PriorityLevel, ManagerNotification, CustomerInfo, InternalNote } from '@/types/chat';
import { useToast } from '@/hooks/use-toast';
import { useSentimentAnalysis } from '@/hooks/useSentimentAnalysis';

const Index = () => {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [customerInfo, setCustomerInfo] = useState<Record<string, CustomerInfo>>(mockCustomerInfo);
  const [notifications, setNotifications] = useState<ManagerNotification[]>(mockNotifications);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const { toast } = useToast();
  const { analyzeSentiment, createBuddySuggestion, isAnalyzing } = useSentimentAnalysis();

  const activeConversation = conversations.find(c => c.id === activeConversationId);
  const activeCustomer = activeConversationId ? customerInfo[activeConversationId] : null;

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

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
      
      // Update priority based on sentiment
      let newPriority: PriorityLevel = conversation.priority;
      if (result.sentiment === 'escalated') newPriority = 'urgent';
      else if (result.sentiment === 'negative') newPriority = 'high';
      else if (result.sentiment === 'warning') newPriority = 'medium';
      
      setConversations(prev =>
        prev.map(conv => {
          if (conv.id !== conversation.id) return conv;
          
          const updatedMessages = conv.messages.map(m =>
            m.id === message.id ? { ...m, sentiment: result.sentiment } : m
          );
          
          const shouldAddToHistory = conv.currentSentiment !== result.sentiment;
          
          return {
            ...conv,
            messages: updatedMessages,
            currentSentiment: result.sentiment,
            priority: newPriority,
            sentimentHistory: shouldAddToHistory 
              ? [...conv.sentimentHistory, { timestamp: new Date(), level: result.sentiment }]
              : conv.sentimentHistory,
            buddySuggestions: [...conv.buddySuggestions, newSuggestion],
          };
        })
      );

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

    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation) {
      const result = await analyzeSentiment(randomResponse, [...conversation.messages, customerMessage]);
      
      if (result) {
        const newSuggestion = createBuddySuggestion(result);
        
        let newPriority: PriorityLevel = conversation.priority;
        if (result.sentiment === 'escalated') newPriority = 'urgent';
        else if (result.sentiment === 'negative') newPriority = 'high';
        
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
              priority: newPriority,
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
    setConversations(prev =>
      prev.map(conv =>
        conv.id === id ? { ...conv, unreadCount: 0 } : conv
      )
    );
  };

  const handleEscalate = (reason: string, priority: PriorityLevel) => {
    if (!activeConversationId || !activeConversation) return;

    const newNotification: ManagerNotification = {
      id: `notif-${Date.now()}`,
      conversationId: activeConversationId,
      customerName: activeConversation.customerName,
      reason,
      priority,
      timestamp: new Date(),
      isRead: false,
    };

    setNotifications(prev => [newNotification, ...prev]);
    
    setConversations(prev =>
      prev.map(conv => {
        if (conv.id !== activeConversationId) return conv;
        return {
          ...conv,
          priority,
          escalation: {
            status: 'escalated',
            escalatedAt: new Date(),
            escalatedBy: 'Agent',
            managerAssigned: 'Manager Jane',
            reason,
          },
        };
      })
    );

    toast({
      title: "Escalation sent 📨",
      description: "Manager has been notified and will assist shortly.",
    });
  };

  const handleResolveEscalation = () => {
    if (!activeConversationId) return;

    setConversations(prev =>
      prev.map(conv => {
        if (conv.id !== activeConversationId) return conv;
        return {
          ...conv,
          escalation: {
            ...conv.escalation,
            status: 'resolved',
            resolvedAt: new Date(),
          },
        };
      })
    );

    toast({
      title: "Escalation resolved ✅",
      description: "Great job handling this situation!",
    });
  };

  const handleAddNote = (content: string) => {
    if (!activeConversationId) return;

    const newNote: InternalNote = {
      id: `note-${Date.now()}`,
      content,
      authorName: 'Current Agent',
      authorInitials: 'CA',
      timestamp: new Date(),
    };

    setCustomerInfo(prev => ({
      ...prev,
      [activeConversationId]: {
        ...prev[activeConversationId],
        internalNotes: [...(prev[activeConversationId].internalNotes || []), newNote],
      },
    }));

    toast({
      title: "Note added 📝",
      description: "Your internal note has been saved.",
    });
  };

  const handleDeleteNote = (noteId: string) => {
    if (!activeConversationId) return;

    setCustomerInfo(prev => ({
      ...prev,
      [activeConversationId]: {
        ...prev[activeConversationId],
        internalNotes: (prev[activeConversationId].internalNotes || []).filter(n => n.id !== noteId),
      },
    }));

    toast({
      title: "Note deleted",
      description: "The internal note has been removed.",
    });
  };

  const handleTogglePinNote = (noteId: string) => {
    if (!activeConversationId) return;

    setCustomerInfo(prev => ({
      ...prev,
      [activeConversationId]: {
        ...prev[activeConversationId],
        internalNotes: (prev[activeConversationId].internalNotes || []).map(n =>
          n.id === noteId ? { ...n, isPinned: !n.isPinned } : n
        ),
      },
    }));
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleDismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const activeChats = conversations.filter(c => c.isActive).length;
  const resolvedCount = conversations.filter(c => !c.isActive).length;
  const urgentCount = conversations.filter(c => c.priority === 'urgent' && c.isActive).length;
  const escalatedCount = conversations.filter(c => c.escalation.status === 'escalated').length;

  return (
    <div className="h-screen flex flex-col bg-background">
      <DashboardHeader
        activeChats={activeChats}
        totalResolved={resolvedCount}
        avgSentiment="😊"
        urgentCount={urgentCount}
        escalatedCount={escalatedCount}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        onViewConversation={handleSelectConversation}
        onDismissNotification={handleDismissNotification}
      />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Chat List Sidebar */}
        <aside className="w-80 bg-card border-r border-border shrink-0 flex flex-col">
          <div className="flex-1 overflow-hidden">
            <ChatList
              conversations={conversations}
              activeConversationId={activeConversationId}
              onSelectConversation={handleSelectConversation}
            />
          </div>
          <PriorityQueuePanel
            conversations={conversations}
            onSelectConversation={handleSelectConversation}
          />
        </aside>

        {/* Main Content */}
        {activeConversation && activeCustomer ? (
          <ChatWindow
            conversation={activeConversation}
            customer={activeCustomer}
            onSendMessage={handleSendMessage}
            onEscalate={handleEscalate}
            onResolveEscalation={handleResolveEscalation}
            onAddNote={handleAddNote}
            onDeleteNote={handleDeleteNote}
            onTogglePinNote={handleTogglePinNote}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default Index;
