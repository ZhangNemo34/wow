import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MypostdetailscommentsPage } from '../mypostdetailscomments/mypostdetailscomments';
import { MyPostsProvider } from '../../providers/my-posts/my-posts';

/**
 * Generated class for the FavoritePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-favorite',
    templateUrl: 'favorite.html',
})
export class FavoritePage {

    hideMe: boolean = false;
    imageurl : string[] = [
        "assets/imgs/tilesicons/computer.png",
        "assets/imgs/tilesicons/persons.png",
        "assets/imgs/tilesicons/sound.png",
        "assets/imgs/tilesicons/book.png",
        "assets/imgs/tilesicons/video.png",
        "assets/imgs/tilesicons/game.png",
        "assets/imgs/tilesicons/congs.png",
        "assets/imgs/tilesicons/family.png",
        "assets/imgs/tilesicons/people.png",
        "assets/imgs/tilesicons/eat.png",
        "assets/imgs/tilesicons/drop.png",
        "assets/imgs/tilesicons/tshirt.png",
        "assets/imgs/tilesicons/hair.png",
        "assets/imgs/tilesicons/gas.png",
        "assets/imgs/tilesicons/car.png"
    ];

    pet: string = "kittens";
    posts: Array<any> = [];
    categories : Array<any> = [];
    postsbycat : Array<any> = [];
    currentCatId : number = 1;
    currentCatName : string = '';

    constructor(public navCtrl: NavController, public navParams: NavParams,
        private myPost: MyPostsProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad FavoritePage');
    }

    ionViewWillEnter() {
        this.myPost.getFavourite().then(res => this.posts = res['post_list']);
        this.myPost.getFavouriteCat().then(res=>{
            this.categories=res['category_list'];
        });
        
    }

    GotoSelectCate(postData) {
        this.navCtrl.push(MypostdetailscommentsPage,postData);
    }
    BackCat() {
        this.hideMe = false;
    }

    SelectCat(catid, catname) {
        this.currentCatId = catid;
        this.currentCatName = catname;
        this.myPost.getFavouritePostsByCat(catid).then(res=>{
            this.postsbycat = res['post_list'];
        });
        this.hideMe = true;
    }

}
