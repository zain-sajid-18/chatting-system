import { useEffect } from "react";
import { Check, X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

function FriendRequests() {
  const { friendRequests, getFriendRequests, acceptFriendRequest, rejectFriendRequest } = useChatStore();

  useEffect(() => {
    getFriendRequests();
  }, [getFriendRequests]);

  if (friendRequests.length === 0) return null;

  return (
    <div className="p-4 border-b border-slate-700/50">
      <h3 className="text-slate-300 text-sm font-medium mb-3">Friend Requests</h3>
      <div className="space-y-2">
        {friendRequests.map((req) => (
          <div key={req.sender._id} className="bg-slate-700/30 p-3 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="avatar">
                <div className="size-8 rounded-full">
                  <img src={req.sender.profilePic || "/avatar.png"} />
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
        ))}
      </div>
    </div>
  );
}

export default FriendRequests;