import {alertController, toastController} from "@ionic/vue";
import {alertCircle,happy} from 'ionicons/icons';
export default {
    methods:{
        async presentAlert() {
            const alert = await alertController.create({
                header: 'Are you sure?',
                cssClass: 'custom-alert',
                buttons: [
                    {
                        text: 'No',
                        cssClass: 'alert-button-cancel',
                    },
                    {
                        text: 'Yes',
                        cssClass: 'alert-button-confirm',
                    },
                ],
            });

            await alert.present();
        },
    }
}
