import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TenantService } from "../../shared/tenant.service";


@Component({
  selector: 'app-gst-add',
  templateUrl: './gst-add.component.html',
  styleUrls: ['./gst-add.component.css']
})
export class GstAddComponent implements OnInit {
  angForm: FormGroup;
  successMsg = "";
  constructor(private fb: FormBuilder, private ts: TenantService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      tenant_name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      phone_number: ['', [Validators.required, Validators.pattern('([0]{1}[5]{1}[023459]{1}[-]{0,1}[0-9]{7})|([0]{1}[234689]{1}[-]{0,1}[0-9]{7})|([0]{1}[7]{1}[7]{1}[-]{0,1}[0-9]{7})')]],
      address: ['', Validators.required],
      financial_debt: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.angForm.valid) {
      console.log("Form Submitted!");
      this.angForm.reset();
    }
  }

  addTenant(tenant_name, phone_number, address, financial_debt) {
    this.ts.addTenant(tenant_name, phone_number, address, financial_debt)
  }


  ngOnInit() {
  }


}