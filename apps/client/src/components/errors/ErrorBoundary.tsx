import { Mail, RefreshCw } from "lucide-react";
import { Button } from "@repo/ui";
import NavBar from "../neutral/NavBar";

// Error Fallback Component
function ErrorFallbackComponent({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 rounded-lg">
        <NavBar />

        {/* Error Message */}
        <div className="text-center mb-8">
          <h2 className="text-6xl font-black text-pink-300 mb-4">
            Oops! Something Went Wrong
          </h2>
          <p className="text-xl text-gray-700 mb-6">
            An unexpected error occurred in the application.
          </p>

          {/* Error Details */}
          <div className="bg-gray-100 border border-gray-200 p-4 rounded-lg mb-6 text-left">
            <h3 className="font-bold text-lg mb-2">Error Details:</h3>
            <pre className="text-sm text-red-600 overflow-x-auto">
              {error.message}
            </pre>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-4">
          {/* Contact Button */}
          <Button
            onClick={() =>
              (window.location.href = "mailto:support@smartdraw.com")
            }
            className="
              bg-blue-200 hover:bg-blue-300 
              border-3 border-black 
              font-bold
              shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]
              hover:translate-y-1 
              hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
              transition-all
            "
          >
            <Mail className="h-5 w-5 mr-2" />
            Contact Support
          </Button>

          {/* Retry Button */}
          <Button
            onClick={resetErrorBoundary}
            className="
              bg-yellow-300 hover:bg-yellow-400 
              border-3 border-black 
              font-bold
              shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]
              hover:translate-y-1 
              hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
              transition-all
            "
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Try Again
          </Button>
        </div>

        {/* Additional Support Information */}
        <div className="text-center mt-8 text-gray-600">
          <p>
            If the problem persists, please contact us at{" "}
            <a
              href="mailto:support@smartdraw.com"
              className="text-blue-600 hover:underline"
            >
              support@smartdraw.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ErrorFallbackComponent;

// // Example Component with Potential Error
// function PotentiallyErroredComponent() {
//   const triggerError = () => {
//     throw new Error("Intentional error for demonstration");
//   };

//   return (
//     <div>
//       <h1>Possibly Risky Component</h1>
//       <button onClick={triggerError}>Trigger Error</button>
//     </div>
//   );
// }

// // Main App or Page Component
// function MyComponent() {
//   const handleError = (error: Error, info: { componentStack: string }) => {
//     // Optional: Log error to service
//     console.error("Caught an error:", error, info);
//   };

//   return (
//     <ErrorBoundary
//       FallbackComponent={ErrorFallback}
//       onError={handleError}
//       onReset={() => {
//         // Optional: Reset any state if needed
//       }}
//     >
//       <PotentiallyErroredComponent />
//     </ErrorBoundary>
//   );
// }

// export default MyComponent;
