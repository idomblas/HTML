const input = document.getElementById("new-task-input");
const addButton = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

if (
  Notification.permission !== "granted" &&
  Notification.permission !== "denied"
) {
  Notification.requestPermission();
}

function createTaskElement(text, isCompleted = false) {
  const listItem = document.createElement("li");
  listItem.textContent = text;

  if (isCompleted) {
    listItem.classList.add("completed");
  }

  listItem.addEventListener("click", () => {
    listItem.classList.toggle("completed");

    if (listItem.classList.contains("completed")) {
      showNotification(text);
    }

    saveTasks();
  });

  return listItem;
}

function addTask() {
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("Por favor, introduce una tarea.");
    return;
  }

  const newListItem = createTaskElement(taskText);
  taskList.appendChild(newListItem);

  input.value = "";

  saveTasks();
}

addButton.addEventListener("click", addTask);

function showNotification(taskText) {
  if (!("Notification" in window)) {
    console.warn("Este navegador no soporta notificaciones.");
    return;
  }

  if (Notification.permission === "granted") {
    new Notification("¡Tarea Completada!", {
      body: `Has terminado: "${taskText}"`,
    });
  } else {
    console.log("No hay permiso para mostrar notificaciones.");
  }
}

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach((item) => {
    tasks.push({
      text: item.textContent,
      completed: item.classList.contains("completed"),
    });
  });

  localStorage.setItem("todoList", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = localStorage.getItem("todoList");

  if (savedTasks) {
    const tasks = JSON.parse(savedTasks);

    tasks.forEach((task) => {
      const listItem = createTaskElement(task.text, task.completed);
      taskList.appendChild(listItem);
    });
  }
}

document.addEventListener("DOMContentLoaded", loadTasks);
