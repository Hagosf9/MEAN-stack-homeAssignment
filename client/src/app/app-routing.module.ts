import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CRUDComponent } from './crud/crud.component';
import { GstAddComponent } from './CRUD/gst-add/gst-add.component';
import { GstEditComponent } from './CRUD/gst-edit/gst-edit.component';
import { GstGetComponent } from './CRUD/gst-get/gst-get.component';
import{AuthGuard} from './auth/auth.guard'


const routes: Routes = [
  {
    path: 'tenant/create',
    component: GstAddComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'edit/:id',
    component: GstEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tenant',
    component: GstGetComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'crud',
    component: CRUDComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }