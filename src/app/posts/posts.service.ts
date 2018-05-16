import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Posts } from './posts';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class PostsService {

  /** GET heroes from the server */
    public itemsCollection: AngularFirestoreCollection<Posts>;
    items: Observable<Posts[]>;
    constructor(public afs: AngularFirestore) {
      this.itemsCollection = afs.collection<Posts>('posts');
      this.items = this.itemsCollection.valueChanges();

}

}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/