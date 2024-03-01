import { Routes } from '@angular/router';
import { LockComponent } from './lock/lock.component';
import { AmazonComponent } from './amazon/amazon.component';

export const PagesRoutes: Routes = [{
    path: '',
    children: [{
        path: 'lock',
        component: LockComponent
    },
    {
        path: 'amazon',
        component: AmazonComponent
    }]
}];
