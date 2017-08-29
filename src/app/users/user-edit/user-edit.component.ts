import {Component, OnInit} from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../shared/models/user";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private service: UserService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    //grab the user
    let id = this.route.snapshot.params['id'];
    this.service.getUser(id).subscribe(user => this.user = user);

  }

  updateUser() {
    this.service.updateUser(this.user).subscribe(
      user => {
      this.successMessage='user was updated';

      console.log('user was updated');
    },
      err=>{
        this.errorMessage=err;
        console.log(err);
      });

  }

}
