import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { PosteditPage } from '../postedit/postedit';
import { PostviolationreportPage } from '../postviolationreport/postviolationreport';
import { MyPostsProvider } from '../../providers/my-posts/my-posts';
import { Storage } from '@ionic/storage';
import { LoginProvider } from '../../providers/login/login';


/**
 * Generated class for the PostdetailscommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-postdetailscomments',
  templateUrl: 'postdetailscomments.html',
})
export class PostdetailscommentsPage {

    postid: any;
    post: any;
    comments: any = [];
    commentLength: any = 0;
    likeNum: any;
    isLike: boolean = false;
    key: any;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private alertCtrl: AlertController,
        private storage: Storage,
        public mProvider: MyPostsProvider,
        private toastCtrl: ToastController,
        public lProvider: LoginProvider,
        public loadingCtrl: LoadingController) {

        this.postid = this.navParams.get('id');
        this.key = this.navParams.get('key');
  }
    renderUI() {
        this.storage.get('sign_id').then((sign_id) => {
            // "dhSsM7LFWXAdUuZ8"
            let body = 'id=' + this.postid + '&sign_id=' + this.key;

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
      console.log('ionViewDidLoad PostdetailscommentsPage');

      this.renderUI();
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

     DeletePost(){
      this.navCtrl.push(PosteditPage);
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


     commentreplyButton() {
         this.storage.get('sign_id').then((sign_id) => {

             this.mProvider.reReply(this.postid, sign_id).then((res: any) => {
                 var content = res.content;

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
         this.presentPrompt();
     }

     presentPrompt() {
         let alert = this.alertCtrl.create({
             title: 'Comment',
             inputs: [
                 {
                     name: 'Comment',
                     placeholder: 'Comment'
                 }
             ],
             buttons: [
                 {
                     text: 'Cancel',
                     role: 'cancel',
                     handler: data => {
                         console.log('Cancel clicked');
                     }
                 },
                 {
                     text: 'Comment',
                     handler: data => {
                         this.addComment(data);
                     }
                 }
             ]
         });
         alert.present();
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

     ReplyComment() {
         let alert = this.alertCtrl.create({
             title: 'Comment',
             inputs: [
                 {
                     name: 'Comment',
                     placeholder: 'Comment'
                 }
             ],
             buttons: [
                 {
                     text: 'Cancel',
                     role: 'cancel',
                     handler: data => {
                         console.log('Cancel clicked');
                     }
                 },
                 {
                     text: 'Comment',
                     handler: data => {
                         this.addReplyComment(data);
                     }
                 }
             ]
         });
         alert.present();
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
                 this.loading.dismiss();
                 this.renderUI();
             });
         });
     }
}
