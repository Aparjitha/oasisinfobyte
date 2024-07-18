const input = document.querySelector("input");
const addButton = document.querySelector(".add-button");
const todoHtml = document.querySelector(".todos");
const emptyimage = document.querySelector(".empty-image");
const errorMessage = document.querySelector(".error"); 
let todoJson = JSON.parse(localStorage.getItem("todos")) || [];
const deleteAllButton = document.querySelector(".delete-all");
const filters = document.querySelectorAll(".filter");
let filter = 'all'; 
let editIndex = null;
const deleteModal = document.getElementById("deletemodal");
const confirmDelete = document.getElementById("confirm");
const cancelDelete = document.getElementById("cancel");

showTodos();

function getTodoHtml(todo, index) {
    if (filter && filter !== "all" && filter !== todo.status) {
        return '';
    }
    let checked = todo.status === "completed" ? "checked" : "";
    let editButtonHtml = todo.status === "completed" ? `<button class="edit-btn disabled" data-index="${index}"><i class='bx bxs-pencil'></i></button>` : `<button class="edit-btn" data-index="${index}" onclick="edit(this)"><i class='bx bxs-pencil'></i></button>`;
    
    return `
        <li class="todo">
            <label for="${index}">
                <input id="${index}" onclick="updateStatus(this)" type="checkbox" ${checked}>
                <span class="${checked}">${todo.name}</span>
            </label>
            ${editButtonHtml}
            <button class="delete-btn" data-index="${index}" onclick="remove(this)"><i class='bx bx-x-circle'></i></button>
        </li>
    `;
}

function addTodo() {
    let todo = input.value.trim();
    if (!todo) {
        return;
    }
    if (todoJson.some(item => item.name.toLowerCase() === todo.toLowerCase())) {
        errorMessage.style.display = 'block';
        return;
    }
    errorMessage.style.display = 'none';
    if (editIndex !== null) {
        todoJson[editIndex].name = todo;
        editIndex = null; 
    } else {
        todoJson.unshift({ name: todo, status: "pending" });
    }
    input.value = "";
    localStorage.setItem("todos", JSON.stringify(todoJson));
    showTodos();
}

input.addEventListener("keyup", e => {
    if (e.key !== "Enter") {
        return;
    }
    addTodo();
});

addButton.addEventListener("click", addTodo);

function showTodos() {
    if (todoJson.length === 0) {
        todoHtml.innerHTML = '';
        emptyimage.style.display = 'block';
    } else {
        todoHtml.innerHTML = todoJson.map((todo, index) => getTodoHtml(todo, index)).join('');
        emptyimage.style.display = 'none';
    }
}

function remove(todo) {
    const index = todo.dataset.index;
    todoJson.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todoJson));
    showTodos();
}

function edit(todo) {
    const index = todo.dataset.index;
    input.value = todoJson[index].name;
    editIndex = index;
}

function updateStatus(todo) {
    const index = todo.id;
    let todoName = todo.parentElement.querySelector("span");
    if (todo.checked) {
        todoName.classList.add("checked");
        todoJson[index].status = "completed";
    } else {
        todoName.classList.remove("checked");
        todoJson[index].status = "pending";
    }
    localStorage.setItem("todos", JSON.stringify(todoJson));
    showTodos();
}

filters.forEach(function (el) {
    el.addEventListener("click", (e) => {
        if (el.classList.contains('active')) {
            el.classList.remove('active');
            filter = '';
        } else {
            filters.forEach(tag => tag.classList.remove('active'));
            el.classList.add('active');
            filter = e.target.dataset.filter;
        }
        showTodos();
    });
});

deleteAllButton.addEventListener("click", () => {
    deleteModal.style.display = "block";
});

confirmDelete.addEventListener("click", () => {
    todoJson = [];
    localStorage.setItem("todos", JSON.stringify(todoJson));
    showTodos();
    deleteModal.style.display = "none";
});

cancelDelete.addEventListener("click", () => {
    deleteModal.style.display = "none";
});
window.addEventListener("click", (event) => {
    if (event.target === deleteModal) {
        deleteModal.style.display = "none";
    }
});