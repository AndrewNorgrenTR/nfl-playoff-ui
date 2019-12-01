import {Component, OnInit} from "@angular/core";
import {AuthorizationService} from "../auth/authorization.service";
import {Router} from "@angular/router";

@Component({
    selector: 'header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

    constructor(public authorizationService: AuthorizationService, private router: Router) {
    }

    ngOnInit() {

    }

    logOut() {
        this.authorizationService.logout();
        this.router.navigate(['/login']);
    }
}
