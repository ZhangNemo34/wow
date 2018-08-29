import { RegisterProvider } from './../../providers/register/register';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EntermailaddressPage } from './entermailaddress';

@NgModule({
    declarations: [
        EntermailaddressPage,
    ],
    imports: [
        IonicPageModule.forChild(EntermailaddressPage),
    ],
    providers: [
        RegisterProvider
    ]
})
export class EntermailaddressPageModule { }
