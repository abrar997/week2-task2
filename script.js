var alerts = document.getElementById("alert"); //to show notification

let isEdit = false; //for updated task
let editedId;

let isNewTask = false; //add animation when add new task

const data = localStorage.getItem("data")
  ? JSON.parse(localStorage.getItem("data"))
  : [];

//notification message when add, update , delete and when task completed
function showMessage(message, className) {
  alerts.innerText = message;
  alerts.className = `alert-${className} alert `;
  alerts.classList.add("active");
  setTimeout(() => alerts.classList.remove("active"), 2000);
}
//add new task when submit btn
document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  var title = document.getElementById("title").value;
  var description = document.getElementById("description").value;
  const TaskData = {
    title: title,
    description: description,
    completed: false,
  };
  if (!isEdit) {
    //if it's not updated task , add new task
    data.push(TaskData);
    isNewTask = true;
    showMessage("task added successfully", "info");
  } else {
    //return updated task
    data[editedId] = TaskData;
    showMessage("task updated successfully", "info");
    isEdit = false;
    isNewTask = false;
  }
  document.getElementById("submit-btn").innerText = "submit";
  setTimeout(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, 300);
  document.getElementById("form").reset();
  showTasks(); //render all tasks after add or update task
});

//return task as li
function showTasks() {
  var container = document.getElementById("tasks-group");
  container.innerHTML = data
    .map((item, index) => {
      return ` <li key=${index} class="task py-4 pb-2 ${
        item.completed ? "completed" : ""
      }">
        <div class="card bg-transparent border-0 position-relative">
        <div class="p-0 px-lg-2 card-body">
        <h3 class='card-title'>
          ${item.title}
            </h3>
            <p class="card-text h-100 pb-4">${item.description}</p>
            <div class="position-absolute  bottom-0 end-0">
            <button id='complete' class="btn btn-outline-success px-2 py-1 completed-task"  ${
              item.completed ? "disabled" : ""
            }>
            <i class="fa-solid fa-check"></i>
              </button>
                <button class="btn px-2 py-1  edit-btn ${
                  item.completed ? "d-none" : ""
                }" id="edit" onclick="editTask(${index},'${item.title}','${
        item.description
      }')">
                     <i class="fa-solid fa-pen"></i>
              </button>
              <button class="btn px-2 py-1" id="delete" onclick='deleteTask(${index})'>
                    <i class="fa-solid fa-trash"></i>
              </button>
              </div>
              </div>
              </div> 
      </li>`;
    })
    .join("");

  //add smoothly animation when add new task
  if (isNewTask) {
    const tasks = document.querySelectorAll(".task");
    const newTask = tasks[tasks.length - 1];
    newTask.classList.add("new");
    setTimeout(() => {
      newTask.classList.remove("new");
    }, 300);

    isNewTask = false;
  }

  //when click on completed btn and to change text after click on btn
  var completedBtn = document.querySelectorAll(".completed-task");
  completedBtn.forEach((item, index) => {
    item.addEventListener("click", function () {
      data[index].completed = true;
      showMessage(`task ${index + 1} completed`, "success");
      item.disabled = true;
      localStorage.setItem("data", JSON.stringify(data));
      showTasks(); //render task after complete task
    });
  });
}

//delete task
function deleteTask(index) {
  const taskToDelete = document.querySelectorAll(".task")[index];
  taskToDelete.classList.add("hidden");
  //delete process complete in 0.3s to add smoothly transition
  setTimeout(() => {
    data.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(data));
    showMessage(`task ${index + 1} deleted`, "danger");
    showTasks(); //render tasks after deleted item
  }, 300);
}

//edit task
function editTask(index, title, description) {
  isEdit = true;
  editedId = index;
  document.getElementById("title").value = title;
  document.getElementById("description").value = description;
  document.getElementById("submit-btn").innerText = "update";
}

//render tasks without refresh page
showTasks();
