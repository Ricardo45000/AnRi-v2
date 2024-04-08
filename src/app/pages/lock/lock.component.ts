import { Component, ElementRef, ViewChild } from '@angular/core';


@Component({
    selector: 'lock-cmp',
    templateUrl: './lock.component.html',
})

export class LockComponent{
    @ViewChild('mainContent', { static: true }) targetSection: ElementRef;

  scrollToSection(sectionId: string) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
    
    
}
