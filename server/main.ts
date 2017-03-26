import "./globals";
import * as fs from "fs";
import * as path from "path";
// import "reflect-metadata";
// import "zone.js";
import * as express from "express";
import {AppServerModule} from "./app.module";
import {renderModule} from "@angular/platform-server";
import * as nopack from "nopack";
import {APP_INITIALIZER} from "@angular/core";
import {AppStore} from "t-rex/AppStore";
import {AppState} from "../app/services/appStore";

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
    fs.readFile(path.join(__dirname, "../index.html"), "utf8", function(err, document) {
        if(err) {
            console.error(err);

            res.status(500);
            res.statusMessage = err.message;
            res.end();
            return;
        }

        renderModule(AppServerModule, {
            document: document,
            url: req.url,
            extraProviders: [
                {
                    provide: "REQUEST",
                    useValue: req,
                }
            ]
        }).then(str => {
            const appState = JSON.stringify(req.appStore.getState());

            str += '<script type="application/appState">' + appState  + '</script>';

            res.write(str);
            res.end();
        }).catch(err => {
            console.error(err);

            res.status(500);
            res.statusMessage = err.message;
            res.end();
        });
    });
}
