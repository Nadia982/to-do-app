//retrieve the todo from localStorage or initialize an empty array

let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
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



function saveToLocalStorage(){
    console.log("Saving to localStorage", todo); // Debugging
    localStorage.setItem("todo", JSON.stringify(todo));
}