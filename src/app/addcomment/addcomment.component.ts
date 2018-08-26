import { Component, OnInit, Input } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, FirestoreSettingsToken } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { AuthService } from '../core/auth.service';


//import { AddCommentService } from '../addcomment.service';



export interface AddComment {
  usercommentId: any;
  commentTime: any;
  commentContent: any;
  commentInPostId: any;
}

export interface User {
  uid?: any;
}


@Component({
  selector: 'app-addcomment',
  templateUrl: './addcomment.component.html',
  styleUrls: ['./addcomment.component.css']
})


export class AddCommentComponent implements OnInit {
  

  public usercommentId: any;
  public userid: any;

  private commentsCollection: AngularFirestoreCollection<AddComment>;
  comment: Observable<AddComment[]>;
  user: Observable<User[]>;
  constructor(private afs:AngularFirestore, private route:ActivatedRoute, private router: Router, private auth: AuthService) {
    this.commentsCollection = afs.collection<AddComment>('comments');
    this.comment = this.commentsCollection.valueChanges();
  }
  addNewComment( commentContent: string ) {
    var commentInPostId = this.route.snapshot.paramMap.get('id');
    const commentTime = Date.now();
    this.auth.user.subscribe(user => {
      if (user) {
        this.userid = user.uid;
        var usercommentId = this.userid;
        const comment: AddComment = { usercommentId, commentContent, commentTime, commentInPostId };
        this.commentsCollection.add(comment)
        .then(commentRef => {commentRef.set({ commentId: commentRef.id, commentContent, usercommentId, commentInPostId, commentTime })})
        return this.router.navigate([`/post/${commentInPostId}`]);
      }

  });
    console.log('ok')

    void(0);
  }

  addReplyComment(  ) {
     
  }

  ngOnInit() {
  }
}