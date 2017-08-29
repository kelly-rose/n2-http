import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {User} from "../models/user";
import {toUnicode} from "punycode";

@Injectable()
export class UserService {
  private usersUrl: string = 'https://reqres.in/api/users';

  constructor(private http: Http) {
  }


  /**
   * Get all users
   */
  getUsers(): Observable<User[]> {
    return this.http.get(this.usersUrl)
      .map(res => res.json().data) //subscribe은 component에서 해주면 됨. 따라서 return 해줘야한다!
      .map(users => users.map(this.toUser))
      .catch(this.handleError);
  }

  /**
   * Get a single user
   */
  getUser(id:number): Observable<User> {
    return this.http.get(`${this.usersUrl}/${id}`)
      .map(res => res.json().data)
      .map(this.toUser)
      .catch(this.handleError);

  }

  //create a user

  //update a user

  //delete a user


  /**
   * Convert user info from the API to our standard/format
   */
  private toUser(user): User {
    return {
      id: user.id,
      name: `${user.first_name} ${user.last_name}`,
      username: user.first_name,
      avatar: user.avatar
    };
  }

  /**
   * Handle any errors from the API
   */
  private handleError(err) {
    let errMessage: string;

    if (err instanceof Response) {
      let body:any   = err.json() || '';
      let error  = body.error || JSON.stringify(body);
      errMessage = `${err.status} - ${err.statusText} || ''} ${error}`;
    } else {
      errMessage = err.message ? err.message : err.toString();
    }

    return Observable.throw(errMessage);
  }


}
