import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BracketPicks} from "./bracket-picks";
import {Storage} from "aws-amplify";
import {User} from "../auth/user";

@Injectable({
    providedIn: 'root'
})
export class BracketPicksService {
    constructor(private http: HttpClient) {
    }

    getBracketPicks(): Promise<BracketPicks> {
        return Storage.get("bracketpicks.json", {level: 'protected', expires: 60})
            .then(result => {
                return this.getFileContent(result as string);
            })
            .catch(err => {
                //TODO: handle case of nothing saved yet.
                alert("Failed to load picks: " + err);
                return new BracketPicks();
            });
    }

    getBracketPicksForUser(user: User): Promise<BracketPicks> {
        return Storage.get("bracketpicks.json", {level: 'protected', expires: 60, identityId: user.identityId})
            .then(result => {
                return this.getFileContent(result as string);
            })
            .catch(err => {
                //TODO: handle case of nothing saved yet.
                console.log("Failed to load picks: " + err);
                //alert("Failed to load picks: " + err);
                return new BracketPicks();
            });
    }

    private getFileContent(url: string){
        return this.http.get(url).toPromise()
            .then(response => {
                return response as BracketPicks;
            })
    }

    savePicks(picks: BracketPicks): Promise<any> {
        return Storage.put('bracketpicks.json', JSON.stringify(picks), {level: 'protected', contentType: 'text/plain'});
    }

}
