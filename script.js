console.clear();
let todos = JSON.parse(localStorage.getItem("todos")) || [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoListDone = document.getElementById("todoList-done");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");
const toDoH3 = document.querySelector(".to-do-h3");
const doneH3 = document.querySelector(".done-h3");
const pomodoroContainer = document.querySelector(".pomodoro-container");
let time = 25 * 60;
let timerInterval;
let minutes;
let seconds;
let currentMode = "pomodoro";
const modes = {
  pomodoro: 25,
  short: 5,
  long: 10,
};
let totalBreaks = 0;
const pomodoroTaskTitle = document.querySelector(".pomodoro-task-title");
const timerLabel = document.querySelector(".timer-label");

document.addEventListener("DOMContentLoaded", () => {
  addButton.addEventListener("click", () => addTask());
  todoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTask();
    }
  });
  deleteButton.addEventListener("click", () => deleteAllTasks());
  const localDataPresent = localStorage.getItem("todos");
  if (localDataPresent !== null) {
    todos = JSON.parse(localDataPresent);
  }
  for (let i = 0; i < todos.length; i++) {
    renderTask(todos[i]);
  }
  updateHeaders();
});

function updateHeaders() {
  toDoH3.textContent = `To do (${todoList.children.length})`;
  doneH3.textContent = `Done (${todoListDone.children.length})`;
}
function addTask() {
  const newTask = todoInput.value.trim();
  const date = new Date();
  if (newTask !== "") {
    todos.push({
      taskId: date.toString() + Math.random() * 1000000,
      text: newTask,
      completed: false,
      taskCycle: 1,
      pomodoroTimeRemaining: 1500,
      shortBreakTimeRemaining: 300,
      longBreakTimeRemaining: 600,
    });
    saveToLocalStorage();
    todoInput.value = "";
  }
  renderTask(todos[todos.length - 1]);
}

function handleStartTask(task) {}

function renderTask(currentTask) {
  const div = document.createElement("div");
  div.className = "todo-container";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "todo-checkbox";
  checkbox.id = currentTask.taskId;
  checkbox.checked = currentTask.completed;
  checkbox.addEventListener("change", () => {
    toggleTask(currentTask, div);
  });

  const p = document.createElement("p");
  p.id = currentTask.taskId;
  p.className = currentTask.completed ? "todo-item completed" : "todo-item";
  p.textContent = currentTask.text;
  // ************start*******************
  const startIcon = document.createElement("button");
  startIcon.innerHTML = `<img class="start-icon-img" src="start.svg"/>`;

  // startIcon.style.backgroundImage = 'url("start.svg")';
  //   startIcon.src = "https://assets.codepen.io/6669924/trash.svg";
  startIcon.className = "start-icon";
  startIcon.id = currentTask.taskId;

  //  startIcon.onClick = startTimer();
  // startIcon.addEventListener("click", (e) => {
  //   console.log("timer started", e.target);
  //   startTimer();
  // });

  startIcon.addEventListener("click", (e) => {
    // startPomodoro(e.target.parentNode.parentNode.parentNode.firstChild.children[1].textContent);
    startPomodoro(e.target.parentNode.parentNode.parentNode.firstChild.children[1].id);
    // disableStartButton()
  });
  startIcon.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.code === "Space") {
      e.preventDefault();
      startPomodoro(e.target.parentNode.parentNode.parentNode.firstChild.children[1].textContent);
    }
  });
  startIcon.setAttribute("tabindex", "0");

  // **************end******************

  const trashIcon = document.createElement("img");
  trashIcon.src = "trash.svg";
  //   trashIcon.src = "https://assets.codepen.io/6669924/trash.svg";
  trashIcon.className = "trash-icon";
  trashIcon.id = currentTask.taskId;
  trashIcon.addEventListener("click", (e) => {
    deleteTask(e.target.id, div);
  });
  trashIcon.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.code === "Space") {
      e.preventDefault();
      deleteTask(e.target.id, div);
    }
  });
  trashIcon.setAttribute("tabindex", "0");
  const leftContainer = document.createElement("div");
  leftContainer.className = "left-container";
  leftContainer.appendChild(checkbox);
  leftContainer.appendChild(p);

  const rightContainer = document.createElement("div");
  rightContainer.className = "right-container";
  rightContainer.appendChild(startIcon);
  rightContainer.appendChild(trashIcon);

  div.appendChild(leftContainer);
  div.appendChild(rightContainer);

  if (currentTask.completed) {
    todoListDone.appendChild(div);
    div.classList.add("completed");
  } else {
    todoList.appendChild(div);
    div.classList.remove("completed");
  }
  updateHeaders();
  todoInput.focus();
}

function toggleTask(currentTask, element) {
  console.clear();
  currentTask.completed = !currentTask.completed;
  element.classList.toggle("completed");
  if (currentTask.completed) {
    todoListDone.appendChild(element);
  } else {
    todoList.appendChild(element);
  }
  updateHeaders();
  saveToLocalStorage();
}

function startPomodoro(id) {
  // console.log(id)
  // console.log(todos);
let currentItem = todos.find(todo => todo.taskId === id);
console.log(currentItem);
pomodoroTaskTitle.textContent = currentItem.text;
  // timerLabel.textContent = ``;
  // const pomodoroTitle = document.createElement("p");
  // pomodoroTitle.textContent = `Current task: ${id}`;
  // pomodoroTitle.className = "pomodoro-title";
  // pomodoroContainer.textContent = "";
  // pomodoroContainer.appendChild(pomodoroTitle);
  const timer = document.createElement("p");
  timer.textContent = "25:00";
  const pauseButton = document.createElement("button");
  pauseButton.textContent = "Pause";
  const resetButton = document.createElement("button");
  resetButton.textContent = "Reset";
  const stopButton = document.createElement("button");
  stopButton.textContent = "Stop";
}

function deleteTask(id, div) {
  console.clear();
  todos = todos.filter((item) => item.taskId !== id);

  if (div.parentNode) {
    div.parentNode.removeChild(div);
  }
  updateHeaders();
  saveToLocalStorage();
}

function deleteAllTasks() {
  todos = [];
  todoList.innerHTML = "";
  todoListDone.innerHTML = "";
  updateHeaders();
  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

document.querySelectorAll("#modes button").forEach((button) => {
  button.addEventListener("click", handleModeButtons);
});

function handleModeButtons(e) {
  switchMode(e.target.dataset.modeId);
}

function switchMode(mode) {
  currentMode = mode;
  resetTimer(currentMode);
}

function startTimer() {
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  minutes = Math.floor(time / 60);
  seconds = time % 60;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  document.getElementById("timer-label").textContent = minutes + ":" + seconds;
  if (time <= 0) {
    nextTimer();
  }
  time -= 1;
}

function pauseTimer() {
  clearInterval(timerInterval);
}

function skipTimer() {}

function nextTimer() {
  if (currentMode == "pomodoro") {
    totalBreaks += 1;
    if (totalBreaks % 4 == 0) {
      switchMode("long");
    } else {
      switchMode("short");
    }
  } else {
    switchMode("pomodoro");
  }
}

function resetTimer(currentMode) {
  time = modes[currentMode] * 60;
  clearInterval(timerInterval);
  updateTimer();
}
