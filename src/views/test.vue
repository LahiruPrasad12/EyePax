<template>
  <ion-button @click="presentAlert">Click Me</ion-button>
</template>

<script>
import { IonButton, alertController } from '@ionic/vue';

export default {
  components: { IonButton },
  methods: {
    async presentAlert() {
       await this.showLoading()
    },
  },
};
</script>


