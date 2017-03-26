import {AppModule} from "../app/app.module";
import {Inject, NgModule}      from '@angular/core';
import {AppComponent}  from '../app/components/app.component';
import {ServerModule} from "@angular/platform-server";
import {AppStore} from "t-rex/AppStore";
import {AppState} from "../app/services/appStore";

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
    constructor(@Inject("REQUEST") request, appStore: AppStore<AppState>) {
        request.appStore = appStore;
    }
}

// import "reflect-metadata";
// import "zone.js";
// import {NgModule, APP_INITIALIZER}      from '@angular/core';
// import {ServerModule} from '@angular/platform-server';
// import {AppComponent}  from '../app/components/app.component';
// import {ClockComponent} from "../app/components/clock.component";
// import {FormsModule} from "@angular/forms";
// import {ContactService} from "../app/services/contact.service";
// import {AppState, RootService} from "../app/services/appStore";
// import {AppStore} from "t-rex/AppStore";
//
// let firstTime = true;
//
// @NgModule({
//     imports: [
//         ServerModule,
//         FormsModule
//     ],
//     declarations: [
//         AppComponent,
//         ClockComponent,
//     ],
//     bootstrap: [AppComponent],
//     providers: [
//         RootService,
//         ContactService,
//         {
//             provide: AppStore,
//             useFactory: () => {
//                 console.log("AppStore.factory");
//
//                 const appStore = new AppStore<AppState>();
//
//                 return appStore;
//             },
//             deps: [],
//         },
//         {
//             provide: APP_INITIALIZER,
//             useFactory: (appStore: AppStore<AppState>, rootService: RootService, contactService: ContactService) => () => {
//                 console.log("APP_INITIALIZER");
//
//                 console.log(appStore);
//                 console.log(rootService);
//
//                 appStore.init([
//                     contactService,
//                     rootService,
//                 ]);
//             },
//             deps: [AppStore, RootService, ContactService],
//             multi: true
//         }
//     ]
// })
// export class AppServerModule {
//     constructor() {
//         console.log("AppServerModule.ctor");
//
//     }
// }
