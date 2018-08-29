import { CategoryProvider } from './../../providers/category/category';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectcatcityPage } from './selectcatcity';

@NgModule({
    declarations: [
        SelectcatcityPage,
    ],
    imports: [
        IonicPageModule.forChild(SelectcatcityPage),
    ],
    providers: [
        CategoryProvider
    ]
})
export class SelectcatcityPageModule { }
