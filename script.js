//retrieve the todo from localStorage or initialize an empty array

let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoListDone = document.getElementById("todoList-done");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

document.addEventListener("DOMContentLoaded", () =>{
addButton.addEventListener("click", () => addTask());
todoInput.addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
        e.preventDefault();

    }
})
deleteButton.addEventListener("click", () => deleteAllTasks());
displayTasks();
})

function addTask(){
    const newTask = todoInput.value.trim();
    if(newTask !== ""){
        todo.push({
            text: newTask, 
            disabled: false, 
        });
        saveToLocalStorage();
        todoInput.value = "";
        displayTasks();
    }
}

function displayTasks(){
    todoList.innerHTML = "";
    todoListDone.innerHTML = "";

    todo.forEach((item, index) => {
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
        p.className = item.disabled ? "disabled" : "";
        p.textContent = item.text;
        p.addEventListener("click", () => {
            editTask(index);
        });

        div.appendChild(checkbox);
        div.appendChild(p);

        if (item.disabled) {
            todoListDone.appendChild(div);
        } else {
            todoList.appendChild(div);
        }
    });

    // Update task count
    todoCount.textContent = todo.length;
}

function toggleTask(index){
    todo[index].disabled = !todo[index].disabled;
    saveToLocalStorage();
    displayTasks();
}

function deleteAllTasks(){
    todo = [];
    saveToLocalStorage();
    displayTasks();
    }

function saveToLocalStorage(){
    console.log("Saving to localStorage", todo); // Debugging
    localStorage.setItem("todo", JSON.stringify(todo));
}