import { Routes } from '@angular/router';
import { RegularTableComponent } from './regulartable/regulartable.component';
import { CustomerTableComponent } from './customertable/customertable.component';

export const TablesRoutes: Routes = [{
        path: '',
        children: [{
            path: 'ratings',
            component: RegularTableComponent
        },
        {
            path: 'customers',
            component: CustomerTableComponent
        }]
    },
];
