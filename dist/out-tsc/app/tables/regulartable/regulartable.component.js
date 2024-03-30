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
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from 'app/shared/service/shared.service';
import { AirtableService } from 'environments/airtable/airtable.service';
import { AuthserviceService } from 'environments/airtable/authservice.service';
var RegularTableComponent = /** @class */ (function () {
    function RegularTableComponent(airtableService, router, authService, sharedService, translate) {
        this.airtableService = airtableService;
        this.router = router;
        this.authService = authService;
        this.sharedService = sharedService;
        this.translate = translate;
        this.dataTable = { headerRow: [], dataRows: [] };
        this.translate.setDefaultLang("en");
    }
    // Create a function to convert USERS array to DataTable
    RegularTableComponent.prototype.convertToDataTable = function (users) {
        // Extract header row from the first user object (assuming all objects have the same structure)
        var headerRow = Object.keys(users[0]);
        // Extract data rows
        var dataRows = users.map(function (user) {
            return Object.values(user).map(function (value) {
                return (value !== null && value !== undefined && value !== '')
                    ? value.toString().replace(/[\r\n]+/g, '\n')
                    : '\n';
            });
        });
        return { headerRow: headerRow, dataRows: dataRows };
    };
    RegularTableComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.authService.checkConnection()) {
            this.sharedService.filterRating$.subscribe(function (rating) {
                _this.filterByRating(rating);
            });
            this.sharedService.filterCategory$.subscribe(function (category) {
                _this.filterByCategory(category);
            });
            this.airtableService.getRecords().then(function (records) {
                if (records && records.length > 0) {
                    _this.dataTable = _this.convertToDataTable(records);
                    // Additional logic that needs to happen after data fetching and initialization
                }
                else {
                    console.error('No records found.');
                }
            }).catch(function (error) {
                console.error('Error fetching records:', error);
            });
        }
        else {
            this.router.navigate(['/pages/lock']);
        }
    };
    RegularTableComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.initDataTable();
        });
    };
    RegularTableComponent.prototype.initDataTable = function () {
        var _this = this;
        // Wrap the initialization logic in a Promise
        return new Promise(function (resolve) {
            var checkCondition = function () {
                if (_this.dataTable.dataRows.length > 0) {
                    // If the condition is met, proceed with DataTable initialization
                    _this.dtInstance = $('#datatable').DataTable({
                        "pagingType": "full_numbers",
                        "lengthMenu": [
                            [10, 25, 50, -1],
                            [10, 25, 50, "All"]
                        ],
                        "order": [[_this.dataTable.headerRow.indexOf('date'), 'desc']],
                        responsive: true,
                        language: {
                            search: "_INPUT_",
                            searchPlaceholder: "Search records",
                        },
                        initComplete: function () {
                            var api = this.api();
                            // Create a new row below the header row for filter inputs
                            var filterRow = $(api.table().header()).closest('thead')[0].insertRow(-1);
                            // Create an input element for each column and append it to the new row
                            api.columns().every(function (index) {
                                var column = this;
                                var cell = filterRow.insertCell(-1);
                                $(cell).addClass('header-filter-cell');
                                if (column.header().textContent === 'rating' || column.header().textContent === 'category' ||
                                    column.header().textContent === 'note' || column.header().textContent === 'catégorie' ||
                                    column.header().textContent === 'kategorie' || column.header().textContent === 'bewertung') {
                                    var select_1 = document.createElement('select');
                                    select_1.id = column.header().textContent.toLowerCase();
                                    var values = Array.from(new Set(api.column(index).data().toArray())).sort();
                                    // Add an empty option for no filter
                                    var option = document.createElement('option');
                                    option.text = 'All';
                                    option.value = '';
                                    select_1.add(option);
                                    // Add options for each unique value in the column
                                    values.forEach(function (value) {
                                        var option = document.createElement('option');
                                        option.text = value; // Explicitly cast value to string
                                        option.value = value; // Explicitly cast value to string
                                        select_1.add(option);
                                    });
                                    $(select_1).appendTo($(cell))
                                        .on('change', function () {
                                        var val = $.fn.dataTable.util.escapeRegex($(this).val());
                                        column.search(val ? "^".concat(val, "$") : '', true, false).draw();
                                    })
                                        .css('width', '100%');
                                }
                                else {
                                    var input = document.createElement("input");
                                    $(input).appendTo($(cell))
                                        .on('keyup change', function () {
                                        column.search($(this).val()).draw();
                                    }).attr('placeholder', api.column(index).header().textContent)
                                        .css('width', '100%');
                                }
                            });
                            // Add overflow style to make it scrollable
                            $('#datatable_wrapper').css('overflow', 'auto');
                            // Resolve the Promise after DataTable initialization
                            resolve();
                        }
                    });
                }
                else {
                    // If not, check again after a short delay
                    setTimeout(checkCondition, 100);
                }
            };
            // Start checking the condition
            checkCondition();
        });
    };
    RegularTableComponent.prototype.filterByRating = function (rating) {
        return __awaiter(this, void 0, void 0, function () {
            var api, ratingFilterSelect;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.waitForDataTableInit()];
                    case 1:
                        _a.sent(); // Ensure DataTable is initialized
                        api = this.dtInstance;
                        // Check if DataTable instance is defined
                        if (api) {
                            ratingFilterSelect = null;
                            if (this.translate.currentLang == null || this.translate.currentLang == 'en') {
                                ratingFilterSelect = $("#rating");
                            }
                            if (this.translate.currentLang == 'fr') {
                                ratingFilterSelect = $("#note");
                            }
                            if (this.translate.currentLang == 'de') {
                                ratingFilterSelect = $("#bewertung");
                            }
                            // Check if the filter select element is found
                            if (ratingFilterSelect.length > 0) {
                                // Set the value of the select element to the specified optionValue
                                ratingFilterSelect.val(rating.toString()).trigger('change');
                            }
                            else {
                                console.error('Rating filter select element not found.');
                            }
                        }
                        else {
                            console.error('DataTable instance not defined.');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    RegularTableComponent.prototype.filterByCategory = function (category) {
        return __awaiter(this, void 0, void 0, function () {
            var api, categoryFilterSelect;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.waitForDataTableInit()];
                    case 1:
                        _a.sent(); // Ensure DataTable is initialized
                        api = this.dtInstance;
                        // Check if DataTable instance is defined
                        if (api) {
                            if (this.translate.currentLang == null || this.translate.currentLang == 'en') {
                                categoryFilterSelect = $("#category");
                            }
                            if (this.translate.currentLang == 'fr') {
                                categoryFilterSelect = $("#cat\u00E9gorie");
                            }
                            if (this.translate.currentLang == 'de') {
                                categoryFilterSelect = $("#kategorie");
                            }
                            // Check if the filter select element is found
                            if (categoryFilterSelect.length > 0) {
                                // Set the value of the select element to the specified optionValue
                                categoryFilterSelect.val(category.toString()).trigger('change');
                            }
                            else {
                                console.error('Category filter select element not found.');
                            }
                        }
                        else {
                            console.error('DataTable instance not defined.');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    RegularTableComponent.prototype.waitForDataTableInit = function () {
        return new Promise(function (resolve) {
            var intervalId = setInterval(function () {
                var api = $.fn.DataTable.isDataTable('#datatable') ?
                    $('#datatable').DataTable() :
                    undefined;
                if (api) {
                    clearInterval(intervalId);
                    resolve();
                }
            }, 100);
        });
    };
    RegularTableComponent = __decorate([
        Component({
            selector: 'regular-table-cmp',
            templateUrl: 'regulartable.component.html'
        }),
        __metadata("design:paramtypes", [AirtableService,
            Router,
            AuthserviceService,
            SharedService,
            TranslateService])
    ], RegularTableComponent);
    return RegularTableComponent;
}());
export { RegularTableComponent };
//# sourceMappingURL=regulartable.component.js.map