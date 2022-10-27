<template>
    <ion-page>
      <ion-header translucent >
        <ion-toolbar class="toolbar" style="padding-top: 10px; ">
          <ion-title>STOCK MANAGEMENT</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content fullscreen>
        <ion-loading
            :is-open="is_loading"
            cssClass="my-custom-class"
            message="Please wait..."
        />
        <ion-list>
          <ion-list-header> <ion-text color="medium">
            <h3>All Stocks</h3>
          </ion-text></ion-list-header>
          <ion-row>
            <ion-col size="12">
              <ion-list class="u-input" >
                  <ion-select  v-model="selected_status" placeholder="Select Status">
                    <ion-select-option value="">All</ion-select-option>
                    <ion-select-option value="true">Available</ion-select-option>
                    <ion-select-option value="false">Not Available</ion-select-option>
                  </ion-select>
              </ion-list>
            </ion-col>
          </ion-row>
          <ion-grid style="margin-top: 5%">
            <ion-row>
              <ion-col v-for="stock in all_stock" size="6" >
                <ion-card class="video anim" style="--delay: .5s; border-color: #0d0d0d;">
                    <img src="https://i.postimg.cc/QMkZFG1K/layers-animat.gif" type="" v-if="stocks.Availability === true">
                    <img src="https://i.postimg.cc/SRGG9dVr/comp-3.gif" type="" v-if="stocks.Availability === false">
                    <div class="video-name">{{ stocks.item_code.substring(0, 7) }}</div>
                    <div class="video-by" v-if="stocks.Availability === true">Status : {{ stocks.Availability?"Available":"Not Available" }}</div>
                    <div class="video-by2" v-if="stocks.Availability === false">Status : {{ stocks.Availability?"Available":"Not Available" }}</div>
                  <div class="video-name2"></div>
                </ion-card>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-list>
        <ion-fab slot="fixed" class="mb-3" horizontal="end" vertical="bottom">
          <ion-fab-button id="open-modal" expand="block" @click="addStock">
            <ion-icon :icon="add"></ion-icon>
          </ion-fab-button>
        </ion-fab>
        <AddStock ref="addStock" @closeModel="closeModel()"/>
        <!-- <SingleItem ref="singleItem" @closeModel="closeModel()" @openUpdateItemModal="openUpdateItemModal"/>
        <UpdateItem ref="updateItem"/> -->
      </ion-content>
  
    </ion-page>
  
  </template>
  
  <script>
  import AddStock from './models/add_stock'
//   import SingleItem from './models/single_item'
//   import UpdateItem from './models/update_item'
  import {defineComponent} from 'vue';
  import {pencil} from 'ionicons/icons';
  import StockApis from "@/apis/modules/stock_apis/stock_apis";
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
    IonText
  } from '@ionic/vue';
  
  import {add} from 'ionicons/icons';
  import {useRouter} from "vue-router/dist/vue-router";
  
  
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
      IonCard,
    //   SingleItem,
    //   UpdateItem,
      AddStock,
      IonText
    },
    name: "index",
    data() {
      return {
        is_loading: false,
        selected_status: undefined,
        all_stock: [],
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
        pencil
      }
    },
  
    watch: {
      selected_status() {
        this.getAllStocks(this.selected_status)
      }
    },
    methods: {
      async getAllStocks(selected_status) {
        try {
          // this.startLoading()
          this.is_loading = true
          let respond = (await StockApis.getAllStocks(selected_status)).data.data.stocks
          console.log(respond)
          this.all_stock = respond
        } catch (e) {
  
        }
        this.is_loading = false
      },
  
      closeModel() {
        this.getAllStocks(this.selected_status)
      },
  
      // openSingleItemModal(data) {
      //   this.$refs.singleItem.handleModel(data)
      // },
      // openUpdateItemModal(data) {
      //   this.$refs.updateItem.openModal(data)
      // },
      addStock() {
        this.$refs.addStock.openAddStockModel()
      },
    },
  
    mounted() {
      this.getAllStocks(this.selected_status)
    }
  });
  </script>
  
  <style scoped>
  
  </style>
  