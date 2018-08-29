import { MyPostsProvider } from './../../providers/my-posts/my-posts';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TilesPage } from './tiles';

@NgModule({
    declarations: [
        TilesPage,
    ],
    imports: [
        IonicPageModule.forChild(TilesPage),
    ],
    providers: [
        MyPostsProvider
    ]
})
export class TilesPageModule { }
