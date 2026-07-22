import { useAuthStore } from "../store/useAuthStore";
import { Loader2 } from "lucide-react";
import { useState } from "react";

function VerifyPrompt() {
  const { authUser, resendVerificationEmail, logout } = useAuthStore();
  const [isResending, setIsResending] = useState(false);

  const handleResend = async () => {
    setIsResending(true);
    await resendVerificationEmail();
    setIsResending(false);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/80 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full mx-4 border border-slate-700 shadow-2xl">
        <div className="text-center">
          <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Verify Your Email</h2>
          <p className="text-slate-400 mb-6">
            Hi {authUser?.fullName}! Please verify your email address {authUser?.email} to continue using the app.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={handleResend}
              disabled={isResending}
              className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-3 rounded-lg font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isResending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Resending...
                </>
              ) : (
                "Resend Verification Email"
              )}
            </button>
            <button
              onClick={logout}
              className="w-full bg-slate-700 text-slate-300 py-3 rounded-lg font-medium hover:bg-slate-600 transition-all"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyPrompt;
