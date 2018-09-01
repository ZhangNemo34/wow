import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular'
import { SelectcatcityPage } from '../selectcatcity/selectcatcity';
import { RegisterProvider } from '../../providers/register/register';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';




@IonicPage()
@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class RegisterPage {

    public password: string;
    public confirmpassword: string;
    public username: string;
    public photo: string;
    email: string;
    user_id: string;
    load: any;
    token: any;


    constructor(public navCtrl: NavController, private camera: Camera, public navParams: NavParams,
        private alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController,
        private register: RegisterProvider, private storage: Storage,public loadingCtrl: LoadingController) {
        this.user_id = this.navParams.get('user_id');
        this.email = this.navParams.get('email');

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterPage');

        //  if(this.navParams.get('params')){
        //   this.Emails =this.navParams.get('params');
        //   console.log(this.Emails)
        // }
    }

    ionViewWillEnter(){
        this.storage.get('token').then(data=>{
            this.token = data;
            console.log(this.token);
        });
    }

    GoSelectCatCityPage() {
        this.loadingShow();
        this.register.register(this.user_id, this.username, this.password, this.email, this.photo, this.token)
            .then(data => {
                this.loadingHide();
                console.log("success",data);
                this.storage.set('sign_id', data['content']['sign_id']);
                this.navCtrl.push(SelectcatcityPage,{'loginType':'1'});
            }).catch(err=>{
                if(err.error && err.error.content)
                alert(err.error.content);

                this.loadingHide();
                console.log("failed",err);
            });
    }

    goback() {
        this.navCtrl.pop();
    }

    AlphanumericPassword(even) {
        console.log(even)
        var patt = new RegExp('^[A-Za-z0-9@. ]+$');
        var res = patt.test(this.password);
        console.log(this.password)
        if (res) {
        }
        else {
            if (this.password) {
                this.password = this.password.substring(0, this.password.length - 1);
                even.preventDefault()
                alert("Plese enter alpha numeric")
            }
        }
        console.log(even)
    }

    AlphanumeriConfirm(even) {
        console.log(even)
        var patt = new RegExp('^[A-Za-z0-9@. ]+$');
        var res = patt.test(this.confirmpassword);
        console.log(this.confirmpassword)
        if (res) {
        }
        else {
            if (this.confirmpassword) {
                this.confirmpassword = this.confirmpassword.substring(0, this.confirmpassword.length - 1);
                even.preventDefault()
                alert("Plese enter alpha numeric")
            }
        }
        console.log(even)
    }


    presentAlert() {
        // if(!this.photo){
        //     let alert = this.alertCtrl.create({
        //         title: '写真アップロード',
        //         subTitle: '写真を選んでください。',
        //         buttons: [
        //             {
        //                 text: 'OK',
        //                 handler: () => {
                           
        //                     console.log('Buy clicked');
        //                 }
        //             }
        //         ]
        //     });
        // }else 
        if(!this.username || this.username.length < 1 || this.username.length > 10){
            let alert = this.alertCtrl.create({
                title: 'ユーザーネームは',
                subTitle: '1文字以上10文字以内で入力してください',
                buttons: [
                    {
                        text: 'OK',
                        handler: () => {
                           
                            console.log('Buy clicked');
                        }
                    }
                ]
            });
            alert.present();
        }else{
            this.GoSelectCatCityPage()
        }
    }

    OpenCamera() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'プロフィール写真を選択',
            buttons: [
                {
                    text: 'カメラを起動',
                    role: 'destructive',
                    handler: () => {
                        this.fetchPhoto(this.camera.PictureSourceType.CAMERA);
                        console.log('Destructive clicked');
                    }
                },
                {
                    text: 'ライブラリから選択',
                    handler: () => {
                        this.fetchPhoto(this.camera.PictureSourceType.PHOTOLIBRARY);
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

    fetchPhoto(srcType){
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: srcType,
            allowEdit: true,
            correctOrientation: true
          }
          
          this.camera.getPicture(options).then((imageData) => {
           // imageData is either a base64 encoded string or a file URI
           // If it's base64 (DATA_URL):
           let base64Image = 'data:image/jpeg;base64,' + imageData;
           this.photo = base64Image;
           console.log(base64Image);
          }, (err) => {
           // Handle error
          });
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
