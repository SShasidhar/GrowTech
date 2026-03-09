// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

declare var window: any;

export const environment = {
  production: false,
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
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
