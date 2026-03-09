import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, ModalController, PopoverController } from '@ionic/angular/standalone';

import { ContactModalComponent } from 'src/app/components/contact-modal/contact-modal.component';
import { MobileMenuComponent } from 'src/app/components/mobile-menu/mobile-menu.component';

@Component({
    selector: 'app-about',
    templateUrl: './about.page.html',
    styleUrls: ['./about.page.scss'],
    standalone: true,
    imports: [
        IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon,
        RouterModule
    ]
})
export class AboutPage implements OnInit {
    isDarkMode = true;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private modalCtrl: ModalController,
        private popoverCtrl: PopoverController
    ) { }

    ngOnInit() {
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
