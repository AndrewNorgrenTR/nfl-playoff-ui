import {Component, OnInit} from "@angular/core";
import {UserService} from "../auth/user.service";
import {PlayoffGames} from "./playoff-games";
import {BracketPicks} from "./bracket-picks";
import {UserStanding} from "./user-standing";
import {PlayoffGame} from "./playoff-game";
import {PlayoffGameService} from "./playoff-game.service";
import {BracketPicksService} from "./bracket-picks.service";

@Component({
    selector: 'standings',
    templateUrl: './standings.component.html'
})
export class StandingsComponent implements OnInit {

    standings: Array<UserStanding> = [];
    games: PlayoffGames;

    constructor(private userService: UserService, private playoffGameService: PlayoffGameService, private bracketPicksService: BracketPicksService) {

    }

    ngOnInit() {
        this.loadStandings();
    }

    async loadStandings() {

        this.games = await this.playoffGameService.getPlayoffGames();

        this.userService.getAllUsers()
            .then(users => {
                for (let user of users) {

                    this.bracketPicksService.getBracketPicksForUser(user)
                        .then(userPicks => {
                            this.standings.push(new UserStanding(user.username, this.computeScore(userPicks, this.games), userPicks));
                            this.standings.sort(function(a, b){return b.score-a.score});

                        });
                }
            })
    }

    private computeScore(picks: BracketPicks, games: PlayoffGames): number {
        var score = 0;

        if (picks.afcWildcard1Pick && games.afcWildcardGame1.winner == picks.afcWildcard1Pick) {
            score = score + 1;
        }
        if (picks.afcWildcard2Pick && games.afcWildcardGame2.winner == picks.afcWildcard2Pick) {
            score = score + 1;
        }
        if (picks.nfcWildcard1Pick && games.nfcWildcardGame1.winner == picks.nfcWildcard1Pick) {
            score = score + 1;
        }
        if (picks.nfcWildcard2Pick && games.nfcWildcardGame2.winner == picks.nfcWildcard2Pick) {
            score = score + 1;
        }
        if (picks.afcDivisional1Pick && games.afcDivisionalGame1.winner == picks.afcDivisional1Pick) {
            score = score + 1;
        }
        if (picks.afcDivisional2Pick && games.afcDivisionalGame2.winner == picks.afcDivisional2Pick) {
            score = score + 1;
        }
        if (picks.nfcDivisional1Pick && games.nfcDivisionalGame1.winner == picks.nfcDivisional1Pick) {
            score = score + 1;
        }
        if (picks.nfcDivisional2Pick && games.nfcDivisionalGame2.winner == picks.nfcDivisional2Pick) {
            score = score + 1;
        }
        if (picks.nfcChampionshipPick && games.nfcChampionshipGame.winner == picks.nfcChampionshipPick) {
            score = score + 1;
        }
        if (picks.afcChampionshipPick && games.afcChampionshipGame.winner == picks.afcChampionshipPick) {
            score = score + 1;
        }
        if (picks.superBowlPick && games.superBowlGame.winner == picks.superBowlPick) {
            score = score + 1;
        }

        //Bonus picks
        if (picks.afcChampionshipBonusPick && games.afcChampionshipGame.winner == picks.afcChampionshipBonusPick) {
            score = score + 2;
        }
        if (picks.nfcChampionshipBonusPick && games.nfcChampionshipGame.winner == picks.nfcChampionshipBonusPick) {
            score = score + 2;
        }
        if (picks.superBowlBonusPick && games.superBowlGame.winner == picks.superBowlBonusPick) {
            score = score + 3;
        }

        return score;
    }

    showPick(game: PlayoffGame): boolean {
        var currentDate = new Date();
        var gameDate = new Date(game.time);

        return currentDate > gameDate;
    }

    getPickCssClass(game: PlayoffGame, pick: string): string {
        if(!game.winner){
            return '';
        }
        else if(game.winner == pick){
            return 'standings-correct';
        }
        else{
            return 'standings-incorrect';
        }
    }
}
