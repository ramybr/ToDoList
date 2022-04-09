// Selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const todoContainer = document.querySelector(".todo-container");
const clearButton = document.querySelector(".clear-btn")
console.log(clearButton);


// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
// clearButton.addEventListener("click", clearAll);






// Functions
function addTodo(e) {
    // Prevent form from submitting
    event.preventDefault();
    // Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // LI
    const newTodo = document.createElement("li");
    if (!todoInput.value == 0) {

        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        // Add Todo To Localstorage
        saveLocalTodos(todoInput.value);
        // Check Mark Button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class=" fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        // Delete Button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class=" fas fa-trash"></i>';
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);
        // Append to list
        todoList.appendChild(todoDiv);
        // Clear
        todoInput.value = "";
    }



}

function deleteCheck(e) {
    const item = e.target;
    const todo = item.parentElement;
    // DELETE
    if (item.classList[0] === "delete-btn") {
        todo.classList.add("remove");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function() {
            todo.remove();
        })
    }
    const table = JSON.parse(localStorage.getItem("todos"));
    if (table.length === 0) {
        const clearButton = document.querySelector(".clear-btn");
        console.log(clearButton)
        clearButton.remove();
    }
    // CHECK
    if (item.classList[0] === "complete-btn") {
        todo.classList.toggle("completed");
    }

}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "finished":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "unfinished":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
        }
    });

}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    if (todos.length === 1) {
        const clearButton = document.createElement("button");
        clearButton.innerText = ("Clear All");
        clearButton.classList.add("clear-btn");
        todoContainer.appendChild(clearButton);
    } else if (todos.length === 0) {

        clearButton.remove();
    }

}


function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        // Todo DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        // LI
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        // Check Mark Button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class=" fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        // Delete Button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class=" fas fa-trash"></i>';
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);
        // Append to list
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function clearAll() {
    todoList.remove();
    Storage.clear();
}