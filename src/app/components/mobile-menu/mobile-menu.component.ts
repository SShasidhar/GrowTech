import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { IonList, IonItem, IonIcon, IonLabel, PopoverController, ModalController } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '@angular/fire/auth';
import { AppConfig } from 'src/app/config/appConfig';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
    selector: 'app-mobile-menu',
    templateUrl: './mobile-menu.component.html',
    styleUrls: ['./mobile-menu.component.scss'],
    standalone: true,
    imports: [CommonModule, RouterModule, IonList, IonItem, IonIcon, IonLabel]
})
export class MobileMenuComponent implements OnInit {
    user: User | null = null;
    isAdmin = false;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private authService: AuthService,
        private popoverCtrl: PopoverController,
        private modalCtrl: ModalController
    ) { }

    ngOnInit() {
        this.authService.user$.subscribe(user => {
            this.user = user;
            this.isAdmin = user?.email === AppConfig.contactEmail;
        });
    }

    get isDarkMode() {
        return !this.document.body.classList.contains('body-light');
    }

    toggleTheme() {
        if (this.isDarkMode) {
            this.document.body.classList.add('body-light');
        } else {
            this.document.body.classList.remove('body-light');
        }
    }

    async login() {
        this.popoverCtrl.dismiss();
        const modal = await this.modalCtrl.create({
            component: LoginModalComponent,
            backdropDismiss: true
        });
        await modal.present();
    }

    async logout() {
        await this.authService.logout();
        this.popoverCtrl.dismiss();
    }

    close() {
        this.popoverCtrl.dismiss();
    }
}
