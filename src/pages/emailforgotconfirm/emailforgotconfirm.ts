import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegisterProvider } from '../../providers/register/register';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the EmailforgotconfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-emailforgotconfirm',
  templateUrl: 'emailforgotconfirm.html',
})
export class EmailforgotconfirmPage {

  email: string;
  code: string;
  password: string;
  load: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private register: RegisterProvider,private storage: Storage,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailforgotconfirmPage');
    this.email = this.navParams.get('email');
  }

  goback() {
    this.navCtrl.pop();
  }

  GoTabsPage() {
    this.loadingShow();
    this.register.reset(this.code, this.password).then((loginRes) => {
      this.loadingHide();
      this.storage.set('sign_id', loginRes['content']['sign_id']);
      this.navCtrl.push(TabsPage);
    }).catch(() => {
      this.loadingHide();
      this.code = undefined;
      this.password = undefined;
    });

  }

  loadingShow(){
    this.load = this.loadingCtrl.create({
        content: 'Please wait...'
    });
    
    this.load.present();
}

loadingHide(){
    this.load.dismiss();
}

}
