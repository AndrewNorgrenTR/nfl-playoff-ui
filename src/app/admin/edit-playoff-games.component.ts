import {Component, OnInit} from "@angular/core";
import {AuthorizationService} from "../auth/authorization.service";
import {PlayoffGameService} from "../bracket/playoff-game.service";
import {PlayoffGames} from "../bracket/playoff-games";

@Component({
  selector: 'edit-playoff-games',
  templateUrl: './edit-playoff-games.component.html'
})
export class EditPlayoffGamesComponent implements OnInit {

  games: PlayoffGames;
  savingGames: boolean = false;

  constructor(public authorizationService: AuthorizationService, private playoffGameService: PlayoffGameService) {
  }

  ngOnInit() {
    this.loadGames();
  }

  loadGames() {
    this.playoffGameService.getPlayoffGames()
      .then(games => {
        this.games = games;
      });
  }

  saveGames() {

    this.savingGames = true;

    this.playoffGameService.savePlayoffGames(this.games)
      .then(result => {
        alert("Saved!");
        this.savingGames = false;
      })
      .catch(err => {
        alert("Failed to save games: " + err);
        this.savingGames = false;
      });
  }

}
