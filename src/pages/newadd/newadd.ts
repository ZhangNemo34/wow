import { CategoryProvider } from './../../providers/category/category';
import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { SubmitaddviewPage } from '../submitaddview/submitaddview';
import { ActionSheetController } from 'ionic-angular'
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AdvertiseProvider } from '../../providers/advertise/advertise';
import {ListPage} from "../list/list";

/**
 * Generated class for the NewaddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-newadd',
    templateUrl: 'newadd.html',
})
export class NewaddPage {

    private adDetails : any = {
        email : '',
        content : '',
        confEmail : '',
        category_id1 : 1,
        category_id2 : 1,
        days : 10,
        price : 100,
        url : ''

    };
    numbers : any[];    
    private comments : any[];
    private imageids : any[] = [];
    public photos: any[] = [];
    private categoryType : number  = 1;

    public base64Image: string;
    categories: Array<any> = [];
    adId : string;
    deleted : number[] = [];
    // email: string;
    // confEmail: string;
    // category_1: number;
    // category_2: number;
    // content: string;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        private alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController,
        private camera: Camera, private adPro: AdvertiseProvider,
        private toastCtrl : ToastController,
        private catPro: CategoryProvider) {
        // this.numbers = Array(5).fill().map((x,i)=>i);
    }

    ngOnInit() {
        let self = this;
        this.photos = [];
        this.adId = this.navParams.get('adId');
        if(this.adId && this.adId!=''){
            this.adPro.getDetail(this.navParams.get('adId'))
                .then(res => {
                    this.adDetails = res['advertise'];
                    // this.content = this.adDetails.content;
                    // this.category_1 = this.adDetails.category_id1;
                    this.adDetails.confEmail = this.adDetails.email;
                    this.comments = res['comments'];
                    res['files'].forEach(item=>{
                        self.photos.push(item.file_name);
                        self.imageids.push(item.id);
                    });
                });
        }

        this.catPro.get().then(res => this.categories = res['category_list'])
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad NewaddPage');
    }



    GoToSubmit() {

        console.log('create advertisement');
        console.log(this.deleted);
        this.adPro.create({
            email: this.adDetails.email,
            cat1: this.adDetails.category_id1,
            cat2: this.adDetails.category_id2,
            days: this.adDetails.days,
            url : this.adDetails.url,
            price: this.adDetails.price,
            content: this.adDetails.content,
            file1: this.photos[0],
            file2: this.photos[1],
            file3: this.photos[2],
            file4: this.photos[3],
            file5: this.photos[4]
        }).then(res =>
            this.navCtrl.push(SubmitaddviewPage)
        )
    }
    editAd() {
        console.log('update advertisement');
        console.log(this.deleted);

        this.adPro.resumit({
            id : this.adDetails.id,
            email: this.adDetails.email,
            cat1: this.adDetails.category_id1,
            cat2: this.adDetails.category_id2,
            days: this.adDetails.days,
            price: this.adDetails.price,
            content: this.adDetails.content,
            url : this.adDetails.url,
            file1: this.photos[0],
            file2: this.photos[1],
            file3: this.photos[2],
            file4: this.photos[3],
            file5: this.photos[4],
            file1_id : this.imageids[0],
            file2_id : this.imageids[1],
            file3_id : this.imageids[2],
            file4_id : this.imageids[3],
            file5_id : this.imageids[4],
        }).then(res =>
            this.navCtrl.popTo(ListPage)
        )
    }
    AddConfirmation() {
        if(!this.adDetails.category_id1){
            let toast = this.toastCtrl.create({
                message: 'Please insert all categories.',
                duration: 3000,
                position: 'top'
            });
            toast.present();
            return;
        } else if(!this.adDetails.category_id2){
            let toast = this.toastCtrl.create({
                message: 'Please insert all categories.',
                duration: 3000,
                position: 'top'
            });
            toast.present();
            return;
        } else if(this.adDetails.email !== this.adDetails.confEmail){
            let toast = this.toastCtrl.create({
                message: "Don't match the email.",
                duration: 3000,
                position: 'top'
            });
            toast.present();
            return;
        } else if(this.adDetails.content == null || this.adDetails.content == ''){
            let toast = this.toastCtrl.create({
                message: "Please insert content.",
                duration: 3000,
                position: 'top'
            });
            toast.present();
            return;
        } else if (this.adDetails.days == 0 || this.adDetails.price == 0) {
            let toast = this.toastCtrl.create({
                message: "Please insert days and price.",
                duration: 3000,
                position: 'top'
            });
            toast.present();
            return;
        } else if (this.adDetails.email == null || this.adDetails.email == '') {
            let toast = this.toastCtrl.create({
                message: "Please insert email.",
                duration: 3000,
                position: 'top'
            });
            toast.present();
            return;
        } else if (this.adDetails.url == null || this.adDetails.url == '') {
            let toast = this.toastCtrl.create({
                message: "Please insert url.",
                duration: 3000,
                position: 'top'
            });
            toast.present();
            return;
        } else if (this.photos.length==0 || this.photos[0]=='' || this.photos[1]=='' || this.photos[2]=='') {
            let toast = this.toastCtrl.create({
                message: "please insert all photos.",
                duration: 3000,
                position: 'top'
            });
            toast.present();
            return;
        }
        let alert = this.alertCtrl.create({
            title: '確認',
            message: 'この内容で申請しますか？',
            buttons: [
                {
                    text: 'キャンセル',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: '申請する',
                    handler: () => {
                        if(this.adId) this.editAd();
                        else  this.GoToSubmit();
                        console.log('Buy clicked');
                    }
                }
            ]
        });
        alert.present();
    }

    OpenCamera(value) {
        let actionSheet = this.actionSheetCtrl.create({
            title: '写真を選択',
            buttons: [
                {
                    text: 'カメラを起動する',
                    role: 'destructive',
                    handler: () => {
                        this.takePhoto(value);
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

    takePhoto(value) {
        const options: CameraOptions = {
            quality: 50, // picture quality
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then((imageData) => {
            this.base64Image = "data:image/jpeg;base64," + imageData;
            this.photos.push(this.base64Image);
            // this.photos.reverse();
        }, (err) => {
            console.log(err);
        });
    }

    deletePhoto(index) {
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
                        this.deleted.push(index);
                        this.photos[index] = '';
                    }
                }
            ]
        });
        confirm.present();
    }




}
