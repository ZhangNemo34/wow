import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavoritePage } from './favorite';
import { MyPostsProvider } from '../../providers/my-posts/my-posts';

@NgModule({
    declarations: [
        FavoritePage,
    ],
    imports: [
        IonicPageModule.forChild(FavoritePage),
    ],
    providers: [
        MyPostsProvider
    ]
})
export class FavoritePageModule { }
