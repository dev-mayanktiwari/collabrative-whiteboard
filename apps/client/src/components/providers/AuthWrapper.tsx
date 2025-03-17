import React, { useEffect } from "react";
import { useAuth } from "~/hooks/useAuth";

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { checkAuth } = useAuth();

  useEffect(() => {
    const checkAuthFn = async () => {
      await checkAuth();
    };
    checkAuthFn();
  }, []); // Empty dependency array ensures this runs only once

  return <div>{children}</div>;
};

export default AuthWrapper;
