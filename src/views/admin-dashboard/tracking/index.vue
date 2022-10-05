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
        <ion-row>
          <ion-col size="12">
            <ion-list>
              <ion-item class="mb-5">
                <ion-select placeholder="Select status" v-model="selected_status">
                  <ion-select-option value="">None</ion-select-option>
                  <ion-select-option value="draft">Draft</ion-select-option>
                  <ion-select-option value="pending">Pending</ion-select-option>
                  <ion-select-option value="shipped">Shipped</ion-select-option>
                </ion-select>
              </ion-item>
              <ion-item style="margin-top: 5%" v-for="item in all_items">
                <ion-label>
                  <ion-row>
                    <ion-col class="col-fist" size="9">
                      <h2>{{item.item}}</h2>
                    </ion-col>
                    <ion-col class="col-fist" size="3">
<!--                      <h2><a ><ion-icon :icon="pencil"></ion-icon></a></h2>-->
                      <a @click="viewSingleItem(item)">View More>></a>
                    </ion-col>
                  </ion-row>
                  <h3>Quantity - {{item.qty}}</h3>
                  <p>Status - {{item.status}}</p>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
      </ion-list>
      <single_shipment ref="single_shipment" @closeModel="closeModel()"/>
    </ion-content>
  </ion-page>
</template>

<script>
import {pencil} from 'ionicons/icons';
import { IonPage, IonAvatar,
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
  IonSelectOption, } from '@ionic/vue';
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
    single_shipment
  },
  name: "index",

  data(){
    return{
      selected_status: undefined,
      all_items:[],
      is_loading:false
    }
  },
  setup() {
    const router = useRouter();
    return {
      router,
      pencil
    }
  },
  watch:{
    selected_status(){
      this.getAllShippingItems(this.selected_status)
    }
  },

  methods:{
    async getAllShippingItems(status){
      try{
        this.is_loading = true
        this.all_items = (await trackingAPI.getAllShippingItems(status)).data.data.ShippingItems
      }catch (e) {

      }
      this.is_loading = false
    },
    viewSingleItem(data){
      this.$refs.single_shipment.handleModel(data)
    },
    closeModel() {
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
