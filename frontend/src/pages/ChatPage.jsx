import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";

import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";
import FriendSearch from "../components/FriendSearch";
import FriendRequests from "../components/FriendRequests";

function ChatPage() {
  const { activeTab, selectedUser, allContacts, getAllContacts, getMyChatPartners } = useChatStore();

  useEffect(() => {
    getAllContacts();
    getMyChatPartners();
  }, [getAllContacts, getMyChatPartners]);

  return (
    <div className="w-full h-full md:h-[90vh] md:max-w-7xl">
      <BorderAnimatedContainer>
        {/* LEFT SIDE - Contacts (only show on mobile if no selected user) */}
        <div className={`${selectedUser ? "hidden md:flex" : "flex"} w-full md:w-80 bg-slate-800/50 backdrop-blur-sm flex-col h-full`}>
          <ProfileHeader />
          <FriendSearch />
          <FriendRequests />
          <ActiveTabSwitch />

          <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-2">
            {activeTab === "chats" ? (
              <ChatsList />
            ) : allContacts.length > 0 ? (
              <ContactList />
            ) : (
              <div className="text-center text-slate-400 py-10">
                <p className="text-sm">No friends yet</p>
                <p className="text-xs mt-1">Search and add friends to start chatting!</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE - Chat (show on mobile if selected user) */}
        <div className={`${selectedUser ? "flex" : "hidden md:flex"} flex-1 flex-col bg-slate-900/50 backdrop-blur-sm h-full`}>
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}
export default ChatPage;
