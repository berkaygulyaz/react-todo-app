import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    filterHandler(); 
  }, [todos, status])

  //Run once when the start app
  useEffect(() => {
    getLocalTodos();
  }, [])

  const filterHandler = () => {
    switch(status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true))
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false))
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }

  const saveLocalTodos = (e) => {
    setTodos(e);
    localStorage.setItem('todos', JSON.stringify(e))
  }

  const getLocalTodos = () => {
    if(localStorage.getItem('todos') !== null) {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal)
    }
  }

  return (
    <div className="App">
      <header>
        <h1>To-Do List</h1>
      </header>

      <Form inputText={inputText} 
            todos={todos} 
            setTodos={saveLocalTodos} 
            setInputText={setInputText} 
            setStatus={setStatus} />
      <TodoList setTodos={saveLocalTodos} todos={todos} filteredTodos={filteredTodos}/>
    </div>
  );
}

export default App;
