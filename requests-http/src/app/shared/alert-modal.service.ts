import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

export enum AlertTypes{
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(private modalService: BsModalService) { }

  private showAlert(message: string, type: AlertTypes, dismissTimeout?: number){
    const modalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    modalRef.content.type = type;
    modalRef.content.message = message;

    if(dismissTimeout){
      setTimeout(() => modalRef.hide(), dismissTimeout);
    }
  }

  showAlertDanger(message: string){
    this.showAlert(message, AlertTypes.DANGER);
  }

  showAlertSuccess(message: string){
    this.showAlert(message, AlertTypes.SUCCESS, 3000);
  }

  showConfirm(title: string, msg: string, ok?: string, cancel?: string){
    const modalRef: BsModalRef = this.modalService.show(ConfirmModalComponent);
    modalRef.content.title = title;
    modalRef.content.msg = msg;

    if(ok){
      modalRef.content.ok = ok;
    }

    if(cancel){
      modalRef.content.cancel = cancel;
    }
    return (<ConfirmModalComponent>modalRef.content).confirmResult;
  }
}
