import { SelectcatcityPage } from '../selectcatcity/selectcatcity';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
// import { EntermailaddressPage } from "../entermailaddress/entermailaddress";
import { EmailloginPage } from '../emaillogin/emaillogin';
import { EmailfirstscreenPage } from '../emailfirstscreen/emailfirstscreen';
import { Facebook } from "ng2-cordova-oauth/core";
import { OauthCordova } from 'ng2-cordova-oauth/platform/cordova';
import { Instagram } from "ng2-cordova-oauth/provider/instagram";
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { WelcomeProvider } from "./welcome.data.service";
import { TabsPage } from '../tabs/tabs';
import { LoginProvider } from '../../providers/login/login';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html',
})
export class WelcomePage {
    private oauth: OauthCordova = new OauthCordova();
    private facebookProvider: Facebook = new Facebook({
        clientId: "242722836325463",
        appScope: ["public_profile,email"]
    });
    private instagramProvider: Instagram = new Instagram({
        clientId: "f87805ded46b4198a5f479367cfaf905",
        appScope: ["basic"]
    });
    token: string;
    constructor(public navCtrl: NavController, public navParams: NavParams,
        private platform: Platform, private twitter: TwitterConnect,
        public welcomeProvider: WelcomeProvider, public login: LoginProvider,
        private storage: Storage 
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad WelcomePage');  
        this.storage.get('sign_id').then(data=>{
            console.log("sign_id",data);
            if(data){
                this.storage.get('loginType').then(res=>{
                    if(res > 1){
                        this.navCtrl.push(TabsPage);
                    }
                });
            }
        });
        
    }

    goToNext() {
        this.navCtrl.push(EmailfirstscreenPage);
        // for test SelectcatcityPage
        // this.navCtrl.push(SelectcatcityPage);
    }

    gotoTabpage() {
        this.navCtrl.push(TabsPage)
    }

    public facebook() {
        this.platform.ready().then(() => {
            this.storage.get('token').then(data=>{
                this.token = data;
                console.log("welcome",data);
            });
            this.oauth.logInVia(this.facebookProvider).then(success => {
                console.log(JSON.stringify(success));
                this.welcomeProvider.getUsersDetailsFromFacebook(success['access_token']).subscribe(data => {
                    console.log(JSON.stringify(data));
                    this.login.socialLogin('facebook', data.id, data.name, "https://graph.facebook.com/"+data.id+"/picture?width=1024&height=1024", this.token).then(loginRes => {
                        console.log(loginRes);
                       
                        if(loginRes['content']['sign_id']){
                            this.storage.set('sign_id', loginRes['content']['sign_id']);
                           
                            
                            if(!loginRes['content']['category_id1'] || !loginRes['content']['category_id2'] || !loginRes['content']['city'] && loginRes['content']['category_id1'] == "0" || loginRes['content']['category_id2'] == "0" || loginRes['content']['city'] == "0" ){
                                this.navCtrl.push(SelectcatcityPage,{'loginType':'2'});
                            }else{
                                alert("Success Facebook Login");
                                this.storage.set('loginType', 2);
                                this.gotoTabpage();
                            }
                        }
                        
                    }).catch(err => console.log(err));
                })
                
            }, error => {
                alert("Facebook app required to login");
                console.log("ERROR: ", JSON.stringify(error));
            });
        });
    }

    public instagram() {
        this.platform.ready().then(() => {
            this.storage.get('token').then(data=>{
                this.token = data;
                console.log("welcome",data);
            });
            this.oauth.logInVia(this.instagramProvider).then(success => {
                console.log("RESULT: " + JSON.stringify(success));
                this.welcomeProvider.getUserDetailsFromInstagram(success['access_token']).subscribe(data => {
                    this.login.socialLogin('instagram', data.data.id, data.data.username, data.data.profile_picture, this.token).then(loginRes => {
                        this.storage.set('sign_id', loginRes['content']['sign_id']);
                        
                        if(!loginRes['content']['category_id1'] || !loginRes['content']['category_id2'] || !loginRes['content']['city'] && loginRes['content']['category_id1'] == "0" || loginRes['content']['category_id2'] == "0" || loginRes['content']['city'] == "0" ){
                            this.navCtrl.push(SelectcatcityPage,{'loginType':'3'});
                        }else{
                            alert("Success Instagram Login");
                            this.storage.set('loginType', 3);
                            this.gotoTabpage();
                        }
                    }).catch(err => console.log(err));
                    //get info here
                })
            }, error => {
                alert("Instagram app required to login");
                console.log("ERROR: ", error);
            });
        });
    }

    public twitterLogin() {
        this.twitter.login().then(res => {
            this.storage.get('token').then(data=>{
                this.token = data;
                console.log("welcome",data);
            });
            console.log(res);
            this.twitter.showUser().then(data=>{
                console.log(data.id_str, data.screen_name, data.profile_image_url);
                this.login.socialLogin('twitter', data.id_str, data.screen_name, data.profile_image_url, this.token).then(loginRes => {
                    console.log(loginRes);
                    this.storage.set('sign_id', loginRes['content']['sign_id']);
                    
                    if(!loginRes['content']['category_id1'] || !loginRes['content']['category_id2'] || !loginRes['content']['city'] && loginRes['content']['category_id1'] == "0" || loginRes['content']['category_id2'] == "0" || loginRes['content']['city'] == "0" ){
                        this.navCtrl.push(SelectcatcityPage,{'loginType':'4'});
                    }else{
                        alert("Success Twitter Login");
                        this.storage.set('loginType', 4);
                        this.gotoTabpage();
                    }
                }).catch(err => console.log(err));
            })
            .catch(data=>{
                console.log("error::::",data);
                if(data.id_str && data.screen_name && data.profile_image_url){
                    this.login.socialLogin('twitter', data.id_str, data.screen_name, data.profile_image_url, this.token).then(loginRes => {
                        console.log(loginRes);
                        this.storage.set('sign_id', loginRes['content']['sign_id']);
                        if(!loginRes['content']['category_id1'] || !loginRes['content']['category_id2'] || !loginRes['content']['city'] && loginRes['content']['category_id1'] == "0" || loginRes['content']['category_id2'] == "0" || loginRes['content']['city'] == "0" ){
                            this.navCtrl.push(SelectcatcityPage,{'loginType':'4'});
                        }else{
                            alert("Success Twitter Login");
                            this.storage.set('loginType', 4);
                            this.gotoTabpage();
                        }
                    }).catch(err => console.log(err));
                }
                
            });
        }, error => {
            alert("Twitter app required to login");
            console.log(error);
        });
    }

    goToEmailLogin() {
        this.navCtrl.push(EmailloginPage);
    }

}
