const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");

const todos = JSON.parse(localStorage.getItem("todos"));

//Saving our todos to Local Storage
if (todos) {
  todos.forEach((todo) => addTodo(todo));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodo();
});

function addTodo(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  // Build list items
  if (todoText) {
    const todoEl = document.createElement("li");
    if (todo && todo.completed) {
      todoEl.classList.add("completed");
    }
    todoEl.innerText = todoText;

    // Mark as completed
    todoEl.addEventListener("click", () => {
      todoEl.classList.toggle("completed");
      updateLS();
    });
    //Delete
    todoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();

      todoEl.remove();
      updateLS();
    });

    // Add it to the DOM
    todosUL.appendChild(todoEl);
    input.value = "";

    updateLS();
  }
}

function updateLS() {
  todosEl = document.querySelectorAll("li");

  const todos = [];

  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}
