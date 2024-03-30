var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
var ChartService = /** @class */ (function () {
    function ChartService() {
    }
    //---------------------------- NON essentials --------------------------------
    ChartService.prototype.mixLists = function (listA, listB) {
        var minLength = Math.min(listA.length, listB.length);
        var mixedList = Array.from({ length: minLength })
            .map(function (_, i) { return "".concat(listA[i], " / ").concat(listB[i]); })
            .reduce(function (acc, mixedValue) {
            acc.push(mixedValue);
            return acc;
        }, []);
        var remainingA = listA.slice(minLength).map(function (value) { return "".concat(value, " / -"); });
        var remainingB = listB.slice(minLength).map(function (value) { return "- / ".concat(value); });
        return mixedList.concat(remainingA, remainingB);
    };
    ChartService.prototype.getLabelForDataset = function (list) {
        return list[0] + ' to ' + list.pop();
    };
    // Helper function to get ISO week number
    ChartService.prototype.getISOWeek = function (date) {
        var dt = new Date(date);
        dt.setDate(dt.getDate() + 4 - (dt.getDay() || 7));
        var yearStart = new Date(dt.getFullYear(), 0, 1);
        return Math.ceil(((dt.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
    };
    ChartService.prototype.getLabelForChart = function (timeUnit, firstList, secondList) {
        return ['From ' + firstList[0] + ' to ' + firstList.pop() + ' | ' + 'From ' + secondList[0] + ' to ' + secondList.pop()];
    };
    ChartService.prototype.incrementDate = function (date, timeUnit) {
        switch (timeUnit) {
            case 'day':
                date.setDate(date.getDate() + 1);
                break;
            case 'week':
                date.setDate(date.getDate() + 7);
                break;
            case 'month':
                date.setMonth(date.getMonth() + 1);
                break;
            case 'year':
                date.setFullYear(date.getFullYear() + 1);
                break;
        }
    };
    ChartService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], ChartService);
    return ChartService;
}());
export { ChartService };
//# sourceMappingURL=chart.service.js.map