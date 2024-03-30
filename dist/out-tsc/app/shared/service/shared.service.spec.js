import { TestBed } from '@angular/core/testing';
import { SharedService } from './shared.service';
describe('SharedService', function () {
    var service;
    beforeEach(function () {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SharedService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=shared.service.spec.js.map