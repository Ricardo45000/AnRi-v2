import { Routes } from '@angular/router';
import { LockComponent } from './lock/lock.component';
import { AmazonComponent } from './amazon/amazon.component';

export const PagesRoutes: Routes = [{
    path: '',
    children: [{
        path: 'test',
        component: LockComponent
    },
    {
        path: 'lock',
        component: AmazonComponent
    }]
}];
