import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class MediaService {

  username: string;
  password: string;
  apiUrl = 'http://media.mw.metropolia.fi/wbma';
  status: string;
  // fullName: string;
  // : string;

  constructor(private http: HttpClient, private router: Router) {
  }

  public logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
    console.log('User ' + this.username + ' logged out.');
  }

  public login() {
    console.log('username: ' + this.username);
    console.log('password: ' + this.password);

    const body = {
      username: this.username,
      password: this.password,
    };
    const settings = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    this.http.post(this.apiUrl + '/login', body, settings).
      subscribe(response => {
        console.log(response['token']);
        localStorage.setItem('token', response['token']);
        this.router.navigate(['front']);
      }, (error: HttpErrorResponse) => {
        console.log(error.error.message);
        this.status = error.error.message;
      });
  }

  getUserData() {
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token')),
    };

    return this.http.get(this.apiUrl + '/users/user', settings);
  }

  public register(user) {
    return this.http.post(this.apiUrl + '/users', user);
  }
}
