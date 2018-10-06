import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material';

export interface UserType {
  value: string,
  viewValue: string
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // User types for the sign up form => will be removed later 
  userTypes: UserType[];
  inputUser: User;

  constructor(
    public snackBar: MatSnackBar,
    private userService: UserService) {
    this.userTypes = [
      { value: 'Admin', viewValue: 'Admin(God)' },
      { value: 'Student', viewValue: 'Student(Gandu)' }
    ];

    this.inputUser = new User("IIT2016067", "Password123", "Maanas Vohra", "maanas@gmail.com", this.userTypes[0].value);
  }

  ngOnInit() {
  }

  onSubmit() {
    let successfullySubmitted;

    // Submit a POST request
    let observable = this.userService.addUser(this.inputUser);
    let observer = {
      next: (response) => {
        if (response == 0) {
          this.snackBar.open("Duplicate entry", "Okay", { duration: 5000 });
        } else {
          this.snackBar.open("New user created", "Okay", { duration: 5000 });
        }
      },
    }

    let subscription = observable.subscribe(observer);
  }

  get diagnostic() {
    return JSON.stringify(this.inputUser);
  }

}
