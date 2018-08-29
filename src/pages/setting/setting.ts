import { AccountProvider } from './../../providers/account/account';
import { Component  } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ListPage } from '../list/list';

import { UserdetailsPage } from '../userdetails/userdetails';
import { UserlistPage } from '../userlist/userlist';
import { MenusettingPage } from '../menusetting/menusetting';
import { LanguagesettingPage } from '../languagesetting/languagesetting';
import { RequestPage } from '../request/request';
import { WelcomePage } from '../welcome/welcome';
import { Storage } from '@ionic/storage';
import {TabsPage} from "../tabs/tabs";



/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-setting',
    templateUrl: 'setting.html',
})
export class SettingPage {

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private alertCtrl: AlertController,
                private account: AccountProvider,
                private storage: Storage,
                private app : App

    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SettingPage');
    }

    GoselectListpage() {
        this.navCtrl.push(ListPage)
    }

    GoUser() {
        this.navCtrl.push(UserdetailsPage)
    }

    GoUserNews() {
        this.navCtrl.push(UserlistPage)
    }

    GoPushSetting() {
        this.navCtrl.push(MenusettingPage)
    }

    GoLanguageSetting() {
        this.navCtrl.push(LanguagesettingPage)
    }

    GoRequest() {
        this.navCtrl.push(RequestPage)
    }

    GoWelcomeScreen() {
        this.storage.clear().then(() => {
            this.app.getRootNav().setRoot(WelcomePage);

        })
    }

    LogoutConfirmation() {
        let alert = this.alertCtrl.create({
            title: 'ログアウト',
            message: 'ログアウトしますか？',
            buttons: [
                {
                    text: 'はい',
                    role: 'cancel',
                    handler: () => {

                        this.GoWelcomeScreen();
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'いいえ',
                    handler: () => {
                        console.log('Buy clicked');
                    }
                }
            ]
        });
        alert.present();
    }

    DeleteConfirmation() {
        let alert = this.alertCtrl.create({
            title: 'アカウントを削除する',
            message: 'この操作を実行すると、すべての情報が削除されます。復元することはできません。大丈夫ですか？',
            buttons: [
                {
                    text: '削除',
                    handler: () => {
                        this.account.deleteAccount().then(() => {
                            this.GoWelcomeScreen();
                        });
                    }
                },
                {
                    text: 'キャンセル',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        alert.present();
    }


}
