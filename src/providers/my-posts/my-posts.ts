import { apiPath } from './../../config/index';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the MyPostsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MyPostsProvider {

    api: string = apiPath + 'post';
    headers: HttpHeaders;

    constructor(public http: HttpClient, private storage: Storage) {
        this.headers = new HttpHeaders();
        this.headers = this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        console.log('Hello CategoryProvider Provider');
    }

    getAll() {
        return this.storage.get('sign_id').then(id => {
            return this.http.get(`${this.api}/get_posts_user?sign_id=${id}`).toPromise();
        })
    }

    search(keyword) {
        let headers = this.headers;
        return this.storage.get('sign_id').then(id => {
            let body = `sign_id=${id}&keyword=${keyword}`;
            return this.http.post(`${this.api}/get_posts_user`, body, { headers }).toPromise();
        })
    }

    getFavourite() {
        return this.storage.get('sign_id').then(id => {
            return this.http.get(`${this.api}/get_posts_favorite?sign_id=${id}`).toPromise();
        })
    }

    getFavouriteCat() {
        let headers = this.headers;
        return this.storage.get('sign_id').then(id => {
            let body = `sign_id=${id}`;
            return this.http.post(`${this.api}/get_favorite_category`, body, { headers }).toPromise();
        })
    }
    getFavouritePostsByCat(catid) {
        let headers = this.headers;
        return this.storage.get('sign_id').then(id => {
            let body = `sign_id=${id}&category_id=${catid}`;
            return this.http.post(`${this.api}/get_posts_favorite_category`, body, { headers }).toPromise();
        })
    }
    getDetail(id) {
        let headers = this.headers;
        return this.storage.get('sign_id').then(sign_id => {
            let body = `sign_id=${sign_id}&id=${id}`;
            return this.http.post(`${this.api}/get_post_detail`, body, { headers }).toPromise();
        })
    }

    edit(postData) {
        let headers = this.headers;
        console.log(postData.name);
        return this.storage.get('sign_id').then(sign_id => {
            let body = `id=${postData.id}&long=${postData.long}&lati=${postData.lati}&sign_id=${sign_id}&name=${postData.name}&comment=${postData.comment}&file_name=${postData.file_name}&publish=${postData.scope}&category=${postData.category}&share=${postData.share}`;
            return this.http.post(`${this.api}/edit_post`, body, { headers }).toPromise();
        });
    }

    delete(postData) {
        let headers = this.headers;
        return this.storage.get('sign_id').then(sign_id => {
            let body = `id=${postData.id}&sign_id=${sign_id}`;
            return this.http.post(`${this.api}/delete_post`, body, { headers }).toPromise();
        });
    }

    create(postData) {
        let headers = this.headers;
        return this.storage.get('sign_id').then(sign_id => {
            var long,lati
            if(postData.long){
                long = postData.long
            }
            if(postData.lati){
                lati = postData.lati
            }
            let body = `long=`+long+`&lati=`+lati+`&sign_id=${sign_id}&name=${postData.name}&comment=${postData.comment}&file_name=${postData.file_name}&publish=${postData.publish}&category=${postData.category}&share=${postData.share}&city=${postData.city}`;

            new Promise((resolve, reject) => {
                this.http.post(`${this.api}/create_post`, body, { headers: this.headers }
                )
                  .subscribe(res => { 
                      alert("Post created successfully")                   
                    resolve(res);
                  }, (err) => {                      
                      alert(JSON.stringify(err))
                    reject(err);
                  });
              });
        });
    }

    setLike(id, type) {
        let headers = this.headers;
        return this.storage.get('sign_id').then(sign_id => {
            let body = `id=${id}&sign_id=${sign_id}&type=${type}`;
            return this.http.post(`${this.api}/set_like`, body, { headers }).toPromise();
        });
    }

    setFav(id, type) {
        let headers = this.headers;
        return this.storage.get('sign_id').then(sign_id => {
            let body = `id=${id}&sign_id=${sign_id}&type=${type}`;
            return this.http.post(`${this.api}/set_favorite`, body, { headers }).toPromise();
        });
    }

    reply(id, comment) {
        let headers = this.headers;
        return this.storage.get('sign_id').then(sign_id => {
            let body = `id=${id}&sign_id=${sign_id}&comment=${comment}`;
            return this.http.post(`${this.api}/reply_post`, body, { headers }).toPromise();
        });
    }

    reReply(id, comment) {
        let headers = this.headers;
        return this.storage.get('sign_id').then(sign_id => {
            let body = `comment_id=${id}&sign_id=${sign_id}&comment=${comment}`;
            return this.http.post(`${this.api}/reply_comment`, body, { headers }).toPromise();
        });
    }

    likeReply(id, type) {
        let headers = this.headers;
        return this.storage.get('sign_id').then(sign_id => {
            let body = `comment_id=${id}&sign_id=${sign_id}&type=${type}`;
            return this.http.post(`${this.api}/set_like_comment`, body, { headers }).toPromise();
        });
    }

    reportPost(sign_id, post_user,type,content,post_date,comment_id) {
        let headers = this.headers;
        return this.storage.get('sign_id').then(sign_id => {
            let body = `sign_id=${sign_id}&post_user=${post_user}&type=${type}&content=${content}&post_date=${post_date}&comment_id=${comment_id}`;
            console.log(body);
            return this.http.post(`${this.api}/set_like_comment`, body, { headers }).toPromise();
        });
    }



}
