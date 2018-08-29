import { MyPostsProvider } from './../../providers/my-posts/my-posts';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReplyCommentPage } from './replycomment';

@NgModule({
    declarations: [
        ReplyCommentPage,
    ],
    imports: [
        IonicPageModule.forChild(ReplyCommentPage),
    ],
    providers: [
        MyPostsProvider
    ]
})
export class ReplyCommentPageModule { }
