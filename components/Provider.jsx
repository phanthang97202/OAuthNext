"use client";
import { SessionProvider } from "next-auth/react";

// tạo session dùng chung cho toàn bộ app

const Provider = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
