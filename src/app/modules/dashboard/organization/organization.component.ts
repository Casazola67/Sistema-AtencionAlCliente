import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { Organization } from 'src/app/core/models/organization.model';
import { OrganizationService } from 'src/app/core/services/organization.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  
  modalRef: any;
  form: FormGroup;
  organizationList: Organization[]= [];
  auxID: string | undefined;

  constructor(private fb: FormBuilder,public modalService: NgbModal, private _organizationService: OrganizationService ) {
    this.form= this.fb.group({
      //Sirve para colocar validadores de campos de texto
      name: ['', Validators.required],
      adress: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', Validators.required],
    })
   }

  createOrganization(){
    const ORGANIZATION: Organization = {
      name: this.form.value.name,
      adress: this.form.value.adress,
      city: this.form.value.city,
      phone: this.form.value.phone,
    }
    this._organizationService.createOrganization(ORGANIZATION).then(() => {
      console.log('Organization created')
    }, error => {
      console.log(error);
    })
  }

  editarOrganizacion( ID: string ){
    const ORGANIZATION: Organization = {
      name: this.form.value.name,
      adress: this.form.value.adress,
      city: this.form.value.city,
      phone: this.form.value.phone,
    }
    this._organizationService.editOrganization(ID, ORGANIZATION)
  }

  deleteOrganization(organizationID: any){
    this._organizationService.deleteOrganization(organizationID);
  }

  saveAndEditOrganization(organization: Organization){
    this._organizationService.addOrganizationEdit(organization);
  }
  
  saveOrganization(){
    if ( this.auxID == undefined){
      this.createOrganization();
    }else{
      this.editarOrganizacion(this.auxID);
    }
  }

  getAllOrganizations(){
    this._organizationService.getAllOrganizations().subscribe(doc =>{
      this.organizationList = [];
      doc.forEach((element:any) => {
        this.organizationList.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
      //console.log(this.organizationList);
    })
  }

  openModal(modalID: any){
    this.modalRef = this.modalService.open(modalID, {});
  }

  closeModal() {
    this.modalRef.dismiss();
  }

  ngOnInit(): void {
    this.getAllOrganizations();
    this._organizationService.getOrganization().subscribe(data => {
      console.log(data);
      this.auxID = data.id;
      this.form.patchValue({
        name: data.name,
        adress: data.adress,
        city: data.city,
        phone: data.phone,
      })
    });
  }

}
