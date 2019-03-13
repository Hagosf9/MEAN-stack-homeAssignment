import { Component, OnInit } from '@angular/core';
import { TenantService } from "../../shared/tenant.service";
import Tenant from '../../shared/tenant.model';
import { FilterPipe } from './filter';
import { Router } from '@angular/router';



@Component({
  selector: 'app-gst-get',
  templateUrl: './gst-get.component.html',
  styleUrls: ['./gst-get.component.css']
})
export class GstGetComponent implements OnInit {
//vars, getters and setters
  tenants: Tenant[];
  filteredTenants: Tenant[];
  private _searchText: string;
  filter = new FilterPipe();
  get searchText(): string {
    return this._searchText;
  }
  set searchText(value: string) {
    this._searchText = value;
    this.filterTenantListByString(this._searchText,this._isPositiveDebt,this._isNegativeDebt,this._isBalanced);
  }
  private _isPositiveDebt: boolean = false;
  get isPositiveDebt(): boolean {
    return this._isPositiveDebt;
  }
  set isPositiveDebt(val: boolean) {
    if (this._isPositiveDebt)
      this._isPositiveDebt = false;
    else {this._isPositiveDebt = true;
      this._isNegativeDebt=false
      this._isBalanced =false;
    };
    this.filterTenantListByString(this._searchText,this._isPositiveDebt,this._isNegativeDebt,this._isBalanced);
  }

  private _isNegativeDebt: boolean = false;
  get isNegativeDebt(): boolean {
    return this._isNegativeDebt;
    
  }
  set isNegativeDebt(val: boolean) {
    if (this._isNegativeDebt)
      this._isNegativeDebt = false;
    else {
      this._isPositiveDebt = false;
      this._isNegativeDebt=true;
      this._isBalanced =false;
    }
    this.filterTenantListByString(this._searchText,this._isPositiveDebt,this._isNegativeDebt,this._isBalanced);
  }
  private _isBalanced: boolean = false;
  get isBalanced(): boolean {
    return this._isBalanced;
    
  }
  set isBalanced(val: boolean) {
    if (this._isBalanced)
    this._isBalanced = false;
    else
    {
      this._isPositiveDebt = false;
      this._isNegativeDebt=false;
      this._isBalanced =true;
    }    
    this.filterTenantListByString(this._searchText,this._isPositiveDebt,this._isNegativeDebt,this._isBalanced);
  }





  constructor(private ts: TenantService, private router: Router) { }

  ngOnInit() {
    this.ts.getTenants().subscribe((data: Tenant[]) => {
      this.tenants = data;
      this.filteredTenants = this.tenants;
    });
  }

  filterTenantListByString(val: string, posDebt:boolean, negDebt:boolean, blcDebt:boolean) {
    if (posDebt === false && negDebt === false&& blcDebt===false) {
      this.filteredTenants = this.filter.transform(this.tenants, { tenant_name: val, phone_number: val, address: val }, false);
      return;
    }
    if (posDebt === true) {
      this.filteredTenants = this.filter.transform(this.tenants,
        { tenant_name: val, phone_number: val, address: val }, false).filter(
          tenant => tenant.financial_debt > 0);
    }
    else if (negDebt === true) {
      this.filteredTenants = this.filter.transform(this.tenants,
        { tenant_name: val, phone_number: val, address: val }, false).filter(
          tenant => tenant.financial_debt < 0);
    }
    else if (blcDebt === true) {
      this.filteredTenants = this.filter.transform(this.tenants,
        { tenant_name: val, phone_number: val, address: val }, false).filter(
          tenant => tenant.financial_debt === 0);
    }
    console.log(val,posDebt,negDebt,blcDebt)
  }



  deleteTenant(Tenant : Tenant, id) {
    console.log('Delete started');
    this.ts.deleteTenant(id).subscribe(
      res => {
          this.filteredTenants= this.filteredTenants.filter(tenant => tenant !== Tenant);
          alert("Tenant : " +Tenant.tenant_name + ", was deleted successfully" );
    },
    err=>{
      alert("Tenant : " +Tenant.tenant_name + "was not able to delete successfully");

    });
  }
}