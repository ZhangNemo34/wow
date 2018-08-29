import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewaddPage } from '../newadd/newadd';
import { AdvertiseProvider } from '../../providers/advertise/advertise';

/**
 * Generated class for the AdviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-adview',
    templateUrl: 'adview.html',
})
export class AdviewPage {

    adDetails: any = {};
    comments: Array<any> = [];
    images: Array<string> = [];
    first_image : any = 'assets/imgs/userse.png';
    adId : string;
    data : any;
    type : number;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        private advert: AdvertiseProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AdviewPage');
        this.type =this.navParams.get('type');
        this.adId = this.navParams.get('adId');
        console.log(this.adId);
    }

    ionViewWillEnter() {
        this.advert.getDetail(this.navParams.get('adId'))
            .then(res => {
                this.adDetails = res['advertise'];
                this.comments = res['comments'];
                this.images = res['files'];
                console.log(this.images);
                if(res['files'].length>0)
                    this.first_image = res['files'][0].file_name;
            });
    }

    resubmit() {
        this.navCtrl.push(NewaddPage,{adId : this.adId})
        // this.advert.create({
        //     id : this.adDetails.id,
        //     email: this.adDetails.email,
        //     cat1: this.adDetails.category_1,
        //     cat2: this.adDetails.category_2,
        //     days: this.adDetails.days,
        //     price: this.adDetails.price,
        //     content: this.adDetails.content,
        //     file1: this.photos[0],
        //     file2: this.photos[1],
        //     file3: this.photos[2],
        //     file4: this.photos[3],
        //     file5: this.photos[4]
        // }).then(res =>
        //     this.navCtrl.push(SubmitaddviewPage)
        // )
        // this.advert.reAdverise(this.adDetails.id).then(() => this.navCtrl.pop());
    }

}
