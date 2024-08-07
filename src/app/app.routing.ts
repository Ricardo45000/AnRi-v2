import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';



export const AppRoutes: Routes = [{
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },{
        path: '',
        component: AdminLayoutComponent,
        children: [
        { 
            path: 'dashboard',
            loadChildren: () => import('./dashboard/dashboard.module').then(x => x.DashboardModule)
        },{
            path: 'tables',
            loadChildren:() => import( './tables/tables.module').then(x=>x.TablesModule)
        },{
            path: 'advanced',
            loadChildren:() => import( './charts/charts.module').then(x=>x.ChartsModule)
        }]
        },{
            path: '',
            component: AuthLayoutComponent,
            children: [{
                path: 'home',
                loadChildren:() => import( './pages/pages.module').then(x=>x.PagesModule)
            }]
        }
]; 
