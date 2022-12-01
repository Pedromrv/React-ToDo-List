```jsx
// src/index.js
import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
```

¿Qué hace todo este código?

Simplemente "renderiza" o muestra nuestra aplicación inyectándola en un archivo index.html, que es lo que vemos en la parte derecha de la página. 

El código también encuentra y pone nuestra aplicación en el llamado elemento raíz (un div con el id de "root"). Si quieres ver dónde está ese elemento, puedes encontrarlo dentro de nuestra carpeta pública, concretamente en el archivo index.html.

## Cómo usar JSX

Ahora que tenemos una aplicación React funcionando, vamos a empezar a construirla y a cambiar lo que vemos.

Empecemos dentro de nuestro div eliminando este elemento h2, y dentro de nuestro h1, simplemente llamando a nuestra app "Lista de Todo":

```jsx
// src/App.js
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Todo List</h1>
    </div>
  );
}
```

Lo que estamos trabajando aquí se llama **JSX**. Se parece mucho a HTML, pero en realidad es JavaScript. Lo usamos para construir la estructura de nuestra aplicación, igual que usaríamos HTML. 

> Podemos usar cualquier elemento estándar de HTML dentro de JSX: divs, cualquier elemento de encabezado, párrafo, spans, botones, etc. 

Es importante notar que hay algunas diferencias menores entre JSX y HTML. 

Los atributos que utilizamos en JSX son ligeramente diferentes a los de los elementos HTML normales. Están escritos en el estilo camelcase, que es una forma estándar de escribir variables o propiedades en JavaScript. 

Por ejemplo, para aplicar una clase en un elemento JSX, utilizamos un atributo llamado `className`. En HTML normal, se llamaría simplemente `class`.

Si usamos `class` en lugar de `className` para JSX, recibiremos una advertencia diciendo que class es una propiedad DOM inválida.

## Cómo crear una lista de elementos Todo

Ya que estamos haciendo una aplicación de tareas, vamos a crear nuestra lista de tareas debajo de nuestra cabecera h1. 

Podríamos empezar haciendo una lista desordenada con algunos elementos de la lista como elementos hijos. Cada tarea sería listada dentro de un elemento `li`:

```jsx
// src/App.js
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Todo List</h1>
      
      <ul>
      	<li>Todo Item</li>
      </ul>
    </div>
  );
}
```

Sin embargo, podemos hacer algo mejor como desarrolladores de React. En su lugar, hagamos un componente dedicado que se encargue de mostrar nuestros `todos`.

## Cómo crear nuevos componentes React

**Los componentes son la columna vertebral de cualquier aplicación React. 

Utilizamos los componentes para separar las diferentes partes de nuestra interfaz de usuario. Esto hace que sean reutilizables siempre que los necesitemos en nuestra aplicación, organiza mejor nuestro código y facilita la comprensión de nuestros proyectos.

> Los componentes cumplen un concepto importante en la programación que se llama "separación de preocupaciones". Esto significa que es preferible que cada parte de nuestro componente tenga su propio papel y responsabilidades claramente definidos, separados de cualquier otro componente.

Al igual que tenemos un componente App, podemos crear un componente que se muestre dentro de App. Como se trata de una lista de tareas, la llamaremos "TodoList":

```jsx
// src/App.js
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Todo List</h1>
      
      <TodoList /> {/* component with single tag */}
    </div>
  );
}
```

## Reglas de los componentes de React

Todo componente debe comenzar con una letra mayúscula. Y una vez que se declara un componente, se puede escribir y utilizar de forma muy similar a un elemento HTML. 

Un componente puede consistir en una sola etiqueta o en dos etiquetas. Si no tiene nada entre las dos etiquetas, que se llaman **children**, sólo debe tener una etiqueta como muestra el código anterior: `<TodoList />`. 

Además, si un componente o elemento consiste en una sola etiqueta, debe ser auto-cerrado. Es decir, debe terminar en una barra diagonal (como `<TodoList />` y no `<TodoList>`).

Estamos intentando mostrar nuestro componente TodoList, pero aún no lo hemos creado. Para ello, podemos crear otro componente de función como App, con el nombre TodoList.

Necesitamos devolver algo, concretamente algún JSX. Cada componente que hagamos debe devolver elementos y componentes JSX (que también deben, en última instancia, estar compuestos por JSX). 

En nuestro caso, queremos devolver nuestra lista de todos. Tomemos nuestra lista desordenada con todos los elementos de la lista que queremos mostrar. Todavía no tenemos ningún dato, así que vamos a crear algunos.

