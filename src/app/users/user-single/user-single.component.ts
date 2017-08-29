import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../shared/services/user.service";
import {User} from "../../shared/models/user";

@Component({
  selector: 'app-user-single',
  templateUrl: './user-single.component.html',
  styleUrls: ['./user-single.component.css']
})
export class UserSingleComponent implements OnInit {
  user: User;

  constructor(private route: ActivatedRoute, private service: UserService) {
  }

  ngOnInit() {
    //grab the id from the url
    let id = this.route.snapshot.params['id'];

    //use the userservice to getUser()
    this.service.getUser(id).subscribe(user => this.user = user);

  }

}
