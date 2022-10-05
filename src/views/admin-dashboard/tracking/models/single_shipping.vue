<template>
  <ion-modal :is-open="is_model_open" ref="modal" :enter-animation="enterAnimation" :leave-animation="leaveAnimation" trigger="open-modal">
    <ion-content fullscreen>
      <ion-toolbar>
        <ion-title>Add Staff</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="closeModel">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-content>

  </ion-modal>
</template>

<script>
import {
  IonModal,
  IonContent,
  IonToolbar,
  IonButton,
  IonTitle,
  IonItem,
  IonList,
  IonLabel,
  IonAvatar,
  IonImg,
  IonButtons,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  createAnimation
} from "@ionic/vue";
export default {
  components: {
    IonModal,
    IonContent,
    IonToolbar,
    IonButton,
    IonTitle,
    IonItem,
    IonList,
    IonLabel,
    IonAvatar,
    IonImg,
    IonButtons,
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonSpinner,
    IonPage,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle
  },
  name: "single_shipping",
  setup() {
    const enterAnimation = (baseEl) => {
      const root = baseEl.shadowRoot;

      const backdropAnimation = createAnimation()
          .addElement(root.querySelector('ion-backdrop'))
          .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

      const wrapperAnimation = createAnimation()
          .addElement(root.querySelector('.modal-wrapper'))
          .keyframes([
            {offset: 0, opacity: '0', transform: 'scale(0)'},
            {offset: 1, opacity: '0.99', transform: 'scale(1)'},
          ]);

      return createAnimation()
          .addElement(baseEl)
          .easing('ease-out')
          .duration(500)
          .addAnimation([backdropAnimation, wrapperAnimation]);
    };

    const leaveAnimation = (baseEl) => {
      return enterAnimation(baseEl).direction('reverse');
    };
    return {enterAnimation, leaveAnimation};
  },
  data() {
    return {
      is_model_open: false
    }
  },
  methods:{
    handleModel(data) {
      // this.single_staff = data
      console.log(data)
      this.is_model_open = !this.is_model_open
    },

    closeModel() {
      this.$emit('closeModel')
      this.is_model_open = !this.is_model_open
    }
  }
}
</script>

<style scoped>

</style>
