import { Component, OnInit, Input } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, FirestoreSettingsToken } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { AuthService } from '../core/auth.service';
import { create } from 'domain';


export interface AddPost {
  // postAuthor: any;
  postAuthorId: any;
  postContent: any;
  // postComment: any;
  // postId: any;
  // postLike: any;
  postTitle: any;
  postTime?: any;
}

export interface User {
  uid?: any;
}

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddPostComponent implements OnInit {

  public postAuthorId: any;
  public userid: any;

  private postsCollection: AngularFirestoreCollection<AddPost>;
  post: Observable<AddPost[]>;
  user: Observable<User[]>; 
  constructor(private afs:AngularFirestore, private route:ActivatedRoute, private router: Router, private auth: AuthService) {
    this.postsCollection = afs.collection<AddPost>('posts');
    this.post = this.postsCollection.valueChanges();
  }

  addNewPost (postContent: string, postTitle: string) {
    const postTime = Date.now();
    // const postId = this.afs.createId();
    this.auth.user.subscribe(user => {
      if (user) {
        this.userid = user.uid;
        var postAuthorId = this.userid;
        // console.log(postAuthorId);
        const post: AddPost = { postAuthorId, postContent, postTime, postTitle };
        this.postsCollection.add(post)
        .then(postRef => { postRef.set({postId: postRef.id, postAuthorId, postContent, postTime, postTitle })
        return this.router.navigate([`/post/${postRef.id}`]);
      });
      }
    });

    // console.log('post ok');
  }

  ngOnInit() {
  }

}
