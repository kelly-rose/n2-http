import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {User} from "../models/user";
import {Subject} from "rxjs/Subject";

@Injectable()
export class UserService {
  private usersUrl: string = 'https://reqres.in/api/users';

  /**
   * 16 - component communication with service
   */
  //observable source
  private userCreatedSource = new Subject<User>();
  private userDeletedSource = new Subject();

  //observable stream
  userCreated$ = this.userCreatedSource.asObservable();
  userDeleted$ = this.userDeletedSource.asObservable();

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
   * Update the user
   */
  updateUser(user: User): Observable<User> {
    return this.http.put(`${this.usersUrl}/${user.id}`, user)
      .map(res => res.json())
      .catch(this.handleError);
  }

  /**
   * Create the user
   */
  createUser(user: User): Observable<User> {
    return this.http.post(this.usersUrl, user)
      .map(res => res.json())
      .do(user => this.userCreated(user))
      .catch(this.handleError);
  }

  /**
   * Delete the user
   */
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.usersUrl}/${id}`)
      .do(res=>this.userDeleted())
      .catch(this.handleError);
  }

  /**
   * The user was created. Add this info to our stream
   */
  userCreated(user:User){
    console.log('user has been created.');
    this.userCreatedSource.next(user);
  }

  /**
   * The user was deleted. Add this info to our stream
   */
  userDeleted(){
    console.log('user has been deleted.');

    this.userDeletedSource.next();
  }


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
