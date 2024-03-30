import { TestBed } from '@angular/core/testing';
import { AuthserviceService } from './authservice.service';
describe('AuthserviceService', function () {
    var service;
    beforeEach(function () {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AuthserviceService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=authservice.service.spec.js.map