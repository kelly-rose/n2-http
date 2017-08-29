import { Component, OnInit } from '@angular/core';
import {UserService} from "../shared/services/user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  successMessage:string='';
  constructor(private service:UserService) { }

  ngOnInit() {
    this.service.userCreated$.subscribe(user=>{
      this.successMessage = `${user.name} has been created!(users-component)`;
      this.clearMessages();
    });

    this.service.userDeleted$.subscribe(data=>{
      this.successMessage = `The user has been deleted!(users-component)`;
      this.clearMessages();

    });
  }

  clearMessages(){
    setTimeout(()=>{
      this.successMessage='';

    },3000);
  }

}
