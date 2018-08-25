let inpAddTask = document.getElementById("inpAddTask");
let inpPriorityNumber = document.getElementById("inpPriorityNumber");
let btnAddTask = document.getElementById("btnAddTask");
let inpFilter = document.getElementById("inpFilter");
let btnClearTasks = document.getElementById("btnClearTasks");
let list = document.getElementById("list");

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

            //adding new input to LocalStorage

            if (localStorage.getItem("taskArray")) {
                let taskArray = JSON.parse(localStorage.getItem("taskArray"));
                taskArray.push(taskObj);
                localStorage.setItem("taskArray", JSON.stringify(taskArray));
            } else {
                let taskArray = [];
                taskArray.push(taskObj);
                localStorage.setItem("taskArray", JSON.stringify(taskArray));
            }

            displayTasks();
        } else alert("You must enter priority number");

    } else alert("You must enter a task first");
}

function displayTasks() {
    //sorting tasks according to priority numbers
    let obj = JSON.parse(localStorage.getItem("taskArray"));

    obj = obj.sort(function (a, b) {
        return a.number > b.number
    });
    list.innerHTML = "";
    for (let i = 0; i < obj.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = `<span>${obj[i].name}</span>` + `<strong>x</strong>`;
        list.appendChild(li);
        let deleteIcon = document.querySelectorAll("strong");
        for (let i = 0; i < deleteIcon.length; i++) {
            deleteIcon[i].addEventListener("click", deleteTask);
        }
    }
}

function deleteTask(event) {
    let confirmDelete = confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
        let liTarget = event.currentTarget.parentElement;
        liTarget.remove();
        let taskText = liTarget.innerText.substring(0, (liTarget.innerText).length - 1)

        let taskArray = JSON.parse(localStorage.getItem("taskArray"));
        for (let i = 0; i < taskArray.length; i++) {
            if ((liTarget.querySelector("span").innerText) == taskArray[i]["name"]) {
                taskArray.splice(i, 1);
            }
        }
        localStorage.setItem("taskArray", JSON.stringify(taskArray));
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
