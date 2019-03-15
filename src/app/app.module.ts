import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EnvService } from './_shared/service/global/env.service';

export function envInit(envService: EnvService) {
  return () => envService.initialize().subscribe();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: envInit, deps: [EnvService], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
