import AddTask from "./_components/AddTask/page";
import Todo from "./_components/Todo/page";
import Header from "./_components/Header/page";
import { supabase } from "../supabase-client";

export default function Home() {

  let signIn;
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
      console.log("SIGNED_IN", session);
      signIn = true;
    }
  });

  return (
    <>
      <Header />
      {signIn ? (
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
