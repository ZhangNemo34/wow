import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomePage } from './welcome';
import { WelcomeProvider } from "./welcome.data.service";
import { LoginProvider } from '../../providers/login/login';

@NgModule({
  declarations: [
    WelcomePage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomePage),
  ],
  providers: [WelcomeProvider, LoginProvider]
})
export class WelcomePageModule {
}
