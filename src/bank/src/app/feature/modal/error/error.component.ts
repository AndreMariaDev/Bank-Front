import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';  

import { ModalService } from '../modal.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent{
  title = 'bank';
  public open: boolean = true;
  dismissible: boolean = true;
  timeout: number = 10000;
  modalRef!: BsModalRef;
  constructor(public modalService: ModalService) { }
  
  log(template: TemplateRef<any>){
    this.modalService.showSuccess("Teste","teste",template);
    this.modalRef = this.modalService.modalRef;
  }

}
