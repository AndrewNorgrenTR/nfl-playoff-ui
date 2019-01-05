import {Component, OnInit} from "@angular/core";
import {UserService} from "../auth/user.service";
import {Storage} from "aws-amplify";
import {PlayoffGames} from "./playoff-games";
import {BracketPicks} from "./bracket-picks";
import {UserStanding} from "./user-standing";
import {PlayoffGame} from "./playoff-game";

@Component({
    selector: 'standings',
    templateUrl: './standings.component.html'
})
export class StandingsComponent implements OnInit {

    standings: Array<UserStanding> = [];
    games: PlayoffGames;

    constructor(private userService: UserService) {

    }

    ngOnInit() {
        this.loadStandings();
    }

    async loadStandings() {

        this.games = await this.loadGames();

        this.userService.getAllUsers()
            .then(users => {
                for (let user of users) {
                    Storage.get("bracketpicks.json", {level: 'protected', download: true, identityId: user.identityId})
                        .then(result => {
                            const text = new TextDecoder('utf-8').decode((result as any).Body);
                            let bracketPicks = JSON.parse(text);
                            console.log(bracketPicks);
                            this.standings.push(new UserStanding(user.username, this.computeScore(bracketPicks, this.games), bracketPicks))
                        })
                        .catch(err => {
                            console.log("unable to load user brackets: " + err);
                        });
                }
            })
    }

    private computeScore(picks: BracketPicks, games: PlayoffGames): number {
        var score = 0;

        if (games.afcWildcardGame1.winner == picks.afcWildcard1Pick) {
            score = score + 1;
        }
        if (games.afcWildcardGame2.winner == picks.afcWildcard2Pick) {
            score = score + 1;
        }
        if (games.nfcWildcardGame1.winner == picks.nfcWildcard1Pick) {
            score = score + 1;
        }
        if (games.nfcWildcardGame2.winner == picks.nfcWildcard2Pick) {
            score = score + 1;
        }
        if (games.afcDivisionalGame1.winner == picks.afcDivisional1Pick) {
            score = score + 1;
        }
        if (games.afcDivisionalGame2.winner == picks.afcDivisional2Pick) {
            score = score + 1;
        }
        if (games.nfcDivisionalGame1.winner == picks.nfcDivisional1Pick) {
            score = score + 1;
        }
        if (games.nfcDivisionalGame2.winner == picks.nfcDivisional2Pick) {
            score = score + 1;
        }
        if (games.nfcChampionshipGame.winner == picks.nfcChampionshipPick) {
            score = score + 1;
        }
        if (games.afcChampionshipGame.winner == picks.afcChampionshipPick) {
            score = score + 1;
        }
        if (games.superBowlGame.winner == picks.superBowlPick) {
            score = score + 1;
        }

        //Bonus picks
        if (games.afcChampionshipGame.winner == picks.afcChampionshipBonusPick) {
            score = score + 2;
        }
        if (games.nfcChampionshipGame.winner == picks.nfcChampionshipBonusPick) {
            score = score + 2;
        }
        if (games.superBowlGame.winner == picks.superBowlBonusPick) {
            score = score + 3;
        }

        return score;
    }

    loadGames(): Promise<PlayoffGames> {

        return Storage.get('playoffgames.json', {download: true})
            .then(result => {
                const text = new TextDecoder('utf-8').decode((result as any).Body);
                console.log("Games = " + text);
                return JSON.parse(text) as PlayoffGames;
            })
            .catch(err => {
                alert("Unable to load games: " + err);
                return null;
            });
    }

    showPick(game: PlayoffGame): boolean {
        var currentDate = new Date();
        var gameDate = new Date(game.time);

        return currentDate > gameDate;
    }

}
