import React from 'react';
import {useState} from 'react'

function TodoList({ todos, setTodos }) {
  function handleToggleTodo(todo) {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id
        ? {
            ...t,
            done: !t.done
          }
        : t
    );
    setTodos(updatedTodos);
  }
  return (
    <ul className='container'>
      {todos.map(todo => (
        <li key={todo.id}
        onDoubleClick={() => handleToggleTodo(todo)}
        style={{ textDecoration: todo.done ? "line-through" : ""}}
        >{todo.text}
         <DeleteTodo todo={todo} setTodos={setTodos} />
        </li>
      ))}
    </ul>
  )
}

function AddTodo({ setTodos }) {
  const inputRef = React.useRef();

function handleAddTodo (event) {
  event.preventDefault();
  const text = event.target.elements.addTodo.value;
  if(text.length < 1 )
  { 
     alert("Please enter a todo");
    return 
  }
  const todo = {
    id: Math.random(),
    text,
    done: false
  };
  setTodos((prevTodos) => {
    return prevTodos.concat(todo);
  });
  inputRef.current.value = "";
}


return (
  <form onSubmit={handleAddTodo}>
    <input name="addTodo" placeholder="Add todo" ref={inputRef} className="styled-input"/>
    <button type="submit" className='submit-btn'>Submit</button>
  </form>
);
}

function DeleteTodo({ todo, setTodos }) {
  function handleDeleteTodo() {
    const confirmed = window.confirm("Do you want to delete this?");
    if (confirmed) {
      setTodos((prevTodos) => {
        return prevTodos.filter((t) => t.id !== todo.id);
      });
    }
  }
  return (
    <span
      onClick={handleDeleteTodo}
      role="button"
      style={{
        color: "red",
        fontWeight: "bold",
        marginLeft: 10,
        cursor: "pointer",
      }}
    >
      x
    </span>
  );
}

function App() {
   const [todos, setTodos] = useState([
    { id: 1, text: "Wash dishes", done: false },
    { id: 2, text: "Do laundry", done: false },
    { id: 3, text: "Take shower", done: false }
  ]);
  return (
    <div className="App">
      <h1 className='heading'>Todo List</h1>
      <TodoList todos={todos} setTodos={setTodos}/>
      <div className='container'>
        <div className='fixed-width'>
          <AddTodo setTodos={setTodos} />
        </div>
      </div>
    </div>
  );
}



export default App;
