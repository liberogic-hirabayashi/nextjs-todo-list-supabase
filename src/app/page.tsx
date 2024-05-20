"use client";
import AddTask from "./_components/AddTask/page";
import Todo from "./_components/Todo/page";
import Header from "./_components/Header/page";
import { supabase } from "../supabase-client";
import { useEffect, useState } from "react";
import { AuthChangeEvent } from "@supabase/supabase-js";

export default function Home() {
  const [signIn, setSignIn] = useState(false);
  useEffect(() => {
    supabase.auth.onAuthStateChange((event: AuthChangeEvent, session) => {
      if (event === "SIGNED_IN") {
        setSignIn(true);
      }
      console.log(event);
    });
  });

  const GitHubSignIn = () => {
    supabase.auth.signInWithOAuth({
      provider: "github",
    });
  };

  const signOut = () => {
    supabase.auth.signOut();
    setSignIn(false);
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
