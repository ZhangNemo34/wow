import { apiPath } from './../../config/index';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the AdvertiseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AdvertiseProvider {

    api: string = apiPath + 'advertise';
    headers: HttpHeaders;

    constructor(public http: HttpClient, private storage: Storage) {
        this.headers = new HttpHeaders();
        this.headers = this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        // this.headers = this.headers.append('Access-Control-Allow-Origin', 'http://localhost:8100');

        console.log('Hello AdvertiseProvider Provider');
    }

    getAds(type) {
        let headers = this.headers;
        console.log(type);
        return this.storage.get('sign_id').then(id => {
            let body = `sign_id=${id}&type=${type}`;
            return this.http.post(`${this.api}/get_list`, body, { headers }).toPromise();
        });
    }

    getDetail(adId) {
        let headers = this.headers;
        return this.storage.get('sign_id').then(id => {
            let body = `sign_id=${id}&id=${adId}`;
            return this.http.post(`${this.api}/get_detail`, body, { headers }).toPromise();
        });
    }

    resumit(adData) {
        let headers = this.headers;
        const { id, file1, file2, file3, file4, file5, file1_id, file2_id, file3_id, file4_id, file5_id, content, url, cat1, cat2, days, price, email } = adData;
        return this.storage.get('sign_id').then(id => {
            let body = `sign_id=${id}&id=${id}&file1=${file1}&file2=${file2}&file3=${file3}&file4=${file4}&file5=${file5}&content=${content}&url=${url}&category_id1=${cat1}&category_id2=${cat2}&days=${days}&price=${price}&email=${email}&file1_id=${file1_id}&file2_id=${file2_id}&file3_id=${file3_id}&file4_id=${file4_id}&file5_id=${file5_id}`;
            console.log(body);
            return this.http.post(`${this.api}/submit_advertise`, body, { headers }).toPromise();
        })
    }

    create(adData) {
        let headers = this.headers;
        const { file1, file2, file3, file4, file5, content, url, cat1, cat2, days, price, email } = adData;
        return this.storage.get('sign_id').then(id => {
            let body = `sign_id=${id}&file1=${file1}&file2=${file2}&file3=${file3}&file4=${file4}&file5=${file5}&content=${content}&url=${url}&category_id1=${cat1}&category_id2=${cat2}&days=${days}&price=${price}&email=${email}`;
            return this.http.post(`${this.api}/submit_advertise`, body, { headers }).toPromise();
        })
    }
}
