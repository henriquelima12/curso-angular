import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

import { TemplateFormComponent } from './template-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TemplateFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class TemplateFormModule { }
