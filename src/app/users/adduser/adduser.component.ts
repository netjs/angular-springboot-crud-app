import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { User } from '../user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css'],
  providers: [DatePipe]
})
export class AddUserComponent implements OnInit{
  user: User = new User();
  isAdded = false;
  constructor(private userService: UserService, private datePipe: DatePipe){}
  userTypes = ['Silver', 'Gold', 'Platinum'];  
  currentDate = new Date();
  //submitted = false;
  userForm: FormGroup;          
  ngOnInit() {
    this.userForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),     
      userType: new FormControl(),
      startDate: new FormControl(this.datePipe.transform(this.currentDate, 'yyyy-MM-dd'))
    });
  }

  onSubmit(){
    //this.submitted = true;
    this.user.firstName = this.userForm.value.firstName;
    this.user.lastName = this.userForm.value.lastName;
    this.user.userType = this.userForm.value.userType; 
    this.user.startDate = this.userForm.value.startDate;
    this.save();
  }

  save(){
    this.userService.addUser(this.user)
                    .subscribe(user=> {console.log(user);
                      this.isAdded = true;
                    }, error=>console.log(error))
  }
  resetUserForm(){
    this.isAdded = false;
    this.userForm.reset();
  }
}