"use client";

import AddTask from "./_components/AddTask/AddTask";
import Header from "./_components/Header/Header";
import { AuthProvider } from "./AuthContext2";
import TodoContent from "./_components/TodoContent";
import withAuth from "./AuthGuard";

const ProtectedTodoContent = withAuth(TodoContent);

export default function Home() {
  return (
    <AuthProvider>
      <Header />
      <div className="pt-32 m-auto flex-col flex items-center">
        <h1 className="text-[32px] font-bold mb-4 text-white">
          Next.js Todo List
        </h1>
        <ProtectedTodoContent />
      </div>
    </AuthProvider>
  );
}