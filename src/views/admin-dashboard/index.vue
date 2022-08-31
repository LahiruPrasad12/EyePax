<template>
  <ion-page>

    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar style="padding-bottom:20px" slot="bottom">

        <ion-tab-button
            href="/admin_home/dash_board"
            selected
            tab="dash_board"
            v-on:click="afterTabChange('dash_board')">
          <ion-icon :icon="homeOutline"/>
          <ion-label v-show="tabName==='dash_board'" style="color: #000000;">Dashboard</ion-label>
          <ion-label v-show="tabName !=='dash_board'" style="color: #ffffff;">Dashboard</ion-label>
        </ion-tab-button>

        <ion-tab-button
            href="/admin_home/staff"
            tab="staff"
            v-on:click="afterTabChange('staff')">
          <ion-icon :icon="calendarOutline"/>
          <ion-label v-show="tabName==='staff'" style="color: #000000;">Staff</ion-label>
          <ion-label v-show="tabName !=='staff'" style="color: #ffffff;">Staff</ion-label>
        </ion-tab-button>

        <ion-tab-button
            href="/tabs/time_sheet"
            tab="time_sheet"
            v-on:click="afterTabChange('time_sheet')">
          <ion-icon :icon="timeOutline"/>
          <ion-label v-show="tabName==='time_sheet'" style="color: #000000;">Time Sheet</ion-label>
          <ion-label v-show="tabName !=='time_sheet'" style="color: #ffffff;">Time Sheet</ion-label>

        </ion-tab-button>
        <ion-tab-button
            href="/tabs/leaves"
            tab="leaves"
            v-on:click="afterTabChange('leaves')">
          <ion-icon :icon="cafeOutline"/>
          <ion-label v-show="tabName==='leaves'" style="color: #000000;">Leaves</ion-label>
          <ion-label v-show="tabName !=='leaves'" style="color: #ffffff;">Leaves</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
    <!--      <ion-tab-bar slot="bottom">-->
    <!--      </ion-tab-bar>-->
  </ion-page>
</template>

<script>
import {IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from '@ionic/vue';
import {cafeOutline, calendarOutline, homeOutline, timeOutline} from 'ionicons/icons';
import {useRouter} from "vue-router";
import {defineComponent} from "vue";

export default defineComponent({
  components: {IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet},
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
      timeOutline,
      router,
    }
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
  }
});
</script>
