import {toastController} from "@ionic/vue";
import {alertCircle,happy} from 'ionicons/icons';
export default {
    methods:{
        async dangerToast(message) {
            const toast = await toastController
                .create({
                    message: `${message}`,
                    duration: 2000,
                    color: "danger",
                    icon:alertCircle,
                    position:"top"
                })
            return toast.present();
        },
        async successToast(message) {
            const toast = await toastController
                .create({
                    message: `${message}`,
                    duration: 2000,
                    color: "success",
                    icon:happy,
                    position:"top"
                })
            return toast.present();
        },

    }
}
