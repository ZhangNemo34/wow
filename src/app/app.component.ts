
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

@Component({
  templateUrl: 'app.html' 
})
export class MyApp {
 //rootPage:any = MapfullscreenPage;
 rootPage:any = WelcomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

