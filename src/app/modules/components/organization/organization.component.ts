import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Organization } from 'src/app/core/models/organization.model';
import { OrganizationService } from 'src/app/core/services/organization.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  
  form: FormGroup;

  constructor(private fb: FormBuilder, private _organizationService: OrganizationService ) {
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

  ngOnInit(): void {
  }

}
