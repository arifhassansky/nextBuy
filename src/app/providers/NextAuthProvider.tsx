"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

interface NextAuthProviderProps {
  children: ReactNode;
}

const NextAuthProvider: React.FC<NextAuthProviderProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
