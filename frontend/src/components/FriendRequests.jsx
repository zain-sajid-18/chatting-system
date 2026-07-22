import { useEffect, useState } from "react";
import { Check, X, XCircle } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

function FriendRequests() {
  const { 
    friendRequests, 
    sentFriendRequests, 
    getFriendRequests, 
    getSentFriendRequests,
    acceptFriendRequest, 
    rejectFriendRequest,
    cancelFriendRequest
  } = useChatStore();
  const [activeTab, setActiveTab] = useState("received");

  useEffect(() => {
    getFriendRequests();
    getSentFriendRequests();
  }, [getFriendRequests, getSentFriendRequests]);

  // Always show friend requests section, even if empty

  return (
    <div className="p-3 md:p-4 border-b border-slate-700/50 shrink-0">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-slate-300 text-sm font-medium">Friend Requests</h3>
      </div>
      
      <div className="flex gap-2 mb-3">
        <button
        onClick={() => setActiveTab("received")}
        className={`text-xs px-3 py-2 rounded-full transition-colors min-h-[40px] ${activeTab === "received" 
          ? "bg-cyan-500/20 text-cyan-400" 
          : "text-slate-400 hover:text-slate-300"}`}
      >
        Received ({friendRequests.length})
      </button>
      <button
        onClick={() => setActiveTab("sent")}
        className={`text-xs px-3 py-2 rounded-full transition-colors min-h-[40px] ${activeTab === "sent" 
          ? "bg-cyan-500/20 text-cyan-400" 
          : "text-slate-400 hover:text-slate-300"}`}
      >
        Sent ({sentFriendRequests.length})
      </button>
      </div>

      <div className="space-y-2">
        {activeTab === "received" ? (
          friendRequests.map((req) => (
            <div key={req.sender._id} className="bg-slate-700/30 p-3 rounded-lg flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="avatar shrink-0">
                  <div className="size-8 rounded-full">
                    <img src={req.sender.profilePic || "/avatar.png"} alt={req.sender.fullName} />
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="text-slate-200 text-sm truncate">{req.sender.fullName}</p>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => acceptFriendRequest(req.sender._id)}
                  className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors min-h-[44px] min-w-[44px]"
                >
                  <Check className="size-5" />
                </button>
                <button
                  onClick={() => rejectFriendRequest(req.sender._id)}
                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors min-h-[44px] min-w-[44px]"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          sentFriendRequests.map((req) => (
            <div key={req.receiver._id} className="bg-slate-700/30 p-3 rounded-lg flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="avatar shrink-0">
                  <div className="size-8 rounded-full">
                    <img src={req.receiver.profilePic || "/avatar.png"} alt={req.receiver.fullName} />
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="text-slate-200 text-sm truncate">{req.receiver.fullName}</p>
                </div>
              </div>
              <button
                onClick={() => cancelFriendRequest(req.receiver._id)}
                className="bg-slate-600 hover:bg-slate-500 text-white p-2 rounded-lg transition-colors min-h-[44px] min-w-[44px] shrink-0"
                className="bg-slate-600 hover:bg-slate-500 text-white p-2 rounded-lg transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
              >
                <XCircle className="size-5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FriendRequests;