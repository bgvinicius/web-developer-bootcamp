/*
Print all numbers between -10 and 19.
Print all even numbers between 10 and 40.
Print all odd numbers between 300 and 333.
Print all numbers divisible by 5 and 3 between 3 and 50.
*/

var i = -10;
while (i < 20) {
    console.log(i);
    i++;
}
console.log("===========================================")

i = 10;

while (i < 41) {
    if (i % 2 === 0) {
        console.log(i);
    }

    i++;
}
console.log("===========================================")

i = 300;

while (i < 334) {
    if (i % 2 != 0) {
        console.log(i);
    }

    i++;
}
console.log("===========================================")

i = 3;

while (i < 51) {
    if (i % 5 == 0 && i % 3 == 0) {
        console.log(i);
    }

    i++;
}