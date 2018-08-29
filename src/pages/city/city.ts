import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CategoryProvider } from './../../providers/category/category';

/**
 * Generated class for the CityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-city',
  templateUrl: 'city.html',
})
export class CityPage {
  cities: Array<any> = [];
  city: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,private catPro: CategoryProvider,public viewCtrl: ViewController) {
    catPro.getCity().then(data => this.cities = data['city_list']);
  }

  dismiss() {
    let data = { 'city': this.city };
    this.viewCtrl.dismiss(data);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CityPage');
  }

}
