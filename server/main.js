"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
require.extensions['.html'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
require.extensions['.css'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
require("reflect-metadata");
require("zone.js");
var express = require("express");
var platform_server_1 = require("@angular/platform-server");
var app_module_1 = require("./app.module");
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
    platform_server_1.renderModule(app_module_1.AppServerModule, {
        document: fs.readFileSync(path.join(__dirname, "../index.html"), "utf8"),
        url: req.url
    }).then(function (str) {
        res.write(str);
        res.end();
    });
}
//# sourceMappingURL=main.js.map