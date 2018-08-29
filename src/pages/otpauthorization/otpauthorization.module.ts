import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OtpauthorizationPage } from './otpauthorization';
import { RegisterProvider } from '../../providers/register/register';

@NgModule({
    declarations: [
        OtpauthorizationPage,
    ],
    imports: [
        IonicPageModule.forChild(OtpauthorizationPage),
    ],
    providers: [
        RegisterProvider
    ]
})
export class OtpauthorizationPageModule { }
