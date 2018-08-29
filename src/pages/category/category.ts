import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CategoryProvider } from './../../providers/category/category';

/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

checkboxValue:any={};
addCheckeBox:number=0;
categories: Array<any> = [];
category = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,private catPro: CategoryProvider) {
    catPro.get().then(data => this.categories = data['category_list']);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }

  dismiss() {
    let data = { 'category': this.category };
    this.viewCtrl.dismiss(data);
  }

 addValue(e, id) {
    console.log(id);
    if(e._value  == true && (this.addCheckeBox < 2)){
      this.category.push(id);
      this.addCheckeBox ++;
    }else{
          e._value = false; 
    	alert("You Can Add Only two category.")
   
    }

     if(e._value  == false && (this.addCheckeBox == 2)){
    	this.addCheckeBox --
    }
    
   console.log(this.addCheckeBox);//undefined
 }
}
