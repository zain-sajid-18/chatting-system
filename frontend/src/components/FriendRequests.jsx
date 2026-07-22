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

  if (friendRequests.length === 0 && sentFriendRequests.length === 0) return null;

  return (
    <div className="p-4 border-b border-slate-700/50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-slate-300 text-sm font-medium">Friend Requests</h3>
      </div>
      
      <div className="flex gap-2 mb-3">
        <button
        onClick={() => setActiveTab("received")}
        className={`text-xs px-3 py-1 rounded-full transition-colors ${activeTab === "received" 
          ? "bg-cyan-500/20 text-cyan-400" 
          : "text-slate-400 hover:text-slate-300"}`}
      >
        Received ({friendRequests.length})
      </button>
      <button
        onClick={() => setActiveTab("sent")}
        className={`text-xs px-3 py-1 rounded-full transition-colors ${activeTab === "sent" 
          ? "bg-cyan-500/20 text-cyan-400" 
          : "text-slate-400 hover:text-slate-300"}`}
      >
        Sent ({sentFriendRequests.length})
      </button>
      </div>

      <div className="space-y-2">
        {activeTab === "received" ? (
          friendRequests.map((req) => (
            <div key={req.sender._id} className="bg-slate-700/30 p-3 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="avatar">
                  <div className="size-8 rounded-full">
                    <img src={req.sender.profilePic || "/avatar.png"} alt={req.sender.fullName} />
                  </div>
                </div>
                <div>
                  <p className="text-slate-200 text-sm">{req.sender.fullName}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => acceptFriendRequest(req.sender._id)}
                  className="bg-green-600 hover:bg-green-700 text-white p-1 rounded-lg transition-colors"
                >
                  <Check className="size-4" />
                </button>
                <button
                  onClick={() => rejectFriendRequest(req.sender._id)}
                  className="bg-red-600 hover:bg-red-700 text-white p-1 rounded-lg transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          sentFriendRequests.map((req) => (
            <div key={req.receiver._id} className="bg-slate-700/30 p-3 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="avatar">
                  <div className="size-8 rounded-full">
                    <img src={req.receiver.profilePic || "/avatar.png"} alt={req.receiver.fullName} />
                  </div>
                </div>
                <div>
                  <p className="text-slate-200 text-sm">{req.receiver.fullName}</p>
                </div>
              </div>
              <button
                onClick={() => cancelFriendRequest(req.receiver._id)}
                className="bg-slate-600 hover:bg-slate-500 text-white p-1 rounded-lg transition-colors"
              >
                <XCircle className="size-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FriendRequests;