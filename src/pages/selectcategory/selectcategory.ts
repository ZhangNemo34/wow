import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { ImageViewerController } from 'ionic-img-viewer';
import { PosteditPage } from '../postedit/postedit';
import { AlertController } from 'ionic-angular';
import { PostviolationreportPage } from '../postviolationreport/postviolationreport';
import { PostdetailscommentsPage } from '../postdetailscomments/postdetailscomments';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { LoginProvider } from '../../providers/login/login';
import { Storage } from '@ionic/storage';
import { MyPostsProvider } from '../../providers/my-posts/my-posts';
import { ReplyCommentPage } from '../replycomment/replycomment';

/**
 * Generated class for the SelectcategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@IonicPage()
@Component({
  selector: 'page-selectcategory',
  templateUrl: 'selectcategory.html',
})
export class SelectcategoryPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  public marker: any;

  zoomControl: boolean
  mapTypeControl: boolean
  scaleControl: boolean
  streetViewControl: boolean
  rotateControl: boolean
  fullscreenControl: boolean
  isLike: boolean = false;
  hideMe: boolean = false;
  post:any;
  comments: any = [];
  postid: any;
  commentLength: any= 0;
  likeNum: any;
  signID: any;

  constructor(public navCtrl: NavController, private geolocation: Geolocation,
    public navParams: NavParams, public imageViewerCtrl: ImageViewerController,
    private alertCtrl: AlertController, private launchNavigator: LaunchNavigator,
    public lProvider: LoginProvider, private storage: Storage,
    public mProvider: MyPostsProvider,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {

      this.postid = this.navParams.get('id1') || "12";

  }

  renderUI() {
      this.storage.get('sign_id').then((sign_id) => {
          // "dhSsM7LFWXAdUuZ8"
          let body = 'id=' + this.postid + '&sign_id=' + sign_id;
          this.signID = sign_id
          this.lProvider.getPostDetails(body).then((res: any) => {

              this.comments = [];

              console.log("asdasdsa");
              console.log(res);
              this.post = res.post;
              var comments = res.comments;
              this.likeNum = this.post.num_like;

              if (comments && comments.length > 0) {

                  for (var c = 0; c < comments.length; c++) {

                      if (comments[c].parent_id == "0") {
                          this.comments.push(comments[c])
                      }

                  }

                  for (var c1 = 0; c1 < comments.length; c1++) {

                      if (comments[c1].parent_id != "0") {
                          for (var ic = 0; ic < this.comments.length; ic++) {

                              if (this.comments[ic].id == comments[c1].parent_id) {
                                  this.comments[ic].innerComments = this.comments[ic].innerComments || [];
                                  this.comments[ic].innerComments.push(comments[c1])
                                  this.commentLength = this.commentLength + 1
                              }

                          }
                      }

                  }


              }

              console.log(this.comments);

          });

      });
  }

  ionViewDidLoad() {
    this.loadMap();
    console.log('ionViewDidLoad SelectcategoryPage');

    console.log(this.navParams.data);
   
    //id="12";
    this.renderUI();
    
}


  forGeoLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp)
      debugger
      console.log(resp.coords.latitude)
      console.log(resp.coords.longitude)
      this.map.setCenter(new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude));
      var myLatLng = { lat: resp.coords.latitude, lng: resp.coords.longitude }

      new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Hello World!',
        icon: 'assets/imgs/mapred.png'
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {

      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });
  }



  loadMap() {

    let latLng = new google.maps.LatLng(33.2285185, 131.1887945);

    let mapOptions = {
      center: latLng,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: false,
      scaleControl: false,
      attributionControl: false,
    }

    var infowindow = new google.maps.InfoWindow();
    var content = "<div>このコメントを通報しますか</div>";


    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    let marker = new google.maps.Marker({
      position: latLng,
      animation: google.maps.Animation.DROP,
      map: this.map,
      icon: 'assets/imgs/mapred.png'
    });

    google.maps.event.addListener(marker, 'click', (function (marker) {
      return function () {
        infowindow.setContent(content);
        infowindow.open(this.map, marker);
      }
    })(marker));

    //  google.maps.event.addListener(marker, 'click', () => {
    //    infowindow.setContent('La Coate', 43.7777989, 11.2506863);
    //    infoWindow.open(this.map, marker);
    // });

  }


  Report(comment_id) {
      console.log(comment_id);

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
            this.GotoViolationReport(comment_id)
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }



  GotoViolationReport(comment_id) {
    this.navCtrl.push(PostviolationreportPage,{
        post:this.post,
        sign_id:this.signID,
        comment_id:comment_id
    });
  }




  function(success) {
    console.log(success);
  }

  goback() {
    this.navCtrl.pop();
  }

  DeletePost() {
    this.navCtrl.push(PosteditPage);
  }


  //MorePostComments() {
  //    this.navCtrl.push(PostdetailscommentsPage);


  //}

  MorePostComments() {

      this.navCtrl.push(PostdetailscommentsPage, {
          id: this.postid,
          key: this.signID,
      });
  }

  SelectCat() {
      var content;
      this.hideMe = true;
      this.presentLoadingDefault();
      this.storage.get('sign_id').then((sign_id) => {

          this.mProvider.setFav(this.postid, sign_id).then((res: any) => {

              this.loading.dismiss();
              let toast = this.toastCtrl.create({
                  message: "Added to favourite",
                  duration: 2000
              });
              toast.present();

              this.renderUI();
          });
      }); 
  }

  BackCat() {
      var content;
      this.hideMe = false;
      this.presentLoadingDefault();
      this.storage.get('sign_id').then((sign_id) => {

          this.mProvider.setFav(this.postid, sign_id).then((res: any) => {

              this.loading.dismiss();
              let toast = this.toastCtrl.create({
                  message: "Removed from favourite",
                  duration: 2000
              });
              toast.present();
          });
      }); 
  }
  launchNavigate() {
    this.launchNavigator.navigate([33.2285185, 131.1887945]);
  }

  likeCommentButton() {
      this.isLike = false;
      var content;
      this.presentLoadingDefault();
      this.storage.get('sign_id').then((sign_id) => {

          this.mProvider.likeReply(this.postid, sign_id).then((res: any) => {
              content = res.content;

              this.loading.dismiss();
              let toast = this.toastCtrl.create({
                  message: content,
                  duration: 2000
              });
              toast.present();

              this.renderUI();
          });
      }); 
  }

  
  loading: any;
  presentLoadingDefault() {
      this.loading = this.loadingCtrl.create({
          content: 'Please wait...'
      });

      this.loading.present();

         
  }

  likePost() {
      var content;
      this.presentLoadingDefault();
      this.storage.get('sign_id').then((sign_id) => {

          this.mProvider.setLike(this.postid, sign_id).then((res: any) => {
              content = res.content;
              this.loading.dismiss();
              let toast = this.toastCtrl.create({
                  message: content,
                  duration: 2000
              });
              toast.present();

          });
      });
  }
  UnlikePost() {
      this.isLike = true;
      var content;
      this.presentLoadingDefault();
      this.storage.get('sign_id').then((sign_id) => {

          this.mProvider.likeReply(this.postid, sign_id).then((res: any) => {
              content = res.content;

              this.loading.dismiss();
              let toast = this.toastCtrl.create({
                  message: content,
                  duration: 2000
              });
              toast.present();

              this.renderUI();
          });
      }); 
  }

  commentPost() {
      //this.presentPrompt();
      this.showCommentBox = true;
this.type ="1";
      //this.navCtrl.push(ReplyCommentPage,{post:this.post,type:1});
  }

  presentPrompt() {

    //this.navCtrl.push(ReplyCommentPage,{post:this.post});
    //   let alert = this.alertCtrl.create({
    //       title: 'Comment',
    //       inputs: [
    //           {
    //               name: 'Comment',
    //               placeholder: 'Comment'
    //           }
    //       ],
    //       buttons: [
    //           {
    //               text: 'Cancel',
    //               role: 'cancel',
    //               handler: data => {
    //                   console.log('Cancel clicked');
    //               }
    //           },
    //           {
    //               text: 'Comment',
    //               handler: data => {
    //                   this.addComment(data);
    //               }
    //           }
    //       ]
    //   });
    //   alert.present();
  }
  

  ReplyComment() {

    this.showCommentBox = true;
    this.type ="2";

    //this.navCtrl.push(ReplyCommentPage,{post:this.post,type:2});

    //   let alert = this.alertCtrl.create({
    //       title: 'Comment',
    //       inputs: [
    //           {
    //               name: 'Comment',
    //               placeholder: 'Comment'
    //           }
    //       ],
    //       buttons: [
    //           {
    //               text: 'Cancel',
    //               role: 'cancel',
    //               handler: data => {
    //                   console.log('Cancel clicked');
    //               }
    //           },
    //           {
    //               text: 'Comment',
    //               handler: data => {
    //                   this.addReplyComment(data);
    //               }
    //           }
    //       ]
    //   });
    //   alert.present();
  }
  
  showCommentBox = false;
  commenttext:any;
  type:any;
  sendClick(){


    if(this.type == "1")
this.addComment(this.commenttext)
else
this.addReplyComment(this.commenttext);

this.showCommentBox = false;
}

cloceClick(){
    this.showCommentBox = false;
}


reportAPI(){

}
addComment(cmnt) {
    var content;
    this.presentLoadingDefault();
    this.storage.get('sign_id').then((sign_id) => {

        this.mProvider.reply(this.postid, cmnt).then((res: any) => {
            content = res.content;

            this.loading.dismiss();
            let toast = this.toastCtrl.create({
                message: content,
                duration: 2000
            });
            toast.present();

        });
    });
}

addReplyComment(cmnt) {
    var content;
    this.presentLoadingDefault();
    this.storage.get('sign_id').then((sign_id) => {

        this.mProvider.reReply(this.postid, cmnt).then((res: any) => {
            content = res.content;

            this.loading.dismiss();
            let toast = this.toastCtrl.create({
                message: content,
                duration: 2000
            });
            toast.present();
        });
    });
}

}
