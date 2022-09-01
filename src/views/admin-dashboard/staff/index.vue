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
                <ion-select placeholder="Select role" v-model="selected_role">
                  <ion-select-option value="staff">Staff</ion-select-option>
                  <ion-select-option value="stock-manager">Stock-Manager</ion-select-option>
                </ion-select>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
        <ion-item @click="openSingleStaffModal(staff)" v-for="staff in all_staff">
          <ion-avatar slot="start">
            <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y">
          </ion-avatar>
          <ion-label>
            <ion-row>
              <ion-col class="col-fist" size="10">
                <h2>{{ staff.first_name }} {{ staff.last_name }}</h2>
              </ion-col>
              <ion-col class="col-fist" size="2">
                <h2><a ><ion-icon :icon="pencil"></ion-icon></a></h2>
              </ion-col>
            </ion-row>
            <h3>{{ staff.email }}</h3>
            <p>{{ staff.account_type }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
      <ion-fab slot="fixed" class="mb-3" horizontal="end" vertical="bottom">
        <ion-fab-button id="open-modal" expand="block">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
    <AddStaff @closeModel="closeModel()"/>
    <SingleStaff @openUpdateStaffModal="openUpdateStaffModal" @closeModel="closeModel()" ref="singleStaff"/>
    <UpdateStaff ref="updateStaff"/>
  </ion-page>

</template>

<script>
import AddStaff from './models/add_staff'
import SingleStaff from './models/view_single_staff'
import UpdateStaff from './models/update_staff'
import {defineComponent} from 'vue';
import {pencil} from 'ionicons/icons';
import staff_apis from "@/apis/modules/admin_apis/staff_apis";
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
    UpdateStaff
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

  watch:{
    selected_role(){
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

    openSingleStaffModal(data){
      this.$refs.singleStaff.handleModel(data)
    },
    openUpdateStaffModal(data){
      console.log(data)
      this.$refs.updateStaff.openModal(data)
    }
  },

  mounted() {
    this.getAllStaff(this.selected_role)
  }
});
</script>

<style scoped>

</style>
