import React from 'react';
import './App.css';

let numId = 3;

export default function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: "Wash dishes", done: false },
    { id: 2, text: "Do Laundry", done: false },
    { id: 3, text: "Take a shower", done: false }
  ]);
  return (
    <div className='App'>
      <h1>ToDo List</h1>
      <TodoList todos={todos} setTodos={setTodos} />
      <AddTodo setTodos={setTodos} />
      {/* <li>ToDo item</li> */}
    </div>
  )
};

// React Keys (and Why They Matter)
// usar destructuring de objetos en el objeto props
function TodoList({ todos, setTodos }) {
  function handleToggleTodo(todo) {
    // si un 'todo' es igual al que hemos clickado, solo actualiza el valor de ese 'todo' al contrario, por el contrario, no haga nada (que lo devuelva como está) 
    const updatedTodos = todos.map((clickedTodo) =>
      clickedTodo.id === todo.id ? { ...clickedTodo, done: !clickedTodo.done } : clickedTodo
    );
    setTodos(updatedTodos)
  }
  if(!todos.length){
    return <p>No hay más tareas</p>;
  }
  return (
    <ul>
      {todos.map((todo) => (
        <li
          onDoubleClick={() => handleToggleTodo(todo)}
          style={{
            textDecoration: todo.done ? 'line-through' : ""
          }}
          key={todo.id}
        >
          {todo.text}
          {/* pasar "todo" data como prop de DeleteTodo */}
          <DeleteTodo todo={todo} setTodos={setTodos}/>
        </li>
      ))}
    </ul>
  )
}// el error de consola se debe a que React necesita mantener un seguimiento del orden de cada item.
// Esto lo hace con la ayuda de un React prop especial llamado "key".

function DeleteTodo({ todo, setTodos }) {
  function handleDeleteTodo() {
    const confirmed = window.confirm("¿Quieres borrar esta tarea?");
    if (confirmed) {
      // lógica de borrado de tarea
      // para eliminar la tarea que un usuario ha pulsado, filtramos a través del array para asegurarnos de que estamos borrando el que el usuario ha seleccionado.
      //Tenemos que asegurarnos de que los de nuestro array no tienen un id igual al que estamos intentando eliminar.
      setTodos((prevTodos) => {
        return prevTodos.filter((t) => t.id != todo.id);
      })
    }
  }
  return (
    <span onClick={handleDeleteTodo}
      role="button"
      style={{
        color: "red",
        fontWeight: "bold",
        marginLeft: 10,
        cursor: "pointer"
      }}
    >
      x
    </span>
  );
}

function AddTodo({ setTodos }) {
  const inputRef = React.useRef();

  function handleAddTodo(event) {
    event.preventDefault();
    const text = event.target.elements.addTodo.value;
    numId++;
    const todo = {
      id: numId,
      text,
      done: false
    };
    setTodos((prevTodos) => {
      return prevTodos.concat(todo);
    })
    inputRef.current.value = "";
  }
  return (
    <form onSubmit={handleAddTodo}>
      <input name="addTodo" placeholder='Añade ToDo' ref={inputRef} />
      <button type='submit'>Añadir</button>
    </form>
  );
}
// estados: El estado es un medio para gestionar los datos de nuestra aplicación y también permite a React actualizar nuestra UI (interfaz de usuario) en respuesta a los cambios de datos.
// Hook: función especial que nos permite "engancharnos" a las características de React
// useState: es un Hook que te permite añadir un estado de React alos componentes de la función.

// useState devuelve un array con dos elementos:

// El valor inicial con el que llamamos a useState (nuestro array de todos) y éste se convierte en nuestra variable de estado
// Una función especial que nos permite actualizar lo almacenado en la variable de estado