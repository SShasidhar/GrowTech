import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularService } from 'src/app/services/angular.service';
import { User } from '@angular/fire/auth';
import { AppConfig } from 'src/app/config/appConfig';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule]
})
export class DashboardComponent implements OnInit, OnDestroy {

    user: User | null = null;
    isAdmin = false;
    inquiries: any[] = [];

    private authSub: Subscription;
    private inquiriesSub: Subscription | null = null;

    constructor(
        private db: DatabaseService,
        private authService: AuthService,
        private angularService: AngularService
    ) {
        // 1. Listen to the user's login status continuously
        this.authSub = this.authService.user$.subscribe(currentUser => {
            this.user = currentUser;

            // 2. Check if they are the admin
            if (currentUser && currentUser.email === AppConfig.contactEmail) {
                this.isAdmin = true;
                this.loadInquiries();
            } else {
                this.isAdmin = false;
                this.inquiries = [];
                if (this.inquiriesSub) {
                    this.inquiriesSub.unsubscribe();
                    this.inquiriesSub = null;
                }
            }
        });
    }

    ngOnInit() { }

    ngOnDestroy() {
        if (this.authSub) this.authSub.unsubscribe();
        if (this.inquiriesSub) this.inquiriesSub.unsubscribe();
    }

    loadInquiries() {
        this.angularService.showLoader({ message: 'Loading inquiries...' });
        this.inquiriesSub = this.db.getInquiries().subscribe({
            next: (data) => {
                this.inquiries = data;
                this.angularService.hideLoader();
            },
            error: (e) => {
                this.angularService.hideLoader();
                this.angularService.showAlert({ header: 'Error', message: 'Could not load data. Check rules.' });
            }
        });
    }

    async deleteInquiry(id: string) {
        const confirm = await this.angularService.confirmationAlert({
            header: 'Delete Inquiry?',
            message: 'Are you sure you want to permanently delete this message?',
            okText: 'Delete',
            cancelText: 'Cancel'
        });

        if (confirm) {
            try {
                await this.angularService.showLoader({ message: 'Deleting...' });
                await this.db.deleteInquiry(id);
                this.angularService.hideLoader();
                this.angularService.presentToast('Inquiry deleted.', 2000, 'bottom');
            } catch (e: any) {
                this.angularService.hideLoader();
                this.angularService.showAlert({
                    header: 'Delete Failed',
                    message: e.message
                });
            }
        }
    }
}
