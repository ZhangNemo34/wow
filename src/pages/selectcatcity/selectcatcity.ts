import { CategoryProvider } from './../../providers/category/category';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { CategoryPage } from '../category/category';
import { CityPage } from '../city/city';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SelectcatcityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-selectcatcity',
    templateUrl: 'selectcatcity.html',
})
export class SelectcatcityPage {
    categories: Array<any> = [];
    cities: Array<any> = [];
    sign_id: string;

    category: [number];
    city: number;

    load: any;
    loginType: any;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        private catPro: CategoryProvider, private storage: Storage,public modalCtrl: ModalController,public loadingCtrl: LoadingController) {
        this.loginType = this.navParams.get('loginType');
        catPro.get().then(data => this.categories = data['category_list']);
        catPro.getCity().then(data => this.cities = data['city_list']);

        this.storage.get('sign_id').then((sign_id)=>{
            this.sign_id = sign_id;
             console.log(sign_id);
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SelectcatcityPage');
    }

    GoTabsPage() {
        this.loadingShow();
        console.log(this.category, this.city);
        this.catPro.setCategory(this.category[0], this.category[1], this.city, this.sign_id)
            .subscribe((res) => {
                this.loadingHide();
                console.log("success",res);
                this.storage.set('loginType', this.loginType);
                this.navCtrl.push(TabsPage);
            },err => {console.log("err",err);this.loadingHide();});
    }

    GoSelectCat() {
        let categoryPageModal = this.modalCtrl.create(CategoryPage);
        categoryPageModal.onDidDismiss(data => {
            this.category = data.category;
            console.log(data);
        });
        categoryPageModal.present();
        // this.navCtrl.push();
    }

    GoSelectCity() {
        let cityPageModal = this.modalCtrl.create(CityPage);
        cityPageModal.onDidDismiss(data => {
            this.city = data.city;
            console.log(data);
        });
        cityPageModal.present();
        // this.navCtrl.push(CityPage);
    }

    goback() {
        this.navCtrl.pop();
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
