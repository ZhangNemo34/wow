import { AccountProvider } from './../../providers/account/account';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingPage } from './setting';

@NgModule({
    declarations: [
        SettingPage,
    ],
    imports: [
        IonicPageModule.forChild(SettingPage),
    ],
    providers: [
        AccountProvider
    ]
})
export class SettingPageModule { }