En particular, vamos a crear un conjunto de datos de todo, que podemos incluir en una matriz. Añadamos esto al componente App:

```jsx
// src/App.js
import "./styles.css";

export default function App() {
  const todos = [
    { id: 1, text: "Wash dishes", done: false },
    { id: 2, text: "Do laundry", done: false },
    { id: 3, text: "Take shower", done: false }
  ];

  return (
    <div>
      <h1>Todo List</h1>
      <TodoList />
    </div>
  );
}

function TodoList() {}
```

## Cómo pasar datos a los componentes con Props

Ahora la pregunta es: ¿cómo pasamos todos estos datos y los mostramos dentro de nuestra lista de tareas?

Con los componentes React, podemos hacerlo con propiedades especiales que añadimos al componente llamadas props. 

**Las props** son atributos personalizados que podemos añadir a los componentes React para pasar datos a nuestros componentes. Son el equivalente en React a los argumentos en JavaScript. 

Como nuestros datos se llaman todos, vamos a nombrar nuestra prop igual: "todos". Usamos el operador equals para establecer el valor de una prop, así como un conjunto de llaves. Esto se debe a que nuestro array todos es una variable (un valor dinámico):

```jsx
// src/App.js
import "./styles.css";

export default function App() {
  const todos = [
    { id: 1, text: "Wash dishes", done: false },
    { id: 2, text: "Do laundry", done: false },
    { id: 3, text: "Take shower", done: false }
  ];

  return (
    <div>
      <h1>Todo List</h1>
      <TodoList todos={todos} />
    </div>
  );
}

function TodoList() {}
```

> Si quisiéramos convertirlo en una cadena, por ejemplo, lo envolveríamos entre un conjunto de comillas. Pero como este es un valor dinámico que puede cambiar, queremos incluirlo siempre entre llaves.

Dentro del componente TodoList, ¿dónde se van a recibir nuestros props para mostrar finalmente los datos de nuestros todos? Se van a recibir exactamente donde cualquier función recibiría sus argumentos. 

Recibimos nuestros datos de props en un objeto que normalmente llamamos "props", pero podemos darle el nombre que queramos. 

Podemos ver que estamos pasando estos datos usando `console.log(props)`. Si miramos nuestra consola, tenemos esta propiedad en nuestro objeto props llamada "todos". 

Tiene un array de tres elementos tal y como esperaríamos:

```jsx
// src/App.js
import "./styles.css";

export default function App() {
  const todos = [
    { id: 1, text: "Wash dishes", done: false },
    { id: 2, text: "Do laundry", done: false },
    { id: 3, text: "Take shower", done: false }
  ];

  return (
    <div>
      <h1>Todo List</h1>
      <TodoList todos={todos} />
    </div>
  );
}

function TodoList(props) {
  console.log(props) // {todos: Array(3)}
}
```

## Cómo mapear los elementos del array con la función Map

Para mostrar cada uno de estos elementos de la lista, podemos tomar el array que está en `props.todos`. 

En concreto, podemos usar una función especial que nos da React sobre el array todos llamada **map**. 

Como queremos mostrar esto dentro de TodoList, una vez más necesitamos usar un conjunto de llaves para mostrarlo dentro de nuestro JSX. Usando `props.todo.map`, mapearemos este array como lo haríamos con un array normal de JavaScript. 

> La función map de React es ligeramente diferente a la función map normal de JavaScript porque está hecha para devolver y renderizar elementos JSX. 

`.map()` acepta una función interna y en esa función, podemos acceder a cada cosa. Usando una función de flecha, podemos devolver cada cosa dentro de su propio JSX.

Finalmente, podemos devolver inmediatamente ese JSX envolviéndolo en un conjunto de paréntesis:

```jsx
<ul>
function TodoList(props) { 
	{props.todos.map(todo => ( 
		<li></li>
		 ))} }
</ul>
```

Dentro de nuestra función interna, tenemos acceso a los datos de cada cosa. Para mostrar esos datos, podemos tomar cada cosa que sabemos que es un objeto. Podemos utilizar un conjunto de llaves para mostrar el valor dinámico de lo que está en `todo.text`. 

Cuando hacemos eso, podemos ver nuestros tres `todos`:

```jsx
<ul>
function TodoList(props) { 
	{props.todos.map(todo => ( 
		<li>{todo.text}</li>
		 ))} }
</ul>
```


