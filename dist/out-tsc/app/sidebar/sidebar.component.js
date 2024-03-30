var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { AuthserviceService } from 'environments/airtable/authservice.service';
//Menu Items
export var ROUTES = [{
        path: '/dashboard',
        title: 'Your Dashboard',
        type: 'link',
        icontype: 'nc-icon nc-bank',
    }, {
        path: '/advanced',
        title: 'Advanced',
        type: 'link',
        icontype: 'nc-icon nc-ruler-pencil',
    },
    {
        path: '/tables/all',
        title: 'All Details',
        type: 'link',
        collapse: 'tables',
        icontype: 'nc-icon nc-single-copy-04',
        children: [
            { path: 'all', title: 'Regular Tables', ab: 'RT' },
        ]
    }, {
        path: '/pages/lock',
        title: 'Logout',
        type: 'link',
        icontype: 'nc-icon nc-lock-circle-open',
    }
];
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(authService) {
        this.authService = authService;
        this.myName = this.authService.myName;
        this.myProfilePicture = this.authService.myProfilePicture;
        this.myShop = this.authService.myTable;
        this.myLogo = this.authService.myLogo;
        this.myQrCode = this.authService.myQrCode;
    }
    SidebarComponent.prototype.isNotMobileMenu = function () {
        if (window.outerWidth > 991) {
            return false;
        }
        return true;
    };
    SidebarComponent.prototype.ngOnInit = function () {
        this.menuItems = ROUTES.filter(function (menuItem) { return menuItem; });
    };
    SidebarComponent.prototype.ngAfterViewInit = function () {
    };
    SidebarComponent = __decorate([
        Component({
            selector: 'sidebar-cmp',
            templateUrl: 'sidebar.component.html',
        }),
        __metadata("design:paramtypes", [AuthserviceService])
    ], SidebarComponent);
    return SidebarComponent;
}());
export { SidebarComponent };
//# sourceMappingURL=sidebar.component.js.map