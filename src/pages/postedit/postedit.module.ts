import { CategoryProvider } from './../../providers/category/category';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PosteditPage } from './postedit';
import { MyPostsProvider } from '../../providers/my-posts/my-posts';

@NgModule({
    declarations: [
        PosteditPage,
    ],
    imports: [
        IonicPageModule.forChild(PosteditPage),
    ],
    providers: [
        MyPostsProvider,
        CategoryProvider
    ]
})
export class PosteditPageModule { }
