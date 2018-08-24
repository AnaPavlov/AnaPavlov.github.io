let inpAddTask = document.getElementById("inpAddTask");
let inpPriorityNumber = document.getElementById("inpPriorityNumber");
let btnAddTask = document.getElementById("btnAddTask");
let inpFilter = document.getElementById("inpFilter");
let btnClearTasks = document.getElementById("btnClearTasks");
let list = document.getElementById("list");
let localStorageArr = [];

window.onload = function () {
    checkLocalStorage();
    btnAddTask.addEventListener("click", addTask);
    btnClearTasks.addEventListener("click", clearAllTasks);
    inpFilter.addEventListener("keyup", filterTasks);
    inpAddTask.addEventListener("keypress", pressEnter);
    inpPriorityNumber.addEventListener("keypress", enterAddTask);
};

function pressEnter() {
    if (event.keyCode == 13) {
        inpPriorityNumber.focus();
    }
}

function enterAddTask() {
    if (event.keyCode == 13) {
        addTask();
        inpAddTask.focus();
    }
}

function checkLocalStorage() {
    if (localStorage.getItem("taskArray")) {
        obj = JSON.parse(localStorage.getItem("taskArray"));
        localStorageArr = obj;
        displayTasks();
    }
}

function addTask() {
    let taskObj = {};
    if (inpAddTask.value != "") {
        taskObj.name = inpAddTask.value;
        inpAddTask.value = "";

        if (inpPriorityNumber.value != "") {
            taskObj.number = inpPriorityNumber.value;
            inpPriorityNumber.value = "";

            //adding new input to localStorageArr and to LocalStorage
            localStorageArr.push(taskObj);
            taskArray = JSON.stringify(localStorageArr);
            localStorage.setItem("taskArray", taskArray);
            displayTasks();
        } else alert("You must enter priority number");

    } else alert("You must enter a task first");
}

function displayTasks() {
    //sorting tasks according to priority numbers
    let obj = localStorageArr.sort(function (a, b) {
        return a.number > b.number
    });
    list.innerHTML = "";
    for (let i = 0; i < obj.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = `<span>${obj[i].name}</span>` + `<strong>x</strong>`;
        list.appendChild(li);
        let deleteIcon = document.querySelector("strong");
        deleteIcon.addEventListener("click", deleteTask);
    }
}

function deleteTask(event) {
    let confirmDelete = confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
        let liTarget = event.currentTarget.parentElement;
        liTarget.remove();

        let obj = JSON.parse(localStorage.getItem("taskArray"));
        for (let i = 0; i < obj.length; i++) {
            if ((liTarget.querySelector("span").innerText) == obj[i].name) {
                obj.splice(i, 1);
            }
        }
        let array = JSON.stringify(obj);
        localStorage.setItem("taskArray", array);
    }
}

function clearAllTasks() {
    let confirmDelete = confirm("Are you sure you want to delete all tasks?");
    if (list.innerHTML != "" && confirmDelete) {
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
        localStorage.removeItem("taskArray");
        localStorageArr = [];
    }
}

function filterTasks() {
    if (list.hasChildNodes) {
        let liCollection = document.querySelectorAll("span");
        let inpText = inpFilter.value.toUpperCase();
        for (let i = 0; i < liCollection.length; i++) {
            if (liCollection[i].innerText.toUpperCase().indexOf(inpText) != -1) {
                liCollection[i].parentElement.style.display = "list-item";
            } else (liCollection[i].parentElement.style.display = "none");
        }
    }
}
