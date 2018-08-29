import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdviewPage } from './adview';
import { AdvertiseProvider } from '../../providers/advertise/advertise';

@NgModule({
    declarations: [
        AdviewPage,
    ],
    imports: [
        IonicPageModule.forChild(AdviewPage),
    ],
    providers: [
        AdvertiseProvider
    ]
})
export class AdviewPageModule { }
