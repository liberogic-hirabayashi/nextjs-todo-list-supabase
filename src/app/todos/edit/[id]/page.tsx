"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Status from "../../../_components/Status/page";

const buttonStyle = `border p-1 px-4 rounded text-white`;

const editTodo = async (title: string | undefined, id: number) => {
  const res = await fetch(`http://localhost:3002/api/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};
const deleteTodo = async (id: number) => {
  const res = await fetch(`http://localhost:3002/api/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};
const getStatusValue = async (id: number) => {
  const res = await fetch(`http://localhost:3002/api/todos/${id}`);
  const data = await res.json();
  return await data.posts.status;
};

const getTodoById = async (id: number) => {
  const res = await fetch(`http://localhost:3002/api/todos/${id}`);
  const data = await res.json();
  return await data.posts;
};


export default function Page({ params }: { params: { id: number,status:string } }) {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const [todoStatus, setTodoStatus] = useState<string>("");

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    await editTodo(titleRef.current?.value, params.id);
    await getStatusValue(params.id)
    router.push("/");
    router.refresh();
  };

  const handleDelete = async () => {
    await deleteTodo(params.id);
    router.push("/");
    router.refresh();
  };

  useEffect(() => {
    getTodoById(params.id)
      .then((data) => {
        setTodoStatus(data.status)
        titleRef.current!.value = data.title;
      })
      .catch((err) => {
        console.error("エラーが発生しました", { id: "1" });
      }),
      [];
  });

  return (
    <div className="mt-40">
      <h1 className="text-center mb-4 text-white bold text-[32px] font-bold">
        Todo 編集
      </h1>
      <form onSubmit={handleEdit} className="flex justify-center ">
        <input type="text" ref={titleRef} className="border rounded w-60" />
        <div className="ml-4 flex items-center">
          <Status todoId={params.id} statusValue={todoStatus} />

          <button className={`${buttonStyle} mr-1 text-green-500`}>編集</button>
          <button
            type="button"
            onClick={handleDelete}
            className={`${buttonStyle} text-red-500`}
          >
            削除
          </button>
        </div>
      </form>
    </div>
  );
}
