import {Injectable} from "@angular/core";
import {PlayoffGames} from "./playoff-games";
import {Storage} from "aws-amplify";

@Injectable({
    providedIn: 'root'
})
export class PlayoffGameService {

    getPlayoffGames(): Promise<PlayoffGames> {
        return Storage.get('playoffgames.json', {download: true, expires: 60})
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
