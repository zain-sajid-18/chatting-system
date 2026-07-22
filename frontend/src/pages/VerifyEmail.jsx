import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [errorMessage, setErrorMessage] = useState("");
  const hasVerified = useRef(false);

  const verifyEmail = useCallback(async () => {
    if (hasVerified.current) return;
    hasVerified.current = true;

    const token = searchParams.get("token");
    const email = searchParams.get("email");
    
    if (!token || !email) {
      setStatus("error");
      setErrorMessage("Invalid verification link");
      return;
    }

    try {
      await axiosInstance.get(`/auth/verify-email?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`);
      setStatus("success");
      toast.success("Email verified successfully! You can now log in.");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.response?.data?.message || "Something went wrong");
      toast.error(error.response?.data?.message || "Failed to verify email");
    }
  }, [searchParams]);

  useEffect(() => {
    verifyEmail();
  }, [verifyEmail]);

  return (
    <div className="relative w-full max-w-2xl">
      <BorderAnimatedContainer>
        <div className="bg-slate-800/50 backdrop-blur-sm p-8 text-center">
          {status === "loading" && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-300">Verifying your email...</p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center gap-6">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Email Verified!</h2>
                <p className="text-slate-400 mb-6">Your email has been successfully verified. You can now log in to your account.</p>
              </div>
              <Link 
                to="/login" 
                className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-8 py-3 rounded-lg font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all"
              >
                Go to Login
              </Link>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center gap-6">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Verification Failed</h2>
                <p className="text-slate-400 mb-6">{errorMessage}. The link may be invalid or expired.</p>
              </div>
              <div className="flex gap-4">
                <Link 
                  to="/login" 
                  className="bg-slate-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-600 transition-all"
                >
                  Go to Login
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-6 py-2 rounded-lg font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all"
                >
                  Sign Up Again
                </Link>
              </div>
            </div>
          )}
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}

export default VerifyEmail;