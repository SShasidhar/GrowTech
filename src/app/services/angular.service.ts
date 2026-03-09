import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular/standalone';

// import { TranslateService } from '@ngx-translate/core';


@Injectable({
    providedIn: 'root'
})
export class AngularService {

    private httpClient = inject(HttpClient);
    private router = inject(Router);
    private alertCtrl = inject(AlertController);
    private loadingCtrl = inject(LoadingController);
    private modalController = inject(ModalController);
    private domSanitizer = inject(DomSanitizer);
    private toastController = inject(ToastController);
    // private translate = inject(TranslateService);

    ionicAlert: any;
    isLoading: boolean = false;

    constructor() { }

    public makeHTTPRequest(httpMethod: string, url: string, data?: any, options?: any, mask?: any): any {
        if (httpMethod.toLowerCase() == 'get') {
            return this.httpClient.get(url, options);
        } else if (httpMethod.toLowerCase() == 'post') {
            return this.httpClient.post(url, data, options);
        } else if (httpMethod.toLowerCase() == 'delete') {
            return this.httpClient.delete(url, options);
        }
    }

    public getHeaderOptions(): any {
        let headers: HttpHeaders = new HttpHeaders();
        headers.append('Accept', 'application/json; charset=utf-8');
        headers.append('Content-Type', 'application/json');
        let params: HttpParams = new HttpParams();
        return { headers: headers, params: params, reportProgress: false };
    }

    public routerNavigate(uri: string, data?: any) {
        this.router.navigate([uri], { state: { data: data } }).catch((error: any) => {
            this.router.navigate(['']);
        });
    }

    public getRouterNavigationData() {
        const routerNavigation: any = this.router.getCurrentNavigation();
        let routerNavigationExtras: any = routerNavigation ? routerNavigation.extras : null;
        if (!routerNavigationExtras && history && history.state) {
            routerNavigationExtras = history;
        }
        const routerNavigationState: any = routerNavigationExtras ? routerNavigationExtras.state : null;
        return routerNavigationState ? routerNavigationState.data : null;
    }

    async showAlert(options?: any) {
        await this.hideAlert();
        return new Promise(async (resolve) => {
            let backdropDismiss: boolean = false;
            let cssClass: string = 'custom-alert';
            if (options && options.hasOwnProperty("backdropDismiss")) {
                backdropDismiss = options.backdropDismiss;
            }
            if (options && options.hasOwnProperty("cssClass")) {
                cssClass = options.cssClass;
            }
            this.ionicAlert = await this.alertCtrl.create({
                header: options?.header ? options.header : '',
                subHeader: options?.subHeader ? options.subHeader : '',
                message: options?.message ? options.message : '',
                cssClass: cssClass,
                backdropDismiss: backdropDismiss,
                buttons: [{
                    text: options?.okText ? options.okText : 'OK',
                    handler: () => {
                        this.ionicAlert.dismiss();
                        return resolve(true);
                    }
                }]
            });
            setTimeout(async () => {
                await this.ionicAlert.present();
            }, 200);
        });
    }

    async confirmationAlert(options?: any) {
        await this.hideAlert();
        return new Promise(async (resolve) => {
            let backdropDismiss: boolean = false;
            let cssClass: string = 'custom-alert';
            if (options && options.hasOwnProperty("backdropDismiss")) {
                backdropDismiss = options.backdropDismiss;
            }
            if (options && options.hasOwnProperty("cssClass")) {
                cssClass = options.cssClass;
            }
            this.ionicAlert = await this.alertCtrl.create({
                header: options?.header ? options.header : '',
                subHeader: options?.subHeader ? options.subHeader : '',
                message: options?.message ? options.message : '',
                cssClass: cssClass,
                backdropDismiss: backdropDismiss,
                buttons: [
                    {
                        text: options?.okText ? options.okText : 'YES',
                        role: 'yes',
                        handler: () => {
                            return resolve(true);
                        },
                    },
                    {
                        text: options?.cancelText ? options.cancelText : 'NO',
                        role: 'cancel',
                        handler: () => {
                            return resolve(false);
                        },
                    }
                ],
            });
            setTimeout(async () => {
                await this.ionicAlert.present();
            }, 200);
        });
    }

