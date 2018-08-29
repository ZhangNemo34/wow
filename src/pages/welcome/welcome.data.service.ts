import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

/*
  Generated class for the TestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WelcomeProvider {

    constructor(public http: HttpClient) {
        console.log('Hello TestProvider Provider');
    }
    getUsersDetailsFromFacebook(accessToken: string): Observable<any> {
        let url = "https://graph.facebook.com/me?fields=id,email,picture,name&access_token=" + accessToken;
        return this.http.get(url);
    }
    getUsersDetailsFromFacebookPicture(id: string): Observable<any> {
        let url = "https://graph.facebook.com/"+id+"/picture?width=1024&height=1024";
        return this.http.get(url);
    }
    getUserDetailsFromInstagram(accessToken: string): Observable<any> {
        let url = "https://api.instagram.com/v1/users/self?access_token=" + accessToken;
        return this.http.get(url);
    }
}
