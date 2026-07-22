import { ArrowLeft, XIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isOnline = onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setSelectedUser(null);
      }
    };

    window.addEventListener("keydown", handleEscKey);

    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [setSelectedUser]);

  return (
    <div className="flex items-center justify-between bg-slate-800/50 border-b border-slate-700/50 px-3 md:px-6 py-3 md:py-4 shrink-0">
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        {/* Mobile Back Button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-700/50 transition-colors"
        >
          <ArrowLeft className="size-5 text-slate-200" />
        </button>

        <div
          className={`avatar ${
            isOnline ? "online" : "offline"
          } shrink-0`}
        >
          <div className="w-10 md:w-12 rounded-full">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
            />
          </div>
        </div>

        <div className="min-w-0">
          <h3 className="text-slate-200 font-medium truncate">
            {selectedUser.fullName}
          </h3>
          <p className="text-slate-400 text-sm">
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <button
        onClick={() => setSelectedUser(null)}
        className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-700/50 transition-colors"
      >
        <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors" />
      </button>
    </div>
  );
}

export default ChatHeader;
