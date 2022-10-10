<template>
  <ion-page>
    <ion-header :translucent="true" collapse="fade">
      <ion-toolbar>
        <ion-title>Tracking Page</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen>
      <ion-loading
          :is-open="is_loading"
          cssClass="my-custom-class"
          message="Please wait..."
      />
      <ion-list>
        <ion-list-header> All Shipping Items</ion-list-header>
        <ion-grid>
          <ion-row>
            <ion-col size="12">
              <ion-item class="mb-5">
                <ion-select v-model="selected_status" placeholder="Select status">
                  <ion-select-option value="">None</ion-select-option>
                  <ion-select-option value="draft">Draft</ion-select-option>
                  <ion-select-option value="pending">Pending</ion-select-option>
                  <ion-select-option value="shipped">Shipped</ion-select-option>
                </ion-select>
              </ion-item>
            </ion-col>
            <ion-col v-for="item in all_items" size="6" @click="viewSingleItem(item)">
              <div class="video anim" style="--delay: .5s; text-align: center; margin-left: 5px; margin-right: px">
                <div class="video-wrapper">
                  <img src="https://i.postimg.cc/Qtk5bhM0/staff-c.jpg" type="" v-if="item.status === 'draft'">
                  <img src="https://i.postimg.cc/RV3hCvzy/item.jpg" type="" v-if="item.status === 'shipped'">
                  <img src="https://i.postimg.cc/50HTYKN4/sup.jpg" type="" v-if="item.status === 'pending'">
                </div>
                <div class="video-by">Status : {{ item.status }}</div>
                <div class="video-name">Quantity : {{ item.qty }}</div>
                <div class="video-name2"></div>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-list>
      <single_shipment ref="single_shipment" @closeSingleShippingModel="closeSingleShippingModel()"/>
    </ion-content>
  </ion-page>
</template>

<script>
import {pencil} from 'ionicons/icons';
import {
  IonPage, IonAvatar,
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
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonTitle,
  IonToolbar,
  IonButton,
  IonSelect,
  IonGrid,
  IonSelectOption,
} from '@ionic/vue';
import {useRouter} from "vue-router";
import trackingAPI from "@/apis/modules/admin_apis/tracking";
import single_shipment from "./models/single_shipping";

export default {
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
    single_shipment,
    IonGrid,
  },
  name: "index",

  data() {
    return {
      selected_status: undefined,
      all_items: [],
      is_loading: false
    }
  },
  setup() {
    const router = useRouter();
    return {
      router,
      pencil
    }
  },
  watch: {
    selected_status() {
      this.getAllShippingItems(this.selected_status)
    }
  },

  methods: {
    async getAllShippingItems(status) {
      try {
        this.is_loading = true
        this.all_items = (await trackingAPI.getAllShippingItems(status)).data.data.ShippingItems
      } catch (e) {

      }
      this.is_loading = false
    },
    viewSingleItem(data) {
      this.$refs.single_shipment.handleModel(data)
    },
    closeSingleShippingModel() {
      this.getAllShippingItems(this.selected_status)
    },
  },

  async mounted() {
    await this.getAllShippingItems(this.selected_status)
  }

}
</script>

<style scoped>

</style>
