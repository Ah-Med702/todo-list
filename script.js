const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const clearBtn = document.getElementById("clear-btn");

// Load tasks from local storage on page load
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks on page
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerText = task.text;
        if (task.completed) {
            li.classList.add("completed");
        }
        const btnsCont = document.createElement("div")
        btnsCont.className = "btns-cont"
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn")
        deleteBtn.innerText = "Delete";
        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });
        btnsCont.appendChild(checkbox);
        btnsCont.appendChild(deleteBtn);
        li.appendChild(btnsCont);
        taskList.appendChild(li);
    });
}

// Save tasks to local storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add task to list and save to local storage
function addTask(event) {
    event.preventDefault();
    const text = taskInput.value;
    if (text.trim() !== "") {
        tasks.push({ text: text, completed: false });
        saveTasks();
        taskInput.value = "";
        renderTasks();
    }
}

// Clear completed tasks and save to local storage
function clearCompletedTasks() {
    tasks = tasks.filter((task) => !task.completed);
    saveTasks();
    renderTasks();
}

// Event listeners
addBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearCompletedTasks);

// Initial render of tasks
renderTasks();

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("./service-worker.js")
        .then(function (registration) {
            console.log(
                "Service Worker registered with scope:",
                registration.scope
            );
        })
        .catch(function (error) {
            console.error("Service Worker registration failed:", error);
        });
}