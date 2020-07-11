const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const filter = document.querySelector("#filter");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");

loadEventlisteners();

function loadEventlisteners() {
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener("submit", addTask);
    taskList.addEventListener("click", deleteTask);
    clearBtn.addEventListener("click", clearTask);
    filter.addEventListener("keyup", filterTask);
}

function addTask(e) {
    if (taskInput.value === "") {
        alert("You Can Not add Empty Task");
    } else {
        const li = document.createElement("li");
        li.className = "collection-item";
        li.appendChild(document.createTextNode(taskInput.value));
        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        link.innerHTML = '<i class="fa fa-times"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
        storeTaskInLocalStorage(taskInput.value);
        taskInput.value = "";
    }

    e.preventDefault();
}

function getTasks() {
    let TasksLs;
    if (localStorage.getItem('TasksLs') === null) {
        TasksLs = [];
    } else {
        TasksLs = JSON.parse(localStorage.getItem('TasksLs'));
    }
    TasksLs.forEach(function (task) {
        const li = document.createElement("li");
        li.className = "collection-item";
        li.appendChild(document.createTextNode(task));
        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        link.innerHTML = '<i class="fa fa-times"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
    });
}

function storeTaskInLocalStorage(task) {
    let TasksLs;
    if (localStorage.getItem('TasksLs') === null) {
        TasksLs = [];
    } else {
        TasksLs = JSON.parse(localStorage.getItem('TasksLs'));
    }
    TasksLs.push(task);
    localStorage.setItem('TasksLs', JSON.stringify(TasksLs));

}

function deleteTask(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
        if (confirm("Are You sure ...? ")) {
            e.target.parentElement.parentElement.remove();
            deleteTasksfromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function deleteTasksfromLocalStorage(taskItem) {
    let TasksLs;
    if (localStorage.getItem('TasksLs') === null) {
        TasksLs = [];
    } else {
        TasksLs = JSON.parse(localStorage.getItem('TasksLs'));
    }
    TasksLs.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            TasksLs.splice(index, 1);

        }
    });
    localStorage.setItem('TasksLs', JSON.stringify(TasksLs));
}

function clearTask() {
    // Faster
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    // slower
    // taskList.innerHTML = '';
    clearTaskFromLocalStorage();
}

function clearTaskFromLocalStorage() {
    localStorage.clear();
}

function filterTask(e) {
    const taskText = e.target.value.toLowerCase(); //get the value of input  filed to look for it inside the current task
    document.querySelectorAll(".collection-item").forEach(function (task) {
        //task is the vlaue that represnt li
        const item = task.firstChild.textContent; //the first child fo li wich is the text content that intered by taskInput.value
        if (item.toLowerCase().indexOf(taskText) != -1) {
            //sereach for the taskText withine item if not there ,it reture -1
            task.style.display = "block";
        } else {
            task.style.display = "none"; //if it deosn't exit
        }
    }); //foreach function makes loop for all values of li
}