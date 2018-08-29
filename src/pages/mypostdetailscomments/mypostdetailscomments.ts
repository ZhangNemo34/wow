import { MorecommentsPage } from './../morecomments/morecomments';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImageViewerController } from 'ionic-img-viewer';
import { PosteditPage } from '../postedit/postedit';
import { AlertController } from 'ionic-angular';
import { PostviolationreportPage } from '../postviolationreport/postviolationreport';
import { PostdetailscommentsPage } from '../postdetailscomments/postdetailscomments';
import { MyPostsProvider } from '../../providers/my-posts/my-posts';

/**
 * Generated class for the MypostdetailscommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


declare var google;

@IonicPage()
@Component({
    selector: 'page-mypostdetailscomments',
    templateUrl: 'mypostdetailscomments.html',
})
export class MypostdetailscommentsPage {

    @ViewChild('map') mapElement: ElementRef;
    map: any;

    hideMe: boolean = false;
    postData: any = {};
    comments: Array<any> = [];
    commentsLimit: Array<any> = [];

    postComment: boolean = false;
    reComment: boolean = false;
    commentId: number;
    comment: string;
    recomment: string;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public imageViewerCtrl: ImageViewerController, private alertCtrl: AlertController,
        private myPost: MyPostsProvider
    ) {

    }

    ionViewDidLoad() {

        console.log(this.navParams.get('lati'));
        this.loadMap(this.navParams.get('lati'), this.navParams.get('long'));
        console.log('ionViewDidLoad MypostdetailscommentsPage');
    }

    ionViewWillEnter() {
        this.myPost.getDetail(this.navParams.get('id')).then(res => {
            this.postData = res['post'];
            if (!this.postData.user_icon || this.postData.user_icon == '') {
                this.postData.user_icon = 'assets/imgs/userse.png';
            }
            this.comments = res['comments'];
            this.commentsLimit = Object.assign([], this.comments);
        });
        this.postComment = false;
        this.reComment = false;
        this.commentId = undefined;
    }

    loadMap(lat, long) {

        let latLng = new google.maps.LatLng(lat, long);

        let mapOptions = {
            center: latLng,
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false
        }

        var infowindow = new google.maps.InfoWindow();
        var content = "<div ><img src='assets/imgs/circle2.png'></div>";

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



    GotoViolationReport() {
        var post = this.postData;
        this.navCtrl.push(PostviolationreportPage, { post })
    }

    function(success) {
        console.log(success);
    }

    goback() {
        this.navCtrl.pop();
    }

    DeletePost() {
        var post = this.postData
        this.navCtrl.push(PosteditPage, { post });
    }

    reply() {
        if (this.postComment) {
            this.myPost.reply(this.postData.id, this.comment).then(() => this.ionViewWillEnter());
        } else {
            this.myPost.reReply(this.commentId, this.recomment).then(() => this.ionViewWillEnter());
        }
    }

    MorePostComments() {
        var post = this.postData
        this.navCtrl.push(MorecommentsPage, { post, comments: this.comments });
    }

    likePost() {
        this.myPost.setLike(this.postData.id, 0).then(() => this.ionViewWillEnter());
    }

    likeComment(id) {
        this.myPost.likeReply(id, 0).then(() => this.ionViewWillEnter());
    }

    letsReply(type, id) {
        this.postComment = type == 1;
        this.reComment = type == 2;
        this.commentId = this.reComment ? id : undefined;
    }

    SelectCat() {
        this.hideMe = true;
    }

    BackCat() {
        this.hideMe = false;
    }

}
