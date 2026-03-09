import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, IonIcon, ModalController } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { AngularService } from 'src/app/services/angular.service';

@Component({
    selector: 'app-login-modal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['./login-modal.component.scss'],
    standalone: true,
    imports: [CommonModule, IonButton, IonIcon]
})
export class LoginModalComponent {

    isSubmitting = false;

    constructor(
        private modalCtrl: ModalController,
        private authService: AuthService,
        private angularService: AngularService
    ) { }

    async loginWithGoogle() {
        this.isSubmitting = true;
        try {
            await this.angularService.showLoader({ message: 'Authenticating...' });
            await this.authService.loginWithGoogle();
            this.angularService.hideLoader();
            this.modalCtrl.dismiss({ loggedIn: true });
        } catch (e: any) {
            this.angularService.hideLoader();
            this.isSubmitting = false;
            this.angularService.showAlert({
                header: 'Login Failed',
                message: e.message
            });
        }
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }
}