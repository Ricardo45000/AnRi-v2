import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
export var AppRoutes = [{
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    }, {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: function () { return import('./dashboard/dashboard.module').then(function (x) { return x.DashboardModule; }); }
            }, {
                path: 'tables',
                loadChildren: function () { return import('./tables/tables.module').then(function (x) { return x.TablesModule; }); }
            }, {
                path: 'advanced',
                loadChildren: function () { return import('./charts/charts.module').then(function (x) { return x.ChartsModule; }); }
            }
        ]
    }, {
        path: '',
        component: AuthLayoutComponent,
        children: [{
                path: 'pages',
                loadChildren: function () { return import('./pages/pages.module').then(function (x) { return x.PagesModule; }); }
            }]
    }
];
//# sourceMappingURL=app.routing.js.map