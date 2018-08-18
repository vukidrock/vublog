import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { UsersComponent } from './users/users.component';
import { CommentsComponent } from './comments/comments.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AddPostComponent } from './addpost/addpost.component';

const routes: Routes = [
  { path: 'posts', component: PostsComponent },
  { path: 'post/:id', component: PostComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'addpost', component: AddPostComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})

export class AppRoutingModule { }
