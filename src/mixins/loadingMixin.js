import {loadingController} from "@ionic/vue";
import {toastController} from "@ionic/vue";

export default {
    methods: {
        async showLoading(){
            const loading = await loadingController.create({
                message: 'Loading...',
                duration: 3000,
                cssClass: 'custom-loading'
            });

            await loading.present();
        },



        startLoading(back_drop = true) {
            const loading = loadingController
                .create({
                    cssClass: 'my-custom-class-loader',
                    message: 'Please wait...',
                    duration: 5000,
                    showBackdrop: back_drop
                }).then(function (loader) {
                    window.loader = loader;
                    window.loader.present().then(r => {});
                });
        },
        stopLoading() {
            if (window.loader) {
                window.loader.dismiss().then(r =>{} )
                window.loader = undefined
            } else if (document.getElementsByClassName('my-custom-class-loader')) {
                const elements = document.getElementsByClassName('my-custom-class-loader');
                while (elements.length > 0) elements[0].remove();
            }
        }
    }
}
