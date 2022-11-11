<template>
    <ion-modal :is-open="is_model_open">
        <ion-content>
            <ion-toolbar>
                <ion-title>{{ item.order_id }}</ion-title>
                <ion-buttons slot="end">
                    <ion-button style="--color: white;" @click="closeModel()">X Close</ion-button>
                </ion-buttons>
            </ion-toolbar>
            <ion-list>
                <ion-item style="text-align: center">
                    <ion-row style="padding-top: 0%">
                        <!-- <ion-col size="12">
               <ion-avatar style="display: flex;justify-content: center;">
                 <ion-img src="https://i.postimg.cc/QMkZFG1K/layers-animat.gif"></ion-img>
               </ion-avatar>
             </ion-col> -->
                        <ion-col size="12">
                            <ion-label style="font-weight:500">Item</ion-label>
                            <ion-text color="medium">
                                <h6>{{ item.item }}</h6>
                            </ion-text>
                        </ion-col>
                        <ion-col size="12">
                            <ion-label style="font-weight:500">Quantity</ion-label>
                            <ion-text color="medium">
                                <h6> {{ item.qty }}</h6>
                            </ion-text>
                        </ion-col>
                        <ion-col size="12">
                            <ion-label style="font-weight:500">Total</ion-label>
                            <ion-text color="medium">
                                <h6>Rs. {{ item.total }}</h6>
                            </ion-text>
                        </ion-col>
                        <ion-col size="12">
                            <ion-label style="font-weight:500">Reason</ion-label>
                            <ion-text color="medium">
                                <h6>{{ item.reason }}</h6>
                            </ion-text>
                        </ion-col>
                    </ion-row>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-modal>
</template>
  
<script>
import SupplierApis from "@/apis/modules/supplier_apis/supplier_apis";
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
    IonRow,
    IonCol,
    IonText, alertController,
    IonSpinner
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
        IonRow,
        IonCol,
        IonText,
        IonSpinner
    },
    data() {
        return {
            is_btn_loading: false,
            item: {},
            is_model_open: false
        }
    },
    methods: {
        handleModel(data) {
            this.item = data
            this.is_model_open = !this.is_model_open
        },

        closeModel() {
            this.is_model_open = !this.is_model_open

        },
    },
});
</script>
  
  
<style scoped>
ion-modal {
    --height: 51%;
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
  