import { useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button } from "@repo/ui";
import ShapesDecoration from "~/components/neutral/ShapeDecoration";
import useVerifyEmail from "~/hooks/useVerifyEmail";
import NavBar from "../neutral/NavBar";

export default function EmailVerification() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const token = searchParams.get("token");
  const code = searchParams.get("code");
  const { verifyEmail, isLoading, isSuccess, errorMessage } = useVerifyEmail();

  // Add a ref to track if verification has been attempted
  const hasAttemptedVerification = useRef(false);

  useEffect(() => {
    // Only verify email if token and code exist AND verification hasn't been attempted yet
    if (token && code && !hasAttemptedVerification.current) {
      verifyEmail({ token, code });
      hasAttemptedVerification.current = true; // Mark verification as attempted
    }
  }, [token, code]); // Remove verifyEmail from dependencies

  useEffect(() => {
    if (isSuccess) {
      redirectTimeoutRef.current = setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, [isSuccess, navigate]);

  const verificationState = isLoading
    ? "loading"
    : isSuccess
      ? "success"
      : "error";
  const message =
    !token || !code
      ? "Invalid verification link. Please request a new verification email."
      : isLoading
        ? "Verifying your email address..."
        : isSuccess
          ? "Your email has been successfully verified!"
          : errorMessage ||
            "We couldn't verify your email. The link may have expired or is invalid.";

  return (
    <div className="relative min-h-screen bg-[#FFFAE0] overflow-hidden">
      <ShapesDecoration />
      <NavBar />
      <main className="relative z-10 px-6 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
            {verificationState === "loading" && (
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 bg-[#FFE156] border-3 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <Loader2 className="h-10 w-10 animate-spin" />
                </div>
                <h2 className="text-2xl font-black mb-2">
                  Verifying Your Email
                </h2>
                <p className="text-lg">{message}</p>
              </div>
            )}
            {verificationState === "success" && (
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 bg-[#B8E0D2] border-3 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <CheckCircle className="h-10 w-10" />
                </div>
                <h2 className="text-2xl font-black mb-2">Email Verified!</h2>
                <p className="text-lg">{message}</p>
                <Button onClick={() => navigate("/login")}>Go to login</Button>
              </div>
            )}
            {verificationState === "error" && (
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 bg-[#FFD1D1] border-3 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <XCircle className="h-10 w-10" />
                </div>
                <h2 className="text-2xl font-black mb-2">
                  Verification Failed
                </h2>
                <p className="text-lg">{message}</p>
                <div className="flex gap-4 mt-4 justify-center">
                  <Button onClick={() => navigate("/login")}>
                    Back to Login
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
