import {Component, Inject, PLATFORM_ID, PlatformRef} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";
import Platform = NodeJS.Platform;

@Component({
  selector: "my-clock",
  moduleId: module.id,
  template: require("./clock.component.html"),
  styles: [require("./clock.component.css")]
})
export class ClockComponent {
  time: Date;

  constructor(@Inject(PLATFORM_ID) private platformId) {
  }

  ngOnInit() {
    this.time = new Date();

    if(isPlatformBrowser(this.platformId)) {
      setInterval(() => {
        this.time = new Date();
      }, 1000);
    }
  }
}
