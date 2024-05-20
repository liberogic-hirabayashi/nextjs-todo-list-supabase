"use client"
import React, { useContext, useState, useEffect } from "react";
import { supabase } from "./supabase-client";
import Header from "./app/_components/Header/page";
import AddTask from "./app/_components/AddTask/page";
import Todo from "./app/_components/Todo/page";


const SessionContext = React.createContext(null);

export function AuthContext() {
  const [session, setSession] = React.useState(null);

  React.useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange(
      (event, session: any) => {
        if (event === "SIGNED_OUT") {
          setSession(null);
        } else if (session) {
          setSession(session);
        }
      }
    );

    return () => {
      subscription;
    };
  }, []);

  return (
    <SessionContext.Provider value={session}>
      <Header value={session} />
      <p className="text-white">
      {session?"サインイン":"サインアウト"}
      </p>
    </SessionContext.Provider>
  );
}
