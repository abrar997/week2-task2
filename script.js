var alerts = document.getElementById("alert");
var edit = document.getElementById("edit");
let data = [];

function showMessage(message, className) {
  alerts.innerText = message;
  alerts.className = `alert alert-${className}`;
  setTimeout(() => alerts.classList.add("remove"), 3000);
}

function getAllTasks() {
  var items = document.getElementById("tasks-group");
  items.innerHTML += data.map((item) => {
    return `
        <li class="task col-lg-6 col-sm-12 mt-3">
            <div class="card pb-4 position-relative">
              <div class="card-body">
                <h3 class="card-title text-success" id="">${item.title}</h3>
                <p class="card-text">
              ${item.description}
                </p>
              </div>
              <div class="position-absolute bottom-0 end-0 pb-2 pe-2">
                <button class="btn btn-outline-success px-2 py-1" id="edit" >
                  <i class="fa-solid fa-pen"></i>
                </button>
                <button class="btn btn-outline-danger px-2 py-1" id="delete" '>
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </li>`;
  });
}

function AddNewTask() {
  var title = document.getElementById("title").value;
  var description = document.getElementById("description").value;
  if (title === "") {
    document.querySelector(".validation").innerText = "title is required";
  } else if (description === "") {
    document.querySelector(".validation").innerText = "description is required";
  } else {
    document.querySelector(".validation").innerText = "";
  }
  data.push({
    title: title,
    description: description,
  });
  title.innerText = "";
  description.innerText = "";
  getAllTasks();
}

function DeleteTask(item) {
  item.parentElement.parentElement.remove();
  alerts.classList.add("active");
  showMessage("this message deleted ", "danger");
}
function EditTask() {
  alerts.classList.add("active");
  showMessage("this message edited successfully ", "success");
}

document.getElementById("task-form").addEventListener("submit", function (e) {
  e.preventDefault();
  AddNewTask();
  console.log(data);
});

document.getElementById("delete").addEventListener("click", (item) => {
  DeleteTask(item);
});
document.getElementById("edit").addEventListener("click", () => {
  EditTask();
});
