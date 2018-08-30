import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { IonicStorageModule } from '@ionic/storage';

import { IonicImageViewerModule } from 'ionic-img-viewer';

import { MyApp } from './app.component';
import { EmailfirstscreenPage } from '../pages/emailfirstscreen/emailfirstscreen';
import { EmailloginPage } from '../pages/emaillogin/emaillogin';
import { EmailforgotPage } from '../pages/emailforgot/emailforgot';
import { EmailforgotconfirmPage } from '../pages/emailforgotconfirm/emailforgotconfirm';
import { OtpauthorizationPage } from "../pages/otpauthorization/otpauthorization";
import { EntermailaddressPage } from "../pages/entermailaddress/entermailaddress";
import { SelectcatcityPage } from '../pages/selectcatcity/selectcatcity';
import { RegisterPage } from "../pages/register/register";
import { CategoryPage } from '../pages/category/category';
import { CityPage } from '../pages/city/city';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { MapfullscreenPage } from '../pages/mapfullscreen/mapfullscreen';
import { Geolocation } from '@ionic-native/geolocation';
import { SelectcategoryPage } from '../pages/selectcategory/selectcategory';
import { PostdetailscommentsPage } from '../pages/postdetailscomments/postdetailscomments';
import { SelectcatsliderPage } from '../pages/selectcatslider/selectcatslider';
import { SelectmapcategoryPage } from '../pages/selectmapcategory/selectmapcategory';
import { PostviolationreportPage } from '../pages/postviolationreport/postviolationreport';
import { TilesPage } from '../pages/tiles/tiles';
import { MypostdetailscommentsPage } from '../pages/mypostdetailscomments/mypostdetailscomments';
import { SearchpostlistPage } from '../pages/searchpostlist/searchpostlist';
import { PosteditPage } from '../pages/postedit/postedit';
import { CameraPage } from '../pages/camera/camera';
import { FavoritePage } from '../pages/favorite/favorite';
import { ListPage } from '../pages/list/list';
import { UserdetailsPage } from '../pages/userdetails/userdetails';
import { SettingPage } from '../pages/setting/setting';
import { MenusettingPage } from '../pages/menusetting/menusetting';
import { UserlistPage } from '../pages/userlist/userlist';
import { NoticeuserviewPage } from '../pages/noticeuserview/noticeuserview';
import { UserviewPage } from '../pages/userview/userview';
import { UsersendmessagePage } from '../pages/usersendmessage/usersendmessage';
import { UserconfirmPage } from '../pages/userconfirm/userconfirm';
import { UseraddmultiplePage } from '../pages/useraddmultiple/useraddmultiple';
import { LanguagesettingPage } from '../pages/languagesetting/languagesetting';
import { AdviewPage } from '../pages/adview/adview';
import { NewaddPage } from '../pages/newadd/newadd';
import { SubmitaddviewPage } from '../pages/submitaddview/submitaddview';
import { RequestPage } from '../pages/request/request';
import { TwitterConnect } from "@ionic-native/twitter-connect";
import { WelcomePageModule } from "../pages/welcome/welcome.module";
import { HttpClientModule } from "@angular/common/http";
import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';
import { LoginProvider } from '../providers/login/login';
import { RegisterProvider } from '../providers/register/register';
import { CategoryProvider } from '../providers/category/category';
import { MyPostsProvider } from '../providers/my-posts/my-posts';
import { AccountProvider } from '../providers/account/account';
import { AdvertiseProvider } from '../providers/advertise/advertise';
import { MorecommentsPage } from '../pages/morecomments/morecomments';
import { ReplyCommentPage } from '../pages/replycomment/replycomment';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { SocialSharing } from '@ionic-native/social-sharing';

import { Push } from '@ionic-native/push';

@NgModule({
    declarations: [
        MyApp,
        EmailfirstscreenPage,
        EmailloginPage,
        EmailforgotPage,
        EmailforgotconfirmPage,
        OtpauthorizationPage,
        EntermailaddressPage,
        SelectcatcityPage,
        RegisterPage,
        CategoryPage,
        CityPage,
        TabsPage,
        HomePage,
        MapfullscreenPage,
        SelectcategoryPage,
        PostdetailscommentsPage,
        SelectcatsliderPage,
        SelectmapcategoryPage,
        PostviolationreportPage,
        TilesPage,
        MypostdetailscommentsPage,
        SearchpostlistPage,
        PosteditPage,
        CameraPage,
        FavoritePage,
        ListPage,
        UserdetailsPage,
        SettingPage,
        MenusettingPage,
        UserlistPage,
        NoticeuserviewPage,
        UserviewPage,
        UsersendmessagePage,
        UserconfirmPage,
        UseraddmultiplePage,
        LanguagesettingPage,
        AdviewPage,
        NewaddPage,
        SubmitaddviewPage,
        RequestPage,
        MorecommentsPage,
        ReplyCommentPage

    ],
    imports: [
        BrowserModule,
        IonicImageViewerModule,
        WelcomePageModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,

        EmailfirstscreenPage,
        EmailloginPage,
        EmailforgotPage,
        EmailforgotconfirmPage,
        OtpauthorizationPage,
        EntermailaddressPage,
        SelectcatcityPage,
        SelectcatsliderPage,
        SelectmapcategoryPage,
        PostviolationreportPage,
        RegisterPage,
        CategoryPage,
        CityPage,
        TabsPage,
        HomePage,
        MapfullscreenPage,
        SelectcategoryPage,
        PostdetailscommentsPage,
        TilesPage,
        MypostdetailscommentsPage,
        SearchpostlistPage,
        PosteditPage,
        CameraPage,
        FavoritePage,
        ListPage,
        UserdetailsPage,
        SettingPage,
        MenusettingPage,
        UserlistPage,
        NoticeuserviewPage,
        UserviewPage,
        UsersendmessagePage,
        UserconfirmPage,
        UseraddmultiplePage,
        LanguagesettingPage,
        AdviewPage,
        NewaddPage,
        SubmitaddviewPage,
        RequestPage,
        MorecommentsPage,
        ReplyCommentPage

    ],
    providers: [
        StatusBar,
        Geolocation,
        SplashScreen,
        TwitterConnect,
        Camera,
        LaunchNavigator,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        ConnectivityServiceProvider,
        LoginProvider,
        RegisterProvider,
        CategoryProvider,
        MyPostsProvider,
        AccountProvider,
        AdvertiseProvider,
        NativeGeocoder,
        SocialSharing,
        Push

    ]
})
export class AppModule { }
