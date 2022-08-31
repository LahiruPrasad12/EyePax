<template>
  <ion-page>
    <ion-header :translucent="true" collapse="fade">
      <ion-toolbar>
        <ion-title>Header</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen>
      <ion-list>
        <ion-list-header> All Staff Members</ion-list-header>

        <ion-item v-for="staff in all_staff">
          <ion-avatar slot="start">
            <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y">
          </ion-avatar>
          <ion-label>
            <ion-row>
              <ion-col class="col-fist" size="7">
                <h2>{{ staff.first_name }} {{ staff.last_name }}</h2>
              </ion-col>
              <ion-col class="col-fist" size="5">
                <h2><a href="/test">View More>></a></h2>
              </ion-col>
            </ion-row>
            <h3>{{ staff.email }}</h3>
            <p>{{ staff.account_type }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>

    <ion-footer>
      <ion-toolbar>
        <ion-title>Footer</ion-title>
      </ion-toolbar>
    </ion-footer>

  </ion-page>
</template>

<script>
import {defineComponent} from 'vue';
import staff_apis from "@/apis/modules/admin_apis/staff_apis";
import {
  IonAvatar,
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonTitle,
  IonToolbar,
    IonNavLink
} from '@ionic/vue';

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
    IonNavLink
  },
  name: "index",
  data() {
    return {
      selected_role: undefined,
      all_staff: [],
      pagination: {
        per_page: 5,
        page: 1,
        total: 0,
        is_disabled: false,
      },
    }
  },

  methods: {
    async getAllStaff(selected_role) {
      try {
        let respond = (await staff_apis.getAllStaff(selected_role)).data.data.users
        console.log(respond)
        this.all_staff = respond
      } catch (e) {

      }
    }
  },

  mounted() {
    this.getAllStaff(this.selected_role)
  }
});
</script>

<style scoped>

</style>
