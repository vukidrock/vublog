import { Component, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, observable } from 'rxjs';

import 'rxjs/Rx';

import { ActivatedRoute } from '@angular/router';

// import { take } from 'rxjs/operators';

// import { map } from 'rxjs/operators/map';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/mergeMap';

import { combineLatest } from 'rxjs/observable/combineLatest';



export interface Comments {
  commentByUserID: number;
  commentId: any;
  commentContent: any;
  commentInPostId: any;
  commentTimeStamp: any;
  usercommentId?: any;
}
export interface Users {
  displayName?: any;
  photoURL?: any;
  uid?: any;
}  

@Component({
  selector: 'app-showcomments',
  templateUrl: './showcomments.component.html',
  styleUrls: ['./showcomments.component.css']
})
export class ShowCommentsComponent {
  public commentsCollection: AngularFirestoreCollection<Comments>;
  public usersCollection: AngularFirestoreCollection<Users>;
  public photoURL?: any;
  public displayName?: any;

  comments: Observable<Comments[]>;
  users: Observable<Users[]>;
  constructor(public afs: AngularFirestore, private route:ActivatedRoute) {
    this.commentsCollection = afs.collection<Comments>('comments', commentref => commentref.where('commentInPostId', '==', this.route.snapshot.paramMap.get('id')));
    this.comments = this.commentsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Comments;
        const usercommentid = data.usercommentId;
        return afs.collection<Users>('users').doc(usercommentid).snapshotChanges().take(1).map(actions => {
          return actions.payload.data();
        }).map(user => {
          return {photoURL: user.photoURL, displayName: user.displayName, ...data};
        });
      })
    }).flatMap(comments => Observable.combineLatest(comments));
    // this.usersCollection = this.afs.collection<Users>('users');
    // this.users = this.usersCollection.snapshotChanges().map(
    //   changes => {
    //     return changes.map(
    //       a => {
    //         const data = a.payload.doc.data();
    //         const uid = a.payload.doc.id;
    //         return {uid, ... data};
    //       }
    //     );
    //   }
    // );
    // console.log('user' +  afs.collection('comments').doc('usercommentId').ref.get());
    // this.users = this.usersCollection.valueChanges();
  }

  

}



