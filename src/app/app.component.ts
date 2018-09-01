
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { PostviolationreportPage } from '../pages/postviolationreport/postviolationreport';
import { WelcomePage } from '../pages/welcome/welcome';
//import { UserlistPage } from '../pages/userlist/userlist';

//import { TabsPage } from '../pages/tabs/tabs';
//import { MapfullscreenPage } from '../pages/mapfullscreen/mapfullscreen';
//import { PosteditPage } from '../pages/postedit/postedit';
// import { MenusettingPage } from '../pages/menusetting/menusetting';
//import { UserviewPage } from '../pages/userview/userview';
//import { SettingPage } from '../pages/setting/setting';
//import { UsersendmessagePage } from '../pages/usersendmessage/usersendmessage';
//import { UserconfirmPage } from '../pages/userconfirm/userconfirm';
//import { UseraddmultiplePage } from '../pages/useraddmultiple/useraddmultiple';

import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html' 
})
export class MyApp {
 //rootPage:any = MapfullscreenPage;
 rootPage:any = WelcomePage;
 
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private push: Push, private storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      const options: PushOptions = {
        android: {},
        ios: {
            alert: 'true',
            badge: true,
            sound: 'false'
        },
        windows: {},
        browser: {
            pushServiceURL: 'http://push.api.phonegap.com/v1/push'
        }
     };
     
     const pushObject: PushObject = this.push.init(options);
     
     
     pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
     
     pushObject.on('registration').subscribe((registration: any) => {
      this.storage.set('token', registration.registrationId).then((res)=>{
        console.log("Device",res);
      }).catch(err=>{
        console.log("Device err",err);
      })
      console.log('Device registered', registration);
      

     });
     
     pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
    });
  }
}

