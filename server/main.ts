import "./globals";
import * as fs from "fs";
import * as path from "path";
import "reflect-metadata";
import "zone.js";
import * as express from "express";
import {renderModule} from "@angular/platform-server";
import {AppServerModule} from "./app.module";
import * as nopack from "nopack";

const app = express();

app.get("/", renderIndexHtml);
app.get("/index.html", renderIndexHtml);

const basePath = path.join(__dirname, "..");
app.use(express.static(basePath));

nopack.setup(app);

app.get("*", renderIndexHtml);

app.listen(3000, function () {
    console.log("Server is running");
});

function renderIndexHtml(req, res) {
    renderModule(AppServerModule, {
        document: fs.readFileSync(path.join(__dirname, "../index.html"), "utf8"),
        url: req.url
    }).then(str => {
        res.write(str);
        res.end();
    });
}