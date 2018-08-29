import { Geolocation } from '@ionic-native/geolocation';
import { MyPostsProvider } from './../../providers/my-posts/my-posts';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular'
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CategoryProvider } from '../../providers/category/category';
import { Storage } from '@ionic/storage';


import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';

import * as EXIF from 'exif-js';

import { SocialSharing } from '@ionic-native/social-sharing';

import { HomePage } from '../home/home';

// import { CategoryPage } from '../category/category';

/**
 * Generated class for the CameraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-camera',
    templateUrl: 'camera.html',
})
export class CameraPage {
    
    file:any
    image1:any    
    mylocation:any;    

    photos: Array<string> = [];
    facebookac:boolean=false
    twitterac:boolean=false
    instagramac:boolean=false

    base64Image: string// = "assets/imgs/Dog-Pictures.jpg";
    categories: Array<any> = [];
    cities: Array<any> = [];

    category: number;
    city: number;
    zip:number;
    state:string
    district:string
    country:string;
    streetAddress:string

    long: number;
    lat: number;
    sign_id: string;
    name: string;
    comment: string;
    share: number;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        private alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController,
        private camera: Camera, catPro: CategoryProvider,
        private myPost: MyPostsProvider, storage: Storage,
        private geo: Geolocation,
        private nativeGeocoder: NativeGeocoder,
        private socialSharing: SocialSharing
    ) {
        catPro.get().then(data => this.categories = data['category_list']);
        catPro.getCity().then(data => this.cities = data['city_list']);
        storage.get('sign_id').then(d => this.sign_id = d);
     
    }

    ngOnInit() {
        this.photos = [];
    }
    ionViewWillEnter(){
       
        var options = {
            //   enableHighAccuracy: true,
               timeout: 50000,
               maximumAge: 0
             };
   
           this.geo.getCurrentPosition(options).then(position => {
               let coords = position['coords'];
               this.lat = coords.latitude;
               this.long = coords.longitude;
   
            //   alert("userlocaltion lat and long are =="+this.lat+" "+this.long)
               let options: NativeGeocoderOptions = {
                   useLocale: true,
                   maxResults: 5
               };
               
               this.nativeGeocoder.reverseGeocode(this.lat, this.long, options)
                .then((result: NativeGeocoderReverseResult[]) => {

                this.mylocation = result[0]//JSON.stringify(result[0])

              //  alert(JSON.stringify(result[0]))
                if(this.mylocation){
                    this.city = this.mylocation.locality;
                 //   alert("city:="+this.city)
                    this.zip = this.mylocation.postalCode;
                    this.state = this.mylocation.administrativeArea;
                    this.district = this.mylocation.subAministrativeArea;
                    this.country = this.mylocation.countryName;
                    this.streetAddress = this.mylocation.subLocality+","+this.mylocation.thoroughfare;    
                }

            })
            .catch((error: any) => 
            console.log("error in nativeGeocoder"+error)
        );
            
           }).catch(d => {
               alert(JSON.parse(d))
               this.lat = 28.716304;
               this.long = 77.103210;
           }).catch(d => {
               //console.log(d)
              // alert("getCurrentPosition =="+JSON.parse(d))
               this.lat = 28.716304;
               this.long = 77.103210;
           });
    }
    
    ionViewDidLoad() {
        console.log('ionViewDidLoad CameraPage');
    }

    takePhoto() {
        const options: CameraOptions = {
            quality: 50, // picture quality
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        }
        this.camera.getPicture(options).then((imageData) => {
            this.base64Image = "data:image/jpeg;base64," + imageData;
            this.photos.push(this.base64Image);
            this.photos.reverse();
        }, (err) => {
            console.log(err);
        });
    }

    deletePhoto() {
        let confirm = this.alertCtrl.create({
            title: 'Sure you want to delete this photo? There is NO undo!',
            message: '',
            buttons: [
                {
                    text: 'No',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                }, {
                    text: 'Yes',
                    handler: () => {
                        console.log('Agree clicked');
                        this.base64Image = '';
                    }
                }
            ]
        });
        confirm.present();
    }



    presentAlert() {
        let alert = this.alertCtrl.create({
            title: '投稿',
            subTitle: '投稿が完了しました。',
            buttons: [{
                text: 'OK',
                role: 'submit',
                handler: () => {

                    var publish   
                    if(!this.facebookac && !this.twitterac && !this.instagramac ){
                        publish=0
                    }else if(this.facebookac && !this.twitterac && !this.instagramac ){
                        publish=1
                        this.shareViaFacebook()
                    }else if(!this.facebookac && this.twitterac && !this.instagramac ){
                        publish=2                        
                        this.shareViaTwitter()
                    }else if(!this.facebookac && !this.twitterac && this.instagramac ){
                        publish=3
                        this.shareViaInstagram()
                    }else if(this.facebookac && this.twitterac && !this.instagramac ){
                        publish=4
                                    
                        this.shareViaTwitter()
                        this.shareViaFacebook()
                    }else if(this.facebookac && !this.twitterac && this.instagramac ){
                        publish=5
                        
                        this.shareViaInstagram()                        
                        this.shareViaFacebook()
                    }else if(!this.facebookac && this.twitterac && this.instagramac ){
                        publish=6                        
                        this.shareViaInstagram()
                        this.shareViaTwitter()
                    }else if(this.facebookac && this.twitterac && this.instagramac ){
                        publish=7
                        
                        this.shareViaInstagram()
                        this.shareViaTwitter()
                        this.shareViaFacebook()
                    }

                                              
                    
                    let postData = {
                        long: this.long,
                        lati: this.lat,
                        sign_id: this.sign_id,
                        city: this.city,
                        name: this.name,
                        comment: this.comment,
                        file_name: this.base64Image,
                        publish: publish,
                        category: this.category,
                        share: this.share
                    }
                    this.myPost.create(postData);
                }
            }]
        });
        alert.present();
    }

    presentActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            title: '写真を選択',
            buttons: [
                {
                    text: 'カメラを起動する',
                    role: 'destructive',
                    handler: () => {
                        this.takePhoto();
                        console.log('Destructive clicked');
                    }
                },
                {
                    text: 'ライブラリから選択',
                    handler: () => {
                        console.log('Archive clicked');
                    }
                },
                {
                    text: 'キャンセル',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });

        actionSheet.present();
    }

    shareViaFacebook()
   {
  
            this.socialSharing.shareViaFacebook(this.comment, this.base64Image, null)
            .then((data) =>
            {
               console.log('Shared via Facebook');
            })
            .catch((err) =>
            {
               alert("Can't be shared with Facebook due to the following error:=="+JSON.stringify(err));
            });

      }
    
   shareViaInstagram()
   {
     
         this.socialSharing.shareViaInstagram(this.comment, this.base64Image)
         .then((data) =>
         {
            console.log('Shared via shareViaInstagram');
         })
         .catch((err) =>
         {
            alert("Can't be shared with Instagram due to the following error:=="+JSON.stringify(err));
         });

     
   }
   shareViaTwitter()
   {

            this.socialSharing.shareViaTwitter(this.comment, this.base64Image, null)
            .then((data) =>
            {
                console.log('Shared via Twitter');
            })
            .catch((err) =>
            {
               alert('Was not shared via Twitter'+JSON.stringify(err));
            });


      
   }

    // GotoCategory(){
    // 	this.navCtrl.push(CategoryPage)
    // }

}
