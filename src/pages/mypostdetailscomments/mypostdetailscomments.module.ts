import { MyPostsProvider } from './../../providers/my-posts/my-posts';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MypostdetailscommentsPage } from './mypostdetailscomments';

@NgModule({
    declarations: [
        MypostdetailscommentsPage,
    ],
    imports: [
        IonicPageModule.forChild(MypostdetailscommentsPage),
    ],
    providers: [
        MyPostsProvider
    ]
})
export class MypostdetailscommentsPageModule { }
