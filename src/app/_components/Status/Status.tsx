import React from "react";
import { useRouter } from "next/navigation";

const statusTodo = async (status: string, id: number) => {
  const res = await fetch(`http://localhost:3002/api/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify({ status, id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

export default function Status({
  todoId,
  statusValue,
}: {
  todoId: number;
  statusValue: string;
}) {
  const router = useRouter();

  const handleStatus = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const statusValue = e.target.value;
    await statusTodo(statusValue, todoId);
    router.push("/");
    router.refresh();
  };
  return (
    <div>
      <select
        className={` bg-transparent text-white  border p-1 rounded mr-2`}
        name=""
        id=""
        value={statusValue}
        onChange={(e) => handleStatus(e)}
      >
        <option value="未着手">未着手</option>
        <option value="進行中">進行中</option>
        <option value="完了">完了</option>
      </select>
    </div>
  );
}
