import { TestBed, inject } from '@angular/core/testing';

import { AddCommentService } from './addcomment.service';

describe('AddcommentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddCommentService]
    });
  });

  it('should be created', inject([AddCommentService], (service: AddCommentService) => {
    expect(service).toBeTruthy();
  }));
});
