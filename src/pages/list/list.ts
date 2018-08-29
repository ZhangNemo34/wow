import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdviewPage } from '../adview/adview';
import { NewaddPage } from '../newadd/newadd';
import { AdvertiseProvider } from '../../providers/advertise/advertise';


/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-list',
    templateUrl: 'list.html',
})
export class ListPage {

    pet: string = "kittens";
    showAd: Array<any> = [];
    allowAd: Array<any> = [];
    disAllowAd: Array<any> = [];

    constructor(public navCtrl: NavController, public navParams: NavParams,
        private adPro: AdvertiseProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ListPage');
        this.adPro.getAds(1).then(res => this.showAd = res['list'])
            .catch(err=>console.log('API error : ', JSON.stringify(err)));
        this.adPro.getAds(2).then(res => this.allowAd = res['list'])
            .catch(err=>console.log('API error : ', JSON.stringify(err)));
        this.adPro.getAds(3).then(res => this.disAllowAd = res['list'])
            .catch(err=>console.log('API error : ', JSON.stringify(err)));
    }
    

    GoAddView(adId, type) {
        this.navCtrl.push(AdviewPage, { adId: adId , type : type})
    }

    GoNewAdd() {
        this.navCtrl.push(NewaddPage)
    }

}
