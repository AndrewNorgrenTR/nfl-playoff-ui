import {Component, OnInit} from '@angular/core';
import {BracketPicks} from "./bracket-picks";
import {PlayoffGames} from "./playoff-games";
import {Router} from "@angular/router";
import {PlayoffGame} from "./playoff-game";
import {SelectItem} from "primeng/api";
import {PlayoffGameService} from "./playoff-game.service";
import {BracketPicksService} from "./bracket-picks.service";

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

    constructor(private router: Router, private playoffGameService: PlayoffGameService, private bracketPicksService: BracketPicksService) {
    }

    ngOnInit() {
        this.allTeams = [];
        this.nfcTeams = [];
        this.afcTeams = [];

        this.loadGames();
        this.picks = new BracketPicks();
        this.bracketPicksService.getBracketPicks().then(result => {
            this.picks = result;
        });
    }

    loadGames() {
        this.playoffGameService.getPlayoffGames()
            .then(games => {
                this.games = games;
                this.loadAllTeams();
            });
    }

    private loadAllTeams() {
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

    private createLabelValue(text: string): SelectItem {
        return {label: text, value: text};
    }

    saveBracket() {

        this.savingPicks = true;

        this.bracketPicksService.savePicks(this.picks)
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

    updatePick(event, pickField) {
        this.picks[pickField] = event;
    }

    getTableDataHeightInHalf(elementId: string): string {
        var myElement = document.getElementById(elementId) as HTMLElement;
        var height = myElement.clientHeight;
        height = Math.floor(height / 2);
        return height + 'px';
    }
}
