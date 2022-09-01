<template>
  <ion-content>
    <ion-fab slot="fixed" vertical="bottom" horizontal="end" class="mb-3">
      <ion-fab-button color="primary">Button</ion-fab-button>
    </ion-fab>
  </ion-content>
</template>

<script>
import { IonButton, IonContent, IonLoading, IonFab,IonFabButton,IonIcon,IonFabList } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  components: { IonButton, IonContent, IonLoading,IonFab,IonFabButton,IonIcon,IonFabList },
});
</script>
