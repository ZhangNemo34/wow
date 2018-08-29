// import { Component } from '@angular/core';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImageViewerController } from 'ionic-img-viewer';
import { PosteditPage } from '../postedit/postedit';
import { AlertController } from 'ionic-angular';
import { PostviolationreportPage } from '../postviolationreport/postviolationreport';
import { PostdetailscommentsPage } from '../postdetailscomments/postdetailscomments';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

/**
 * Generated class for the SelectmapcategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@IonicPage()
@Component({
  selector: 'page-selectmapcategory',
  templateUrl: 'selectmapcategory.html',
})
export class SelectmapcategoryPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  public marker: any;

  zoomControl: boolean;
  mapTypeControl: boolean;
  scaleControl: boolean;
  streetViewControl: boolean;
  rotateControl: boolean;
  fullscreenControl: boolean;
  postId : any;

  hideMe: boolean = false;

  constructor(public navCtrl: NavController, private geolocation: Geolocation,
    public navParams: NavParams, public imageViewerCtrl: ImageViewerController,
    private alertCtrl: AlertController, public launchNavigator: LaunchNavigator) {
  }

  ionViewDidLoad() {
    this.loadMap();
    console.log('ionViewDidLoad SelectmapcategoryPage');
  }

  forGeoLocation() {
    debugger
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp)
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
    this.navCtrl.push(PostviolationreportPage)
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

  MorePostComments() {
    this.navCtrl.push(PostdetailscommentsPage);
  }

  SelectCat() {
    this.hideMe = true;
  }

  BackCat() {
    this.hideMe = false;
  }

  launchNavigate() {
    this.launchNavigator.navigate([33.2285185, 131.1887945]);
  }
}
