import {Component, PlatformRef} from '@angular/core';
import {Contact, ContactService} from "../services/contact.service";
import {AppStore} from "t-rex/AppStore";
import {AppState} from "../services/appStore";

@Component({
  selector: "my-app",
  moduleId: module.id,
  template: require("./app.component.html"),
  styles: [require("./app.component.css")]
})
export class AppComponent {
  contacts: Contact[];
  appState: any;

  constructor(private contactService: ContactService, private appStore: AppStore<AppState>) {
  }

  ngOnInit() {
    this.contactService.store.subscribe(state => {
      this.contacts = state.all;
    });

    this.contactService.loadAll().then(()=> {
      this.appState = JSON.stringify(this.appStore.getState());
    });
  }

  sayHello() {
    console.log("Hello");

    //this.platform.destroy();
  }
}
