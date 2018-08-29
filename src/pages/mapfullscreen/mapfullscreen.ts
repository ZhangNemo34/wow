import { Component, ViewChild, ElementRef } from '@angular/core'

import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MapfullscreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

  declare var google;

@IonicPage()
@Component({
  selector: 'page-mapfullscreen',
  templateUrl: 'mapfullscreen.html',
})
export class MapfullscreenPage {

@ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  	this.loadMap();
    console.log('ionViewDidLoad MapfullscreenPage');
  }

  loadMap(){
 
      let latLng = new google.maps.LatLng(33.2285185, 131.1887945);

      let mapOptions = {
        center: latLng,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true
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

       google.maps.event.addListener(marker, 'click', (function(marker) {
        return function() {
          infowindow.setContent(content);
          infowindow.open(this.map, marker);
        }
      })(marker));
  }

}
