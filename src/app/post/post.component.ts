import { Component, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

import { ActivatedRoute } from '@angular/router';


export interface Post { 
  postID: number;
  postAuthor: string;
  postTitle: string;
  postContent: string; 
}




@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {


  public itemsCollection: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;
  constructor(public afs: AngularFirestore, private route:ActivatedRoute) {

    this.itemsCollection = afs.collection<Post>('posts/', postID => postID.where('postID', '==', this.route.snapshot.paramMap.get('id')));
    this.posts = this.itemsCollection.valueChanges();
  }
}
