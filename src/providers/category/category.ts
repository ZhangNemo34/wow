import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiPath } from '../../config';
import { Storage } from '@ionic/storage';

/*
  Generated class for the CategoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoryProvider {
    api: string = apiPath + 'register';
    headers: HttpHeaders;

    constructor(public http: HttpClient, private storage: Storage) {
        this.headers = new HttpHeaders();
        this.headers = this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        console.log('Hello CategoryProvider Provider');
    }

    get() {
        return this.http.get(`${this.api}/get_category`).toPromise();
    }

    getCity() {
        return this.http.get(`${this.api}/get_city`).toPromise();
    }

    setCity(cityId) {
        let headers = this.headers;
        return this.storage.get('sign_id')
            .then(sign_id => {
                let body = `sign_id=${sign_id}&city_id=${cityId}`;
                return this.http.post(`${this.api}/set_city`, body, { headers });
            })

    }

    setCategory(cat1, cat2, cityId, sign_id) {
        let headers = this.headers;

        let body = `sign_id=${sign_id}&category_id1=${cat1}&category_id2=${cat2}&city=${cityId}`;
        return this.http.post(`${this.api}/update`, body, { headers });
    }

}