    async hideAlert() {
        if (this.ionicAlert) { this.ionicAlert.dismiss(); }
    }

    async showLoader(options?: any) {
        if (!this.isLoading) {
            // Open loader only if it is not open
            let loadingOptions: any;
            if (options) {
                loadingOptions = {};
                if (options.hasOwnProperty("spinner")) {
                    loadingOptions["spinner"] = options.spinner;
                }
                if (options.hasOwnProperty("message")) {
                    loadingOptions["message"] = options.message;
                }
                if (options.hasOwnProperty("cssClass")) {
                    loadingOptions["cssClass"] = options.cssClass;
                }
                if (options.hasOwnProperty("showBackdrop")) {
                    loadingOptions["showBackdrop"] = options.showBackdrop;
                }
                if (options.hasOwnProperty("duration")) {
                    loadingOptions["duration"] = options.duration;
                }
                if (options.hasOwnProperty("translucent")) {
                    loadingOptions["translucent"] = options.translucent;
                }
                if (options.hasOwnProperty("animated")) {
                    loadingOptions["animated"] = options.animated;
                }
                if (options.hasOwnProperty("backdropDismiss")) {
                    loadingOptions["backdropDismiss"] = options.backdropDismiss;
                }
                if (options.hasOwnProperty("mode")) {
                    loadingOptions["mode"] = options.mode;
                }
                if (options.hasOwnProperty("keyboardClose")) {
                    loadingOptions["keyboardClose"] = options.keyboardClose;
                }
                if (options.hasOwnProperty("id")) {
                    loadingOptions["id"] = options.id;
                }
                if (options.hasOwnProperty("htmlAttributes")) {
                    loadingOptions["htmlAttributes"] = options.htmlAttributes;
                }
            }
            this.isLoading = true;
            const loading: any = await this.loadingCtrl.create(loadingOptions);
            loading.present();
        }
    }

    async hideLoader() {
        try {
            if (this.isLoading) {
                this.isLoading = false;
                await this.loadingCtrl.dismiss();
            } else {
                this.loadingCtrl.getTop().then(async (loader: any) => loader ? await this.loadingCtrl.dismiss() : null).catch((error: any) => { });
            }
        } catch (error) {
        } finally {
            await this.hideLoaderWhichAreOpen();
        }
    }

    async hideLoaderWhichAreOpen() {
        try {
            const loader = await this.loadingCtrl.getTop().catch((error: any) => { });
            if (loader) {
                await loader.dismiss(null);
            }
        } catch (error) {

        }
    }

    bypassSecurityTrustResourceUrl(value: string) {
        return value ? this.domSanitizer.bypassSecurityTrustResourceUrl(value) : null;
    }

    bypassSecurityTrustHtml(value: string) {
        return value ? this.domSanitizer.bypassSecurityTrustHtml(value) : null;
    }

    async dismissModal() {
        const isModalOpen = await this.modalController.getTop();
        if (isModalOpen) {
            this.modalController.dismiss({});
        }
    }

    async presentToast(message: string, duration: number, position?: 'top' | 'middle' | 'bottom', cssClass?: string | string[]) {
        const toast = await this.toastController.create({
            message: message,
            duration: duration,
            position: position ? position : 'top',
            cssClass: cssClass ? cssClass : 'custom-toast',
        });
        await toast.present();
    }

    // public loadLanguageTranslateService() {
    //     this.translate.addLangs([CommonConstant.LANGUAGE_ARABIC, CommonConstant.LANGUAGE_ENGLISH, CommonConstant.LANGUAGE_FRENCH, CommonConstant.LANGUAGE_GERMAN, CommonConstant.LANGUAGE_SPANISH]);
    //     this.translate.setFallbackLang(CommonConstant.LANGUAGE_DEFAULT);
    //     this.userContextService.setPreferredLanguage(CommonConstant.LANGUAGE_DEFAULT);
    // }

    // public switchLanguage(language: string) {
    //     this.userContextService.setPreferredLanguage(language);
    //     return this.translate.use(language);
    // }

    // public instantLanguageTranslate(key: string) {
    //     if (key) {
    //         return this.translate.instant(key);
    //     }
    // }

}
