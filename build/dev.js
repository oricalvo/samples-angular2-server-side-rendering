const buProcess = require("build-utils/process");
const path = require("path");
const open = require("open");

Promise.resolve()
    .then(compileTS)
    .then(compileSASS)
    .then(runServer)
    .then(runBrowser);

function compileTS() {
    console.log();
    console.log("Compiling Typescript");

    return buProcess.exec(path.normalize("node_modules/.bin/tsc"));
}

function compileSASS() {
    console.log();
    console.log("Compiling SASS");

    return buProcess.exec(path.normalize("node_modules/.bin/node-sass") + " --recursive ./app --output ./app");
}

function runServer() {
    console.log();
    console.log("Running server");

    buProcess.exec("node ./server/main.js", {async: true});
}

function runBrowser() {
    console.log();
    console.log("Openning browser");

    return open(`http://localhost:3000`);
}
