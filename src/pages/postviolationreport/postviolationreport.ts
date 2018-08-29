import { AccountProvider } from './../../providers/account/account';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { MyPostsProvider } from '../../providers/my-posts/my-posts';

/**
 * Generated class for the PostviolationreportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-postviolationreport',
    templateUrl: 'postviolationreport.html',
})
export class PostviolationreportPage {
    postData: any = {};
    content: string;
    sign_id:any;
    comment_id:any;
    constructor(public navCtrl: NavController, public navParams: NavParams,
        private alertCtrl: AlertController, 
        private account: AccountProvider,
        public mProvider: MyPostsProvider,) {
        this.postData = this.navParams.get('post');
        this.sign_id = this.navParams.get('sign_id');
        this.comment_id = this.navParams.get('comment_id');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PostviolationreportPage');
        this.postData = this.navParams.get('post');

    }

    goback() {
        this.navCtrl.pop();
    }

    ConfirmAlert() {
        let alert = this.alertCtrl.create({
            title: '',
            subTitle: 'ご報告ありがとうございました',
            buttons: [
                {
                    text: 'Ok',
                    handler: () => {
                        // this.account.report(this.postData.id, 1, this.content).then(() => {
                        //     this.goback()
                        // });

this.mProvider.reportPost(this.sign_id,this.postData.id,1,this.content,"2018-08-24",this.comment_id).then(() => {
    this.goback();
});
                    }
                }
            ]
        });
        alert.present();
    }

}
