import { useState } from "react";
import { X, Trash2, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

function ProfileModal({ isOpen, onClose }) {
  const { authUser, deleteAccount } = useAuthStore();
  const [isConfirming, setIsConfirming] = useState(false);

  if (!isOpen) return null;

  const handleDelete = async () => {
    await deleteAccount();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-md border border-slate-700 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <User className="size-5" />
            Profile
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="size-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="avatar">
              <div className="size-20 rounded-full">
                <img src={authUser.profilePic || "/avatar.png"} alt={authUser.fullName} />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-100">{authUser.fullName}</h3>
              <p className="text-slate-400 text-sm">{authUser.email}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-700">
            <h4 className="text-slate-300 text-sm font-medium mb-3">Account Settings</h4>

            {!isConfirming ? (
              <button
                onClick={() => setIsConfirming(true)}
                className="w-full bg-red-600/20 text-red-400 hover:bg-red-600/30 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="size-5" />
                Delete Account
              </button>
            ) : (
              <div className="space-y-3">
                <p className="text-slate-400 text-sm text-center">
                  Are you sure you want to delete your account? This action cannot be undone.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsConfirming(false)}
                    className="flex-1 bg-slate-700 text-slate-200 py-2 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
