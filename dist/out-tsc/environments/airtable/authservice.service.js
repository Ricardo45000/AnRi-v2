var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { environment } from 'environments/environment';
import bcrypt from 'bcryptjs';
var AuthserviceService = /** @class */ (function () {
    function AuthserviceService(http) {
        this.http = http;
        this.connected = false;
        this.tableName = 'users'; // Replace with your Airtable table name
        this.authUrl = "https://api.airtable.com/v0/".concat(environment.baseId);
        // Check localStorage for stored authentication state
        this.connected = localStorage.getItem('connected') === 'true';
        // Load other user data from localStorage
        this.loadUserData();
    }
    AuthserviceService.prototype.signIn = function (username, password) {
        var _this = this;
        this.id = username;
        var airtableEndpoint = "".concat(this.authUrl, "/").concat(this.tableName);
        var headers = {
            Authorization: "Bearer ".concat(environment.apiKey),
        };
        var params = {
            filterByFormula: "{username} = '".concat(username, "'"),
            maxRecords: 1,
            fields: ['Id', 'Username', 'Password', 'Name', 'Image', 'Table', 'QrCode', 'Logo'],
        };
        return this.http.get(airtableEndpoint, { params: params, headers: headers }).pipe(map(function (response) {
            var user = response.records[0];
            //console.log(this.hashPassword(password));
            if (user && _this.verifyPassword(password, user.fields.Password)) {
                _this.connected = true;
                _this.myTable = user.fields.Table;
                _this.myProfilePicture = user.fields.Image[0].url;
                _this.myQrCode = user.fields.QrCode;
                _this.myName = user.fields.Name;
                _this.myLogo = user.fields.Logo[0].url;
                // Save other user data to localStorage
                _this.saveUserData();
                return true;
            }
            else {
                _this.connected = false;
                return false;
            }
        }), catchError(function (error) {
            console.error('Error during sign-in:', error);
            return of(false);
        }));
    };
    AuthserviceService.prototype.checkConnection = function () {
        var _this = this;
        var airtableEndpoint = "".concat(this.authUrl, "/").concat(this.tableName);
        var headers = {
            Authorization: "Bearer ".concat(environment.apiKey),
        };
        var params = {
            filterByFormula: "{username} = '".concat(this.id, "'"),
            maxRecords: 1,
            fields: ['Id', 'Username', 'Password', 'Name', 'Image', 'Table', 'QrCode', 'Logo'],
        };
        this.http.get(airtableEndpoint, { params: params, headers: headers }).pipe(catchError(function (error) {
            console.error('Error fetching profile picture:', error);
            _this.connected = false;
            return of(false); // Assuming 'of' is imported from 'rxjs'
        }), map(function (response) {
            var _a, _b, _c, _d, _e, _f;
            var profilePictureUrl = ((_c = (_b = (_a = response.records[0]) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b.Image[0]) === null || _c === void 0 ? void 0 : _c.url) || null;
            var myLogo = ((_f = (_e = (_d = response.records[0]) === null || _d === void 0 ? void 0 : _d.fields) === null || _e === void 0 ? void 0 : _e.Logo[0]) === null || _f === void 0 ? void 0 : _f.url) || null;
            if (profilePictureUrl && myLogo) {
                localStorage.setItem('myProfilePicture', profilePictureUrl);
                _this.myProfilePicture = profilePictureUrl;
                localStorage.setItem('myLogo', myLogo);
                _this.myLogo = myLogo;
                _this.connected = true;
            }
            else {
                _this.connected = false;
            }
            return _this.connected;
        })).subscribe();
        return this.connected;
    };
    AuthserviceService.prototype.disconnect = function () {
        this.connected = false;
        localStorage.removeItem('connected');
        localStorage.removeItem('id');
        localStorage.removeItem('myTable');
        localStorage.removeItem('myProfilePicture');
        localStorage.removeItem('myName');
        localStorage.removeItem('qrcode');
        localStorage.removeItem('myLogo');
    };
    AuthserviceService.prototype.saveUserData = function () {
        localStorage.setItem('connected', 'true');
        localStorage.setItem('id', this.id);
        localStorage.setItem('qrcode', this.myQrCode);
        localStorage.setItem('myTable', this.myTable);
        localStorage.setItem('myProfilePicture', this.myProfilePicture);
        localStorage.setItem('myName', this.myName);
        localStorage.setItem('myLogo', this.myLogo);
    };
    AuthserviceService.prototype.loadUserData = function () {
        this.id = localStorage.getItem('id');
        this.myQrCode = localStorage.getItem('qrcode');
        this.myTable = localStorage.getItem('myTable');
        this.myProfilePicture = localStorage.getItem('myProfilePicture');
        this.myName = localStorage.getItem('myName');
        this.myLogo = localStorage.getItem('myLogo');
    };
    /**private hashPassword(password: string): string {
      const saltRounds = 10; // You can adjust the number of salt rounds based on your security requirements
      const salt = bcrypt.genSaltSync(saltRounds);
      return bcrypt.hashSync(password, salt);
    }**/
    // Function to verify the entered password against the stored hash
    AuthserviceService.prototype.verifyPassword = function (enteredPassword, storedHashedPassword) {
        return bcrypt.compareSync(enteredPassword, storedHashedPassword);
    };
    AuthserviceService = __decorate([
        Injectable({
            providedIn: 'root',
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], AuthserviceService);
    return AuthserviceService;
}());
export { AuthserviceService };
//# sourceMappingURL=authservice.service.js.map