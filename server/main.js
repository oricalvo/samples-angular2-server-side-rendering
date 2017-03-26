"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./globals");
var fs = require("fs");
var path = require("path");
// import "reflect-metadata";
// import "zone.js";
var express = require("express");
var app_module_1 = require("./app.module");
var platform_server_1 = require("@angular/platform-server");
var nopack = require("nopack");
var app = express();
app.get("/", renderIndexHtml);
app.get("/index.html", renderIndexHtml);
var basePath = path.join(__dirname, "..");
app.use(express.static(basePath));
nopack.setup(app);
app.get("*", renderIndexHtml);
app.listen(3000, function () {
    console.log("Server is running");
});
function renderIndexHtml(req, res) {
    fs.readFile(path.join(__dirname, "../index.html"), "utf8", function (err, document) {
        if (err) {
            console.error(err);
            res.status(500);
            res.statusMessage = err.message;
            res.end();
            return;
        }
        platform_server_1.renderModule(app_module_1.AppServerModule, {
            document: document,
            url: req.url,
            extraProviders: [
                {
                    provide: "REQUEST",
                    useValue: req,
                }
            ]
        }).then(function (str) {
            var appState = JSON.stringify(req.appStore.getState());
            str += '<script type="application/appState">' + appState + '</script>';
            res.write(str);
            res.end();
        }).catch(function (err) {
            console.error(err);
            res.status(500);
            res.statusMessage = err.message;
            res.end();
        });
    });
}
//# sourceMappingURL=main.js.map