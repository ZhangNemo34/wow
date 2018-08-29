import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { SettingPage } from '../setting/setting';
import { RequestPage } from '../request/request';

/**
 * Generated class for the SubmitaddviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-submitaddview',
  templateUrl: 'submitaddview.html',
})
export class SubmitaddviewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubmitaddviewPage');
  }

  BackToMenu(){
  	this.navCtrl.popTo(SettingPage);
  }

  GoRequest(){
    this.navCtrl.push(RequestPage)
  }

}
