import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser: User;

  constructor(
    public snackBar: MatSnackBar,
    private userService: UserService
  ) {
      this.loginUser = new User("John Doe", "Hello123", "", "", "");
  }

  ngOnInit() {
  }

  onSubmit() {
    
    // check if the user exists or not 
    let observable = this.userService.getUser(this.loginUser);
    let observer = {
      next: (response) => {
        if(response == 1) {
          this.snackBar.open("Correct!", "Okay", {duration : 5000});
        } else if(response == 0 || response == 2) {
          this.snackBar.open("Incorrect Password and/or password", "Okay", {duration: 5000});
        }
      }
    }

    let subscription = observable.subscribe(observer);
  }

}
