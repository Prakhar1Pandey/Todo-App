"use client"
import React from 'react'
const Button = ({ deleteTodo }: { deleteTodo: () => void }) => {
    return (
        <button className="border border-slate-300 text-blue-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
            onClick={() => deleteTodo()}>Delete</button>
    )
}


export default Button