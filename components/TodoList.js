import { db } from "@/firebase"
import { onSnapshot, collection } from "firebase/firestore"
import { useEffect, useState } from "react"

export default function TodoList() {

    const [todos, setTodos] = useState([])

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
            setTodos(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    title: doc.data().title,
                    detail: doc.data().detail
                }
            }))
        })

        return unsubscribe;

    }, [])

    return (
        <>
            <div>
                <h1>Todos</h1>
                <ul className="todoList">
                    {todos.map(todo => {
                        return <li className="listItem" key={todo.id}>{todo.title}</li>
                    })}
                </ul>
            </div>
        </>
    )
}