import {NgModule}      from '@angular/core';
import {AppComponent}  from '../app/components/app.component';
import {ClockComponent} from "../app/components/clock.component";
import {ServerModule} from "@angular/platform-server";
import {AppModule} from "../app/app.module";

@NgModule({
    imports: [
        ServerModule,
        AppModule
    ],
    declarations: [
    ],
    bootstrap: [AppComponent],
    providers: [
    ]
})
export class AppServerModule {
}
