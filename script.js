var alerts = document.getElementById("alert");
var edit = document.getElementById("edit");
let isEdit = false;
let editedId;

var data = localStorage.getItem("data")
  ? JSON.parse(localStorage.getItem("data"))
  : [];

function showMessage(message, className) {
  alerts.innerText = message;
  alerts.className = `alert alert-${className}`;
  alerts.classList.add("active");
  setTimeout(() => alerts.classList.remove("active"), 2500);
}

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  var title = document.getElementById("title").value;
  var description = document.getElementById("description").value;
  const TaskData = {
    title: title,
    description: description,
  };
  if (!isEdit) {
    data.push(TaskData);
    showMessage("task added successfully", "info");
  } else {
    isEdit = false;
    data[editedId] = TaskData;
    showMessage("task updated successfully", "warning");
  }
  document.getElementById("submit-btn").innerText = "submit";
  localStorage.setItem("data", JSON.stringify(data));
  document.getElementById("form").reset();
  showTasks();
});

function showTasks() {
  var container = document.getElementById("tasks-group");
  container.innerHTML = data
    .map((item, index) => {
      return ` <li key=${index} class="task col-lg-6 col-sm-12 mt-3 ">
        <div class="card pb-5 position-relative">
          <div class="card-body">
            <h3 class="card-title" id="">
              ${item.title}
            </h3>
            <p class="card-text">${item.description}</p>
          </div>
          <div class="position-absolute bottom-0 end-0 pb-1 pe-2 ">
            <button class="btn px-2 py-1" id="edit" onclick="editTask(${index},'${item.title}','${item.description}')">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button class="btn px-2 py-1" id="delete" onclick='deleteTask(${index})'>
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </li>`;
    })
    .join("");
}

function deleteTask(index) {
  const taskToDelete = document.querySelectorAll(".task")[index];
  taskToDelete.classList.add("hidden");
  setTimeout(() => {
    data.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(data));
    showMessage("task deleted", "danger");
    showTasks();
  }, 300);
}

function editTask(index, title, description) {
  isEdit = true;
  editedId = index;
  document.getElementById("title").value = title;
  document.getElementById("description").value = description;
  document.getElementById("submit-btn").innerText = "update";
}

showTasks();
