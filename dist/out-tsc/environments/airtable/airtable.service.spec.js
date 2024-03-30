import { TestBed } from '@angular/core/testing';
import { AirtableService } from './airtable.service';
describe('AirtableService', function () {
    var service;
    beforeEach(function () {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AirtableService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=airtable.service.spec.js.map