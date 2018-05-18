import { Component, OnInit, Input } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, FirestoreSettingsToken } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

import { ActivatedRoute } from '@angular/router';

import { FormsModule } from '@angular/forms';

//import { AddCommentService } from '../addcomment.service';


export interface AddComment {
//  commentByUserId: number;
  commentId: any;
  commentContent: any;
  commentInPostId: any;
}


@Component({
  selector: 'app-addcomment',
  templateUrl: './addcomment.component.html',
  styleUrls: ['./addcomment.component.css']
})

export class AddCommentComponent implements OnInit {

  private commentsCollection: AngularFirestoreCollection<AddComment>;
  comment: Observable<AddComment[]>;
  constructor(private afs:AngularFirestore, private route:ActivatedRoute) {
    this.commentsCollection = afs.collection<AddComment>('comments');
    this.comment = this.commentsCollection.valueChanges();
  }
  addNewComment( commentContent: string ) {
    var commentInPostId = this.route.snapshot.paramMap.get('id');
    const commentId = Date.now();
    const comment: AddComment = { commentContent, commentId, commentInPostId };
    this.commentsCollection.add(comment);
    console.log('ok')
  }

 ngOnInit() {}

}