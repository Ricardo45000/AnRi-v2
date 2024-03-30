import { TestBed } from '@angular/core/testing';
import { ChartService } from './chart.service';
describe('ChartService', function () {
    var service;
    beforeEach(function () {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ChartService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=chart.service.spec.js.map