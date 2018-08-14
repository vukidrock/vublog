import { Component, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, observable } from 'rxjs';

import { ActivatedRoute } from '@angular/router';

import { combineLatest } from 'rxjs/observable/combineLatest';
// import { map } from 'rxjs/operators/map';
import 'rxjs/add/operator/map';


export interface Comments {
  commentByUserID: number;
  commentId: any;
  commentContent: any;
  commentInPostId: any;
  commentTimeStamp: any;
}
export interface Users {
  displayName: any;
  photoURL: string;
}  

@Component({
  selector: 'app-showcomments',
  templateUrl: './showcomments.component.html',
  styleUrls: ['./showcomments.component.css']
})
export class ShowCommentsComponent {
  public commentsCollection: AngularFirestoreCollection<Comments>;
  public usersCollection: AngularFirestoreCollection<Users>;
  comments: Observable<Comments[]>;
  users: Observable<Users>;
  constructor(public afs: AngularFirestore, private route:ActivatedRoute) {
    this.commentsCollection = afs.collection<Comments>('comments', commentref => commentref.where('commentInPostId', '==', this.route.snapshot.paramMap.get('id')));
    this.comments = this.commentsCollection.valueChanges();

  }

}



