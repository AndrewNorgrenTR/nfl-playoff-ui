import {Injectable} from '@angular/core';
import {Auth} from 'aws-amplify';
import {LocalStorageService} from "../util/local-storage.service";

export const JWT_CLAIM_LS_KEY = "authUser";

@Injectable({
    providedIn: 'root',
})
export class AuthorizationService {
    //isLoggedIn = false;

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    constructor(private localStorageService: LocalStorageService) {
    }

    login(userName: string, password: string): Promise<any> {

        return Auth.signIn(userName, password).then(
            user => {

                if (user.challengeName == 'NEW_PASSWORD_REQUIRED') {

                    alert("New password required!");
                    //TODO:
                    /*Auth.completeNewPassword(user, "Norg1123!", {email: user.email})
                        .then(response => {
                            console.log(response);
                            this.isLoggedIn = true;
                        })
                        .catch(error => console.log(error));*/
                } else {
                    this.localStorageService.set(JWT_CLAIM_LS_KEY, user);

                    //this.isLoggedIn = true;
                }
            },
            error => {
                alert("Failed to login: " + error);
            });
    }

    isLoggedIn(): boolean {
        const user = this.localStorageService.get(JWT_CLAIM_LS_KEY);
        return user != null;
    }

    logout(): void {
        this.localStorageService.remove(JWT_CLAIM_LS_KEY);
        //this.isLoggedIn = false;
    }
}
