import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TenantService } from '../../shared/tenant.service';

@Component({
  selector: 'app-gst-edit',
  templateUrl: './gst-edit.component.html',
  styleUrls: ['./gst-edit.component.css']
})
export class GstEditComponent implements OnInit {

  tenant: any = {};
  angForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private ts: TenantService, private fb: FormBuilder) {
    this.createForm();
  }


  updateTenant(tenant_name, phone_number, address, financial_debt) {
    this.route.params.subscribe(params => {
      this.ts.updateTenant(tenant_name, phone_number, address, financial_debt, params['id']);
      setTimeout(() => {
        this.router.navigate(['tenant']);
      }, 500);
    }
    )
  };

  createForm() {
    this.angForm = this.fb.group({
      tenant_name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      phone_number: ['', [Validators.required, Validators.pattern('([0]{1}[5]{1}[023459]{1}[-]{0,1}[0-9]{7})|([0]{1}[234689]{1}[-]{0,1}[0-9]{7})|([0]{1}[7]{1}[7]{1}[-]{0,1}[0-9]{7})')]],
      address: ['', Validators.required],
      financial_debt: ['', Validators.required],
    });
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ts.editTenant(params['id']).subscribe(res => {
        this.tenant = res;

      });
    });
  }
}