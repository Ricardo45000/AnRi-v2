import { Routes } from '@angular/router';
import { AmazonComponent } from './amazon/amazon.component';
import { LockComponent } from './lock/lock.component';

export const PagesRoutes: Routes = [{
    path: '',
    children: [{
        path: '',
        component: LockComponent
    },
    {
        path: 'login',
        component: AmazonComponent
    },]
}];
