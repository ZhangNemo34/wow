import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { EmailforgotPage } from '../emailforgot/emailforgot';
import { TabsPage } from '../tabs/tabs';
import { LoginProvider } from '../../providers/login/login';
import { Storage } from '@ionic/storage';
import { SelectcatcityPage } from '../selectcatcity/selectcatcity';


/**
 * Generated class for the EmailloginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-emaillogin',
    templateUrl: 'emaillogin.html',
})
export class EmailloginPage {
    email: string;
    password: string;
    public Regex: string;
    load: any;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        private login: LoginProvider, private storage: Storage,public loadingCtrl: LoadingController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EmailloginPage');
    }

    // Alphanumeric(){
    //   if(this.Regex = `.*(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#*]).*`){

    //   }
    // }

    goToForgot() {
        this.navCtrl.push(EmailforgotPage);
    }

    goback() {
        this.navCtrl.pop();
    }

    GoTabsPage() {
        this.loadingShow();
        this.login.emailLogin(this.email, this.password).then(loginRes => {
            this.loadingHide();
            

            if(!loginRes['content']['category_id1'] || !loginRes['content']['category_id2'] || !loginRes['content']['city'] && loginRes['content']['category_id1'] == "0" || loginRes['content']['category_id2'] == "0" || loginRes['content']['city'] == "0" ){
                this.navCtrl.push(SelectcatcityPage,{'loginType':'1'});
            }else{
                this.storage.set('loginType', 1);
                this.storage.set('sign_id', loginRes['content']['sign_id']).then(() => {
                    this.navCtrl.push(TabsPage);
                });
            }
        }).catch((err) => {
            this.loadingHide();
            if(err.error && err.error.content)
            alert(err.error.content);

            
            this.email = undefined;
            this.password = undefined;
        });
        
        // this.storage.set('sign_id', 'dhSsM7LFWXAdUuZ8');
        // this.navCtrl.push(TabsPage);
/*        this.login.emailLogin(this.email, this.password).then(res => {
            this.storage.set('sign_id', res['content']['user']).then(() => {

                this.navCtrl.push(TabsPage);
            });
        }).catch(() => {
            this.email = undefined;
            this.password = undefined;
        });*/
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
