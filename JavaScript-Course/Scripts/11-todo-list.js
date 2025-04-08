// When loading the page, load from localStorage.
const todoList = JSON.parse(localStorage.getItem("todoList")) || [
  {
    name: "make dinner",
    dueDate: "2022-12-22",
  },
  {
    name: "wash dishes",
    dueDate: "2022-12-22",
  },
];

renderTodoList();

/*
todoList.splice(${i}, 1);: Removes 1 item at position i from the todoList array.

renderTodoList();: Refreshes the list so the deleted item disappears from the page immediately.

saveToStorage();: Updates the browser's localStorage so the change is saved permanently (even after refresh).
*/
function renderTodoList() {
  // Start with an empty string to build the full HTML content for the to-do list
  let todoListHTML = "";

  // Loop through each item in the todoList array
  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];

    //const name = todoObject.name;
    //const dueDate = todoObject.dueDate;
    // Use object destructuring to extract name and dueDate from the current to-do object
    const { name, dueDate } = todoObject;

    // Build the HTML structure for this specific to-do item
    const html = `
      <div>${name}</div>           <!-- Display the name of the task -->
      <div>${dueDate}</div>        <!-- Display the due date -->

      <button onclick="
        // When the button is clicked, remove this item from the todoList array
        todoList.splice(${i}, 1);

        // Re-render the list after deleting
        renderTodoList();

        // Save the updated list to localStorage so it's persistent
        saveToStorage();
      " class="delete-todo-button">Delete</button> 
    `;

    // Add this HTML block to the overall list HTML
    todoListHTML += html;
  }
  // Inject the entire list into the HTML page inside the element with class .js-todo-list
  document.querySelector(".js-todo-list").innerHTML = todoListHTML;
}

function addTodo() {
  const inputElement = document.querySelector(".js-name-input");
  const name = inputElement.value;

  const dateInputElement = document.querySelector(".js-due-date-input");
  const dueDate = dateInputElement.value;

  todoList.push({
    //name: name,
    //dueDate: dueDate,
    name,
    dueDate,
  });

  inputElement.value = "";

  renderTodoList();

  // Whenever we update the todo list, save in localStorage.
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}
