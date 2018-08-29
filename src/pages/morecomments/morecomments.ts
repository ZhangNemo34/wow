import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyPostsProvider } from '../../providers/my-posts/my-posts';

/**
 * Generated class for the MorecommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-morecomments',
    templateUrl: 'morecomments.html',
})
export class MorecommentsPage {

    post: any = {};
    comments: Array<any> = [];

    postComment: boolean = false;
    reComment: boolean = false;
    commentId: number;
    comment: string;
    recomment: string;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        private myPost: MyPostsProvider) {
        this.post = this.navParams.get('post');
        this.comments = this.navParams.get('comments')
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MorecommentsPage');
    }

    reply() {
        if (this.postComment) {
            this.myPost.reply(this.post.id, this.comment).then(() => this.navCtrl.pop());
        } else {
            this.myPost.reReply(this.commentId, this.recomment).then(() => this.navCtrl.pop());
        }
    }

    likePost() {
        this.myPost.setLike(this.post.id, 0).then(() => this.navCtrl.pop());
    }

    likeComment(id) {
        this.myPost.likeReply(id, 0).then(() => this.navCtrl.pop());
    }

    letsReply(type, id) {
        this.postComment = type == 1;
        this.reComment = type == 2;
        this.commentId = this.reComment ? id : undefined;
    }

}
