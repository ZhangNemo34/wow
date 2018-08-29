import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailforgotconfirmPage } from '../emailforgotconfirm/emailforgotconfirm';
import { RegisterProvider } from '../../providers/register/register';

/**
 * Generated class for the EmailforgotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-emailforgot',
  templateUrl: 'emailforgot.html',
})
export class EmailforgotPage {
  email: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private register: RegisterProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailforgotPage');
  }

  GoToConfirmPage() {
    this.register.forget(this.email)
      .then((res) => {
        console.log(res);
        this.navCtrl.push(EmailforgotconfirmPage, { email: this.email })
     })
      .catch(err => {console.log(err)
          if(err.error && err.error.content)
                alert(err.error.content);
      });
  }

  goback() {
    this.navCtrl.pop();
  }


}
