import { OnInit, Component } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    userName: string;
    userRoles: string;
    constructor() { }
    ngOnInit() {
      this.userName = sessionStorage.getItem("username");
      this.userRoles = sessionStorage.getItem("roles");
    }
}