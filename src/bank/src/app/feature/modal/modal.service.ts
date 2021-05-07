import { Injectable, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';  

@Injectable({
  providedIn: 'root'
})
export class ModalService {

    public modalRef!: BsModalRef;  

    constructor(private modalService: BsModalService) { }  

    showSuccess(message:any, title:any,template: TemplateRef<any>){
        this.modalRef = this.modalService.show(  

            template,  
    
            Object.assign({}, { class: 'gray modal-lg' })  
    
        );  
    }
}
  