<template>
  <ion-modal :is-open="is_model_open">
    <ion-content>
      <ion-toolbar>
        <ion-title>Modal</ion-title>
        <ion-buttons slot="end">
          <ion-button color="light" @click="handleModel()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-list>
        <ion-item>
          <ion-avatar slot="start">
            <ion-img src="https://i.pravatar.cc/300?u=b"></ion-img>
          </ion-avatar>
          <ion-label>
            <h2>Connor Smith</h2>
            <p>Sales Rep</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-avatar slot="start">
            <ion-img src="https://i.pravatar.cc/300?u=a"></ion-img>
          </ion-avatar>
          <ion-label>
            <h2>Daniel Smith</h2>
            <p>Product Designer</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-avatar slot="start">
            <ion-img src="https://i.pravatar.cc/300?u=d"></ion-img>
          </ion-avatar>
          <ion-label>
            <h2>Greg Smith</h2>
            <p>Director of Operations</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-avatar slot="start">
            <ion-img src="https://i.pravatar.cc/300?u=e"></ion-img>
          </ion-avatar>
          <ion-label>
            <h2>Zoey Smith</h2>
            <p>CEO</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-modal>
</template>

<script>
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonItem,
  IonList,
  IonAvatar,
  IonImg,
  IonLabel,
} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonItem,
    IonList,
    IonAvatar,
    IonImg,
    IonLabel,
  },
  data(){
    return{
      is_model_open:false
    }
  },
  methods: {
    handleModel() {
      this.is_model_open = !this.is_model_open
    },
  },
});
</script>


<style scoped>
ion-modal {
  --height: 50%;
  --border-radius: 16px;
  --box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

ion-modal::part(backdrop) {
  background: rgba(209, 213, 219);
  opacity: 1;
}

ion-modal ion-toolbar {
  --background: rgb(14 116 144);
  --color: white;
}
</style>
