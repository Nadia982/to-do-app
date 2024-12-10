let todos = JSON.parse(localStorage.getItem("todos")) || [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoListDone = document.getElementById("todoList-done");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");
const toDoH3 = document.querySelector(".to-do-h3");
const doneH3 = document.querySelector(".done-h3");

document.addEventListener("DOMContentLoaded", () => {
  addButton.addEventListener("click", () => addTask());
  todoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTask();
    }
  });
  deleteButton.addEventListener("click", () => deleteAllTasks());
  displayTasks();
});

function addTask() {
  const newTask = todoInput.value.trim();
  if (newTask !== "") {
    todos.push({
      taskId: new Date(),
      text: newTask,
      disabled: false,
    });
    saveToLocalStorage();
    todoInput.value = "";
    displayTasks();
  }

  todoInput.focus();
}

function displayTasks() {
  todoList.innerHTML = "";
  todoListDone.innerHTML = "";

  todos.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "todo-container";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-checkbox";
    checkbox.id = `input-${index}`;
    checkbox.checked = item.disabled;

    checkbox.addEventListener("change", () => {
      toggleTask(index);
    });

    const p = document.createElement("p");
    p.id = `todo-${index}`;
    p.className = item.disabled ? "todo-item disabled" : "todo-item";

    p.textContent = item.text;
    p.addEventListener("click", () => {
      editTask(index);
    });

    const trashIcon = document.createElement("img");
    
    trashIcon.src = "./trash.svg";
    trashIcon.className = "trash-icon";
    trashIcon.id = `${index}`;
    
    trashIcon.addEventListener("click", (e) => {
      deleteTask(index);
    });
    trashIcon.setAttribute("tabindex","0");
    const leftContainer = document.createElement("div");
    leftContainer.className = "left-container";
    leftContainer.appendChild(checkbox);
    leftContainer.appendChild(p);
    div.appendChild(leftContainer);
    div.appendChild(trashIcon);

    if (item.disabled) {
      todoListDone.appendChild(div);
    } else {
      todoList.appendChild(div);
    }
  });

  toDoH3.textContent = `To do (${todoList.children.length})`;
  doneH3.textContent = `Done (${todoListDone.children.length})`;
  todoCount.textContent = todos.length;
}

function editTask(index) {
  const todoItem = document.getElementById(`todo-${index}`);
  const existingText = todos[index].text;
  const inputElement = document.createElement("input");
  inputElement.style.caretColor = "var(--dark)";
  inputElement.value = existingText;
  todoItem.replaceWith(inputElement);
  inputElement.focus();
  inputElement.addEventListener("blur", () => {
    const updatedText = inputElement.value.trim();
    if (updatedText) {
      todos[index].text = updatedText;
      saveToLocalStorage();
      displayTasks();
    }
  });
}

function toggleTask(index) {
  todos[index].disabled = !todos[index].disabled;
  saveToLocalStorage();
  displayTasks();
}

function deleteTask(e) {
  todos.splice(e, 1);
  saveToLocalStorage();
  displayTasks();
}

function deleteAllTasks() {
  todos = [];
  saveToLocalStorage();
  displayTasks();
}

function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
