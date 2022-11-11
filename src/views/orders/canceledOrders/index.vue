<template>
    <ion-page>
        <ion-header translucent>
            <ion-toolbar class="toolbar" style="padding-top: 10px; ">
                <ion-title>ORDER MANAGEMENT</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content fullscreen>
            <ion-loading :is-open="is_loading" cssClass="my-custom-class" message="Please wait..." />
            <ion-list>
                <ion-list-header>
                    <ion-text color="primary">
                        <h3>Canceled Orders</h3>
                    </ion-text>
                </ion-list-header>
                <ion-grid v-for="item in canceledOrders" @click="openSingleCanceledOrderModal(item)">
                    <ion-card>
                        <ion-card-header>
                            <ion-card-title>Order ID: {{ item.order_id }}</ion-card-title>
                            <ion-card-subtitle>Item: {{ item.item }}</ion-card-subtitle>
                            <ion-card-subtitle>Quantity: {{ item.qty }}</ion-card-subtitle>
                            <!-- <ion-card-subtitle>Reason: {{ item.reason }}</ion-card-subtitle> -->
                            <ion-card-subtitle>Deleted At: {{ item.deleted_at }}</ion-card-subtitle>
                            <!-- <ion-card-subtitle>Total: {{ item.total }}</ion-card-subtitle> -->
                        </ion-card-header>
                    </ion-card>
                </ion-grid>
            </ion-list>
            <SingleCanceledOrder ref="singleCanceledOrder" @closeModel="closeModel()" />
        </ion-content>
    </ion-page>

</template>
  
<script>
import { defineComponent } from 'vue';
import SingleCanceledOrder from './models/single_canceled_order'
import { pencil } from 'ionicons/icons';
import CustomerApis from "@/apis/modules/customer_apis/customer_apis";
import '@/assets/test.css'
import {
    IonAvatar,
    IonBackButton,
    IonButtons,
    IonCol,
    IonContent,
    IonFab,
    IonFabButton,
    IonFabList,
    IonFooter,
    IonHeader,
    IonIcon,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonLoading,
    IonNavLink,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonRow,
    IonTitle,
    IonToolbar,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonGrid,
    IonCard,
    IonText, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, alertController
} from '@ionic/vue';

import { add, eyeOutline, trashOutline } from 'ionicons/icons';
import { useRouter } from "vue-router/dist/vue-router";


export default defineComponent({
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonButtons,
        IonBackButton,
        IonFooter,
        IonList,
        IonListHeader,
        IonItem,
        IonLabel,
        IonInfiniteScrollContent,
        IonInfiniteScroll,
        IonRefresher,
        IonRefresherContent,
        IonAvatar,
        IonRow,
        IonCol,
        IonNavLink,
        IonLoading,
        IonFab, IonFabButton, IonIcon, IonFabList, IonButton,
        IonSelect,
        IonSelectOption,
        IonGrid,
        IonText,
        IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
        SingleCanceledOrder
    },
    name: "index",
    data() {
        return {
            is_loading: false,
            selected_status: undefined,
            canceledOrders: [],
            pagination: {
                per_page: 5,
                page: 1,
                total: 0,
                is_disabled: false,
            },
        }
    },

    setup() {
        const router = useRouter();

        return {
            router,
            add,
            pencil,
            eyeOutline,
            trashOutline,
        }
    },
    methods: {
        async getAllCanceledOrders() {
            try {
                this.is_loading = true
                let respond = (await CustomerApis.getCanceledOrders()).data

                this.canceledOrders = respond.map((e, index) => ({
                    order_id: e.canceledorders.orderId,
                    total: e.canceledorders.total.toLocaleString("en-US"),
                    item: e.canceledorders.item,
                    qty: e.canceledorders.quantity,
                    reason: e.canceledorders.reason,
                    deleted_at: e.canceledorders.deletedAt.substring(0, 10)
                }))
            } catch (e) {

            }
            this.is_loading = false
        },
        closeModel() {
            this.getAllCanceledOrders()
        },

        openSingleCanceledOrderModal(data) {
            this.$refs.singleCanceledOrder.handleModel(data)
        },
    },

    mounted() {
        this.getAllCanceledOrders()
    }
});
</script>

<style scoped>
ion-card {
    margin-top: 5px;
    margin-bottom: 5px;
}

ion-label {
    margin: 0;
}

ion-card-title {
    font-size: medium;
}

ion-card-subtitle {
    margin-top: 5px;
}

ion-icon {
    width: 15px;
    height: 15px;
    margin-right: 5px;
}

ion-button {
    margin-top: -15px;
    font-size: small;
    margin-left: 8px;
}
</style>
  