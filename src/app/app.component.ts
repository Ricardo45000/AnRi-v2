import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuthserviceService } from 'environments/airtable/authservice.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  public myQrCode;
  @ViewChild('myModal') myModal: ElementRef;
  
  constructor(private translate: TranslateService, authService: AuthserviceService){
    this.translate.setDefaultLang('en');
    const storedLang = localStorage.getItem('selectedLanguage');
    translate.use(storedLang || translate.getDefaultLang());
    this.myQrCode = authService.myQrCode;
  
  }

  switchLanguage(language: string){
    this.translate.use(language);
    localStorage.setItem('selectedLanguage', language);
  }

  async printModalContent() {
    const printWindow = window.open('', '_blank');
    const imgElement = new Image();

    const blob = await fetch(this.myQrCode).then(response => response.blob());
    const imgUrl = URL.createObjectURL(blob);

    imgElement.onload = () => {
        printWindow.document.write('<html><head><title>Print</title>');
        printWindow.document.write('<style>');
        printWindow.document.write('body { display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }');
        printWindow.document.write('</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write('<img src="'+imgUrl+'" style="max-width: 100%; max-height: 100%;" />');
        printWindow.document.write('</body></html>');

        printWindow.document.close();
        printWindow.print();
        printWindow.close();

        // Revoke the Object URL to free up resources
        URL.revokeObjectURL(imgUrl);
    };

    imgElement.src = imgUrl;
}





}
