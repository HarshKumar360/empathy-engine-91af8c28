import { useState } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { ChatList } from '@/components/ChatList';
import { ChatWindow } from '@/components/ChatWindow';
import { EmptyState } from '@/components/EmptyState';
import { mockConversations, mockCustomerInfo } from '@/data/mockData';
import { Conversation, Message } from '@/types/chat';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const { toast } = useToast();

  const activeConversation = conversations.find(c => c.id === activeConversationId);
  const activeCustomer = activeConversationId ? mockCustomerInfo[activeConversationId] : null;

  const handleSendMessage = (content: string) => {
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

    // Simulate sentiment improvement feedback
    toast({
      title: "Message sent! ✨",
      description: "Sentiment Buddy is analyzing the customer's response...",
    });
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
