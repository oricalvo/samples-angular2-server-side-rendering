import "reflect-metadata";
import "zone.js";
import {NgModule, APP_INITIALIZER, Renderer2, PLATFORM_ID}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent}  from './components/app.component';
import {ClockComponent} from "./components/clock.component";
import {FormsModule} from "@angular/forms";
import {ContactService} from "./services/contact.service";
import {AppState, RootService} from "./services/appStore";
import {AppStore} from "t-rex/AppStore";
import {isPlatformBrowser} from "@angular/common";
import {transaction} from "t-rex/decorators";

let firstTime = true;

@NgModule({
    imports: [
        BrowserModule.withServerTransition({
            appId: 'universal-demo-app'
        }),
        FormsModule
    ],
    declarations: [
        AppComponent,
        ClockComponent,
    ],
    bootstrap: [AppComponent],
    providers: [
        RootService,
        ContactService,
        {
            provide: AppStore,
            useFactory: (contactService: ContactService, rootService: RootService, platformId) => {
                const appStore = new AppStore<AppState>();

                appStore.init([
                    contactService,
                    rootService,
                ]);

                if(isPlatformBrowser(platformId)) {
                    const script = document.querySelector("script[type='application/appState']");
                    const json = script.innerHTML;
                    const appState = JSON.parse(json);
                    console.log(appState);

                    transaction(appStore, ()=> {
                        rootService.store.update(appState);

                        return {};
                    });
                }

                return appStore;
            },
            deps: [ContactService, RootService, PLATFORM_ID]
        }
    ]
})
export class AppModule {
    constructor(appStore: AppStore<AppState>) {
    }
}
