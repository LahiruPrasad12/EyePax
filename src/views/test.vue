<template>
  <ion-content>
    <ion-button @click="setOpen(true)">Show Loading</ion-button>
    <ion-loading
        :is-open="isOpenRef"
        cssClass="my-custom-class"
        message="Please wait..."
        @didDismiss="setOpen(false)"
    >
    </ion-loading>
  </ion-content>
</template>

<script>
import { IonButton, IonContent, IonLoading } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  props: {
    timeout: { type: Number, default: 1000 },
  },
  components: { IonButton, IonContent, IonLoading },
  setup() {
    const isOpenRef = ref(false);
    const setOpen = (state) => isOpenRef.value = state;

    return { isOpenRef, setOpen }
  }
});
</script>
