import {Component, Input} from "@angular/core";
import {PlayoffGame} from "./playoff-game";
import {BracketPicks} from "./bracket-picks";

@Component({
    selector: 'tie-breaker',
    templateUrl: './tie-breaker.component.html'
})
export class TieBreakerComponent {
    @Input() superBowlGame: PlayoffGame;
    @Input() picks: BracketPicks;

    getTeam1(): string {
        return this.superBowlGame.team1 ? this.superBowlGame.team1 : 'TBD';
    }

    getTeam2(): string {
        return this.superBowlGame.team2 ? this.superBowlGame.team2 : 'TBD';
    }

    tieBreakerDisabled(): boolean {
        var currentDate = new Date();
        var gameDate = new Date(this.superBowlGame.time);

        return (currentDate > gameDate) || (!this.superBowlGame.team1 && !this.superBowlGame.team2);
    }
}
