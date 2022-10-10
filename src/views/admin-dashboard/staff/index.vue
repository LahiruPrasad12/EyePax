<template>
  <ion-page>
    <ion-header :translucent="true" collapse="fade">
      <ion-toolbar>
        <ion-title>Staff Page</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen>
      <ion-loading
          :is-open="is_loading"
          cssClass="my-custom-class"
          message="Please wait..."
      />
      <ion-list>
        <ion-list-header> All Staff Members</ion-list-header>
        <ion-row>
          <ion-col size="12">
            <ion-list>
              <ion-item>
                <ion-select v-model="selected_role" placeholder="Select role">
                  <ion-select-option value="">None</ion-select-option>
                  <ion-select-option value="staff">Staff</ion-select-option>
                  <ion-select-option value="stock-manager">Stock-Manager</ion-select-option>
                </ion-select>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
        <ion-grid>
          <ion-row>
            <ion-col v-for="staff in all_staff" size="6" @click="openSingleStaffModal(staff)">
              <ion-card class="video anim" style="--delay: .5s; border-color: #0d0d0d">
                <img src="https://i.postimg.cc/cHX7WdN6/sup2.jpg" v-if="staff.account_type==='admin'" type="">
                <img src="https://i.postimg.cc/tRcPNSR0/item2.jpg" v-if="staff.account_type==='supplier'"/>
                <img src="https://i.postimg.cc/0Nv7Jzkb/staff2.jpg" v-if="staff.account_type === 'staff'"/>
                <div style="margin-top: auto; color: white; size: 10px; text-align: center">{{ staff.first_name }}</div>
                <h6 style="margin-top: auto; color: white; size: 5px; text-align: center; margin-left: 5px; margin-right: 5px">{{ staff.email }}</h6>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-list>
      <ion-fab slot="fixed" class="mb-3" horizontal="end" vertical="bottom">
        <ion-fab-button id="open-modal" expand="block" @click="addStaff">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <AddStaff ref="addStaff" @closeModel="closeModel()"/>
      <SingleStaff ref="singleStaff" @closeModel="closeModel()" @openUpdateStaffModal="openUpdateStaffModal"/>
      <UpdateStaff ref="updateStaff"/>
    </ion-content>

  </ion-page>

</template>

<script>
import AddStaff from './models/add_staff'
import SingleStaff from './models/view_single_staff'
import UpdateStaff from './models/update_staff'
import {defineComponent} from 'vue';
import {pencil} from 'ionicons/icons';
import staff_apis from "@/apis/modules/admin_apis/staff_apis";
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
} from '@ionic/vue';

import {add} from 'ionicons/icons';
import {useRouter} from "vue-router/dist/vue-router";


export default defineComponent({
  components: {
    AddStaff,
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
    SingleStaff,
    UpdateStaff,
    IonGrid,
    IonCard,
  },
  name: "index",
  data() {
    return {
      is_loading: false,
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

  setup() {
    const router = useRouter();
    return {
      router,
      add,
      pencil
    }
  },

  watch: {
    selected_role() {
      this.getAllStaff(this.selected_role)
    }
  },
  methods: {
    async getAllStaff(selected_role) {
      try {
        // this.startLoading()
        this.is_loading = true
        let respond = (await staff_apis.getAllStaff(selected_role)).data.data.users
        console.log(respond)
        this.all_staff = respond
      } catch (e) {

      }
      this.is_loading = false
    },

    closeModel() {
      this.getAllStaff(this.selected_role)
    },

    openSingleStaffModal(data) {
      this.$refs.singleStaff.handleModel(data)
    },
    openUpdateStaffModal(data) {
      this.$refs.updateStaff.openModal(data)
    },
    addStaff() {
      this.$refs.addStaff.openAddStaffModel()
    },
  },

  mounted() {
    this.getAllStaff(this.selected_role)
  }
});
</script>

<style scoped>

</style>
