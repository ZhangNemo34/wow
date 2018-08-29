import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmailforgotconfirmPage } from './emailforgotconfirm';
import { RegisterProvider } from '../../providers/register/register';

@NgModule({
  declarations: [
    EmailforgotconfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(EmailforgotconfirmPage),
  ],
  providers: [
    RegisterProvider
  ]
})
export class EmailforgotconfirmPageModule { }
