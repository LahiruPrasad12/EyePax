import {loadingController} from "@ionic/vue";
import {toastController} from "@ionic/vue";

export default {
    methods: {
        async showLoading() {
            const loading = await loadingController.create({
                message: 'Dismissing after 3 seconds...',
                duration: 3000
            });

            await loading.present();
        },
        stopLoading() {
            if (window.loader) {
                window.loader.dismiss()
                window.loader = undefined
            } else if (document.getElementsByClassName('my-custom-class-loader')) {
                const elements = document.getElementsByClassName('my-custom-class-loader');
                while (elements.length > 0) elements[0].remove();
            }
        },
    }
}
