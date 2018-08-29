import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController, ToastController } from 'ionic-angular';
import { AccountProvider } from '../../providers/account/account';

/**
 * Generated class for the RequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-request',
    templateUrl: 'request.html',
})
export class RequestPage {

    content: string;
    email: string;
    confirm_email : string;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        private alertCtrl: AlertController, private account: AccountProvider,
        private toastCtrl : ToastController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RequestPage');
    }

    ConfirmAlert() {
        if(this.email !== this.confirm_email){
            let toast = this.toastCtrl.create({
                message: "Don't match email",
                duration: 3000,
                position: 'top'
            });
            toast.present();
            return;
        }
        let alert = this.alertCtrl.create({
            title: '',
            subTitle: 'お問い合わせを受付けました',
            buttons: [{
                text: 'OK',
                handler: () => {
                    this.account.contactUs(this.content, this.email)
                        .then(() => this.navCtrl.pop());
                }
            }]
        });
        alert.present();
    }

}
