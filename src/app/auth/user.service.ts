import {Injectable} from "@angular/core";
import {User} from "./user";
import {Storage} from "aws-amplify";


@Injectable({
    providedIn: 'root'
})
export class UserService {

    getAllUsers(): Promise<[User]> {

        return Storage.get("users_v2.json", {download: true})
            .then(result => {
                const text = new TextDecoder('utf-8').decode((result as any).Body);
                console.log(text);
                return JSON.parse(text);
            })
            .catch(err => {
                if(err.statusCode == 404){
                    return [];
                }
                else{
                    alert("Unable to load users: " + err);
                }
            });
    }

    addUser(user: User) {

        this.getAllUsers()
            .then(users => {

                var existingUser = users.find(x => x.username == user.username);
                if (!existingUser) {
                    users.push(user);
                    Storage.put('users_v2.json', JSON.stringify(users), {contentType: 'text/plain'})
                        .then(result => console.log("Updated Users."))
                        .catch(err => alert("Failed to update users: " + err));
                }

            })
            .catch(err => {
                console.log(err);
                alert('Failed to add user: ' + err);
            });


    }

}
