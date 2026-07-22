import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import VerifyEmail from "./pages/VerifyEmail";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import PageLoader from "./components/PageLoader";
import VerifyPrompt from "./components/VerifyPrompt";

import { Toaster } from "react-hot-toast";

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();
  const location = useLocation();
  const isVerifyEmailPage = location.pathname === "/verify-email";

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !isVerifyEmailPage) return <PageLoader />;

  const isEmailVerified = authUser?.emailVerified;

  return (
    <div className="h-full bg-slate-900 relative flex items-center justify-center p-2 sm:p-4 overflow-hidden">
      {/* DECORATORS - GRID BG & GLOW SHAPES */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />

      {authUser && !isEmailVerified && !isVerifyEmailPage && <VerifyPrompt />}

      <Routes>
        <Route path="/" element={authUser && isEmailVerified ? <ChatPage /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>

      <Toaster />
    </div>
  );
}
export default App;
