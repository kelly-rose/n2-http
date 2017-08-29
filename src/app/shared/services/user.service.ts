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

  /**
   * Create the user
   */
  createUser(user: User): Observable<User> {
    return this.http.post(this.usersUrl, user)
      .map(res => res.json())
      .catch(this.handleError);
  }

  /**
   * Update the user
   */
  updateUser(user: User): Observable<User> {
    return this.http.put(`${this.usersUrl}/${user.id}`, user)
      .map(res => res.json())
      .catch(this.handleError);
  }


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
      console.log(body);
      let error  = body.error || JSON.stringify(body);
      errMessage = `${err.status} - ${err.statusText || ''} ${error}`;
    } else {

      errMessage = err.message ? err.message : err.toString();
      console.log(errMessage);

    }

    return Observable.throw(errMessage);
  }


}
