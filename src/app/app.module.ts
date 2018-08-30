import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import {HttpClientModule} from '@angular/common/http';

import { UsersComponent } from './users/users.component';
import { PostsComponent } from './posts/posts.component';
import { CommentsComponent } from './comments/comments.component';
import { PostComponent } from './post/post.component';
import { AppRoutingModule } from './app-routing.module';
import { AddCommentComponent } from './addcomment/addcomment.component';
import { ShowCommentsComponent } from './showcomments/showcomments.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AddPostComponent } from './addpost/addpost.component';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule } from '@angular/forms';
import { LMarkdownEditorModule } from "ngx-markdown-editor";
import { MarkdownModule } from "ngx-markdown";
import { RelationshipComponent } from './relationship/relationship.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    PostsComponent,
    CommentsComponent,
    PostComponent,
    AddCommentComponent,
    ShowCommentsComponent,
    UserLoginComponent,
    UserProfileComponent,
    AddPostComponent,
    RelationshipComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    FormsModule,
    NgxEditorModule,
    LMarkdownEditorModule,
    MarkdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
