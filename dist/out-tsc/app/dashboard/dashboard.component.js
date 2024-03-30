var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import Chart from 'chart.js';
import { DashboardService } from './service/dashboard.service';
import { AuthserviceService } from 'environments/airtable/authservice.service';
import { Router } from '@angular/router';
import { SharedService } from 'app/shared/service/shared.service';
import { RegularTableComponent } from 'app/tables/regulartable/regulartable.component';
import { TranslateService } from '@ngx-translate/core';
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(sharedService, dashboardService, authService, router, resolver, viewContainerRef, translate) {
        this.sharedService = sharedService;
        this.dashboardService = dashboardService;
        this.authService = authService;
        this.router = router;
        this.resolver = resolver;
        this.viewContainerRef = viewContainerRef;
        this.translate = translate;
        this.isLoading = false;
        this.translate.setDefaultLang("en");
    }
    DashboardComponent.prototype.ngOnInit = function () {
        if (this.authService.checkConnection()) {
            this.isLoading = true;
            this.initializeChart();
            this.loadData();
            this.initiateRegularTableComponent();
            this.isLoading = false;
        }
        else {
            this.router.navigate(['/pages/lock']);
        }
    };
    DashboardComponent.prototype.initiateRegularTableComponent = function () {
        // Create a factory for RegularTableComponent
        var factory = this.resolver.resolveComponentFactory(RegularTableComponent);
        // Create the component
        this.regularTableComponentRef = this.viewContainerRef.createComponent(factory);
        // Access the instance of the component and call its methods
        var regularTableComponentInstance = this.regularTableComponentRef.instance;
        regularTableComponentInstance.ngOnInit(); // Manually call ngOnInit
        // Example: Manually call a method of RegularTableComponent
        regularTableComponentInstance.filterByRating(5);
        // Hide the component discreetly
        this.regularTableComponentRef.location.nativeElement.style.display = 'none';
    };
    DashboardComponent.prototype.initializeChart = function () {
        this.canvas = document.getElementById("activeUsers");
        this.ctx = this.canvas.getContext("2d");
    };
    DashboardComponent.prototype.loadData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.dashboardService.getChartData(this.ctx)];
                    case 1:
                        _a.chartData = _b.sent();
                        this.createChart();
                        return [2 /*return*/];
                }
            });
        });
    };
    DashboardComponent.prototype.createChart = function () {
        new Chart(this.ctx, {
            type: 'line',
            data: this.chartData,
            options: {
                legend: {
                    display: true
                },
                tooltips: {
                    enabled: true,
                },
                scales: {
                    yAxes: [{
                            ticks: {
                                fontColor: "#9f9f9f",
                                beginAtZero: true,
                                maxTicksLimit: 10,
                            },
                            gridLines: {
                                drawBorder: false,
                                zeroLineColor: "transparent",
                                color: 'rgba(255,255,255,0.05)'
                            }
                        }],
                    dataset: [{
                            barPercentage: 1.6,
                            gridLines: {
                                drawBorder: true,
                                color: 'rgba(255,255,255,0.1)',
                                zeroLineColor: "transparent",
                                display: true,
                            },
                            ticks: {
                                padding: 20,
                                fontColor: "#9f9f9f"
                            }
                        }]
                },
            }
        });
    };
    DashboardComponent.prototype.calculateAverageStars = function () { return this.dashboardService.calculateAverageStars(); };
    DashboardComponent.prototype.counterStarsRating = function (nbstars) { return this.dashboardService.counterStarsRating(nbstars); };
    DashboardComponent.prototype.currentYear = function () { return new Date().getFullYear(); };
    DashboardComponent.prototype.numberOfComments = function () { return this.dashboardService.numberOfComments(); };
    DashboardComponent.prototype.filterRating = function (rating) {
        this.router.navigate(['/tables/all']);
        this.sharedService.sendFilterRating(rating);
    };
    DashboardComponent.prototype.filterCategory = function (category) {
        this.router.navigate(['/tables/all']);
        this.sharedService.sendFilterCategory(category);
    };
    DashboardComponent.prototype.categoryToImprove = function () {
        return this.dashboardService.categoryToImprove();
    };
    DashboardComponent = __decorate([
        Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.component.html'
        }),
        __metadata("design:paramtypes", [SharedService,
            DashboardService,
            AuthserviceService,
            Router,
            ComponentFactoryResolver,
            ViewContainerRef,
            TranslateService])
    ], DashboardComponent);
    return DashboardComponent;
}());
export { DashboardComponent };
//# sourceMappingURL=dashboard.component.js.map