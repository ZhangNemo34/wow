import { AccountProvider } from './../../providers/account/account';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostviolationreportPage } from './postviolationreport';

@NgModule({
  declarations: [
    PostviolationreportPage,
  ],
  imports: [
    IonicPageModule.forChild(PostviolationreportPage),
    ],
    providers: [
      AccountProvider
  ]
})
export class PostviolationreportPageModule {}
