import { AppModule } from './app.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

window["e1"] = document.querySelectorAll("my-app ul li");

platformBrowserDynamic().bootstrapModule(AppModule).then(()=> {
    window["e2"] = document.querySelectorAll("my-app ul li");
});
