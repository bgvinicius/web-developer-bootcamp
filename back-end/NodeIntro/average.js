

function roundedAverage(arr) {
    return Math.round(arr.reduce((accumulator, currentValue) => (accumulator + currentValue)) / arr.length);
}

console.log(roundedAverage([10, 20]));
console.log(roundedAverage([10, 8, 7, 5, 6]));