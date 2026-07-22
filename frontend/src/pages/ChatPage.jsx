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
  const {
    activeTab,
    selectedUser,
    allContacts,
    getAllContacts,
    getMyChatPartners,
  } = useChatStore();

  useEffect(() => {
    getAllContacts();
    getMyChatPartners();
  }, [getAllContacts, getMyChatPartners]);

  return (
    <div className="relative w-full max-w-7xl h-[100dvh] md:h-[90vh] p-0 md:p-2">
      <BorderAnimatedContainer className="h-full">
        {/* LEFT SIDE - Contacts */}
        <div
          className={`${
            selectedUser ? "hidden md:flex" : "flex"
          } w-full md:w-80 bg-slate-800/50 backdrop-blur-sm flex-col h-full`}
        >
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
                <p className="text-xs mt-1">
                  Search and add friends to start chatting!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE - Chat */}
        <div
          className={`${
            selectedUser ? "flex" : "hidden md:flex"
          } flex-1 flex-col bg-slate-900/50 backdrop-blur-sm h-full overflow-hidden`}
        >
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}

export default ChatPage;