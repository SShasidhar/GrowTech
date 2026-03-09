import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

/**
 * DATABASE SERVICE (The Postman)
 * This class handles all communication between GrowTech and Firebase.
 */
@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    constructor(private firestore: Firestore) { }

    /**
     * CREATE: Adds a new client inquiry to the 'inquiries' collection.
     * @param inquiry data from the contact form
     */
    async sendInquiry(inquiry: any) {
        // 1. Point to the 'inquiries' collection (drawer)
        const inquiriesRef = collection(this.firestore, 'inquiries');

        // 2. Add the data + current timestamp
        return addDoc(inquiriesRef, {
            ...inquiry,
            createdAt: new Date(),
            status: 'new'
        });
    }

    /**
     * READ: Gets all inquiries from the database sorted by date.
     * This returns an 'Observable' - it's like a live video feed of your data.
     */
    getInquiries(): Observable<any[]> {
        const inquiriesRef = collection(this.firestore, 'inquiries');
        const q = query(inquiriesRef, orderBy('createdAt', 'desc'));

        // collectionData automatically updates your app whenever the DB changes
        return collectionData(q, { idField: 'id' });
    }
}
