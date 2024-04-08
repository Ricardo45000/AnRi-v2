import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagesRoutes } from './pages.routing';
import { LockComponent } from './lock/lock.component';
import { TranslateModule } from '@ngx-translate/core';
import { AmazonComponent } from './amazon/amazon.component';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PagesRoutes),
        FormsModule,
        TranslateModule,
        AmplifyAuthenticatorModule,
        FormsModule
        
    ],
    declarations: [
        LockComponent,
        AmazonComponent,
    ] 
})

export class PagesModule {}
