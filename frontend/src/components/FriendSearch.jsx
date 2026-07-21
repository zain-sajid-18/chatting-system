import { useState } from "react";
import { Search, UserPlus, Check, X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

function FriendSearch() {
  const [searchEmail, setSearchEmail] = useState("");
  const { searchUser, searchedUser, isSearching, sendFriendRequest, setSelectedUser } = useChatStore();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchEmail.trim()) {
      searchUser(searchEmail);
    }
  };

  return (
    <div className="p-4 border-b border-slate-700/50">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="email"
          placeholder="Search user by email..."
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="flex-1 bg-slate-700/50 text-slate-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <button
          type="submit"
          disabled={isSearching}
          className="bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Search className="size-5" />
        </button>
      </form>

      {searchedUser && (
        <div className="mt-4 bg-slate-700/30 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="size-10 rounded-full">
                  <img src={searchedUser.user.profilePic || "/avatar.png"} />
                </div>
              </div>
              <div>
                <p className="text-slate-200 font-medium">{searchedUser.user.fullName}</p>
                <p className="text-slate-400 text-xs">{searchedUser.user.email}</p>
              </div>
            </div>
            {searchedUser.isFriend ? (
              <button
                onClick={() => setSelectedUser(searchedUser.user)}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Chat
              </button>
            ) : searchedUser.hasSentRequest ? (
              <span className="text-slate-400 text-sm flex items-center gap-1">
                <Check className="size-4" /> Request Sent
              </span>
            ) : (
              <button
                onClick={() => sendFriendRequest(searchedUser.user._id)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-1"
              >
                <UserPlus className="size-4" /> Add Friend
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FriendSearch;