import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {User} from "../models/user";

@Injectable()
export class UserService {
  private usersUrl: string ='https://reqres.in/api/users';
  constructor(private http:Http) { }


  /**
   * Get all users
   */
  getUsers(): Observable<User[]>{
   return this.http.get(this.usersUrl)
      .map(res=>res.json().data); //subscribe은 app.component에서 해주면 됨. 따라서 return 해줘야한다!
  }

  //get a single user

  //create a user

  //update a user

  //delete a user

}
