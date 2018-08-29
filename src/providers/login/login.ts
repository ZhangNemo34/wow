import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiPath } from '../../config/index';
/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

    api = apiPath + 'login';
    headers: HttpHeaders;

    constructor(public http: HttpClient) {
        this.headers = new HttpHeaders();
        this.headers = this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        console.log('Hello LoginProvider Provider');
    }

    emailLogin(email, password) {
        let headers = this.headers;
        let body = 'email=' + email + '&password=' + password;
        return this.http.post(`${this.api}`, body, { headers }).toPromise();
    }

    socialLogin(method, id, username, image) {
        let headers = this.headers;
        let body = 'method=' + method + '&id=' + id + '&username=' + username + '&user_icon=' + image;
        return this.http.post(`${this.api}/social_login`, body, { headers }).toPromise();
    }

    getPostDetails(body){
        let headers = this.headers;
        var url = apiPath + 'post/get_post_detail';        
        return this.http.post(url, body, { headers }).toPromise();
    }

    getAdsDetails(body){
        let headers = this.headers;
        var url = apiPath + 'advertise/get_detail';        
        return this.http.post(url, body, { headers }).toPromise();
    }

}
