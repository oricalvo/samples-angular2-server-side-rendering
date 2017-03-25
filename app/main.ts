import "reflect-metadata";
import "zone.js";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

setTimeout(function() {
    platformBrowserDynamic().bootstrapModule(AppModule);
}, 50000);

