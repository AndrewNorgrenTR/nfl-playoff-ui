import {Injectable} from "@angular/core";
import {PlayoffGames} from "./playoff-games";
import {Storage} from "aws-amplify";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class PlayoffGameService {

    constructor(private http: HttpClient) {
    }

    getPlayoffGames(): Promise<PlayoffGames> {
        return Storage.get('playoffgames.json', {expires: 60})
            .then(result => {
                return this.getFileContent(result as string);
            })
            .catch(err => {
                alert("Unable to load games: " + err);
                return null;
            });
    }

    private getFileContent(url: string){

        return this.http.get(url).toPromise()
            .then(response => {
                return response as PlayoffGames;
            })
    }

    savePlayoffGames(games: PlayoffGames): Promise<any> {
      return Storage.put('playoffgames.json', JSON.stringify(games), {level: 'public', contentType: 'text/plain'});
    }

}
