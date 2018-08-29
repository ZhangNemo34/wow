import { MyPostsProvider } from './../../providers/my-posts/my-posts';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { MypostdetailscommentsPage } from '../mypostdetailscomments/mypostdetailscomments';
import { SearchpostlistPage } from '../searchpostlist/searchpostlist';
import {AccountProvider} from "../../providers/account/account";

/**
 * Generated class for the TilesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-tiles',
    templateUrl: 'tiles.html',
})
export class TilesPage {

    @ViewChild(Content) content: Content;
    hideMe: boolean = false;
    user: any = {};
    posts: Array<any> = [];
    keyword: string = '';

    constructor(public navCtrl: NavController, public navParams: NavParams,
        private myPost: MyPostsProvider,
        private account: AccountProvider) {

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad TilesPage');
        this.getAccount();

    }
    getAccount() {
        this.account.getAccount().then(res => {
            this.user = res['account'];
            if (!this.user.user_icon || this.user.user_icon == '') {
                this.user.user_icon = 'assets/imgs/userse.png';
            }
        });
    }

    ionViewWillEnter() {
        this.myPost.getAll().then(data => {
            console.log(data);
            this.posts = data['post_list'];
        });
    }

    GotoSelectCate(postData) {
        this.navCtrl.push(MypostdetailscommentsPage, postData);
    }

    SelectCat() {
        this.hideMe = true;
        this.posts.sort((a,b)=>a.reg_date>b.reg_date ? -1 : 1);
        this.content.resize();
    }

    BackCat() {
        this.hideMe = false;
        this.posts.sort((a,b)=>a.reg_date<b.reg_date ? -1 : 1);
        this.content.resize();
    }

    GoSearchList() {
        this.myPost.search(this.keyword).then(data => {
            this.posts = data['post_list'];
        });
    }

    search(ev : any)
    {
         this.myPost.getAll().then(data => {
            console.log(data);
            this.posts = data['post_list'];

            let val = ev.target.value;
            if (val && val.trim() != '') {
              this.posts = this.posts.filter((item) => {
                return (item.comment.toLowerCase().indexOf(val.toLowerCase()) > -1);
              })
            }
        });

      
    }
}
