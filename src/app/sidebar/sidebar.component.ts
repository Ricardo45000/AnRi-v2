import { Component } from '@angular/core';
import { AuthserviceService } from 'environments/airtable/authservice.service';

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    collapse?: string;
    icontype: string;
    children?: ChildrenItems[];
    action?: string;
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [{
        path: '/dashboard',
        title: 'Your Dashboard',
        type: 'link',
        icontype: 'nc-icon nc-bank',
        },
        {
            path: '/tables/all',
            title: 'All Details',
            type: 'link',
            collapse: 'tables',
            icontype: 'nc-icon nc-single-copy-04',
            children: [
                {path: 'all', title: 'Regular Tables', ab:'RT'},
        ]
        }
        ,{
            path: '/qrcode',
            title: 'your qr code',
            type: 'link',
            icontype: 'fa-solid fa-qrcode',
            action: 'openYourQrCodeModal',
        },{
            path: '/pages/lock',
            title: 'Logout',
            type: 'link',
            icontype: 'nc-icon nc-lock-circle-open',
        }
];

@Component({
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent {


    

    public menuItems: any[];
    public myName;
    public myProfilePicture;
    public myShop;
    public myLogo;
    

    constructor(private authService: AuthserviceService) {
        this.myName = this.authService.myName;
        this.myProfilePicture = this.authService.myProfilePicture;
        this.myShop = this.authService.myTable;
        this.myLogo = this.authService.myLogo;
    }
    
    isNotMobileMenu(){
        if( window.outerWidth > 991){
            return false;
        }
        return true;
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    
    }

    
    
}
