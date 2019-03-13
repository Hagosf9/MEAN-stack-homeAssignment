import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../../shared/user.service';
import { SignInComponent } from '../sign-in/sign-in.component';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }
  serverErrorMessages ='';
  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      var userD = {email: this.userService.getUser()};
      this.userService.logout(userD).subscribe(
        res => {
          this.userService.deleteSessionDetails();
          this.router.navigateByUrl('/');
        },
        err => {
          this.serverErrorMessages = err.error.message;
        }
      );
    }
  }

}
