import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PostsComponent } from './posts/posts.component';
import { UsersComponent } from './users/users.component';
import { CommentsComponent } from './comments/comments.component';

const routes: Routes = [
  { path: 'posts', component: PostsComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})

export class AppRoutingModule { }
