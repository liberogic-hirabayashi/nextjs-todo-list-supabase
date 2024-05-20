"use client";
import AddTask from "./_components/AddTask/page";
import Todo from "./_components/Todo/page";
import Header from "./_components/Header/page";
import { supabase } from "../supabase-client";
import { useEffect, useState } from "react";

export default function Home() {
  const [signIn, setSignIn] = useState<boolean>(false);

  const GitHubSignIn = () => {
    supabase.auth.signInWithOAuth({
      provider: "github",
    });
    setSignIn(true);
    console.log("サインイン", signIn);
  };

  const signOut = () => {
    supabase.auth.signOut();
    setSignIn(false);
    console.log("サインアウト", signIn);
  };

  return (
    <>
      <Header signOut={signOut} GitHubSignIn={GitHubSignIn} />

      {signIn === true ? (
        <div className="pt-32 w-[500px] m-auto flex-col flex items-center">
          <h1 className="text-[32px] font-bold mb-4 text-white">
            Next.js Todo List
          </h1>
          <AddTask />
          <Todo />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
