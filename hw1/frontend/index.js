/* global axios */
const itemTemplate = document.querySelector("#todo-item-template");
const addTemplate  = document.querySelector("#todo-input-container");
const viewTemplate = document.querySelector("#todo-view-template");
// const todoList = document.querySelector("#todos");
let state = 1; //1 --> list page   2 --> add diary   3 --> view diary    4 --> edit diary
let test = [{title:"test", mood:"happy", tag:"study", date:"2023-09-20", 
            description:"Web-programming is so hard.", id:"650bbe22cdd377b2e43971ff"}];
let checkingId = "650c42ab0ecb1da17626e24e";

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

async function renderPage() {
  const todos = await getTodos();
  // const todos = test;
  // console.log(todos);
  todos.forEach((todo) => renderTodo(todo));

  renderEdit();

  renderView(document.getElementById(checkingId));
}

async function main() {
  console.log(state);
  if(state===1) {
    try {
      document.querySelector('#todo-add-main').style.display = "block";
      document.getElementById("todo-item-template").style.display = "block";
      document.getElementById("todo-input-container").style.display = "none";
      document.getElementById("todo-view-template").style.display = "none";
    } catch (error) {
      alert("Failed to load list page!");
      console.log(error);
    }
    setupEventListeners();
  }
  else if(state===2) {
    try {
      document.getElementById("todo-input-container").style.display = "block";
      document.querySelector('#todo-add-main').style.display = "none";
      document.getElementById("todo-item-template").style.display = "none";
      document.getElementById("todo-view-template").style.display = "none";
    } catch (error) {
      alert("Failed to load add page!");
    }
    addEventListeners();
  }
  else if(state===3) {
    try {
      document.getElementById("todo-view-template").style.display = "block";
      document.querySelector('#todo-add-main').style.display = "none";
      document.getElementById("todo-item-template").style.display = "none";
      document.getElementById("todo-input-container").style.display = "none";
    } catch(error)  {
      alert("Fail to load view page!");
      console.log(error);
    }
    const todos = document.getElementById(checkingId);
    // renderView(todos);
    createViewElement(todos);
  }
  else if(state===4) {
    try {
      document.getElementById("todo-input-container").style.display = "block";
      document.querySelector('#todo-add-main').style.display = "none";
      document.getElementById("todo-item-template").style.display = "none";
      document.getElementById("todo-view-template").style.display = "none";
    } catch (error) {
      alert("Failed to load edit page!");
    }
    const todos = document.getElementById(checkingId);
    editEventListeners(todos);
  }
}

function setupEventListeners() {
  const addTodoButton = document.querySelector("#todo-add-main");
  addTodoButton.addEventListener ("click", async () => {
    state=2;
    main();
  });
}

function addEventListeners() {
  const cancelButton = document.querySelector("#cancel");
  const submitButton = document.querySelector("#submit");
  const moodInput = document.querySelector("#mood-input");
  const tagInput  = document.querySelector("#tag-input" );
  const dateInput = document.querySelector("#date-input");
  const todoInput = document.querySelector("#todo-input");
  const todoDescriptionInput = document.querySelector(
    "#todo-description-input",
  );
  submitButton.addEventListener("click", async() => {
    const title = todoInput.value;
    const mood = moodInput.value;
    const tag  = tagInput.value;
    const date = dateInput.value;
    const description = todoDescriptionInput.value;
    if (!title) {
      alert("Please enter a dairy title!");
      return;
    }
    if (!mood) {
      alert("Please enter your mood!");
      return;
    }
    if (!tag) {
      alert("Please enter the tag!");
      return;
    }
    if (!date) {
      alert("Please enter the date!");
      return;
    }
    if (!description) {
      alert("Please enter the description!");
      return;
    }
    try {
      const todo = await createTodo({ title, mood, tag, date, description });
      renderTodo(todo);
    } catch (error) {
      console.log(error);
      alert("Failed to create diary!");
      return;
    }
    todoInput.value = "";
    moodInput.value = "";
    tagInput.value  = "";
    dateInput.value = "";
    todoDescriptionInput.value = "";
    state=1;
    main();
  });
  cancelButton.addEventListener("click", async => {
    todoInput.value = "";
    moodInput.value = "";
    tagInput.value  = "";
    dateInput.value = "";
    todoDescriptionInput.value = "";
    state=1;
    main();
  })
}

