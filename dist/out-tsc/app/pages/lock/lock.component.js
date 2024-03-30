var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from 'app/app.component';
import { AuthserviceService } from 'environments/airtable/authservice.service';
var LockComponent = /** @class */ (function () {
    function LockComponent(element, authService, router, translate, root) {
        this.element = element;
        this.authService = authService;
        this.router = router;
        this.translate = translate;
        this.root = root;
        this.test = new Date();
        this.username = '';
        this.password = '';
        this.loading = false;
        this.sidebarVisible = false;
        this.translate.setDefaultLang("en");
    }
    LockComponent.prototype.checkFullPageBackgroundImage = function () {
        var $page = $('.full-page');
        var image_src = $page.data('image');
        if (image_src !== undefined) {
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>';
            $page.append(image_container);
        }
    };
    ;
    LockComponent.prototype.ngOnInit = function () {
        this.authService.disconnect();
        this.checkFullPageBackgroundImage();
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('lock-page');
        var navbar = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        setTimeout(function () {
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700);
    };
    LockComponent.prototype.ngOnDestroy = function () {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('lock-page');
    };
    LockComponent.prototype.sidebarToggle = function () {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible == false) {
            setTimeout(function () {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        }
        else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    };
    LockComponent.prototype.signIn = function () {
        var _this = this;
        this.loading = true;
        this.authService.signIn(this.username, this.password).subscribe(function (authenticated) {
            if (authenticated) {
                // Successfully authenticated, navigate to the dashboard or perform other actions
                _this.router.navigate(['/dashboard']);
                _this.showNotification("top", "center", "success", "Authentification done");
            }
            else {
                // Authentication failed, show an error message or take appropriate action
                _this.showNotification("top", "center", "warning", "Wrong combinaison. Try Again");
            }
            _this.loading = false;
        });
    };
    LockComponent.prototype.showNotification = function (from, align, type, message) {
        $.notify({
            icon: "ti-gift",
            message: message
        }, {
            type: type,
            timer: 1,
            placement: {
                from: from,
                align: align
            },
            template: '<div data-notify="container" class="col-11 col-md-4 alert alert-{0} alert-with-icon" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss"><i class="nc-icon nc-simple-remove"></i></button><span data-notify="icon" class="nc-icon nc-bell-55"></span> <span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>'
        });
    };
    LockComponent.prototype.switchLanguage = function (language) {
        this.selectedLanguage = language;
        this.root.switchLanguage(language);
    };
    LockComponent = __decorate([
        Component({
            selector: 'lock-cmp',
            templateUrl: './lock.component.html'
        }),
        __metadata("design:paramtypes", [ElementRef,
            AuthserviceService,
            Router,
            TranslateService,
            AppComponent])
    ], LockComponent);
    return LockComponent;
}());
export { LockComponent };
//# sourceMappingURL=lock.component.js.map