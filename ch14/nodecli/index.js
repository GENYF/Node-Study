#!/usr/bin/env node
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.clear();

rl.question('What do you think of Node.js? ', (answer) => {
    if (answer === 'love') {
        console.log('Thank you very much!');
    } else if (answer === 'hate') {
        console.log('I am sorry to hear that!');
    } else {
        console.log('Thank you for your valuable feedback:', answer);
    }
    rl.close();
});