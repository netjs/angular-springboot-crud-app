import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { forkJoin, Observable } from "rxjs";
import { UserService } from "src/app/services/user.service";
import { User } from "../user.model";

@Component({
    selector: 'app-allusers',
    templateUrl: './allusers.component.html',
    providers: [DatePipe]
  })
  export class AllUsersComponent implements OnInit{
    users: User[];  
    user: User;
    deleteMsg:string = "";
    userTypes = ['Silver', 'Gold', 'Platinum'];  
    @ViewChild('closebutton') closebutton;
    constructor(private userService: UserService, private datePipe: DatePipe){}

    ngOnInit(): void {
        console.log('All users ')
        this.userService.getAllUsers().subscribe(data =>{  
            console.log(data);
            this.users = data;  
        })  
    }

    onClickDelete(userId: number){
      this.userService.deleteUser(userId)
      .subscribe(responseData=> {
          this.deleteMsg = 'Successfully deleted';
          // get user records after deletion
          this.userService.getAllUsers().subscribe(data =>{  
            console.log(data);
            this.users = data;  
        })  
      }, error=>{
          this.deleteMsg = error
      });
    }

    userUpdateForm = new FormGroup({
      id: new FormControl({value:'', disabled:true}),
      firstName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),     
      userType: new FormControl(''),
      startDate: new FormControl('')
    });

    onClickUpdate(userId: number){
      // Get user data for the selected user
      this.userService.getUserById(userId)
      .subscribe(responseData=> {
        this.user = responseData;
        console.log(this.user);
        this.prepareUpdateForm();
      });
    }

    // Use setValue() method to set the values
    // for selected user record
    prepareUpdateForm(){
      this.userUpdateForm.setValue({
        id:this.user.userId,
        firstName:this.user.firstName,
        lastName:this.user.lastName,
        userType:this.user.userType,
        startDate:this.datePipe.transform(this.user.startDate, 'yyyy-MM-dd')
      });
    }

    onSubmit(){
        let user = new User();
        // To get data from a disabled input element
        user.userId = this.userUpdateForm.getRawValue().id;
        user.firstName = this.userUpdateForm.value.firstName;
        user.lastName = this.userUpdateForm.value.lastName;
        user.userType = this.userUpdateForm.value.userType; 
        user.startDate = this.userUpdateForm.value.startDate;
        //console.log("USER for update"+ user.userId);
        this.userService.updateUser(user).subscribe(responseDate=>{
          // to close the modal
          this.closebutton.nativeElement.click();
          // Get the updated list
          this.userService.getAllUsers().subscribe(data =>{  
            //console.log(data);
            this.users = data;  
          })  
        }, 
        error=> console.log(error));
    }
  }