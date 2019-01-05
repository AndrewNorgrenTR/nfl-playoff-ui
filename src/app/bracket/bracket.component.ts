import {Component, OnInit} from '@angular/core';
import {BracketPicks} from "./bracket-picks";
import {Storage} from 'aws-amplify';
import {PlayoffGames} from "./playoff-games";
import {AuthorizationService} from "../auth/authorization.service";
import {Router} from "@angular/router";
import {PlayoffGame} from "./playoff-game";
import {SelectItem} from "primeng/api";

@Component({
    selector: 'bracket',
    templateUrl: './bracket.component.html'
})
export class BracketComponent implements OnInit {

    picks: BracketPicks;
    games: PlayoffGames;
    allTeams: SelectItem[];
    nfcTeams: SelectItem[];
    afcTeams: SelectItem[];
    savingPicks: boolean = false;

    constructor(private authorizationService: AuthorizationService, private router: Router) {
    }

    logOut() {
        this.authorizationService.logout();
        this.router.navigate(['/login']);
    }

    ngOnInit() {
        this.allTeams = [];
        this.nfcTeams = [];
        this.afcTeams = [];

        this.loadGames();
        this.picks = new BracketPicks();
        Storage.get("bracketpicks.json", {level: 'protected', download: true})
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
                this.games = JSON.parse(text) as PlayoffGames;
                this.loadAllTeams();
            })
            .catch(err => {
                alert("Unable to load games: " + err);
            });
    }

    private loadAllTeams(){
        this.allTeams.push(this.createLabelValue(this.games.afcWildcardGame1.team1));
        this.allTeams.push(this.createLabelValue(this.games.afcWildcardGame1.team2));
        this.allTeams.push(this.createLabelValue(this.games.afcWildcardGame2.team1));
        this.allTeams.push(this.createLabelValue(this.games.afcWildcardGame2.team2));
        this.allTeams.push(this.createLabelValue(this.games.nfcWildcardGame1.team1));
        this.allTeams.push(this.createLabelValue(this.games.nfcWildcardGame1.team2));
        this.allTeams.push(this.createLabelValue(this.games.nfcWildcardGame2.team1));
        this.allTeams.push(this.createLabelValue(this.games.nfcWildcardGame2.team2));

        this.allTeams.push(this.createLabelValue(this.games.afcDivisionalGame1.team2));
        this.allTeams.push(this.createLabelValue(this.games.afcDivisionalGame2.team2));
        this.allTeams.push(this.createLabelValue(this.games.nfcDivisionalGame1.team2));
        this.allTeams.push(this.createLabelValue(this.games.nfcDivisionalGame2.team2));

        this.nfcTeams.push(this.createLabelValue(this.games.nfcWildcardGame1.team1));
        this.nfcTeams.push(this.createLabelValue(this.games.nfcWildcardGame1.team2));
        this.nfcTeams.push(this.createLabelValue(this.games.nfcWildcardGame2.team1));
        this.nfcTeams.push(this.createLabelValue(this.games.nfcWildcardGame2.team2));
        this.nfcTeams.push(this.createLabelValue(this.games.nfcDivisionalGame1.team2));
        this.nfcTeams.push(this.createLabelValue(this.games.nfcDivisionalGame2.team2));

        this.afcTeams.push(this.createLabelValue(this.games.afcWildcardGame1.team1));
        this.afcTeams.push(this.createLabelValue(this.games.afcWildcardGame1.team2));
        this.afcTeams.push(this.createLabelValue(this.games.afcWildcardGame2.team1));
        this.afcTeams.push(this.createLabelValue(this.games.afcWildcardGame2.team2));
        this.afcTeams.push(this.createLabelValue(this.games.afcDivisionalGame1.team2));
        this.afcTeams.push(this.createLabelValue(this.games.afcDivisionalGame2.team2));
    }

    private createLabelValue(text: string): SelectItem{
        return {label: text, value: text};
}

    saveBracket() {

        this.savingPicks = true;

        Storage.put('bracketpicks.json', JSON.stringify(this.picks), {level: 'protected', contentType: 'text/plain'})
            .then(result => {
                alert("Saved!");
                this.savingPicks = false;
            })
            .catch(err => {
                alert("Failed to save picks: " + err);
                this.savingPicks = false;
            });

    }

    pickDisabled(game: PlayoffGame): boolean {
        var currentDate = new Date();
        var gameDate = new Date(game.time);

        return currentDate > gameDate;
    }

    getGameTimeAsDate(game: PlayoffGame): Date {
        return new Date(game.time);
    }
}
