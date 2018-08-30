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
import { User } from 'firebase';



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


export interface CommentsReply {
  commentReplyUserId?: any;
  commentReplyContent?: any;

}

@Component({
  selector: 'app-showcomments',
  templateUrl: './showcomments.component.html',
  styleUrls: ['./showcomments.component.css']
})

export class ShowCommentsComponent {
  public commentsCollection: AngularFirestoreCollection<Comments>;
  public usersCollection: AngularFirestoreCollection<Users>;
  commentreplycontent?: any;
  commentReplyToCommentId?: any;
  photoURL: any;


  comments: Observable<Comments[]>;
  users: Observable<Users[]>;
  commentsreply: Observable<CommentsReply[]>;
  

  constructor(public afs: AngularFirestore, private route:ActivatedRoute) {
    this.commentsCollection = afs.collection<Comments>('comments', commentref => commentref.where('commentInPostId', '==', this.route.snapshot.paramMap.get('id')).orderBy('commentId','desc'));
    this.comments = this.commentsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Comments;
        const usercommentid = data.usercommentId;
        console.log(data.commentId);
        const commentsreply = this.afs.collection<CommentsReply>('comments').doc(data.commentId).collection('commentReply', commentreplyref => commentreplyref.where('commentReplyToCommentId', '==', data.commentId));
        this.commentreplycontent = commentsreply.snapshotChanges().map(changes => {
          return changes.map (b => {
            const data2 = b.payload.doc.data() as CommentsReply;
            const usercommentreplyid = data2.commentReplyUserId;
            return afs.collection<Users>('users').doc(usercommentreplyid).snapshotChanges().take(1).map(actions => {
              return actions.payload.data();
            }).map(users => {

              return {photoURL: (users as any).photoURL, displayName: (users as any).displayName, ...data2};
            });
          })
        }).flatMap(commentreplycontent => Observable.combineLatest(commentreplycontent));
        // console.log(this.commentreplycontent.commentReplyTime);
        
        return afs.collection<Users>('users').doc(usercommentid).snapshotChanges().take(1).map(actions => {
          return actions.payload.data();
        }).map(user => {
          return {photoURL: (user as any).photoURL, displayName: (user as any).displayName, ...data};
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

  // public show:boolean = false;
  // public buttonName:any = 'Show';

  // ngOnInit () {  }


  
  // toggle() {
  //   this.show = !this.show;

  //   // CHANGE THE NAME OF THE BUTTON.
  //   if(this.show)  
  //     this.buttonName = "Hide";
  //   else
  //     this.buttonName = "Show";
  // }

  public showDiv2: boolean = true;
  public showreplytextarea: boolean = false;

}



