import { AccountProvider } from './../../providers/account/account';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NoticeuserviewPage } from '../noticeuserview/noticeuserview';

/**
 * Generated class for the UserlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-userlist',
    templateUrl: 'userlist.html',
})
export class UserlistPage {

    pet: string = "kittens";
    notices: Array<any> = [];
    comments: Array<any> = [];

    constructor(public navCtrl: NavController, public navParams: NavParams,
        private account: AccountProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UserlistPage');
        this.account.getNotice().then(res => {
            this.notices = res['notice_list'];
        });
        this.account.getCommentNotice().then(res => {
            this.comments = res['content'];
            console.log(this.comments);
        })                                          
    }

    NoticeView() {
        this.navCtrl.push(NoticeuserviewPage)
    }

}
