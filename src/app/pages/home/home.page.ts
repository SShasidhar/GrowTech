import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowForwardOutline, checkmarkCircleOutline, statsChartOutline, peopleOutline, codeWorkingOutline, shieldCheckmarkOutline, sunnyOutline, moonOutline } from 'ionicons/icons';
import { RouterModule } from '@angular/router';

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

  constructor(@Inject(DOCUMENT) private document: Document) {
    addIcons({
      arrowForwardOutline, checkmarkCircleOutline, statsChartOutline,
      peopleOutline, codeWorkingOutline, shieldCheckmarkOutline,
      sunnyOutline, moonOutline
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
}
