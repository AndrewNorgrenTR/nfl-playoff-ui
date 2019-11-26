import {Component, Input} from "@angular/core";
import {PlayoffGame} from "../bracket/playoff-game";

@Component({
    selector: 'edit-playoff-game',
    templateUrl: './edit-playoff-game.component.html'
})
export class EditPlayoffGameComponent {
    @Input() game: PlayoffGame;
    @Input() gameTitle: string;
}
