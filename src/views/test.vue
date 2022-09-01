<template>
  <ion-button @click="presentAlert">Click Me</ion-button>
</template>

<script>
import { IonButton, alertController } from '@ionic/vue';

export default {
  components: { IonButton },
  methods: {
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
  },
};
</script>


