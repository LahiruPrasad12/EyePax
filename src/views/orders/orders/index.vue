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
                        <h3>All Orders</h3>
                    </ion-text>
                </ion-list-header>
                <ion-row>
                    <ion-col size="12">
                        <ion-list class="u-input">
                            <ion-select v-model="selected_status" :interface-options="customAlertOptions"
                                placeholder="Select Status">
                                <ion-select-option value="">All</ion-select-option>
                                <ion-select-option value="Initiated">Initiated</ion-select-option>
                                <ion-select-option value="Pending">Pending</ion-select-option>
                                <ion-select-option value="Not Available">Not Available</ion-select-option>
                                <ion-select-option value="Delivered">Delivered</ion-select-option>
                                <ion-select-option value="Declined">Declined</ion-select-option>
                            </ion-select>
                        </ion-list>
                    </ion-col>
                </ion-row>
                <ion-grid v-for="item in orders" :key="item.id">
                    <ion-card>
                        <ion-card-header>
                            <ion-card-title>Order ID: {{ item.order_id }}</ion-card-title>
                            <ion-card-subtitle>Supplier: {{ item.supplier }}</ion-card-subtitle>
                        </ion-card-header>

                        <ion-card-content style="font-size:small">
                            Status: <div
                                v-bind:style="item.status === 'Initiated' ? 'color: orange' : item.status === 'Delivered' ? 'color: green' : 'color: red'"
                                style="display:inline">
                                {{ item.status }}</div>
                        </ion-card-content>

                        <ion-button fill="clear" color="tertiary" @click="openSingleOrderModal(item)">
                            <ion-icon :icon="eyeOutline" />View
                        </ion-button>
                        <ion-button fill="clear" v-if="item.status === 'Initiated'" @click="openUpdateOrderModal(item)">
                            <ion-icon :icon="pencil" />Edit
                        </ion-button>
                        <ion-button fill="clear" color="danger" @click="confirmRequest(item)">
                            <ion-icon :icon="trashOutline" />Delete
                        </ion-button>
                    </ion-card>
                </ion-grid>
            </ion-list>
            <ion-fab slot="fixed" class="mb-3" horizontal="end" vertical="bottom">
                <ion-fab-button id="open-modal" expand="block" @click="addOrder">
                    <ion-icon :icon="add"></ion-icon>
                </ion-fab-button>
            </ion-fab>
            <AddOrder ref="addOrder" @closeModel="closeModel()" />
            <SingleOrder ref="singleOrder" @closeModel="closeModel()" />
            <UpdateOrder @closeModel="closeModel()" ref="updateOrder" />
        </ion-content>
    </ion-page>

</template>
  
<script>
import AddOrder from './models/add_order'
import SingleOrder from './models/single_order'
import UpdateOrder from './models/update_order'
import { defineComponent } from 'vue';
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
        AddOrder,
        SingleOrder,
        UpdateOrder
    },
    name: "index",
    data() {
        return {
            is_loading: false,
            selected_status: undefined,
            orders: [],
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

        const customAlertOptions = {
            header: 'Status',
            // subHeader: 'Select Item',
            // message: 'Choose only one',
            translucent: true
        };

        return {
            router,
            add,
            pencil,
            eyeOutline,
            trashOutline,
            customAlertOptions
        }
    },

    watch: {
        selected_status() {
            this.getAllOrders(this.selected_status)
        },
    },
    methods: {
        async getAllOrders(status) {
            try {
                this.is_loading = true
                let respond = (await CustomerApis.getAllOrders(status)).data

                this.orders = respond.reverse().map((e, index) => ({
                    id: e.orders._id,
                    order_id: e.orders.orderId,
                    price: e.items.price,
                    item: e.items.name,
                    qty: e.orders.quantity,
                    status: e.orders.status,
                    supplier: e.users.first_name.concat("  ", e.users.last_name),
                    created_at: e.orders.createdAt.substring(0, 10)
                }))
            } catch (e) {

            }
            this.is_loading = false
        },

        closeModel() {
            this.getAllOrders(this.selected_status)
        },

        openSingleOrderModal(data) {
            this.$refs.singleOrder.handleOrdersModel(data)
        },
        openUpdateOrderModal(data) {
            this.$refs.updateOrder.openModal(data)
        },
        addOrder() {
            this.$refs.addOrder.handleModel()
        },

        async confirmRequest(item) {
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
                        handler: () => {
                            this.deleteOrder(item)
                        }
                    },
                ],
            });

            await alert.present();
        },

        async deleteOrder(item) {
            try {
                this.is_btn_loading = true
                await CustomerApis.deleteOrder(item.id)
                await this.successToast('Order Removed Successfully')
                this.$emit('closeModel')
                this.closeModel()
            } catch (e) {
                await this.dangerToast(e)
            }
            this.is_btn_loading = false
        }
    },

    mounted() {
        this.getAllOrders(this.selected_status)
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
  