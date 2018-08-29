import { CategoryProvider } from './../../providers/category/category';
import { MyPostsProvider } from './../../providers/my-posts/my-posts';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the PosteditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-postedit',
    templateUrl: 'postedit.html',
})
export class PosteditPage {

    postData: any = {};
    categories: Array<any> = [];

    constructor(public navCtrl: NavController, public navParams: NavParams,
        private alertCtrl: AlertController, private post: MyPostsProvider,
        private catPro: CategoryProvider
    ) {
        this.postData = this.navParams.get('post');
        console.log(this.postData);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PosteditPage');
        this.catPro.get().then(res => this.categories = res['category_list']);
    }

    update() {
        this.post.edit(this.postData).then(() => {
            let alert = this.alertCtrl.create({
                title : '更新',
                buttons:[{
                    text: 'OK',
                    handler : ()=>{
                        this.navCtrl.popToRoot();
                    }
                }]
            });
            alert.present();
        });
    }

    goback() {
        this.navCtrl.pop();
    }

    presentAlert() {
        let alert = this.alertCtrl.create({
            title: '削除',
            subTitle: '投稿を削除しました。',
            buttons: [{
                text: '削除',
                handler: () => {
                    this.post.delete(this.postData).then(() => {
                        this.navCtrl.popToRoot();
                    })
                    console.log('Confirm clicked');
                }
            }]
        });
        alert.present();
    }


    presentConfirm() {
        let alert = this.alertCtrl.create({
            title: '削除',
            message: '投稿を削除しますか？',
            buttons: [
                {
                    text: 'キャンセル',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: '削除',
                    handler: () => {
                        this.presentAlert();
                        console.log('Delete clicked');
                    }
                }
            ]
        });
        alert.present();
    }

}
