import { useState } from "react";
import { Search, UserPlus, X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

function FriendSearch() {
  const [searchEmail, setSearchEmail] = useState("");

  const {
    searchUser,
    searchedUser,
    isSearching,
    sendFriendRequest,
    cancelFriendRequest,
    setSelectedUser,
  } = useChatStore();

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchEmail.trim()) {
      searchUser(searchEmail.trim());
    }
  };

  return (
    <div className="p-3 md:p-4 border-b border-slate-700/50 shrink-0">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="email"
          placeholder="Search user by email..."
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="flex-1 min-w-0 bg-slate-700/50 text-slate-200 px-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 min-h-[44px]"
        />

        <button
          type="submit"
          disabled={isSearching}
          className="bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white px-3 md:px-4 py-3 md:py-2 rounded-lg transition-colors min-h-[44px] shrink-0"
        >
          <Search className="size-5" />
        </button>
      </form>

      {searchedUser && (
        <div className="mt-4 bg-slate-700/30 p-3 md:p-4 rounded-lg">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <div className="avatar shrink-0">
                <div className="size-10 rounded-full">
                  <img
                    src={searchedUser.user.profilePic || "/avatar.png"}
                    alt={searchedUser.user.fullName}
                  />
                </div>
              </div>

              <div className="min-w-0">
                <p className="text-slate-200 font-medium truncate">
                  {searchedUser.user.fullName}
                </p>

                <p className="text-slate-400 text-xs truncate">
                  {searchedUser.user.email}
                </p>
              </div>
            </div>

            {searchedUser.isFriend ? (
              <button
                onClick={() => setSelectedUser(searchedUser.user)}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-3 md:px-4 py-2 rounded-lg text-sm transition-colors min-h-[44px] shrink-0"
              >
                Chat
              </button>
            ) : searchedUser.hasSentRequest ? (
              <button
                onClick={() =>
                  cancelFriendRequest(searchedUser.user._id)
                }
                className="bg-slate-600 hover:bg-slate-500 text-white px-3 md:px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-1 min-h-[44px] shrink-0"
              >
                <X className="size-4" />
                Cancel
              </button>
            ) : (
              <button
                onClick={() =>
                  sendFriendRequest(searchedUser.user._id)
                }
                className="bg-green-600 hover:bg-green-700 text-white px-3 md:px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-1 min-h-[44px] shrink-0"
              >
                <UserPlus className="size-4" />
                Add
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FriendSearch;
