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
import { Injectable } from '@angular/core';
import { AirtableService } from 'environments/airtable/airtable.service';
var DashboardService = /** @class */ (function () {
    function DashboardService(airtableService) {
        this.airtableService = airtableService;
        this.records = [];
        this.selectedLanguage = 'en';
    }
    DashboardService.prototype.getChartData = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.airtableService.getRecords()];
                    case 1:
                        _a.records = _b.sent();
                        return [2 /*return*/, this.generateChartData(ctx)];
                }
            });
        });
    };
    DashboardService.prototype.generateChartData = function (ctx) {
        var chartColor = "#FFFFFF";
        var gradientStroke = ctx.createLinearGradient(0, 20, 0, 300);
        gradientStroke.addColorStop(0, '#6bd098');
        gradientStroke.addColorStop(1, chartColor);
        var dataset = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [{
                    label: 'Number of Reviews',
                    borderColor: '#6bd098',
                    backgroundColor: gradientStroke,
                    pointRadius: 5,
                    pointHoverRadius: 10,
                    fill: true,
                    borderWidth: 3,
                    data: this.countDatesForEachMonth(),
                }]
        };
        return dataset;
    };
    //need to adjust it for the current year and to stop the line chart if the month did not start yet
    DashboardService.prototype.countDatesForEachMonth = function () {
        var currentYear = new Date().getFullYear();
        // Filter records for the current year and only include months that have started in the current year
        var filteredRecords = this.records
            .filter(function (user) {
            var userDate = new Date(user.date);
            return userDate.getFullYear() === currentYear;
        });
        // Count occurrences for each month using map and reduce
        return filteredRecords
            .map(function (user) { return new Date(user.date).getMonth(); })
            .reduce(function (monthCounts, month) {
            monthCounts[month]++;
            return monthCounts;
        }, new Array(12).fill(0));
    };
    DashboardService.prototype.calculateAverageStars = function () {
        var validRatings = this.records.map(function (user) { return user.rating; }).filter(function (stars) { return !isNaN(stars); });
        var totalStars = validRatings.reduce(function (sum, stars) { return sum + stars; }, 0);
        var recordsCount = validRatings.length;
        // Check if there are valid records to avoid division by zero
        return Number(recordsCount > 0 ? totalStars / recordsCount : 0).toFixed(2);
    };
    DashboardService.prototype.counterStarsRating = function (nbstars) {
        return this.records.map(function (user) { return user.rating; }).filter(function (rating) { return rating === nbstars; }).length;
    };
    DashboardService.prototype.numberOfComments = function () {
        var currentYear = new Date().getFullYear();
        // Use map to transform each record's date to the corresponding year
        var years = this.records.map(function (user) { return new Date(user.date).getFullYear(); });
        // Use reduce to count the occurrences of the current year
        var numberOfComments = years.reduce(function (count, year) {
            return count + (year === currentYear ? 1 : 0);
        }, 0);
        return numberOfComments;
    };
    DashboardService.prototype.categoryToImprove = function () {
        var categoryCounts = {};
        // Use map to transform each user record into its category
        var categories = this.records.map(function (user) {
            var lowercaseCategory = user.category.toLowerCase();
            return lowercaseCategory.charAt(0).toUpperCase() + lowercaseCategory.slice(1);
        }); // Convert to lowercase for case-insensitive comparison
        // Use reduce to count the occurrences for each category
        categories.reduce(function (accumulator, category) {
            accumulator[category] = (accumulator[category] || 0) + 1;
            return accumulator;
        }, categoryCounts);
        // Find the category with the highest count
        var categoryToImprove = Object.entries(categoryCounts)
            .reduce(function (max, entry) { return (entry[1] > max[1] ? entry : max); }, ['', -Infinity])[0];
        return categoryToImprove || null;
    };
    DashboardService = __decorate([
        Injectable({
            providedIn: 'root',
        }),
        __metadata("design:paramtypes", [AirtableService])
    ], DashboardService);
    return DashboardService;
}());
export { DashboardService };
//# sourceMappingURL=dashboard.service.js.map