import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'app-deleteuser',
    templateUrl: './deleteuser.component.html'
  })
  export class DeleteUserComponent implements OnInit{
    userDeleteForm: FormGroup;
    deleteMsg = null;
    constructor(private userService: UserService){}
    ngOnInit(): void {
        this.userDeleteForm = new FormGroup({
            userId: new FormControl('', Validators.required),
        });
    }
    onSubmit(){
        this.deleteMsg = null;
        this.userService.deleteUser(+this.userDeleteForm.value.userId)
                        .subscribe(responseData=> {
                            console.log('responseData- ', responseData)
                            this.deleteMsg = responseData
                        }, error=>{
                            this.deleteMsg = error
                        });
    }
  }