import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class MediaService {

  username: string;
  password: string;
  apiUrl = 'http://media.mw.metropolia.fi/wbma';

  constructor(private http: HttpClient) {
  }

  public register() {

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
    });
  }
}
