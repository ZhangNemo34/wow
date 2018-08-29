import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewaddPage } from './newadd';
import { AdvertiseProvider } from '../../providers/advertise/advertise';
import { CategoryProvider } from '../../providers/category/category';

@NgModule({
    declarations: [
        NewaddPage,
    ],
    imports: [
        IonicPageModule.forChild(NewaddPage),
    ],
    providers: [
        AdvertiseProvider,
        CategoryProvider
    ]
})
export class NewaddPageModule { }
