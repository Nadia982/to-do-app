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
            taskId: todo.length + 1,
            text: newTask,
            disabled: false, 
        });
        saveToLocalStorage();
        todoInput.value = "";
        displayTasks();
    }
    todoInput.focus();
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
        p.className = item.disabled ? "todo-item disabled" : "todo-item";
        
                p.textContent = item.text;
        p.addEventListener("click", () => {
            editTask(index);

        });

        const pTrash = document.createElement("img");
        pTrash.src = "./trash.svg";
        pTrash.className = "trash-icon";
        pTrash.id = `${index}`;
        pTrash.addEventListener('click', (e) => {
            console.log("e.target.id is: ",e.target.id);
            deleteTask(index);
        });
        const leftContainer = document.createElement('div');
        leftContainer.className = "left-container";
        leftContainer.appendChild(checkbox);
        leftContainer.appendChild(p);
        div.appendChild(leftContainer);
        div.appendChild(pTrash);

        if (item.disabled) {
            todoListDone.appendChild(div);
        } else {
            todoList.appendChild(div);
        }
    });

    // Update task count
    todoCount.textContent = todo.length;
}

function editTask(index){
const todoItem = document.getElementById(`todo-${index}`);
const existingText = todo[index].text;
const inputElement = document.createElement('input');
inputElement.style.caretColor = "var(--dark)";
//inputElement.setAttribute('type', 'text');
inputElement.value = existingText;
todoItem.replaceWith(inputElement);
inputElement.focus();
//blur means when the focus ends/when we click out
inputElement.addEventListener('blur',()=>{
    const updatedText = inputElement.value.trim();
    if(updatedText){
        todo[index].text = updatedText;
        saveToLocalStorage();
        displayTasks();
    }
})
}

function toggleTask(index){
    todo[index].disabled = !todo[index].disabled;
    saveToLocalStorage();
    displayTasks();
}

function deleteTask(e) {
    // debugger;
    console.log(e);
    // const index = todo.findIndex(item=>item.taskId == e);
    todo.splice(e,1);
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