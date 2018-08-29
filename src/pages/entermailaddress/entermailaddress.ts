import { RegisterProvider } from './../../providers/register/register';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OtpauthorizationPage } from "../otpauthorization/otpauthorization";


@IonicPage()
@Component({
    selector: 'page-entermailaddress',
    templateUrl: 'entermailaddress.html',
})
export class EntermailaddressPage {

    public email: string;
    public keyUpEmail: string;


    constructor(public navCtrl: NavController, public navParams: NavParams,
        private register: RegisterProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EntermailaddressPage');
    }


    gotoauthorization() {
        var patt = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$');
        var res = patt.test(this.email);
        console.log(this.email)
        if (res) {
            this.register.email(this.email).then(data => {
                console.log(data);
                this.navCtrl.push(OtpauthorizationPage, { email: this.email });
            }).catch(err=>{
                console.log(err.message);
            });
        }
        else {
            alert("Please Enter valid Email")
        }
    }

    goback() {
        this.navCtrl.pop();
    }
}
