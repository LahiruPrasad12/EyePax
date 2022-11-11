<template>
  <ion-page>
    <ion-header translucent >
      <ion-toolbar class="toolbar" style="padding-top: 10px; ">
        <ion-title>REQUEST MANAGEMENT</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen>
      <ion-loading
          :is-open="is_loading"
          cssClass="my-custom-class"
          message="Please wait..."
      />
      <ion-list>
        <ion-list-header><ion-text color="medium">
          <h3>My Supply Requests</h3>
        </ion-text> </ion-list-header>
        <ion-grid>
          <ion-row>
            <ion-col size="12" class="u-input">
                <ion-select v-model="selected_status" placeholder="Select Status">
                  <ion-select-option value="">None</ion-select-option>
                  <ion-select-option value="Pending">Pending</ion-select-option>
                  <ion-select-option value="Approved">Approved</ion-select-option>
                  <ion-select-option value="Declined">Declined</ion-select-option>
                </ion-select>
            </ion-col>
            <ion-col v-for="request in all_requests" size="6" @click="viewSingleRequest(request)" style="margin-top: 10%">
              <div class="video anim" style="--delay: .5s; text-align: center; margin-left: 5px; margin-right: px">
                <div class="video-wrapper">
                  <img src="https://i.postimg.cc/jj3YN7zX/dots.gif" type="" v-if="request.status === 'Pending'">
                  <img src="https://i.postimg.cc/qq0wvmzZ/image-processing20191224-7727-1ejq1ey.gif" type="" v-if="request.status === 'Approved'">
                  <img src="https://i.postimg.cc/KjzNT1Dn/error-img.gif" type="" v-if="request.status === 'Declined'">
                </div>
                <div class="video-name"> {{ request.request.substring(0, 14) }}</div>
                <div class="video-by"  v-if="request.status === 'Approved'">{{ request.status }}</div>
                <div class="video-by2"  v-if="request.status === 'Declined'">{{ request.status }}</div>
                <div class="video-by3"  v-if="request.status === 'Pending'">{{ request.status }}</div>
                <div class="video-name2"></div>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-list>
      <single_request ref="single_request" @closeSingleRequestModel="closeSingleRequestModel()"/>
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
  IonText
} from '@ionic/vue';
import {useRouter} from "vue-router";
import SupplierApis from "@/apis/modules/supplier_apis/supplier_apis";
import single_request from "./models/single_request";

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
    single_request,
    IonGrid,
    IonText
  },
  name: "index",

  data() {
    return {
      selected_status: undefined,
      all_requests: [],
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
      this.getAllRequests(this.selected_status)
    }
  },

  methods: {
    async getAllRequests(status) {
      try {
        this.is_loading = true
        this.all_requests = (await SupplierApis.getAllRequests(status)).data.data.requests
      } catch (e) {

      }
      this.is_loading = false
    },
    viewSingleRequest(data) {
      this.$refs.single_request.handleModel(data)
    },
    closeSingleRequestModel() {
      this.getAllRequests(this.selected_status)
    },
  },

  async mounted() {
    await this.getAllRequests(this.selected_status)
  }

}
</script>

<style scoped>

</style>
