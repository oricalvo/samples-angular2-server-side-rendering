import { Component } from '@angular/core';

@Component({
  selector: "my-app",
  moduleId: module.id,
  template: require("./app.component.html"),
  styles: [require("./app.component.css")]
})
export class AppComponent {
  constructor() {
    console.log("AppComponent.ctor");
  }

  sayHello() {
    console.log("Hello");
  }
}
