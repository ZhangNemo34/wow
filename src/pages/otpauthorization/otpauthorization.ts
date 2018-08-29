import { RegisterProvider } from './../../providers/register/register';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { RegisterPage } from "../register/register";

/**
 * Generated class for the OtpauthorizationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-otpauthorization',
    templateUrl: 'otpauthorization.html',
})
export class OtpauthorizationPage {

    public Emails: string;
    otp: string;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        private register: RegisterProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad OtpauthorizationPage');
        if (this.navParams.get('email')) {
            this.Emails = this.navParams.get('email');
            console.log(this.Emails)
        }
    }
    gotoregister() {
        this.register.verify(this.otp, this.Emails).then(data => {
            let res = data['content'];
            this.navCtrl.push(RegisterPage, {
                email: this.Emails,
                user_id: res.user_id
            });
        })
        .catch(err=>{
            if(err.error && err.error.content)
                alert(err.error.content);
            console.log(err);
        })

    }

    goback() {
        this.navCtrl.pop();
    }
}
