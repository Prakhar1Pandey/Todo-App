import { prisma } from "@/db"
import { redirect } from "next/navigation"
import { TodoItem } from "@/components/TodoItem"
import Button from "./button";

function getTodos() {
    return prisma.todo.findMany({ where: { complete: true, }, })
  }
  
  async function toggleTodo(id: string, complete: boolean) {
    "use server"
  
    await prisma.todo.update({ where: { id }, data: { complete } });
  }
async function deleteTodo() {
    "use server"
    await prisma.todo.deleteMany({
        where: {
            complete: true,
        }
    })
    redirect("/")
}

export default async function Home() {
    const todos = await getTodos();

    return (
        <>
            <ul className="pl-4">
                {todos.map(todo => (
                    <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
                ))}
            </ul>
            <Button deleteTodo={deleteTodo} />

        </>
    )
}