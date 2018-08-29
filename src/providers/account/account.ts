import { apiPath } from './../../config/index';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {toPromise} from "rxjs/operator/toPromise";

/*
  Generated class for the AccountProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AccountProvider {

    api: string = apiPath + 'home';
    headers: HttpHeaders;

    constructor(public http: HttpClient, private storage: Storage) {
        this.headers = new HttpHeaders();
        this.headers = this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        console.log('Hello AccountProvider Provider');
    }

    deleteAccount() {
        return this.storage.get('sign_id').then(id => {
            // return this.http.get(`${this.api}/delete_account?sign_id=${id}`).toPromise();
            return this.http.get(`${this.api}/delete_account?sign_id=dhSsM7LFWXAdUuZ8}`).toPromise();
        })
    }

    getAccount() {
        return this.storage.get('sign_id').then(id => {
            // return this.http.get(`${this.api}/get_account?sign_id=${id}`).toPromise();
            return this.http.get(`${this.api}/get_account?sign_id=dhSsM7LFWXAdUuZ8`).toPromise();
        })
    }

    updateAccount(userId, userName, email, password, userIcon, cat1, cat2, city) {
        let headers = this.headers;
        return this.storage.get('sign_id').then(id => {
            // let body = `sign_id=${id}&user_id=${userId}&username=${userName}&email=${email}&password=${password}&user_icon=${userIcon}&category_id1=${cat1}&category_id2=${cat2}&city=${city}`;
            let body = `sign_id=dhSsM7LFWXAdUuZ8&user_id=${userId}&username=${userName}&email=${email}&password=${password}&user_icon=${userIcon}&category_id1=${cat1}&category_id2=${cat2}&city=${city}`;
            return this.http.post(`${this.api}/update_account`, body, { headers }).toPromise();
        })
    }

    contactUs(content, email) {
        let headers = this.headers;
        return this.storage.get('sign_id').then(id => {
            // let body = `sign_id=${id}&email=${email}&content=${content}`;
            let body = `sign_id=dhSsM7LFWXAdUuZ8&email=${email}&content=${content}`;
            return this.http.post(`${this.api}/send_request`, body, { headers }).toPromise();
        })
    }

    getSetting() {
        return this.storage.get('sign_id').then(id => {
            // return this.http.get(`${this.api}/get_setting?sign_id=${id}`).toPromise();
            return this.http.get(`${this.api}/get_setting?sign_id=dhSsM7LFWXAdUuZ8`).toPromise();
        })
    }

    setSetting(comment, like, report) {
        let headers = this.headers;
        return this.storage.get('sign_id').then(id => {
            // let body = `sign_id=${id}&comment_post=${comment}&like=${like}&report=${report}`;
            let body = `sign_id=dhSsM7LFWXAdUuZ8&comment_post=${comment}&like=${like}&report=${report}`;
            return this.http.post(`${this.api}/set_setting`, body, { headers }).toPromise();
        })
    }

    report(post_id, type, content) {
        let headers = this.headers;
        return this.storage.get('sign_id').then(id => {
            // let body = `sign_id=${id}&content=${content}&type=${type}&id=${post_id}`;
            let body = `sign_id=dhSsM7LFWXAdUuZ8&content=${content}&type=${type}&id=${post_id}`;
            return this.http.post(`${this.api}/send_report`, body, { headers }).toPromise();
        })
    }

    getNotice() {
        return this.http.get(`${this.api}/get_notice`).toPromise();
    }

    getCommentNotice() {
        return this.storage.get('sign_id').then(id => {
            // return this.http.get(`${apiPath}post/get_all_comments?sign_id=${id}`).toPromise();
            return this.http.get(`${apiPath}post/get_all_comments?sign_id=dhSsM7LFWXAdUuZ8`).toPromise();
        })
    }

    getPostsMap() {
        return this.storage.get('sign_id').then(id => {
            // return this.http.get(`${this.api}/get_posts_map?sign_id=${id}`).toPromise();
            return this.http.get(`${this.api}/get_posts_map?sign_id=dhSsM7LFWXAdUuZ8`).toPromise();
        })
    }

    getAdPost() {
        let headers = this.headers;
        return this.storage.get('sign_id').then(id => {
            // return this.http.get(`${this.api}/get_posts_ads?sign_id=${id}`).toPromise();
            //let body = `sign_id=dhSsM7LFWXAdUuZ8`;
            let body = `sign_id=dhSsM7LFWXAdUuZ8&long=114.1095&lati=22.39`;
            return this.http.post(`${this.api}/get_posts_ads`, body, {headers}).toPromise();
        })
    }

    getPrePost(long, lati) {
        let headers = this.headers;
        let body = `long=${long}&lati=${lati}`;
        return this.http.post(`${this.api}/get_posts_non`, body, { headers }).toPromise();
    }

}
