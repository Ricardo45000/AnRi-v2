import { Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from 'app/app.component';


@Component({
    selector: 'lock-cmp',
    templateUrl: './lock.component.html',
    styleUrls: ['./lock.component.css']
})

export class LockComponent{
    selectedLanguage: string;

    constructor(public translate: TranslateService, private root: AppComponent){

    }
    @ViewChild('mainContent', { static: true }) targetSection: ElementRef;

  scrollToSection(sectionId: string) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  switchLanguage(){
    const e = (document.getElementById('mySelect') as HTMLInputElement).value
    this.root.switchLanguage(e);
}
    
    
}
