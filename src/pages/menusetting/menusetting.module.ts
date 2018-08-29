import { AccountProvider } from './../../providers/account/account';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenusettingPage } from './menusetting';

@NgModule({
    declarations: [
        MenusettingPage,
    ],
    imports: [
        IonicPageModule.forChild(MenusettingPage),
    ],
    providers: [
        AccountProvider
    ]
})
export class MenusettingPageModule { }
