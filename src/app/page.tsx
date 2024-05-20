'use client'
import AddTask from "./_components/AddTask/page";
import Todo from "./_components/Todo/page";
import Header from "./_components/Header/page";
import { supabase } from "../supabase-client";
import { useEffect } from "react";

export default function Home() {
  useEffect(()=>{
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
      }
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  },[])

    const GitHubSignIn =  () => {
 supabase.auth.signInWithOAuth({
      provider: "github",
    })
  };

  const signOut = () => {
    supabase.auth.signOut();
  };

  return (
    <>
      <Header signOut={signOut} GitHubSignIn={GitHubSignIn} />
      <div className="pt-32 w-[500px] m-auto flex-col flex items-center">
        <h1 className="text-[32px] font-bold mb-4 text-white">
          Next.js Todo List
        </h1>
        <AddTask />
        <Todo />
      </div>
    </>
  );
}
