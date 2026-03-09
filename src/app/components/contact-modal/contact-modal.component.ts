import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IonButton, IonIcon, ModalController } from '@ionic/angular/standalone';

import { DatabaseService } from 'src/app/services/database.service';
import { AngularService } from 'src/app/services/angular.service';

@Component({
    selector: 'app-contact-modal',
    templateUrl: './contact-modal.component.html',
    styleUrls: ['./contact-modal.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, IonButton, IonIcon]
})
export class ContactModalComponent implements OnInit {

    contactForm: FormGroup;
    isSubmitting = false;

    constructor(
        private modalCtrl: ModalController,
        private db: DatabaseService,
        private angularService: AngularService,
        private fb: FormBuilder
    ) {
        this.contactForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            message: ['']
        });
    }

    ngOnInit() { }

    async submitForm() {
        if (this.contactForm.invalid) {
            this.contactForm.markAllAsTouched();
            let errorMessage = 'Please fill in all required fields.';
            if (this.contactForm.get('email')?.hasError('email')) {
                errorMessage = 'Please enter a valid email address.';
            }

            // Show alert from angular.service (as requested)
            this.angularService.showAlert({
                header: 'Validation Error',
                message: errorMessage
            });
            return;
        }

        this.isSubmitting = true;

        try {
            // Check if sendInquiry resolved correctly, add timeout to prevent infinite hangs
            // since Firebase can hang indefinitely if the config is invalid (e.g. "YOUR_API_KEY")
            const response = await Promise.race([
                this.db.sendInquiry(this.contactForm.value),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out.')), 30000))
            ]);
            console.log(" Testing :: submitForm :: response = ", response);
            this.isSubmitting = false;

            // Show success alert from angular.service
            await this.angularService.showAlert({
                header: 'Success',
                message: 'Message sent successfully! We will contact you soon.'
            });
            this.modalCtrl.dismiss({ submitted: true });

        } catch (e: any) {
            console.error(e);
            // Show error alert from angular.service
            this.angularService.showAlert({
                header: 'Error',
                message: 'Failed to send message. Please try again later.'
            });
            this.isSubmitting = false;
        }
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }
}
