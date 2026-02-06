const todoInput = document.getElementById("todoInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const deleteAllBtn = document.querySelector(".delete-all-btn");
const filterBtn = document.querySelector(".filter-btn");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let filterStatus = "all";

renderTodos();

// ADD TODO
addBtn.addEventListener("click", () => {
  if (todoInput.value === "" || dateInput.value === "") {
    alert("Input tidak boleh kosong!");
    return;
  }

  todos.push({
    task: todoInput.value,
    date: dateInput.value,
    status: "Pending"
  });

  saveAndRender();
  todoInput.value = "";
  dateInput.value = "";
});

// DELETE ALL
deleteAllBtn.addEventListener("click", () => {
  if (confirm("Hapus semua task?")) {
    todos = [];
    saveAndRender();
  }
});

// FILTER
filterBtn.addEventListener("click", () => {
  if (filterStatus === "all") filterStatus = "pending";
  else if (filterStatus === "pending") filterStatus = "done";
  else filterStatus = "all";

  filterBtn.innerText = filterStatus.toUpperCase();
  renderTodos();
});

// RENDER
function renderTodos() {
  todoList.innerHTML = "";

  let filteredTodos = todos.filter(todo => {
    if (filterStatus === "all") return true;
    if (filterStatus === "pending") return todo.status === "Pending";
    if (filterStatus === "done") return todo.status === "Done";
  });

  if (filteredTodos.length === 0) {
    todoList.innerHTML = `<p class="empty">No task found</p>`;
    return;
  }

  filteredTodos.forEach((todo, index) => {
    const row = document.createElement("div");
    row.className = "table-row";

    row.innerHTML = `
      <span>${todo.task}</span>
      <span>${todo.date}</span>
      <span class="status ${todo.status.toLowerCase()}">${todo.status}</span>
      <span>
        <button class="done-btn">✔</button>
        <button class="del-btn">✖</button>
      </span>
    `;

    row.querySelector(".done-btn").onclick = () => toggleStatus(index);
    row.querySelector(".del-btn").onclick = () => deleteTodo(index);

    todoList.appendChild(row);
  });
}

// ACTIONS
function toggleStatus(index) {
  todos[index].status =
    todos[index].status === "Pending" ? "Done" : "Pending";
  saveAndRender();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}
