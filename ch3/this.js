// global이 아님
// this === module.exports === {}
console.log(this);
console.log(this === module.exports);

function a() {
    // global이 맞음
    console.log(this === global);
}

a();