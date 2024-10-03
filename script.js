var alerts = document.getElementById("alert");
var edit = document.getElementById("edit");
let isEdit = false; //for updated task
let editedId;

var data = localStorage.getItem("data")
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
  };
  if (!isEdit) {
    //if it's not updated task add enw task
    data.push(TaskData);
    showMessage("task added successfully", "info");
  } else {
    //return updated task
    isEdit = false;
    data[editedId] = TaskData;
    showMessage("task updated successfully", "info");
  }
  document.getElementById("submit-btn").innerText = "submit";
  localStorage.setItem("data", JSON.stringify(data));
  document.getElementById("form").reset();
  showTasks();
});

//return task as li

function showTasks() {
  var container = document.getElementById("tasks-group");
  container.innerHTML = data
    .map((item, index) => {
      return ` <li key=${index} class="task py-4">
        <div class="card bg-transparent border-0 position-relative">
        <div class="card-body">
        <h3 class='d-grid card-title'>
          ${item.title}
            </h3>
            <p class="card-text">${item.description}</p>
          </div>
          <div class="position-absolute bottom-0 end-0 pb-1 pe-2 ">
               <button id='complete' class="btn btn-outline-success px-2 py-1 completed-task" >
                    <i class="fa-solid fa-spinner"></i>
              </button>
                <button class="btn px-2 py-1 edit-btn" id="edit" onclick="editTask(${index},'${item.title}','${item.description}')">
                     <i class="fa-solid fa-pen"></i>
              </button>
              <button class="btn px-2 py-1" id="delete" onclick='deleteTask(${index})'>
                    <i class="fa-solid fa-trash"></i>
              </button>
           
            <div>
            </div>
          </div>
        </div>
      </li>`;
    })
    .join("");
  //when click on completed btn and to change text after click on btn
  var completedBtn = document.querySelectorAll(".completed-task");
  completedBtn.forEach((item, index) => {
    item.addEventListener("click", function () {
      var selectedTask = document.querySelectorAll(".task")[index];
      item.innerHTML = '<i class="fa-solid fa-check"></i>';
      selectedTask.classList.add("completed");
      var editBtn = document.querySelectorAll(".edit-btn")[index];
      var deleteBtn = document.querySelectorAll("#delete")[index];
      editBtn.disabled = true;
      deleteBtn.disabled = true;
      item.disabled = true;
      showMessage(`task ${index + 1} completed`, "success");
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
    showMessage("task deleted", "danger");
    showTasks();
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
//show tasks without refresh page
showTasks();
