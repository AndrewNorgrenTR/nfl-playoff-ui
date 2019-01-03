import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import {FormsModule} from "@angular/forms";
import {BracketComponent} from "./bracket/bracket.component";
import {AmplifyAngularModule, AmplifyService} from "aws-amplify-angular";
import {CommonModule} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {LoginComponent} from "./auth/login.component";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule, SharedModule} from "primeng/primeng";
import {NewUserComponent} from "./auth/new-user.component";
import {LocalStorageService} from "./util/local-storage.service";
import {StandingsComponent} from "./bracket/standings.component";
import {TableModule} from "primeng/table";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
    declarations: [
        AppComponent,
        BracketComponent,
        LoginComponent,
        NewUserComponent,
        StandingsComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        SharedModule,
        CommonModule,
        FormsModule,
        RadioButtonModule,
        ButtonModule,
        InputTextModule,
        TableModule,
        DropdownModule,
        BrowserAnimationsModule,
        AmplifyAngularModule
    ],
    providers: [
        AmplifyService,
        LocalStorageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
