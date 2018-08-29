import { WelcomePage } from './../welcome/welcome';
import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { TilesPage } from '../tiles/tiles';
import { CameraPage } from '../camera/camera';
import { FavoritePage } from '../favorite/favorite';
import { SettingPage } from '../setting/setting';
import { Storage } from '@ionic/storage';
import {  NavController } from 'ionic-angular';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    userChecked = false;
    userNotChecked = false;
    tab1Root = HomePage;
    private tab2Root;
    private tab3Root; 
    private tab4Root;
    private tab5Root;
    

    constructor(storage: Storage,public navCtrl: NavController) {
        storage.get('sign_id').then(d => {
            
            if (d) {
                this.userChecked = true;
                this.userNotChecked = false;            

                this.tab2Root = TilesPage;
                this.tab3Root = CameraPage;
                this.tab4Root = FavoritePage;
                this.tab5Root = SettingPage;
            } else {
                this.userNotChecked = true;
                this.userChecked = false;
            }

            console.log("this.userChecked == "+this.userChecked)
        }).catch(() => {
            this.userNotChecked = true;
            this.userChecked = false;
        })
    }
    public  openTab1(){        
        if(!this.userChecked){
            alert("You can use this feature only you logged in.")                               
            return;            
        }else{
            this.tab2Root = TilesPage;
        }
        
    }
    public  openTab2(){        
        if(!this.userChecked){
            alert("You can use this feature only you logged in.")            
            
            this.navCtrl.setRoot(TabsPage, {tabIndex: 0});
            return;        
        }
        
    }
    public  openTab3(){        
        if(!this.userChecked){
            alert("You can use this feature only you logged in.")                        
            return;            
        }else{
            this.tab4Root = FavoritePage;
        }
        
    }
    public  openTab4(){        
        if(!this.userChecked){
            alert("You can use this feature only you logged in.")                        
            return;            
        }else{
            this.tab5Root = SettingPage;
        }
        
    }
}
