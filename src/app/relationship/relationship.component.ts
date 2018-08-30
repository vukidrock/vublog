import { Component, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

import { combineLatest } from 'rxjs/observable/combineLatest';


export interface Relationship {
  user1Id: any;
  user2Id: any;
  createAt: any;
}

export interface Users {
  uid?: any;
  photoURL: any;

}

@Component({
  selector: 'app-relationship',
  templateUrl: './relationship.component.html',
  styleUrls: ['./relationship.component.css']
})
export class RelationshipComponent implements OnInit {

  private relationshipCollection: AngularFirestoreCollection<Relationship>;
  private usersCollection: AngularFirestoreCollection<Users>;

  users: Observable<Users[]>;
  relationship: Observable<Relationship[]>;
  public userid: any;


  constructor(private afs:AngularFirestore, private route: ActivatedRoute, private router: Router, private auth: AngularFireAuth) {
    this.auth.user.subscribe(user => {
      if (user) {
        this.userid = user.uid;
        this.relationshipCollection = afs.collection<Relationship>('relationship', relationshipRef => relationshipRef.where('user1Id', '==', this.userid));
        this.relationship = this.relationshipCollection.snapshotChanges().map(changes => {
          return changes.map (a => {
            const data = a.payload.doc.data() as Relationship;
            const user2 = data.user2Id;
            return afs.collection<Users>('users').doc(user2).snapshotChanges().take(1).map(actions => {
              return actions.payload.data();
            }).map(user2 => {
              return { photoURL: (user2 as any).photoURL, displayName: (user2 as any).displayName, ...data };
            })
          }

          )
        }).flatMap(comments => Observable.combineLatest(comments));
      }
    })
   }

  ngOnInit() {
  }

}
