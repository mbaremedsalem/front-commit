import { Component } from '@angular/core';
import { CommiteService } from 'src/app/services/commite-service/commite.service';

@Component({
  selector: 'app-page-inscription',
  templateUrl: './page-inscription.component.html',
  styleUrls: ['./page-inscription.component.scss']
})
export class PageInscriptionComponent {
  title = 'QR Code for WiFi';
  ssid = 'AUBDG';
  password = 'CAM@wf2024aubdg!';
  encryption = 'WPA';  // Type de chiffrement (WPA, WPA2, WEP, nopass)
  qrCodeImageUrl: string | ArrayBuffer | null = null;

  constructor(private qrCodeService: CommiteService) { }

  generateQrCode() {
    this.qrCodeService.generateQrCode(this.ssid, this.password, this.encryption)
      .subscribe(blob => {
        const reader = new FileReader();
        reader.onload = () => {
          this.qrCodeImageUrl = reader.result;
        };
        reader.readAsDataURL(blob);
      });
  }
}
