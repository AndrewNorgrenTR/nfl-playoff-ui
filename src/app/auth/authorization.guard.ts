import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {AuthorizationService} from './authorization.service';
import {Observable, of} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
    constructor(private authorizationService: AuthorizationService, private router: Router) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {
        let url: string = state.url;

        return this.checkLogin(url);
    }

    checkLogin(url: string): Observable<boolean> {
        if (this.authorizationService.isLoggedIn()) {
            return of(true);
        }

        // Store the attempted URL for redirecting
        this.authorizationService.redirectUrl = url;

        // Navigate to the login page with extras
        this.router.navigate(['/login']);
        return of(false);
    }
}
