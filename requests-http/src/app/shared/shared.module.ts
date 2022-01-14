import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    AlertModalComponent,
    ConfirmModalComponent
  ],
  imports: [
    CommonModule,
    ModalModule
  ],
  exports: [
    AlertModalComponent
  ],
  entryComponents: [
    AlertModalComponent, ConfirmModalComponent
  ]
})
export class SharedModule { }
