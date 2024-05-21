"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext2";
import { Todos } from "../../types";
import AddTask from "../AddTask/AddTask";

const statusStyle = `border text-sm p-1 rounded min-w-[50px] text-center`;

export default function TodoContent() {
  const { session } = useAuth();
  if (!session) throw "Session Required";

  const [data, setData] = useState<any[] | null>(null);
  const { addTask } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}todos`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const res = await response.json();
        const data = res.posts;
        setData(data);
      } catch (error) {
      } finally {
      }
    };
    fetchData();
  }, [addTask]);

  const todos = data;
  return (
    <div className="text-white">
      {session ? (
        <div>
          <AddTask />
          <ul className=" w-[400px] mt-10">
            {todos !== null &&
              todos.map((todo: Todos) => (
                <li
                  key={todo.id}
                  className="pb-2 pl-4  border-b border-[#ffffff33] mt-4 text-white "
                >
                  <Link
                    className="hover:text-cyan-300 text-lg flex justify-between"
                    href={`/todos/edit/${todo.id}`}
                  >
                    {todo.title}
                    {todo.status === "完了" && (
                      <span className={`${statusStyle} text-blue-500`}>
                        {todo.status}
                      </span>
                    )}
                    {todo.status === "進行中" && (
                      <span className={`${statusStyle} text-green-500`}>
                        {todo.status}
                      </span>
                    )}
                    {todo.status === "未着手" && (
                      <span className={`${statusStyle} text-red-500`}>
                        {todo.status}
                      </span>
                    )}
                    {todo.status === "" && (
                      <span className={`${statusStyle} text-red-500`}>
                        未着手
                      </span>
                    )}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
