import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmailforgotPage } from './emailforgot';
import { RegisterProvider } from '../../providers/register/register';

@NgModule({
  declarations: [
    EmailforgotPage,
  ],
  imports: [
    IonicPageModule.forChild(EmailforgotPage),
  ],
  providers: [
    RegisterProvider
  ]
})
export class EmailforgotPageModule { }
