import { MyPostsProvider } from './../../providers/my-posts/my-posts';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MorecommentsPage } from './morecomments';

@NgModule({
    declarations: [
        MorecommentsPage,
    ],
    imports: [
        IonicPageModule.forChild(MorecommentsPage),
    ],
    providers: [
        MyPostsProvider
    ]
})
export class MorecommentsPageModule { }
