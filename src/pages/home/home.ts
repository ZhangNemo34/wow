// import { Component } from '@angular/core';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { SelectcategoryPage } from '../selectcategory/selectcategory';
import { SelectcatsliderPage } from '../selectcatslider/selectcatslider';
import { SelectmapcategoryPage } from '../selectmapcategory/selectmapcategory';
import { ImageViewerController } from 'ionic-img-viewer';
import { Geolocation } from '@ionic-native/geolocation';
import { AccountProvider } from '../../providers/account/account';
import {MypostdetailscommentsPage} from "../mypostdetailscomments/mypostdetailscomments";

import { ReplyCommentPage } from '../replycomment/replycomment';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

interface location {
    fileUrl: string;
    lat: number;
    long: number;
}

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage {

    @ViewChild('map') mapElement: ElementRef;
    map: any;
    public position: string;
    public marker: any;

    zoomControl: boolean
    mapTypeControl: boolean
    scaleControl: boolean
    streetViewControl: boolean
    rotateControl: boolean
    fullscreenControl: boolean


    locations: Array<location> = [];
    postAds: Array<any> = [];


    constructor(public navCtrl: NavController, private geolocation: Geolocation,
        public navParams: NavParams, public imageViewerCtrl: ImageViewerController,
        private launchNavigator: LaunchNavigator, private account: AccountProvider
    ) {

            


    }

    ionViewCanEnter() {
        this.account.getPostsMap().then(res => {
            res['post_list'].forEach(item => {
                this.locations.push({
                    fileUrl: item.file_name,
                    long: item.long,
                    lat: item.lati
                })
            });
        }).catch((err) => console.log(err));
        this.account.getAdPost()
            .then(res => {
                console.log("postADa=>", res['list']);
                this.postAds = res['list'];
                if (this.postAds.length == 0) {
                    return this.geolocation.getCurrentPosition();
                }
            })
            .catch((err) => this.geolocation.getCurrentPosition())
            .then(loc => {
                const { latitude, longitude } = loc['coords'];
                //return this.account.getPrePost(longitude, latitude);
                return this.account.getAdPost();
            }).then(res => {
                this.postAds = res['list']
            }).catch((err) => console.log(err));
    }

    ionViewDidLoad() {
        this.loadMap();
        console.log('ionViewDidLoad HomePage');


    }

    GoselectCategory(id) {
        this.navCtrl.push(SelectcategoryPage, {id1: id});
    }


    forGeoLocation() {
        this.geolocation.getCurrentPosition().then((resp) => {
            alert("Gps Start")
            console.log(resp)
            console.log(resp.coords.latitude)
            console.log(resp.coords.longitude)
            debugger
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

            console.log("Show Data", data)
            // data can be a set of coordinates, or an error (if an error occurred).
            // data.coords.latitude
            // data.coords.longitude
        });
    }

    loadMap() {



        var locations = this.locations;

        let mapOptions = {
            center: new google.maps.LatLng(43.770542, 11.254856),
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            streetViewControl: false,
            zoomControl: false,
            scaleControl: false,
            attributionControl: false,

        }

        // var infowindow = new google.maps.InfoWindow();
        // var content = "<div ><img src='assets/imgs/selectcat.png'></div>";


        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);



        let marker;

        for (let i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i].lat, locations[i].long),
                map: this.map,
                icon: 'assets/imgs/mapblue.png'
            });
            google.maps.event.addListener(marker, 'click', ((marker, i) => {
                return () => {
                    // infowindow.setContent(content);
                    if (!marker.firstClick) {
                        marker.firstClick = true;
                        marker.setIcon(locations[i].fileUrl)
                    } else {

                        this.GoSelectMapCat();

                        // infowindow.open(this.map, marker);
                    }
                }
            })(marker, i));

            // google.maps.event.addDomListener(content ,'click',(function(marker, i) {
            //       return function() {
            //       this.GoselectCategory()
            //     }
            //   })(marker, i));
        }
    }

    function(success) {
        console.log(success);
    }

    GoSelectMapCat() {
        this.navCtrl.push(SelectmapcategoryPage)
    }

    GoselectCatSlider(id) {
        this.navCtrl.push(SelectcatsliderPage, {ad_id: id})
    }

    launchNavigate() {
        this.launchNavigator.navigate('');
    }

}
