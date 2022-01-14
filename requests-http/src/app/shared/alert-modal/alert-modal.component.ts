import { Component, Input, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {

  @Input() message: string;
  @Input() type = 'success';

  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  onClose(){
    this.bsModalRef.hide();
  }

}
