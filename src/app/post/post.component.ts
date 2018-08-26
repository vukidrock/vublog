import { Component, OnInit, Input } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, FirestoreSettingsToken } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

import { ActivatedRoute } from '@angular/router';

// import { FormsModule } from '@angular/forms';

// import { AddCommentService } from '../addcomment.service';


export interface Post { 
  postID: number;
  postAuthor: string;
  postTitle: string;
  postContent: string;
  postTime: any;
}

export interface AddComment {
  commentByUserId: number;
  commentId: string;
  commentContent: string;
  commentInPostId: number;
}


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  // Doc danh cho link truc tiep den item, Collection gianh cho nhom item

  public itemsCollection: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;
  public postTime: any;
  constructor(public afs: AngularFirestore, private route:ActivatedRoute) {

    this.itemsCollection = afs.collection<Post>('posts/', postID => postID.where('postId', '==', this.route.snapshot.paramMap.get('id')));
    this.posts = this.itemsCollection.valueChanges();
    // console.log(this.posts.postTime);
  }

}