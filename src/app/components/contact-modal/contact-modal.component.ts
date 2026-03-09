import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonIcon, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { paperPlaneOutline, checkmarkCircle, closeOutline } from 'ionicons/icons';
import { DatabaseService } from 'src/app/services/database.service';
import { AngularService } from 'src/app/services/angular.service';

@Component({
    selector: 'app-contact-modal',
    templateUrl: './contact-modal.component.html',
    styleUrls: ['./contact-modal.component.scss'],
    standalone: true,
    imports: [CommonModule, FormsModule, IonButton, IonIcon]
})
export class ContactModalComponent implements OnInit {

    contactData = {
        name: '',
        email: '',
        message: ''
    };

    isSubmitting = false;

    constructor(
        private modalCtrl: ModalController,
        private db: DatabaseService,
        private angularService: AngularService
    ) {
        addIcons({ paperPlaneOutline, checkmarkCircle, closeOutline });
    }

    ngOnInit() { }

    async submitForm() {
        if (!this.contactData.name || !this.contactData.email) {
            this.angularService.showAlert({
                header: 'Validation Error',
                message: 'Please fill in your name and email.'
            });
            return;
        }

        this.isSubmitting = true;

        try {
            await this.db.sendInquiry(this.contactData);

            this.isSubmitting = false;

            await this.angularService.showAlert({
                header: 'Success',
                message: 'Message sent successfully! We will contact you soon.'
            });
            this.modalCtrl.dismiss({ submitted: true });

        } catch (e: any) {
            console.error(e);
            this.angularService.showAlert({
                header: 'Error',
                message: 'Error sending message. ' + e.message
            });
            this.isSubmitting = false;
        }
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }
}
