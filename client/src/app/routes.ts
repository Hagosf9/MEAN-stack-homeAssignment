import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { LogOutComponent } from './user/log-out/log-out.component';
import { AuthGuard } from './auth/auth.guard';

export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'logout', component: UserComponent,
        children: [{ path: '', component: LogOutComponent,canActivate: [AuthGuard] }]
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
];