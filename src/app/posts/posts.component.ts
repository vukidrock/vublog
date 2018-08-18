import { Component, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';



export interface Post { 
  postID: number;
  postAuthor: string;
  postTitle: string;
  postContent: string; 
}


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  public postsCollection: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;
  constructor(public afs: AngularFirestore) {
    this.postsCollection = afs.collection<Post>('posts');
    this.posts = this.postsCollection.valueChanges();
  }
  
}
