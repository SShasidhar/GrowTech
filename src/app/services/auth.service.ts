import { Injectable } from '@angular/core';
import { Auth, authState, GoogleAuthProvider, signInWithPopup, signOut, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Live video feed of your login status
  public user$: Observable<User | null>;

  constructor(private auth: Auth) {
    // Automatically emits a new User object every time someone logs in or out
    this.user$ = authState(this.auth);
  }

  /**
   * AUTH: Opens up a Google Sign In popup.
   */
  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  /**
   * AUTH: Logs the user out.
   */
  async logout() {
    return signOut(this.auth);
  }
}
