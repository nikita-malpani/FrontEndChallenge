import { TestBed, inject } from '@angular/core/testing';

import { ApiService } from './app.service';

describe('ApiService', () => {
    // setup service
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ApiService]
        });
    });

    it('should be created', inject([ApiService], (service: ApiService) => {
        expect(service).toBeTruthy();
    }));

    it('should have get function',
        inject([ApiService], (service: ApiService) => {
            expect(service.getData).toBeTruthy();
        }));

});
