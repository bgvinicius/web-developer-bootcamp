/**
 * A simple todo logic, 
 * uses prompt to get a option.
 * 
 * type 'list' to see a list of todos;
 * type 'new' to  create a new todo;
 * type 'quit' to quit the app;
 * type 'delete' to remove a specific todo;
 * 
 */

console.log("type 'list' to see a list of todos");
console.log("type 'new' to  create a new todo");
console.log("type 'delete' to remove a specific todo");
console.log("type 'quit' to quit the app");

var todos = [];

function listTodos() {
    console.log("*".repeat(15));
    todos.forEach(function (todo, index) {
        console.log(index + ": " + todo);
    });
    console.log("*".repeat(15));
}

function createTodo() {
    var newTodo = prompt("Enter your new todo");
    todos.push(newTodo);
    console.log(newTodo + " added to the list.");
}

function deleteTodo() {
    var todoIndex = prompt("Enter the index of the todo to delete");
    todos.splice(todoIndex, 1);
    console.log("Todo deleted.");
}

var option = "";

while (option !== "quit") {
    option = prompt("Enter your option").toLowerCase();

    if (option === "list") {
        listTodos();
    } else if (option === "new") {
        createTodo();
    } else if (option === "delete") {
        deleteTodo();
    }
}

console.log("Goodbye!!")