import { Component, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

import { ActivatedRoute } from '@angular/router';

export interface Comments {
  //  commentByUserId: number;
    commentId: any;
    commentContent: any;
    commentInPostId: any;
    commentTimeStamp: any;
  }

@Component({
  selector: 'app-showcomments',
  templateUrl: './showcomments.component.html',
  styleUrls: ['./showcomments.component.css']
})
export class ShowCommentsComponent {
  public commentsCollection: AngularFirestoreCollection<Comments>;
  comments: Observable<Comments[]>;
  constructor(public afs: AngularFirestore, private route:ActivatedRoute) {
    this.commentsCollection = afs.collection<Comments>('comments', comment => comment.where('commentInPostId', '==', this.route.snapshot.paramMap.get('id')));
    this.comments = this.commentsCollection.valueChanges();
  }
}

