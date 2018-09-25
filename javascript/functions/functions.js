/**
 * Write a function isEven which takes a single numeric argument and returns true if the number is even, and false otherwise.
 */

function isEven(number) {
    return number % 2 === 0;
}

/**
 * Write a function factorial which takes a single number argument and returns the factorial of that number.
 */

function factorial(number) {
    if (number == 0) {
        return 1;
    }

    return number * factorial(number - 1);
}
/**
 * Write a function kebabToSnake which takes a single kebab-cased string argument and returns the snake_cased version.
 */

function kebabToSnake(kebabCasedString) {
    return kebabCasedString.replace(/-/g, "_");
}