## ¿Qué son las claves de React (y por qué son importantes)?

Si miramos la pestaña de la consola en la parte inferior veremos una advertencia, diciendo que cada hijo de la lista debe tener una "clave única prop". 

La razón de esto es que React necesita mantener el orden de cada uno de los elementos de nuestra lista. Lo hace con la ayuda de una prop especial de React llamada **clave**. 

> Para una clave, generalmente quieres usar un identificador único, un valor único que sólo está asociado a un dato. En nuestro caso, para identificar los datos de cada cosa usaremos el número único proporcionado en `todo.id`.

¿Por qué son importantes las claves? Es importante para que React sepa cómo debe actualizar adecuadamente nuestra interfaz de usuario. Si tuviéramos que actualizar el texto o el valor de una tarea, la clave es lo que le dice a React qué elemento de la tarea debe ser actualizado. 

Una vez que añadimos la prop clave al elemento o componente sobre el que estamos haciendo el bucle, ya no recibimos esa advertencia:

```jsx
<ul>
function TodoList(props) { 
	{props.todos.map(todo => ( 
		<li key={todo.id}>{todo.text}</li>
		 ))} }
</ul>
```

## Cómo obtener propiedades individuales con desestructuración

Ten en cuenta que una abreviatura adicional es que en lugar de referenciar el objeto completo dentro de TodoList, podemos referenciar las propiedades individuales de ese objeto para hacer nuestro código un poco más corto usando la desestructuración de objetos. 

> La desestructuración de objetos no es un concepto de React, sino una característica estándar de JavaScript que facilita el acceso a las propiedades de los objetos declarándolas inmediatamente como variables individuales.

Ahora mismo, sólo tenemos una propiedad que se pasa a TodoList, así que vamos a desestructurar esa propiedad, `todos`, individualmente.

Para ello, añadimos un conjunto de llaves dentro de los parámetros de nuestras funciones, y simplemente cogemos la propiedad que necesitamos del objeto props. Esto significa que podemos cambiar `props.todos` a sólo `todos`:

```jsx
// src/App.js
import "./styles.css";

export default function App() {
  const todos = [
    { id: 1, text: "Wash dishes", done: false },
    { id: 2, text: "Do laundry", done: false },
    { id: 3, text: "Take shower", done: false }
  ];

  return (
    <div>
      <h1>Todo List</h1>
      <TodoList todos={todos} />
    </div>
  );
}

// using object destructuring on the props object
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

## Cómo añadir nuevos elementos a la lista de tareas

Ahora, ¿qué pasa con la adición de algunos nuevos todos a nuestra lista? 

Debajo de nuestro componente TodoList, agreguemos un nuevo componente que sea responsable de agregar nuevos todos. Un nombre lógico para esto sería "AddTodo". 

Podemos crear esto debajo de nuestro componente de lista de cosas por hacer. Hagamos que AddTodo devuelva un elemento de formulario que contenga una entrada de texto básica y un botón de envío.

```jsx
// src/App.js
import "./styles.css";

export default function App() {
  const todos = [
    { id: 1, text: "Wash dishes", done: false },
    { id: 2, text: "Do laundry", done: false },
    { id: 3, text: "Take shower", done: false }
  ];

  return (
    <div>
      <h1>Todo List</h1>
      <TodoList todos={todos} />
      <AddTodo />
    </div>
  );
}

function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}