function editEventListeners(todo) {
  const cancelButton = document.querySelector("#cancel");
  const submitButton = document.querySelector("#submit");
  const moodInput = document.querySelector("#mood-input");
  const tagInput  = document.querySelector("#tag-input" );
  const dateInput = document.querySelector("#date-input");
  const todoInput = document.querySelector("#todo-input");
  const todoDescriptionInput = document.querySelector(
    "#todo-description-input",
  );
  const titleElement = todo.querySelector(".todo-title");
  const moodElement = todo.querySelector(".mood-title");
  const tagElement = todo.querySelector(".tag-title");
  const dateElement = todo.querySelector(".date-title");
  const descriptionElement = todo.querySelector(".todo-description");
  todoInput.value = titleElement.textContent;
  moodInput.value = moodElement.textContent;
  tagInput.value = tagElement.textContent;
  dateInput.value = dateElement.textContent;
  todoDescriptionInput.value = descriptionElement.textContent;
  submitButton.addEventListener("click", async() => {
    const title = todoInput.value;
    const mood = moodInput.value;
    const tag  = tagInput.value;
    const date = dateInput.value;
    const description = todoDescriptionInput.value;
    if (!title) {
      alert("Please enter a dairy title!");
      return;
    }
    if (!mood) {
      alert("Please enter your mood!");
      return;
    }
    if (!tag) {
      alert("Please enter the tag!");
      return;
    }
    if (!date) {
      alert("Please enter the date!");
      return;
    }
    if (!description) {
      alert("Please enter the description!");
      return;
    }
    try {
      titleElement.textContent=todoInput.value;
      moodElement.textContent=moodInput.value;
      tagElement.textContent=tagInput.value;
      dateElement.textContent=dateInput.value;
      descriptionElement.textContent=todoDescriptionInput.value;
      console.log(todo.id);
      const todos = await updateTodostate(todo.id, { title, mood, tag, date, description });
      console.log(todos);
      document.getElementById(todo.id).remove();
      renderTodo(todos);
    } catch (error) {
      console.log(error);
      alert("Failed to create diary!");
      return;
    }
    todoInput.value = "";
    moodInput.value = "";
    tagInput.value  = "";
    dateInput.value = "";
    todoDescriptionInput.value = "";
    state=1;
    main();
  });
  cancelButton.addEventListener("click", async => {
    todoInput.value = "";
    moodInput.value = "";
    tagInput.value  = "";
    dateInput.value = "";
    todoDescriptionInput.value = "";
    state=1;
    main();
  })
}

function renderTodo(todo) {
  const item = createTodoElement(todo);
  document.getElementById("todo-item-template").appendChild(item);
}

function renderEdit() {
  const item = createEditElement();
  document.getElementById("todo-input-container").appendChild(item);
}

function renderView(todo) {
  const item = createViewElement(todo);
  document.getElementById("todo-view-template").appendChild(item);
}

function createTodoElement(todo) {
  const item = itemTemplate.content.cloneNode(true);
  const container = item.querySelector(".todo-item");
  container.id = todo.id;
  const title = item.querySelector("p.todo-title");
  title.innerText = todo.title;
  const tag = item.querySelector("p.tag-title");
  tag.innerText = todo.tag;
  const mood = item.querySelector("p.mood-title");
  mood.innerText = todo.mood;
  const date = item.querySelector("p.date-title");
  date.innerText = todo.date;
  const description = item.querySelector("p.todo-description");
  description.innerText = todo.description;
  const viewButton = item.querySelector("button.view-todo");
  viewButton.dataset.id = todo.id;
  const editButton = item.querySelector("button.edit-todo");
  editButton.dataset.id = todo.id;
  const deleteButton = item.querySelector("button.delete-todo");
  deleteButton.dataset.id = todo.id;
  deleteButton.addEventListener("click", () => {
    deleteTodoElement(todo.id);
  });
  editButton.addEventListener("click", () => {
    editTodoElement(todo.id);
  });
  viewButton.addEventListener("click", () => {
    viewTodoElement(todo.id);
  });
  return item;
}

function createEditElement() {
  const item = addTemplate.content.cloneNode(true);
  return item;
}

function createViewElement(todo) {
  const item = viewTemplate.content.cloneNode(true);
  const title = item.querySelector("h2.todo-view");
  const titleElement = todo.querySelector(".todo-title");
  title.innerText = titleElement.textContent;
  const tag = item.querySelector("p.tag-view");
  const tagElement = todo.querySelector(".tag-title");
  tag.innerText = tagElement.textContent;
  const mood = item.querySelector("p.mood-view");
  const moodElement = todo.querySelector(".mood-title");
  mood.innerText = moodElement.textContent;
  const date = item.querySelector("p.date-view");
  const dateElement = todo.querySelector(".date-title");
  date.innerText = dateElement.textContent;
  const description = item.querySelector("p.description-view");
  const descriptionElement = todo.querySelector(".todo-description");
  description.innerText = descriptionElement.textContent;
  const editButton = item.querySelector("button.edit-todo-in-view");
  editButton.dataset.id = todo.id;
  const backButton = item.querySelector("button.back-to-list-page");
  backButton.dataset.id = todo.id;
  editButton.addEventListener("click", () => {
    editTodoElement(todo.id);
  });
  backButton.addEventListener("click", () => {
    state=1;
    main();
  });
  return item;
}

async function viewTodoElement(id)  {
  checkingId=id;
  state=3;
  main();
}

async function editTodoElement(id)  {
  checkingId=id;
  state=4;
  main();
}

async function deleteTodoElement(id) {
  try {
    await deleteTodoById(id);
  } catch (error) {
    alert("Failed to delete todo!");
  } finally {
    const todo = document.getElementById(id);
    todo.remove();
  }
}

async function getTodos() {
  const response = await instance.get("/todos");
  return response.data;
}

async function createTodo(todo) {
  const response = await instance.post("/todos", todo);
  return response.data;
}

// eslint-disable-next-line no-unused-vars
async function updateTodostate(id, todo) {
  const response = await instance.put(`/todos/${id}`, todo);
  return response.data;
}

async function deleteTodoById(id) {
  const response = await instance.delete(`/todos/${id}`);
  return response.data;
}

renderPage();
main();
