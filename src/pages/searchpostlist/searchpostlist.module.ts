import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchpostlistPage } from './searchpostlist';

@NgModule({
  declarations: [
    SearchpostlistPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchpostlistPage),
  ],
})
export class SearchpostlistPageModule {}
