import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthorizationService} from './authorization.service';
import {Auth} from 'aws-amplify';

@Component({
    selector: 'app-new-user',
    templateUrl: './new-user.component.html'
})
export class NewUserComponent {
    userName: string;
    password: string;
    email: string;
    confirmUserName: string;
    verificationCode: string;

    constructor(public authorizationService: AuthorizationService, public router: Router) {
    }

    signUp() {

        Auth.signUp({
            username: this.userName,
            password: this.password,
            attributes: {
                email: this.email
            },
            validationData: []  //optional
        }).then(data => {
            console.log("success " + data);
            alert("Signed up!");
        }).catch(err => {
            console.log("failed " + err);
            alert("Failed to sign up: " + err);
        });
    }

    confirmSignUp() {
        Auth.confirmSignUp(this.confirmUserName, this.verificationCode)
            .then(response => {
                alert("confirmed!");
                this.router.navigate(['/login']);
            })
            .catch(error => {
                console.log(error);
                alert("Failed to confirm: " + error);
            });
    }
}
