import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowForwardOutline, checkmarkCircleOutline, statsChartOutline, peopleOutline, codeWorkingOutline, shieldCheckmarkOutline, sunnyOutline, moonOutline, mailOutline, callOutline, locationOutline } from 'ionicons/icons';
import { RouterModule } from '@angular/router';
import { ContactModalComponent } from 'src/app/components/contact-modal/contact-modal.component';
import { AppConfig } from '../../config/appConfig';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, CommonModule, FormsModule, RouterModule
  ]
})
export class HomePage implements OnInit {
  isDarkMode = true;
  contactEmail = AppConfig.contactEmail;
  contactPhone = AppConfig.contactPhone;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private modalCtrl: ModalController
  ) {
    addIcons({
      arrowForwardOutline, checkmarkCircleOutline, statsChartOutline,
      peopleOutline, codeWorkingOutline, shieldCheckmarkOutline,
      sunnyOutline, moonOutline, mailOutline, callOutline, locationOutline
    });
  }

  ngOnInit() {
    // Initial theme check
    this.isDarkMode = !this.document.body.classList.contains('body-light');
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      this.document.body.classList.remove('body-light');
    } else {
      this.document.body.classList.add('body-light');
    }
  }

  async openContactModal() {
    const modal = await this.modalCtrl.create({
      component: ContactModalComponent,
      breakpoints: [0, 1],
      initialBreakpoint: 1
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.submitted) {
      // Data was successfully submitted, the modal component handles success message
      console.log('Contact inquiry submitted successfully');
    }
  }
}
