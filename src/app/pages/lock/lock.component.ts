import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from 'app/app.component';
import { AuthserviceService } from 'environments/airtable/authservice.service';

declare var $:any;

@Component({
    selector: 'lock-cmp',
    templateUrl: './lock.component.html'
})

export class LockComponent{


    constructor(
       
        ) {
    }
    
}
