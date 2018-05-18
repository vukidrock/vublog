import { TestBed, inject } from '@angular/core/testing';

import { AddcommentService } from './addcomment.service';

describe('AddcommentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddcommentService]
    });
  });

  it('should be created', inject([AddcommentService], (service: AddcommentService) => {
    expect(service).toBeTruthy();
  }));
});
