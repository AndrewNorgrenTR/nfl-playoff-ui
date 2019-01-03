import {Component, OnInit} from "@angular/core";
import {UserService} from "../auth/user.service";
import {Storage} from "aws-amplify";
import {PlayoffGames} from "./playoff-games";
import {BracketPicks} from "./bracket-picks";
import {UserStanding} from "./user-standing";

@Component({
    selector: 'standings',
    templateUrl: './standings.component.html'
})
export class StandingsComponent implements OnInit {

    standings: Array<UserStanding> = [];

    constructor(private userService: UserService) {

    }

    ngOnInit() {
        this.loadStandings();
    }

    async loadStandings() {

        var games = await this.loadGames();

        this.userService.getAllUsers()
            .then(users => {
                for (let user of users) {
                    Storage.get("bracketpicks.json", {level: 'protected', download: true, identityId: user.identityId})
                        .then(result => {
                            const text = new TextDecoder('utf-8').decode((result as any).Body);
                            let bracketPicks = JSON.parse(text);
                            console.log(bracketPicks);
                            this.standings.push(new UserStanding(user.username, this.computeScore(bracketPicks, games)))
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
        //TODO: finish

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

}
