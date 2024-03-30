import { Component } from '@angular/core';
import { signOut } from '@aws-amplify/auth';
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
            path: '/tables/ratings',
            title: 'All Details',
            type: 'link',
            collapse: 'tables',
            icontype: 'nc-icon nc-single-copy-04',
            children: [
                {path: 'ratings', title: 'Regular Tables', ab:'RT'},
        ]
        },
        {
            path: '/tables/customers',
            title: 'My customers',
            type: 'link',
            collapse: 'tables',
            icontype: 'nc-icon nc-single-02',
            children: [
                {path: 'customers', title: 'Customer Tables', ab:'RT'},
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
            action: 'onLogoutClick',
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

    onLogoutClick() {
        signOut();
    }

    
    
}
