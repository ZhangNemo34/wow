import { AccountProvider } from './../../providers/account/account';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserdetailsPage } from './userdetails';
import { CategoryProvider } from '../../providers/category/category';

@NgModule({
    declarations: [
        UserdetailsPage,
    ],
    imports: [
        IonicPageModule.forChild(UserdetailsPage),
    ],
    providers: [
        CategoryProvider,
        AccountProvider
    ]
})
export class UserdetailsPageModule { }
