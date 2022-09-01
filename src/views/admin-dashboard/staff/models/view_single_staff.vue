<template>
  <ion-modal :is-open="is_model_open">
    <ion-content>
      <ion-toolbar>
        <ion-title>Modal</ion-title>
        <ion-buttons slot="end">
          <ion-button color="light" @click="closeModel()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-list>
        <ion-item>
          <ion-row>
            <ion-col size="12" >
              <ion-avatar>
                <ion-img src="https://i.pravatar.cc/300?u=b"></ion-img>
              </ion-avatar>
            </ion-col>
            <ion-col size="12">
              <ion-text color="dark">
                <h1>{{single_staff.first_name}} {{single_staff.last_name}}</h1>
              </ion-text>
            </ion-col>
            <ion-col size="12">
              <ion-text color="dark">
                <h3>Date Of Birth : {{single_staff.DOB}}</h3>
              </ion-text>
            </ion-col>
            <ion-col size="12">
              <ion-text color="dark">
                <h3>Role : {{single_staff.account_type}}</h3>
              </ion-text>
            </ion-col>
            <ion-col size="12">
              <ion-text color="dark">
                <h3>Gmail : {{single_staff.email}}</h3>
              </ion-text>
            </ion-col>
            <ion-col size="12">
              <ion-text color="dark">
                <h3>Mobile : {{single_staff.mobile}}</h3>
              </ion-text>
            </ion-col>
            <ion-col size="6">
              <ion-button color="secondary" expand="block" shape="round" @click="updateStaff">
                Edit
              </ion-button>
            </ion-col>
            <ion-col size="6">
              <ion-button color="danger" :disabled="is_btn_loading" expand="block" shape="round" style="margin-top: 5%" @click="confirmRequest">
                <ion-spinner :hidden="!is_btn_loading" name="circles"></ion-spinner>
                Delete
              </ion-button>
            </ion-col>
          </ion-row>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-modal>
</template>

<script>
import staff_apis from "@/apis/modules/admin_apis/staff_apis";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonItem,
  IonList,
  IonAvatar,
  IonImg,
  IonLabel,
  IonRow,
  IonCol,
  IonText, alertController,
    IonSpinner
} from '@ionic/vue';
import {defineComponent} from 'vue';

export default defineComponent({
  components: {
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonItem,
    IonList,
    IonAvatar,
    IonImg,
    IonLabel,
    IonRow,
    IonCol,
    IonText,
    IonSpinner
  },
  data() {
    return {
      is_btn_loading:false,
      single_staff: {},
      is_model_open: false
    }
  },
  methods: {
    handleModel(data) {
      this.single_staff = data
      this.is_model_open = !this.is_model_open
    },

    closeModel(){
      this.is_model_open = !this.is_model_open

    },

    updateStaff(){
      this.$emit('openUpdateStaffModal', this.single_staff)
      this.is_model_open = !this.is_model_open
    },


    async confirmRequest() {
      const alert = await alertController.create({
        header: 'Are you sure?',
        cssClass: 'custom-alert',
        buttons: [
          {
            text: 'No',
            cssClass: 'alert-button-cancel',
          },
          {
            text: 'Yes',
            cssClass: 'alert-button-confirm',
            handler : ()=>{
              this.deleteUser()
            }
          },
        ],
      });

      await alert.present();
    },

    async deleteUser(){
      try{
        console.log(this.single_staff)
        this.is_btn_loading = true
        await staff_apis.deleteStaff(this.single_staff._id)
        await this.successToast('User Delete Successfully')
        this.$emit('closeModel')
        this.closeModel()
      }catch (e){
        await this.dangerToast(e)
      }
      this.is_btn_loading = false
    }
  },
});
</script>


<style scoped>
ion-modal {
  --height: 50%;
  --border-radius: 16px;
  --box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

ion-modal::part(backdrop) {
  background: rgba(209, 213, 219);
  opacity: 1;
}

ion-modal ion-toolbar {
  --background: rgb(14 116 144);
  --color: white;
}
</style>
