import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListPage } from './list';
import { AdvertiseProvider } from '../../providers/advertise/advertise';

@NgModule({
    declarations: [
        ListPage,
    ],
    imports: [
        IonicPageModule.forChild(ListPage),
    ],
    providers: [
        AdvertiseProvider
    ]
})
export class ListPageModule { }
