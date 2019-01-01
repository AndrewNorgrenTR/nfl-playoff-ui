import {Component, OnInit} from '@angular/core';
import {BracketPicks} from "./bracket-picks";
import {Storage} from 'aws-amplify';
import {PlayoffGames} from "./playoff-games";
import {AuthorizationService} from "../auth/authorization.service";
import {Router} from "@angular/router";
import {PlayoffGame} from "./playoff-game";

@Component({
    selector: 'bracket',
    templateUrl: './bracket.component.html'
})
export class BracketComponent implements OnInit {

    picks: BracketPicks;
    games: PlayoffGames;

    constructor(private authorizationService: AuthorizationService, private router: Router){}

    logOut() {
        this.authorizationService.logout();
        this.router.navigate(['/login']);
    }

    ngOnInit() {
        this.loadGames();
        this.picks = new BracketPicks();
        Storage.get("bracketpicks.json", {level: 'private', download: true})
            .then(result => {
                const text = new TextDecoder('utf-8').decode((result as any).Body);
                console.log(text);
                this.picks = JSON.parse(text);
            })
            .catch(err => {
                //TODO: handle case of nothing saved yet.
                alert("Failed to load picks: " + err);
            });
    }

    loadGames() {

        Storage.get('playoffgames.json', {download: true})
            .then(result => {
                const text = new TextDecoder('utf-8').decode((result as any).Body);
                console.log("Games = " + text);
                this.games = JSON.parse(text);
            })
            .catch(err => {
                alert("Unable to load games: " + err);
            });
    }

    saveBracket() {

        Storage.put('bracketpicks.json', JSON.stringify(this.picks), {level: 'private', contentType: 'text/plain'})
            .then(result => alert("Saved!"))
            .catch(err => alert("Failed to upload: " + err));

    }

    pickDisabled(game: PlayoffGame): boolean {
        var currentDate = new Date();
        var gameDate = new Date(game.time);

        return currentDate > gameDate;
    }
}
