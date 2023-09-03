import { ChangeEvent, SetStateAction, useState, useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from "../../config/firebase"
import { collection, QuerySnapshot, addDoc, query, where, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';


interface TodoItem {
    id: string;
    todo: string;
    completed: boolean;

}

export const Todo = () => {

    const [newTodo, setNewTodo] = useState("")
    const [todos, setTodos] = useState<TodoItem[]>([])
    const [user] = useAuthState(auth)
    const firestore = getFirestore();

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTodo(event.target.value)
    }

    const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (newTodo.trim() !== "") {
            addTodoToFirestore(newTodo)
            // setTodos((prevTodos) => [...prevTodos, newTodo])
            setNewTodo("")
        }
    }

    const addTodoToFirestore = async (todo: string) => {
        await addDoc(collection(db, "todos"), {
            userId: user?.uid,
            todoId: Date.now().toString(),
            todo: todo
        })
    }

    const deleteTodo = async (todoId: string) => {
        try {
            const todoRef = doc(db, "todos", todoId)
            await deleteDoc(todoRef)
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId))
        } catch (error) {
            console.error("Error deleting todo", error)
        }
    }

    useEffect(() => {
        if (user) {
            // Fetch user-specific todos when the user logs in or changes
            const unsubscribe = onSnapshot(
                query(collection(firestore, "todos"), where("userId", "==", user.uid)),
                (querySnapshot: QuerySnapshot) => {
                    const userTodos = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()} as TodoItem))
                    setTodos(userTodos)
                }
            )
            return () => unsubscribe()
        }
    }, [user, firestore])

    const toggleTodoCompletion = async (todoId: string, completed: boolean) => {
        try {
          const todoRef = doc(db, "todos", todoId);
          await updateDoc(todoRef, { completed: !completed });
        } catch (error) {
          console.error("Error updating todo completion", error);
        }
      };

      return (
        <>
          <form className="new-todo-form" onSubmit={handleSubmit}>
            <div className="form-row">
                <label htmlFor="item" className="new-item">New Item</label>
                <input type="text" id="item" value={newTodo} onChange={handleInputChange} />
                <button className="add-btn" type="submit">Add</button>
            </div>
          </form>
          <h2 className="header">Todo List</h2>
          <div className="todo-container">
            <ul className="todo-list">
                {todos.map((todo) => (
                <li
                    key={todo.id}
                    className={`todo-item ${todo.completed ? "completed" : ""}`}
                >
                    <label className="todo-label">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodoCompletion(todo.id, todo.completed)}
                    />
                    <span className="custom-checkbox"></span>
                    <span className="todo-text">{todo.todo}</span>
                    </label>
                    <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
                    <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                </li>
                ))}
            </ul>     
          </div>
          
        </>
      );
    
    
//     return (
//         <>
//             <form className="new-todo-form" onSubmit={handleSubmit}>
//                 <div className="form-row">
//                     <label htmlFor="item" className="new-item">New Item</label>
//                     <input type="text" id="item" value={newTodo} onChange={handleInputChange} />
//                     <button className="add-btn" type="submit">Add</button>
//                 </div>
//             </form>
//             <h2 className="header">Todo List</h2>
//             <ul className="todo-list">
//                 {todos.map((todo) => (
//                     <li key={todo.id} className="todo-item">
//                         <input className="check-box" type="checkbox" />
//                         {todo.todo} {/* Display the todo text */}
//                         <button onClick={() => deleteTodo(todo.id)} className="delete-btn">Delete</button>
//                     </li>
// ))}
//             </ul>
//         </>
//     )
}