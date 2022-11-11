<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar
        style="padding-bottom: 20px; background-color: black"
        slot="bottom"
      >
        <ion-tab-button
          href="/stock/home"
          tab="home"
          v-on:click="afterTabChange('home')"
          style="background-color: black"
        >
          <ion-icon :icon="podiumOutline" />
          <ion-label v-show="tabName === 'home'" style="color: #5bf5a8"
            >Stock</ion-label
          >
          <ion-label v-show="tabName !== 'home'" style="color: #ffffff"
            >Stock</ion-label
          >
        </ion-tab-button>

        <ion-tab-button
          href="/stock/purchaseorder"
          tab="purchaseorder"
          v-on:click="afterTabChange('purchaseorder')"
          style="background-color: black"
        >
          <ion-icon :icon="cubeOutline" />
          <ion-label v-show="tabName === 'purchaseorder'" style="color: #5bf5a8"
            >Purchase Order</ion-label
          >
          <ion-label v-show="tabName !== 'purchaseorder'" style="color: #ffffff"
            >Purchase Order</ion-label
          >
        </ion-tab-button>

        <ion-tab-button
          href="/stock/supplyrequest"
          tab="supplyrequest"
          v-on:click="afterTabChange('supplyrequest')"
          style="background-color: black"
        >
          <ion-icon :icon="receiptOutline" />
          <ion-label v-show="tabName === 'supplyrequest'" style="color: #5bf5a8"
            >Supply Requests</ion-label
          >
          <ion-label v-show="tabName !== 'supplyrequest'" style="color: #ffffff"
            >Supply Requests</ion-label
          >
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import {
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/vue";
import {
  cafeOutline,
  calendarOutline,
  homeOutline,
  timeOutline,
  peopleOutline,
  cubeOutline,
  podiumOutline,
  receiptOutline,
  mapOutline,
} from "ionicons/icons";
import { useRouter } from "vue-router";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    IonLabel,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonPage,
    IonRouterOutlet,
  },
  methods: {
    async beforeTabChange() {
      this.no -= 1;
      this.tab1 = "dash_board";
      this.tab2 = "staff";
      this.tab3 = "time_sheet";
      this.tab4 = "leaves";
    },
    async afterTabChange(tabName) {
      this.tabName = tabName;
    },
  },
  setup() {
    const router = useRouter();
    return {
      no: 1,
      calendarOutline,
      cafeOutline,
      homeOutline,
      mapOutline,
      peopleOutline,
      timeOutline,
      cubeOutline,
      podiumOutline,
      receiptOutline,
      router,
    };
  },
  data() {
    return {
      no: 1,
      tabName: "dash_board",
      tab1: "",
      tab2: "",
      tab3: "",
      tab4: "",
    };
  },
});
</script>
