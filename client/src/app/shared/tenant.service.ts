import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TenantService {
  constructor(private http: HttpClient) { }

  addTenant(tenant_name, phone_number, address, financial_debt) {
    const obj = {
      tenant_name: tenant_name,
      phone_number: phone_number,
      address: address,
      financial_debt: financial_debt
    };
    this.http.post(environment.uri+'/add', obj).subscribe(res => console.log('Done'));
  }

  getTenant() {
    return this.http.get(environment.uri);
  }

  editTenant(id) {
    return this.http.get(environment.uri+'/edit/'+id);
    }

  updateTenant(tenant_name, phone_number, address, financial_debt, id) {

    const obj = {
      tenant_name: tenant_name,
      phone_number: phone_number,
      address: address,
      financial_debt: financial_debt
    };
    this.http.post(environment.uri+'/update/'+id, obj).subscribe(res => console.log('Done'));
  }

  deleteTenant(id) {
    return this.http.get(environment.uri+'/delete/'+id);
    
  }

  getTenants() {
    return this.http.get(environment.uri);
  }

}
