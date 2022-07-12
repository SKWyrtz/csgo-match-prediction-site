const testObject = {
    watever: "1",
    yesh: "2",
    yippeee: "1",
    bobobo: "1"
}

for (let [key, value] of Object.entries(testObject)) {
    console.log(key, value);
}