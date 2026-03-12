import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, ModalController, PopoverController } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { ContactModalComponent } from 'src/app/components/contact-modal/contact-modal.component';
import { LoginModalComponent } from 'src/app/components/login-modal/login-modal.component';
import { MobileMenuComponent } from 'src/app/components/mobile-menu/mobile-menu.component';
import { AppConfig } from '../../config/appConfig';
import { AngularService } from 'src/app/services/angular.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, RouterModule
  ]
})
export class HomePage implements OnInit, OnDestroy {
  isDarkMode = true;
  contactEmail = AppConfig.contactEmail;
  contactPhone = AppConfig.contactPhone;

  user: User | null = null;
  isAdmin = false;
  private authSub: Subscription | null = null;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    private angularService: AngularService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    // Initial theme check
    this.isDarkMode = AppConfig.theme === 'dark';
    if (this.isDarkMode) {
      this.document.body.classList.remove('body-light');
    } else {
      this.document.body.classList.add('body-light');
    }
    // Listen to login state
    this.authSub = this.authService.user$.subscribe(currentUser => {
      this.user = currentUser;
      if (currentUser && currentUser.email === AppConfig.contactEmail) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  async login() {
    const modal = await this.modalCtrl.create({
      component: LoginModalComponent,
      backdropDismiss: true
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.loggedIn) {
      console.log('User logged in securely');
    }
  }

  async logout() {
    await this.authService.logout();
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
      initialBreakpoint: 1,
      backdropDismiss: false
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.submitted) {
      // Data was successfully submitted, the modal component handles success message
      console.log('Contact inquiry submitted successfully');
    }
  }

  async openMobileMenu(event: any) {
    const popover = await this.popoverCtrl.create({
      component: MobileMenuComponent,
      event: event,
      translucent: true
    });
    await popover.present();
  }
}
