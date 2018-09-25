/**
 * A simple todo logic, 
 * uses prompt to get a option, and uses console.log to 
 * output the result.
 * 
 * type 'list' to see a list of todos;
 * type 'new' to  create a new todo;
 * type 'quit' to quit the app;
 */

var todos = [];

function listTodos() {
    console.log(todos);
}

function createTodo() {
    var newTodo = prompt("Enter your new todo");
    todos.push(newTodo);
}

var option = "";

while (option !== "quit") {
    option = prompt("Enter your option").toLowerCase();

    if (option === "list") {
        listTodos();
    } else if (option === "new") {
        createTodo();
    }
}

console.log("Goodbye!!")