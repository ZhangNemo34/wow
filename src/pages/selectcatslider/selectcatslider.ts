import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PosteditPage } from '../postedit/postedit';
import { AlertController } from 'ionic-angular';
import { PostviolationreportPage } from '../postviolationreport/postviolationreport';
import { LoginProvider } from '../../providers/login/login';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SelectcatsliderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-selectcatslider',
  templateUrl: 'selectcatslider.html',
})
export class SelectcatsliderPage {

  adsId: any;
  ads:any;
  comments: any = [];
  files: any = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private alertCtrl: AlertController,
    private storage: Storage,
    public lProvider: LoginProvider) {

      this.adsId = this.navParams.get('ad_id');


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectcatsliderPage');

    console.log(this.navParams.data);
   
    this.storage.get('sign_id').then((sign_id)=>{
    // "dhSsM7LFWXAdUuZ8"
    let body = 'id=' + this.adsId + '&sign_id=' + sign_id;
    this.lProvider.getAdsDetails(body).then((res:any)=>{

      console.log(res);
      this.ads = res.advertise;
      this.files = res.files;

      var comments = res.comments;

      if(comments && comments.length>0){

        for(var c=0;c<comments.length;c++){

          if(comments[c].parent_id == "0"){
            this.comments.push(comments[c])
          }
          
        }

        for(var c1=0;c1<comments.length;c1++){

          if(comments[c1].parent_id != "0"){
            for(var ic=0;ic<this.comments.length;ic++){

              if(this.comments[ic].id == comments[c1].parent_id){
                this.comments[ic].innerComments = this.comments[ic].innerComments||[];
                this.comments[ic].innerComments.push(comments[c1])
              }
          
            }
          }
          
        }

      }

      console.log(this.comments);
  
    });

  }); 





  }

  likeAds() {
    var content;
    this.storage.get('sign_id').then((sign_id) => {

        // this.mProvider.setLike(this.postid, sign_id).then((res: any) => {
        //     content = res.content;

        //     let toast = this.toastCtrl.create({
        //         message: content,
        //         duration: 2000
        //     });
        //     toast.present();

        // });
    });
  }

  commentAds() {
    
  }

  reportAds() {

  }

DeletePost(){
  this.navCtrl.push(PosteditPage);
}

  Report() {
      let alert = this.alertCtrl.create({
        title: '違反報告',
        message: 'このコメントを通報しますか？',
        buttons: [
          {
            text: 'キャンセル',
            role: 'cancel',
            handler: () => {
             
              console.log('Cancel clicked');
            }
          },
          {
            text: '通報',
            handler: () => {
               this.GotoViolationReport()
              console.log('Buy clicked');
            }
          }
        ]
      });
      alert.present();
    }

   

    GotoViolationReport(){
      this.navCtrl.push(PostviolationreportPage)
    }


  MoreAdsComments(){
    //this.navCtrl.push(PostdetailscommentsPage);
  }
}
