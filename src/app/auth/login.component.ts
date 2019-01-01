import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthorizationService} from './authorization.service';
import {LocalStorageService} from "../util/local-storage.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    message: string;
    userName: string;
    password: string;

    constructor(public authorizationService: AuthorizationService, public router: Router, public localStorageService: LocalStorageService) {
        this.setMessage();
    }

    setMessage() {
        this.message = 'Logged ' + (this.authorizationService.isLoggedIn() ? 'in' : 'out');
    }

    login() {
        this.message = 'Trying to log in ...';

        this.authorizationService.login(this.userName, this.password).then(() => {
            this.setMessage();
            if (this.authorizationService.isLoggedIn()) {
                // Get the redirect URL from our auth service
                // If no redirect has been set, use the default
                let redirect = this.authorizationService.redirectUrl ? this.authorizationService.redirectUrl : '/bracket';

                // Redirect the user
                this.router.navigate([redirect]);
            }
        });
    }

    signUp() {
        this.router.navigate(['signup']);
    }

    logout() {
        this.authorizationService.logout();
        this.setMessage();
    }
}
