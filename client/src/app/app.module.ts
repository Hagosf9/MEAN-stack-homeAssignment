import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TenantService } from "./shared/tenant.service"
import { CRUDComponent } from './crud/crud.component';
import { GstAddComponent } from './CRUD/gst-add/gst-add.component';
import { GstGetComponent } from './CRUD/gst-get/gst-get.component';
import { GstEditComponent } from './CRUD/gst-edit/gst-edit.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './CRUD/gst-get/filter';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserComponent } from './user/user.component';
import { RouterModule } from '@angular/router'
import { appRoutes } from './routes'
import { UserService } from './shared/user.service';
import { AuthGuard } from './auth/auth.guard';
import { LogOutComponent } from './user/log-out/log-out.component';


@NgModule({
  declarations: [
    AppComponent,
    CRUDComponent,
    GstAddComponent,
    GstGetComponent,
    GstEditComponent,
    FilterPipe,
    SignInComponent,
    SignUpComponent,
    UserComponent,
    LogOutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [TenantService, UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
