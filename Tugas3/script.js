const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

addBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const task = { text: taskText, completed: false };
    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    displayTasks();
}

function deleteTask(index) {
    if (confirm("Delete this task?")) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
    }
}

function editTask(index) {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText !== null) {
        tasks[index].text = newText;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
    }
}

function toggleComplete(index, checkbox) {
    tasks[index].completed = checkbox.checked;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        li.innerHTML = `
            <div class="d-flex align-items-center">
                <input type="checkbox" class="form-check-input me-2" ${task.completed ? "checked" : ""} onchange="toggleComplete(${index}, this)">
                <span class="${task.completed ? "text-decoration-line-through text-muted" : ""}">${task.text}</span>
            </div>
            <div>
                <span class="badge rounded-pill ${task.completed ? 'bg-success' : 'bg-secondary'} me-2">
                    ${task.completed ? 'Done' : 'Pending'}
                </span>
                <button class="btn btn-warning btn-sm me-2" onclick="editTask(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

displayTasks();




















