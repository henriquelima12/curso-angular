import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataFormModule } from './data-form/data-form.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TemplateFormModule } from './template-form/template-form.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    TemplateFormModule,
    DataFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
