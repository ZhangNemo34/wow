import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserconfirmPage } from './userconfirm';

@NgModule({
  declarations: [
    UserconfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(UserconfirmPage),
  ],
})
export class UserconfirmPageModule {}
