import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownService } from './services/dropdown.service';

import { FormDebugComponent } from '../form-debug/form-debug.component';
import { CampoControlErrorComponent } from '../campo-control-error/campo-control-error.component';
import { HttpClientModule } from '@angular/common/http';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { FormsModule } from '@angular/forms';
import { BaseFormComponent } from './base-form/base-form.component';

@NgModule({
  declarations: [
    FormDebugComponent,
    CampoControlErrorComponent,
    ErrorMsgComponent,
    InputFieldComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    FormDebugComponent,
    CampoControlErrorComponent,
    ErrorMsgComponent,
    InputFieldComponent,
  ],
  providers: [ DropdownService ]
})
export class SharedModule { }
