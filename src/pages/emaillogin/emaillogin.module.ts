import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmailloginPage } from './emaillogin';
import { LoginProvider } from '../../providers/login/login';

@NgModule({
  declarations: [
    EmailloginPage,
  ],
  imports: [
    IonicPageModule.forChild(EmailloginPage),
  ],
  providers: [
    LoginProvider
  ]
})
export class EmailloginPageModule { }
