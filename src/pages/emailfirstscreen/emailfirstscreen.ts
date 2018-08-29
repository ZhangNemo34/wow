import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EntermailaddressPage } from "../entermailaddress/entermailaddress";
import { RegisterPage } from "../register/register";
import { EmailloginPage } from '../emaillogin/emaillogin';
/**
 * Generated class for the EmailfirstscreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-emailfirstscreen',
  templateUrl: 'emailfirstscreen.html',
})
export class EmailfirstscreenPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailfirstscreenPage');
  }

  GotoEmailaddress(){
  	this.navCtrl.push(EntermailaddressPage)
  }

  goback() {
      this.navCtrl.pop();
    }

    GoRegister(){
      this.navCtrl.push(RegisterPage);
    }

    GoLogin(){
      this.navCtrl.push(EmailloginPage);
    }

}
