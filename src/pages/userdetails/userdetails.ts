import { AccountProvider } from './../../providers/account/account';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoryPage } from '../category/category';
import { CityPage } from '../city/city';
import { AlertController } from 'ionic-angular';
import { CategoryProvider } from '../../providers/category/category';
/**
 * Generated class for the UserdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-userdetails',
    templateUrl: 'userdetails.html',
})
export class UserdetailsPage {

    categories: Array<any> = [];
    user: any = {};
    cities: Array<any> = [];
    confpassword: string;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        private alertCtrl: AlertController, private categoryP: CategoryProvider,
        private account: AccountProvider
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UserdetailsPage');
        this.categoryP.get().then(data => {
            this.categories = data['category_list'];
        });
        this.categoryP.getCity().then(data => {
            this.cities = data['city_list'];
        });
        this.getAccount();
    }

    getAccount() {
        this.account.getAccount().then(res => {
            this.user = res['account'];
            if (!this.user.user_icon || this.user.user_icon == '') {
                this.user.user_icon = 'assets/imgs/userse.png';
            }
            this.confpassword = this.user.password;
        });
    }

    updateCategory() {
        this.navCtrl.push(CategoryPage)
    }

    GoCity() {
        this.navCtrl.push(CityPage)
    }

    UserConfirmation() {
        let alert = this.alertCtrl.create({
            title: '',
            message: '編集内容は保存されません よろしいですか？',
            buttons: [
                {
                    text: 'いいえ',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'はい',
                    handler: () => {
                        this.account.updateAccount(
                            this.user.user_id,
                            this.user.username,
                            this.user.email,
                            this.user.password,
                            this.user.user_icon,
                            this.user.category[0],
                            this.user.category[1],
                            this.user.city
                        ).then(a =>
                            this.navCtrl.pop());
                    }
                }
            ]
        });
        alert.present();
    }


}
