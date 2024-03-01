import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthserviceService } from 'environments/airtable/authservice.service';
import ClipboardJS from 'clipboard';
declare var $:any;



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {

  public myQrCode;

  
  @ViewChild('myModal') myModal: ElementRef;
  
  constructor(private translate: TranslateService, authService: AuthserviceService){
    this.translate.setDefaultLang('en');
    const storedLang = localStorage.getItem('selectedLanguage');
    translate.use(storedLang || translate.getDefaultLang());
    this.myQrCode = authService.myQrCode;
  
  }
  ngAfterViewInit(): void {
    this.initializeClipboard();
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

private initializeClipboard() {
  const clipboard = new ClipboardJS('#copyButton', {
    text: () => {
      // Return the content to be copied (image URL)
      return this.myQrCode;
    }
  });

  clipboard.on('success', (e) => {
    if(this.translate.currentLang == 'de'){
      this.showNotification("top","center", "success", "URL kopiert");
    }else{
      if(this.translate.currentLang == 'fr'){
        this.showNotification("top","center", "success", "URL copié");
      }else{
        this.showNotification("top","center", "success", "URL copied");
      }
    }
    
    // You can add any additional feedback or actions here
  });

  clipboard.on('error', (e) => {
    console.error('Failed to copy text to clipboard:', e.text);
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
    // You can handle errors here
  });
}

showNotification(from: string, align: string, type: string, message: string){

  $.notify({
      icon: "ti-gift",
      message: message
    },{
        type: type,
        timer: 1,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-11 col-md-4 alert alert-{0} alert-with-icon" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss"><i class="nc-icon nc-simple-remove"></i></button><span data-notify="icon" class="nc-icon nc-bell-55"></span> <span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>'
    });
}




}
