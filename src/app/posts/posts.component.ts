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
  public itemsCollection: AngularFirestoreCollection<Post>;
  items: Observable<Post[]>;
  constructor(public afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Post>('posts');
    this.items = this.itemsCollection.valueChanges();
  }
}
