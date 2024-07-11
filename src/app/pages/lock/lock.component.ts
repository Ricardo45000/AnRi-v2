import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from 'app/app.component';


@Component({
    selector: 'lock-cmp',
    templateUrl: './lock.component.html',
    styleUrls: ['./lock.component.css']
})

export class LockComponent implements AfterViewInit{
    selectedLanguage: string;

    constructor(public translate: TranslateService, private root: AppComponent){
      this.selectedLanguage = translate.currentLang;
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
    this.selectedLanguage = e;
    this.root.switchLanguage(e);
  }

  headerElements: NodeList;

  ngAfterViewInit(): void {
    this.headerElements = document.querySelectorAll('.logo');
    this.fadeElements();
  }

  fadeElements() {
    this.headerElements.forEach((element: HTMLElement, index: number) => {
      setTimeout(() => {
        element.style.opacity = '1';
      }, index * 200); // Adjust delay by multiplying index with a value (in milliseconds)
    });
  }
    
    
}