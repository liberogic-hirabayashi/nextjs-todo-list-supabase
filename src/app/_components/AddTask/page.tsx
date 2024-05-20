"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const buttonStyle = `border p-1 px-4 rounded text-white`;

const postTodo = async (title: string, status: string) => {
  const res = await fetch("http://localhost:3002/api/todos", {
    method: "POST",
    body: JSON.stringify({ title, status }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  console.log(data.posts);
  return data;
};

export default function Page() {
  const [tasktitle, setTaskTitle] = useState<string>("");

  const router = useRouter();

  const handleClick = async (e: React.FormEvent) => {
    if (tasktitle != "") {
      e.preventDefault();
      await postTodo(tasktitle, "");
      await router.refresh();
      setTaskTitle("");
    }
  };

  return (
    <form onSubmit={handleClick}>
      <input
        type="text"
        value={tasktitle}
        onChange={(e) => {
          setTaskTitle(e.target.value);
        }}
        className="border rounded p-1 mr-4 w-60"
      />
      <button className={buttonStyle}>追加</button>
    </form>
  );
}
