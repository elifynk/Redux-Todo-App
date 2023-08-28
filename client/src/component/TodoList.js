import React, {useEffect} from 'react'
import { selectFilteredTodos } from '../redux/todos/todosSlice'
import {  getTodosAsync, toggleTodoAsync, removeTodoAsync } from '../redux/todos/services'
import { useSelector, useDispatch } from 'react-redux'

function TodoList() {
    const filteredTodos= useSelector(selectFilteredTodos)
    const dispatch= useDispatch()

    useEffect(() => {
        dispatch(getTodosAsync())
    }, [dispatch])

    const handleDestroy= async (id) => {
        if(window.confirm("Are you Sure ?")){
            await dispatch(removeTodoAsync(id))
        }
    }

    const handleToggle= async (id, completed) => {
        await dispatch(toggleTodoAsync({id, data: {completed}}))
    }

  return (
    <ul className="todo-list">
        {
            filteredTodos.map((item) => (
                <li key={item.id} className={item.completed ? "completed" : ""}>
                    <div className="view">
                        <input 
                        className="toggle" 
                        type="checkbox"
                        checked={item.completed} 
                        onChange={() => handleToggle(item.id, !item.completed)}/>
                        <label>{item.title}</label>
                        <button className="destroy" onClick={() => handleDestroy(item.id)}></button>
                    </div>
                </li>))
        }
    </ul>
  )
}

export default TodoList
