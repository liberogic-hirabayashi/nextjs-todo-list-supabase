"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../../supabase-client";

const buttonStyle = `border p-1 px-4 rounded text-white`;

export default function Page({
  signOut,
  GitHubSignIn,
}: {
  signOut: any;
  GitHubSignIn: any;
}) {
  const [session, setSession] = useState<any>();
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener;
    };
  }, []);

  return (
    <header className="sticky flex text-white justify-center border-b">
      <div className="flex items-center justify-end w-full h-16 max-w-3xl px-4 mx-auto sm:px-6">
        {session ? (
          <button onClick={signOut} className={buttonStyle}>
            サインアウト
          </button>
        ) : (
          <button onClick={GitHubSignIn} className={buttonStyle}>
            GitHubでログイン
          </button>
        )}
      </div>
    </header>
  );
}
