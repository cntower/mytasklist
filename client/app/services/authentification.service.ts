import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    public token: string;
    public currentUserEmail: string = '';
    public currentUserPassword: string = '';

    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(email, password): Observable<boolean> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/auth/authenticate', JSON.stringify({ email: email, password: password}), { headers: headers })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ email: email, token: token }));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    register(email, password): Observable<any> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/auth/register', JSON.stringify({ email: email, password: password }),  { headers: headers })
            .map((response: Response) => {
                return response.json();
            });
    }

    public authenticated() {
        // Check if there's an unexpired JWT
        return tokenNotExpired();
    };

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}