const addButton = document.getElementById("add-button");
const addInput = document.getElementById("add-input");
const taskList = document.getElementById("task-list");

var todos = getFromLocalStorage()

let text = "";
todos.forEach((todo) => {
  text += createListItemFromTodo(todo);
});
taskList.innerHTML = text;  

const findTodoByIdAndDelete = (id) => {
  todos = todos.filter((todo) => todo.id !== id);
  renderToList();
};

const toggleDoneState = (id) => {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, done: !todo.done } : todo
  );
  renderToList();
};

const addTodo = () => {
  if (addInput.value) {
    const obj = {
      id: todos.length + 1,
      done: false,
      todoText: addInput.value,
    };
    todos.push(obj);
    addInput.value = "";
    console.log(todos);
    renderToList();
  }
};

function createListItemFromTodo(todo) {
  const id = todo.id;
  const isChecked = todo.done ? "checked" : "";

  return `
         <li>
  <div class="text">
    <input type="checkbox" onchange="toggleDoneState(${id})" ${isChecked}>
    <span class="${isChecked ? "done" : ""}">${todo.todoText}</span>
  </div>
  <div class="buttons">
    <button onclick="findTodoByIdAndDelete(${id})" class="delete-button">Delete</button>
  </div>
</li>
        `;
}

function renderToList() {
  let text = "";
  todos.forEach((todo) => {
    text += createListItemFromTodo(todo);
  });
  taskList.innerHTML = text;
  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todos));
}

function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem("todo")) || [];
}
