import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController, LoadingController } from 'ionic-angular';
import { MyPostsProvider } from '../../providers/my-posts/my-posts';
import { LoginProvider } from '../../providers/login/login';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the MorecommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-replycomment',
    templateUrl: 'replycomment.html',
})
export class ReplyCommentPage {

    post: any = {};
    comments: Array<any> = [];

    postComment: boolean = false;
    reComment: boolean = false;
    commentId: number;
    comment: string;
    recomment: string;
    postid:any;
    type :any;
    constructor(public navCtrl: NavController, public navParams: NavParams,
        private myPost: MyPostsProvider,
        public lProvider: LoginProvider, private storage: Storage,
        public mProvider: MyPostsProvider,
        private toastCtrl: ToastController,
        public loadingCtrl: LoadingController) {

        this.post = this.navParams.get('post');
        this.comments = this.navParams.get('comments')
        this.postid = this.post.id;
        this.type = this.navParams.get('type')
    }


    sendClick(){

        alert(this.commenttext);

        if(this.type == "1")
this.addComment(this.commenttext)
else
this.addReplyComment(this.commenttext);
    
}

    commenttext:any;
    loading: any;
    presentLoadingDefault() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
  
        this.loading.present();
  
           
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
