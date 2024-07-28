import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState("");

  function persistData(newList) {
    localStorage.setItem("todos", JSON.stringify({ todos: newList }));
  }

  const handleAddTodos = (newTodos) => {
    const newTodosList = [...todos, newTodos];
    persistData(newTodosList);
    setTodos(newTodosList);
  };

  const handleDelete = (index) => {
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index;
    });
    persistData(newTodoList);
    setTodos(newTodoList);
  };

  const handleEdit = (index) => {
    const editValue = todos[index];
    setTodoValue(editValue);
    handleDelete(index);
  };

  useEffect(() => {
    if (!localStorage) {
      return;
    }

    let localTodos = localStorage.getItem("todos");
    if (!localTodos) {
      return;
    }

    try {
      localTodos = JSON.parse(localTodos).todos;
      if (Array.isArray(localTodos)) {
        setTodos(localTodos);
      } else {
        console.error("Todos should be an array");
      }
    } catch (error) {
      console.error("Error parsing localStorage data", error);
    }
  }, []);

  return (
    <>
      <TodoInput
        todoValue={todoValue}
        setTodoValue={setTodoValue}
        handleAddTodos={handleAddTodos}
      />
      <TodoList
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        todos={todos}
      />
    </>
  );
}

export default App;
