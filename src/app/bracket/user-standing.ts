import {BracketPicks} from "./bracket-picks";

export class UserStanding {

    username: string;
    score: number;
    picks: BracketPicks;

    constructor(username: string, score: number, picks: BracketPicks) {
        this.username = username;
        this.score = score;
        this.picks = picks;
    }
}
