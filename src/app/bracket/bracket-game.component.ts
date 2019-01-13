import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {PlayoffGame} from "./playoff-game";

@Component({
    selector: 'bracket-game',
    templateUrl: './bracket-game.component.html'
})
export class BracketGameComponent implements OnInit {


    @Input() game: PlayoffGame;
    @Input() pick: string;
    @Input() gameField: string;
    @Output() pickChanged = new EventEmitter();

    ngOnInit() {

    }

    pickDisabled(game: PlayoffGame): boolean {
        var currentDate = new Date();
        var gameDate = new Date(game.time);

        return currentDate > gameDate;
    }

    changePick(pickChange){
        this.pickChanged.emit(pickChange);
    }

    getGameTimeAsDate(game: PlayoffGame): Date {
        return new Date(game.time);
    }

}
