import {Injectable} from '@angular/core';
import {Auth} from 'aws-amplify';
import {LocalStorageService} from "../util/local-storage.service";
import {UserService} from "./user.service";
import {User} from "./user";

export const JWT_CLAIM_LS_KEY = "authUser";

@Injectable({
    providedIn: 'root',
})
export class AuthorizationService {

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    constructor(private localStorageService: LocalStorageService, public userService: UserService) {
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
                    this.storeUserInfo(user);
                }
            },
            error => {
                alert("Failed to login: " + error);
            });
    }

    private storeUserInfo(user) {
        var AWS = require('aws-sdk');
        AWS.config.update({region: 'us-east-1'});
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-1:36b7768b-c628-4172-91ff-66b290aed0f3',
            Logins: {
                'cognito-idp.us-east-1.amazonaws.com/us-east-1_7MujoN3uX': user.signInUserSession.idToken.jwtToken
            }
        });

        var tempUserService = this.userService;

        new AWS.CognitoIdentity().getId({
            IdentityPoolId: 'us-east-1:36b7768b-c628-4172-91ff-66b290aed0f3',
            Logins: {
                'cognito-idp.us-east-1.amazonaws.com/us-east-1_7MujoN3uX': user.signInUserSession.idToken.jwtToken
            }
        }, function (err, data) {
            if (err) {
                alert("Unable to get IdentityId: " + err);
                console.log(err, err.stack);
            } else {
                var newUser = new User();
                newUser.username = user.username;
                newUser.identityId = data.IdentityId;
                tempUserService.addUser(newUser);
                console.log("Identity Id = " + data.IdentityId);
            }
        });
    }

    isLoggedIn(): boolean {
        const user = this.localStorageService.get(JWT_CLAIM_LS_KEY);
        return user != null;
    }

    getUserName(): string {
        const user = this.localStorageService.get(JWT_CLAIM_LS_KEY);
        return user != null ? user.username : "";
    }

    logout(): void {
        this.localStorageService.remove(JWT_CLAIM_LS_KEY);
    }
}