function AddTodo() {
  return (
    <form>
      <input placeholder="Add todo" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

> Ten en cuenta que cualquier elemento JSX que conste de una sola etiqueta (como nuestra entrada) debe terminar en una barra diagonal. Si no la incluimos, obtendremos un error del compilador diciendo "contenido JSX sin terminar". 

Ahora la pregunta es: ¿cómo escribimos en nuestro input, enviamos nuestro formulario, y tenemos una nueva tarea añadida a nuestro array de tareas?

## Cómo manejar el envío de formularios en React

Para manejar el envío de nuestro formulario, tenemos que empezar a trabajar con eventos en React. 

En nuestro caso, queremos utilizar el evento "submit" cuando nuestro formulario sea enviado por nuestro usuario y que React se encargue de ese envío del formulario añadiendo un nuevo todo. 

React añade una propiedad especial al elemento del formulario llamada `onSubmit`. onSubmit acepta una función dentro de un conjunto de llaves. Vamos a crear una nueva función, que llamaremos `handleAddTodo`. 

> Ten en cuenta que la mayoría de las funciones que manejan eventos en React llevan como prefijo la palabra "handle". En última instancia, depende de ti cómo quieras nombrar tus funciones, pero es una convención útil.

Es importante notar que esta función debe ser creada dentro del componente mismo (AddTodo), no fuera de él. Cuando `handleAddTodo` se pasa a la función `onSubmit`, será llamada cuando nuestro formulario sea enviado:

```jsx
// src/App.js
import "./styles.css";

// ...

function AddTodo() {
  function handleAddTodo() {}

  return (
    <form onSubmit={handleAddTodo}>
      <input placeholder="Add todo" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Cómo evitar el comportamiento por defecto del formulario

Cuando hacemos clic en el botón de envío o pulsamos la tecla de retorno, los datos del evento de envío se pasan automáticamente a nuestra función que está conectada a onSubmit. Recibimos esos datos del evento en los parámetros de `handleAddTodo`.

Lo primero que queremos hacer con este evento es llamar a un método en él llamado `.preventDefault()`. Este método evita la acción por defecto cada vez que enviamos un formulario:

```jsx
// src/App.js
import "./styles.css";

// ...

function AddTodo() {
  function handleAddTodo(event) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleAddTodo}>
      <input placeholder="Add todo" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

Cada vez que enviamos un formulario, por defecto, la página se actualiza. No queremos ese comportamiento con React - queremos que JavaScript controle lo que sucede después. 

Después de evitar una actualización, queremos tener acceso a lo que se escribió en la entrada para crear una nueva tarea con ella. ¿Cómo lo hacemos?

## Cómo acceder a los datos del formulario al enviarlo

La forma de acceder a todos los elementos de nuestro formulario es con la ayuda de la propiedad `event.target.elements`. 

En primer lugar, esto nos dará el objetivo del evento, que es el propio formulario. La propiedad `elements` nos dará todos los elementos de ese formulario, incluyendo nuestra entrada y nuestro botón de envío. 

Si ahora mismo hacemos un console.log `event.target.elements`, enviamos nuestro formulario, y miramos nuestra consola, veremos sólo un objeto con un par de propiedades, una llamada "0", y otra llamada "1". 

Esto no nos ayuda mucho, aunque vemos que es nuestro input y nuestro botón:

![PrintingOnConsole](img/printingOnConsole.png)

En su lugar, queremos obtener lo que se escribió en nuestra entrada. 

Para ello, podemos añadir un atributo "id" o un atributo "name" a nuestra entrada. Vamos a añadir el atributo "name" con el valor "addTodo". Cuando volvamos a pulsar enviar, esto nos dará una nueva propiedad en el objeto elements también llamada `addTodo`. A partir de esa referencia, podemos obtener muy fácilmente lo que se ha escrito en ella. 

Esto nos permite utilizar `event.target.elements.addTodo.value` para obtener lo que se escribió en el texto que se escribió. Cuando hacemos esto, cuando escribimos el texto en nuestra entrada, y pulsamos enviar, lo vemos registrado en la consola:

![ consoleShow](img/consoleShow.gif) 

Ahora que tenemos nuestro texto, lo pondremos en una variable llamada "texto". Usando esto, queremos crear una nueva tarea. 

Sabemos que cada tarea es un objeto y tiene que constar de las propiedades id, text y done. Vamos a crear una variable `todo` y eso será igual a un nuevo objeto donde el id será 4, el texto será igual al texto que estamos obteniendo del objeto elements, y podemos establecer done a false.

Por defecto, los nuevos todos que se añadan no se harán:

```jsx
// src/App.js
import "./styles.css";

//...

function AddTodo() {
  function handleAddTodo(event) {
    event.preventDefault();
    const text = event.target.elements.addTodo.value;
    const todo = {
      id: 4,
      text,
      done: false
    };
  }

  return (
    <form onSubmit={handleAddTodo}>
      <input name="addTodo" placeholder="Add todo" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

Y finalmente, la gran pregunta es, ¿cómo añadimos esta tarea a nuestro array, `todos`?

## Introducción al Estado en React 

Aquí es donde entra el concepto de estado. 

Ahora mismo estamos tratando con datos estáticos - no hay una forma real de actualizar este array todos. Para ser claros, _hay_ una manera de hacerlo usando JavaScript, pero lo que actualmente no podemos hacer es decirle a React, incluso si lo actualizamos, que necesita **reproducir** esta lista. 

Es decir, que realice una actualización de nuestros datos y luego nos muestre los datos actualizados en nuestra vista. Así que mientras podríamos actualizar los datos, también necesitamos que React muestre a nuestros usuarios los datos actualizados. 

Para solucionar nuestro problema es necesario el **Estado**. 

> El estado es un medio para gestionar los datos de nuestra aplicación y también permite a React actualizar nuestra UI (interfaz de usuario) en respuesta a los cambios de datos. 

## Cómo gestionar el estado en React con el gancho useState

Podemos gestionar el estado en React usando el hook `useState`. Para usar el hook useState, lo primero que tenemos que hacer es importar React arriba, porque useState viene de la librería central de React. 

Después de eso, podemos simplemente llamar al hook useState en la parte superior de nuestro componente de la aplicación. Una vez que llamemos a useState como una función normal, pasaremos todo nuestro array de todos como datos iniciales. Nuestra aplicación se romperá por un momento ya que no estamos mostrando nuestros todos todavía. 

useState devuelve un array con dos elementos:

1.  El valor inicial con el que llamamos a useState (nuestro array de todos) y que se convierte en nuestra variable de estado
2.  Una función especial que nos permite actualizar lo almacenado en la variable de estado 

Podemos desestructurar los valores que se devuelven desde useState añadiendo un conjunto de corchetes de array para obtener inmediatamente los valores que se devuelven desde él. Primero el estado y segundo, la función para actualizar el estado:

![](img/consoleState.gif)

Llamaremos a nuestra variable de estado `todos` y al setter para gestionar nuestro estado `setTodos`. 

Todo lo que tenemos que hacer para actualizar nuestro estado es pasarle, lo que queramos que sea el nuevo estado. Esta función `setTodos` va a ser pasada a nuestro componente AddTodo, así que vamos a añadirlo como una prop del mismo nombre. También desestructuraremos `setTodos` de nuestro objeto props dentro de AddTodo. 

Y finalmente, podemos llamar a `setTodos` en la parte inferior de `handleAddTodo`. Lo bueno de esta función es que en lugar de tener que pasar también el array de todos, esta función puede darnos el estado anterior con la ayuda de una función que podemos recibir dentro de ella:

![](img/setTodos.gif)

Esto puede parecer extraño al principio, pero dentro de `setTodos` tenemos acceso a los datos anteriores de todo. Si escribimos una función de flecha o cualquier función para el caso, podemos simplemente proporcionar lo que queremos que el nuevo estado sea. 

> La ventaja de poder acceder al valor de la variable de estado anterior directamente dentro de la función setter es que nos evita tener que pasar toda la variable de estado de todos como una prop adicional a cada componente en el que queramos actualizar su valor.

Si quisiéramos vaciar nuestro estado todos, podríamos devolver un array vacío aquí mismo. Si enviáramos nuestro formulario, veríamos que todos nuestros todos fueron eliminados. 

Una vez que enviamos nuestro formulario, el estado se actualiza, y nuestra aplicación se vuelve a renderizar como resultado.

## Re-renders en React

Ten en cuenta que cualquier re-renderización dentro de un componente padre causará que cualquier componente hijo se re-renderice. Esto significa que cada vez que nuestros datos de tareas se actualizan, el componente TodoList (un hijo del componente App) se actualiza con los nuevos datos. 

Si volvemos a `handleAddTodo`, podemos tomar nuestros todos anteriores y utilizar el método `.concat()` para añadir este nuevo todo a nuestro array en estado. Todo lo que tenemos que hacer es devolver esta expresión. 

Vamos a añadir un nuevo todo, como "Balancear la chequera". Una vez que pulsamos enviar, vemos que inmediatamente se añade a nuestra lista:

```jsx
setTodos((prevTodos) => { 
	return prevTodos.concat(todo);
	 })
```

Ahora bien, hay un problema aquí: no estamos borrando nuestra entrada después de que nuestro formulario sea enviado. 

Esto significa que si quisiéramos añadir otra tarea, tendríamos que borrarla manualmente. ¿Cómo podemos tomar el valor de este input y borrarlo?

## React refs y useRef

Para realizar acciones comunes como borrar el valor de un input o enfocar nuestro input podemos utilizar lo que se llama un **ref**. 

> Una ref es una función que proporciona React para hacer referencia a un elemento del DOM determinado. 

En este caso, queremos una referencia a este elemento input con el nombre de "addTodo". 

Al igual que nuestro estado, podemos trabajar con refs llamando al hook de React apropiado. Para crear una ref, sólo tenemos que llamar a `React.useRef()` en la parte superior de AddTodo. No tenemos que pasarle un valor inicial, pero podemos darle un valor por defecto si lo necesitamos. 

Llamaremos a esta ref creada `inputRef`. Usando inputRef, podemos crear una referencia a nuestro elemento de entrada al que podemos acceder donde queramos usando la proposición ref incorporada estableciendo `ref={inputRef}`:

```jsx
// src/App.js
import React from "react";
import "./styles.css";

//...

function AddTodo({ setTodos }) {
  const inputRef = React.useRef();

  function handleAddTodo(event) {
    event.preventDefault();
    const text = event.target.elements.addTodo.value;
    const todo = {
      id: 4,
      text,
      done: false
    };
    setTodos((prevTodos) => {
      return prevTodos.concat(todo);
    });
  }

  return (
    <form onSubmit={handleAddTodo}>
      <input name="addTodo" placeholder="Add todo" ref={inputRef} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

¿Qué hace esto? Nos permite dentro de `handleAddTodo` utilizar la propiedad `inputRef.current`, que contiene el elemento de entrada en sí. Si registráramos `input.ref.current`, veríamos nuestro elemento de entrada. 

Tenemos una referencia directa a nuestro input, lo que significa que podemos acceder a cualquier propiedad que queramos de él. En nuestro caso, queremos tomar el valor del input en la propiedad value. Para borrar el valor de nuestro input, podemos simplemente mutar inputRef directamente estableciendo value a una cadena vacía:

![](img/useRef.gif)

Cada vez que pulsamos submit, nuestra entrada se borra sin tener que borrarla nosotros manualmente.

## Reglas esenciales de los hooks de React

Como useRef es otro hook de React, empezamos a ver algunas características comunes entre los hooks de React. Suelen llevar como prefijo la palabra "use". De hecho, la mayoría de los hooks de React tienen este prefijo para denotar que son hooks y que deben ser utilizados como tales. 

Además, los hooks de React se llaman en la parte superior de los componentes de las funciones. Los hooks no pueden usarse dentro de componentes de clase. Y finalmente, los hooks no pueden ser condicionales (es decir, usados dentro de una sentencia if).

Pero como puedes ver, no hay nada demasiado especial en los hooks de React. Funcionan de forma muy parecida a las funciones normales de JavaScript. 

## Cómo marcar todos como hechos con onClick

Después de crear todas, queremos marcarlas como hechas - para tacharlas si hemos terminado una determinada tarea. ¿Cómo añadimos esta función? 

Si volvemos a nuestro elemento de la lista, dentro de TodoList, podemos ver cómo se verá aplicando algunos estilos en línea. Hemos visto cómo añadir estilos a través de las clases. Para los estilos que queremos aplicar en línea a cualquier elemento dado, no podemos usar la misma sintaxis que usaríamos con el HTML normal. 

Si intentamos utilizar la sintaxis de HTML, obtendremos un error que nos dirá "the style prop expects style properties within an object, not within a string"

Para solucionar esto, vamos a proporcionar un objeto. Tenemos que proporcionar este objeto dentro de otro conjunto de llaves. Luego, proporcionaremos cualquier propiedad como lo haríamos en un objeto normal de JavaScript para aplicar este golpe a través del estilo. 

Para cada uno de nuestros elementos de la lista, podemos establecer la propiedad `textDecoration` a "line-through":

  
```jsx
// src/App.js  

//...  

function TodoList({ todos }) { 
	return (
	     <ul>
	        {todos.map((todo) => (
	            <li           
		            style={{
		                textDecoration: todo.done ? "line-through" : ""           
		            }}           
		            key={todo.id}         
		            >           
		            {todo.text}         
		        </li>       
		    ))}     
		</ul>   
	); 
} 

//...
```

No queremos que todos los elementos sean tachados, sólo queremos que esto se aplique si una determinada tarea está hecha. ¿Cómo lo hacemos? 

Podemos utilizar un condicional normal de JavaScript, en particular un ternario, para decir que si la propiedad "done" de una tarea dada es verdadera, entonces queremos aplicar el valor de "strike through" para la decoración del texto, de lo contrario no. 

Si cambiamos una de nuestras matrices de tareas para que tenga un valor "hecho" de "verdadero", vemos que se aplica esa regla de estilo.

¿Cómo hacemos para cambiar esa tarea? 

Es posible que queramos que nuestro usuario haga clic o doble clic en nuestra tarea para poder pasar por ella. Eso significa que queremos ver cómo registrar y manejar un nuevo tipo de evento: un evento de clic. 

Para manejar un evento de clic con React proporcionamos la proposición `onClick` a un elemento dado para el que queremos registrar ese evento. En este caso, es el elemento `li`. 

Una vez más, tenemos que conectarlo a una función para manejar nuestro evento de clic. Vamos a llamarla `handleToggleTodo` y crearla dentro de nuestro componente TodoList. En este caso, nuestra función que usamos para manejar el evento no tiene que recibir ningún dato del evento. Esta función se encargará de actualizar el estado de nuestro todo. 

Queremos que `handleToggleTodo` recorra el array de `todos` y vea si el que el usuario ha pulsado existe en nuestro array. Si es así, su valor hecho puede ser cambiado por el valor booleano opuesto. 

Para recibir los datos de tareas apropiados para el elemento de la lista sobre el que se ha hecho clic, podemos llamar a `handleToggleTodo` como una función de flecha en línea y pasar los datos de tareas como argumento: 

```jsx
// src/App.js

//...

function TodoList({ todos }) {
  function handleToggleTodo(todo) {}
    
  return (
    <ul>
      {todos.map((todo) => (
        <li
          onClick={() => handleToggleTodo(todo)}
          style={{
            textDecoration: todo.done ? "line-through" : ""
          }}
          key={todo.id}
        >
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

//...
```

Para actualizar el estado de todos, pasaremos `setTodos` a nuestro componente TodoList. Pasaremos `setTodos` como una prop a TodoList, y lo desestructuraremos desde el objeto props. 

Una vez más, podemos llamar a `setTodos` y obtener acceso a los todos anteriores incluyendo una función interna. Primero, lo que podemos hacer es tomar todo nuestro array de todos y mapearlo con la función array `.map()`. 

En la función interna pasada a map, comprobaremos que el id de todos que estamos mapeando es igual al todo sobre el que hemos pulsado. Si es así, devolvemos un nuevo objeto con todas las propiedades de la tarea anterior, pero con el valor booleano opuesto a `done`:

```jsx
// src/App.js

//...

function TodoList({ todos, setTodos }) {
  function handleToggleTodo(todo) {
    // confused by this code? Here's what it says:
      
    // if a todo's id is equal to the one we clicked on,
    // just update that todo's done value to its opposite,
    // otherwise, do nothing (return it)
      
    const updatedTodos = todos.map((t) =>
      t.id === todo.id
        ? {
            ...t,
            done: !t.done
          }
        : t
    );
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li
          onDoubleClick={() => handleToggleTodo(todo)}
          style={{
            textDecoration: todo.done ? "line-through" : ""
          }}
          key={todo.id}
        >
          {todo.text}
          <DeleteTodo todo={todo} setTodos={setTodos} />
        </li>
      ))}
    </ul>
  );
}

//...
```

De lo contrario, si esa tarea sobre la que estamos iterando no es la que hemos pulsado, sólo queremos devolverla (sin cambiarla). Este array actualizado es lo que pasaremos a `setTodos` para actualizar nuestro estado. 

Si hacemos clic en una tarea, la cambiamos por hecha. Si volvemos a pulsar sobre ella, la volvemos a poner como no hecha.

Para que esto funcione adecuadamente, para ver que el id de una tarea pasada es igual al de la tarea en la que estamos haciendo clic, tenemos que asegurarnos de que el id de cada tarea es único. 

En lugar de establecer que cada nueva tarea tenga un identificador de 4, podemos usar `Math.random()` para hacer un valor semi-aleatorio y asegurarnos de que no hay elementos de la lista con el mismo identificador. 

Por último, como alternativa a "onClick", podemos utilizar otro evento, "onDoubleClick", en el caso de que los usuarios hagan clic accidentalmente en una tarea. Ahora, si un usuario hace doble clic en un elemento de la lista, sólo entonces lo hacemos.

## Cómo manejar la eliminación de todos

La última funcionalidad que buscamos es poder borrar una tarea determinada. 

Podemos añadir esa funcionalidad dentro de TodoList añadiendo otro componente anidado. Debajo del texto de nuestra tarea, añadiremos un nuevo componente: DeleteTodo. Declaremos este nuevo componente encima de donde declaramos AddTodo. 

¿En qué consistirá este componente? En él, devolveremos un span, que funcionará como un botón para nosotros. Un usuario puede hacer clic en él y eliminar una tarea determinada. 

> Si queremos que un elemento que no es un botón funcione como tal, tenemos que hacer que su propiedad "role" sea "button". 

A nuestro span, vamos a añadir algunas reglas de estilo - podemos darle un color rojo, ponerlo en negrita, y separarlo del texto de la tarea estableciendo `marginLeft: 10`. Lo bueno del objeto de estilo es que no tenemos que decir 10 píxeles como una cadena - podemos usar el valor 10 o incluir cualquier número entero que nos guste.

Aquí está el código para nuestro componente DeleteTodo hasta ahora:

```jsx
//...
function DeleteTodo({ todo, setTodos }) {
	return (
		<span role="button" style={{
			color: "red",
			fontWeight: "bold",
			marginLeft: 10,
			cursor: "pointer"
		}}>x</span>
	);
}
//...
```

Para eliminar una tarea, queremos poder hacer clic en ella y mostrar un diálogo de confirmación. Si el usuario confirma que quiere borrarla, sólo entonces se elimina la tarea. 

Dado que estamos mapeando cada elemento de la tarea, incluyendo DeleteTodo, podemos pasar una prop llamada simplemente `todo` con los datos de cada tarea. 

En DeleteTodo, en nuestro elemento span, queremos añadir un `onClick` para manejar la eliminación de nuestra tarea. Para ello, llamaremos a una nueva función: `handleDeleteTodo`. 

Usando esta función, primero queremos mostrar un diálogo de confirmación. Podemos hacerlo diciendo `window.confirm()` con el mensaje, "¿Quieres borrar esto"? `window.confirm` va a devolver un valor de true o false en función de si el usuario ha confirmado el diálogo o no. Pondremos el resultado de esta acción en una variable llamada `confirmed`:

```jsx
// src/App.js
// ...

function TodoList({ todos, setTodos }) {
  // ...

  return (
    <ul>
      {todos.map((todo) => (
        <li
          onDoubleClick={() => handleToggleTodo(todo)}
          style={{
            textDecoration: todo.done ? "line-through" : ""
          }}
          key={todo.id}
        >
          {todo.text}
          {/* pass todo data down as a prop to DeleteTodo */}
          <DeleteTodo todo={todo} />
        </li>
      ))}
    </ul>
  );
}

function DeleteTodo({ todo, setTodos }) {
  function handleDeleteTodo() {
    const confirmed = window.confirm("Do you want to delete this?");
    if (confirmed) {
      // take care of deleting the todo
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
        cursor: "pointer"
      }}
    >
      x
    </span>
  );
}

//...
```

Si `confirmed` es verdadero, sólo entonces queremos eliminar la tarea.

Para hacer eso, necesitamos usar `setTodos` una vez más. Lo pasaremos un nivel más abajo de TodoList al componente DeleteTodo y lo desestructuraremos desde el objeto props. 

Luego, dentro de `handleDeleteTodo`, podemos llamarlo y usar la función interna para obtener los todos anteriores. Para eliminar la tarea en la que el usuario ha hecho clic, podemos filtrar a través de esta matriz para asegurarnos de que estamos eliminando la que el usuario ha seleccionado. 

Para ello, nos aseguramos de que todos los todos en nuestro array no tienen un id igual al que estamos intentando eliminar:

```jsx
// src/App.js

// ...

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
        cursor: "pointer"
      }}
    >
      x
    </span>
  );
}

// ...
```

Ahora, si intentamos eliminar una de nuestras tareas, vemos nuestro diálogo de confirmación, pulsamos "ok", e inmediatamente se elimina de nuestra lista. 

Si borramos todas nuestras tareas, ya no vemos nada. Si queremos decirle a nuestro usuario que no hay todos en la lista cuando el array está vacío, vamos a nuestro componente TodoList. 

Si tenemos un array de todos vacío, podemos añadir una condicional sobre nuestro retorno y comprobar si la longitud de nuestro array es igual a 0. Si es así, mostraremos un elemento de párrafo con el texto "No quedan todos":

```jsx
// ...

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

  if (!todos.length) {
    return <p>No todos left!</p>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li
          onDoubleClick={() => handleToggleTodo(todo)}
          style={{
            textDecoration: todo.done ? "line-through" : ""
          }}
          key={todo.id}
        >
          {todo.text}
          <DeleteTodo todo={todo} setTodos={setTodos} />
        </li>
      ))}
    </ul>
  );
}

// ...
```
