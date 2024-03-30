import { TestBed } from '@angular/core/testing';
import { DashboardService } from './dashboard.service';
describe('DashboardService', function () {
    var service;
    beforeEach(function () {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DashboardService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=dashboard.service.spec.js.map