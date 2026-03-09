declare var window: any;

export const environment = {
  production: true,
  theme: window.AppConfig?.theme,
  contactEmail: window.AppConfig?.contactEmail,
  contactPhone: window.AppConfig?.contactPhone,
  firebaseConfig: {
    apiKey: "AIzaSyDnbQaqh3lYquW9k8684jbUv1MZW-fkmmM",
    authDomain: "growtech-business.firebaseapp.com",
    projectId: "growtech-business",
    storageBucket: "growtech-business.firebasestorage.app",
    messagingSenderId: "981234586923",
    appId: "1:981234586923:web:01b05ab8b676a35927216e"
  },
};
