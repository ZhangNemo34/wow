import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
import { RegisterProvider } from '../../providers/register/register';

@NgModule({
    declarations: [
        RegisterPage,
    ],
    imports: [
        IonicPageModule.forChild(RegisterPage),
    ],
    providers: [
        RegisterProvider
    ]
})
export class RegisterPageModule { }
