import { TodoItem } from "@/components/TodoItem"
import { prisma } from "@/db"
import Link from "next/link"

function getTodos() {
  return prisma.todo.findMany({ where: { complete: false, }, })

}


async function toggleTodo(id: string, complete: boolean) {
  "use server"

  await prisma.todo.update({ where: { id }, data: { complete } });
}

export default async function Home() {
  const todos = await getTodos()

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Todo List</h1>
        <div className="justify-end m-1">
        <Link
          className="border border-slate-300 m-1 mb-4 text-blue-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          href="/new"
        >
          New
        </Link>
        <Link
          className="border border-slate-300 m-1 mb-4 text-blue-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          href="/done"
        >
          Done
        </Link>
        </div>
        {/* <Link
          className="border border-slate-300 text-blue-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          href="/new"
        >
          New
        </Link>
        <Link
          className="border border-slate-300 text-blue-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          href="/done"
        >
          Done
        </Link> */}
      </header>
      <ul className="pl-4">
        {todos.map(todo => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </>
  )
}