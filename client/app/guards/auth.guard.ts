import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './../services/authentification.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth:AuthenticationService, private router: Router) { }

    canActivate() {
        if (this.auth.authenticated()) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}