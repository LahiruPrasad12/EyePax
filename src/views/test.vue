<template>
  <ion-page>
      <ion-tabs @ionTabsWillChange="beforeTabChange" @ionTabsDidChange="afterTabChange">
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="schedule" href="/tabs/schedule">
            <ion-icon ></ion-icon>
            <ion-label>Schedule</ion-label>
<!--            <ion-badge>6</ion-badge>-->
          </ion-tab-button>

          <ion-tab-button tab="speakers" href="/tabs/speakers">
            <ion-icon ></ion-icon>
            <ion-label>Speakers</ion-label>
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
      this.tab2 = "my_Shifts";
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
      // id: this.$route.params.auth_practice_id,
    };
  }
});
</script>
