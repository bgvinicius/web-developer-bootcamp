/**
 * Arrays Problem Set.
 * 
 * 1. Write a function 'printReverse(arr)' that takes an array prints the elements of the array in inverse order.
 * Example: [1, 2, 3, 4]  prints 4, 3, 2, 1.
 * 
 * 2. Write a function 'isUniform(arr)' that checks if all the elements in a array are identical.
 * Example: [1, 1, 1, 1] returns true; [1, 2, 1, 1, 3] returns false.
 * 
 * 3. Write a function 'sumArray(arr)' that returns the sum of elements in a array.
 * 
 * 4. Write a function 'max(arr)' that takes an array and returns the maximum number in the array.
 */

function printReverse(array) {
    for (var i = array.length - 1; i >=  0; i--) {
        console.log(array[i]);
    }
}

function isUniform(array) {
    var last = array[0];
    for (var i = 0; i < array.length; i++) {
        if (last != array[i]) {
            return false;
        }
        last = array[i];
    }

    return true;
}

function sumArray(array) {
    var sum = 0;
    
    array.forEach(function(element) {
        sum += element;
    });

    return sum;
}

function max(array) {
    var max = array[0];

    array.forEach(function(element) {
        if (element > max) {
            max = element;
        }
    });

    return max;
}

// solutions using reduce
function sumArrayReduce(array) {
    return array.reduce(function(sum, currentValue) {
        return sum + currentValue;
    }, 0);
}

function maxReduce(array) {
    return array.reduce(function(maxValue, currentValue) {
        return maxValue > currentValue ? maxValue : currentValue;
    }, array[0]);
}

