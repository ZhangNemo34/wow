import { AccountProvider } from './../../providers/account/account';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserlistPage } from './userlist';

@NgModule({
    declarations: [
        UserlistPage,
    ],
    imports: [
        IonicPageModule.forChild(UserlistPage),
    ],
    providers: [
        AccountProvider
    ]
})
export class UserlistPageModule { }
