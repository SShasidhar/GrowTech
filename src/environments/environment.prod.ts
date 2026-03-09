declare var window: any;

export const environment = {
  production: true,
  contactEmail: window.AppConfig?.contactEmail,
  contactPhone: window.AppConfig?.contactPhone,
  firebaseConfig: {
    apiKey: "YOUR_API_KEY",
    authDomain: "growtech-business.firebaseapp.com",
    projectId: "growtech-business",
    storageBucket: "growtech-business.firebasestorage.app",
    messagingSenderId: "YOUR_ID",
    appId: "YOUR_APP_ID"
  }
};
