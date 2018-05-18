import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';


import { ActivatedRoute } from '@angular/router';

export interface Comment {
  commentByUserId: number;
  commentId: number;
  commentContent: string;
  commentInPostId: number;
}


@Injectable()
export class AddCommentService {

  private commentPath = '/comments';

  constructor(private afs: AngularFirestore, private route:ActivatedRoute) { }

  // Create or update star
  addNewComment(commentByUserId, commentId, commentContent, commentInPostId) {
    // Star document data
    const comment: Comment = { commentByUserId, commentId, commentContent, commentInPostId };

    // Custom doc ID for relationship
    const commentPath = this.afs.collection(`comments/`,  ref => ref.where('postID', '==', this.route.snapshot.paramMap.get('id')));

    // Set the data, return the promise
    return this.afs.collection(this.commentPath).add(comment);
    
  }

}