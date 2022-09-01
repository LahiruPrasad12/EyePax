<template>
  <ion-modal :is-open="is_model_open" :enter-animation="enterAnimation" :leave-animation="leaveAnimation" >
    <ion-content fullscreen>
      <ion-toolbar>
        <ion-title>Add Staff</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="dismiss()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-grid>
        <ion-row>
          <ion-col size="6">
            <ion-label position="floating">First Name</ion-label>
            <ion-input v-model="form.first_name" autofocus clear-input spellcheck type="text" required></ion-input>
          </ion-col>
          <ion-col size="6">
            <ion-label position="floating">Last Name</ion-label>
            <ion-input v-model="form.last_name" clear-input type="text" required></ion-input>
          </ion-col>
          <ion-col size="6">
            <ion-label position="floating">Email</ion-label>
            <ion-input v-model="form.email" clear-input type="email" required></ion-input>
          </ion-col>
          <ion-col size="6">
            <ion-label position="floating">Mobile</ion-label>
            <ion-input v-model="form.mobile" clear-input type="number" required></ion-input>
          </ion-col>
          <ion-col size="6">
            <ion-label position="floating">Date Of Birth</ion-label>
            <ion-input :value="form.DOB" v-model="form.DOB" clear-input type="date" required></ion-input>
          </ion-col>
          <ion-col size="6">
            <ion-label position="floating">Select Role</ion-label>
            <ion-select v-model="form.account_type" placeholder="Select role" required>
              <ion-select-option value="stock-manager">Stock-Manager</ion-select-option>
              <ion-select-option value="staff">Staff</ion-select-option>
            </ion-select>
          </ion-col>
        </ion-row>

        <ion-button :disabled="is_btn_loading" class="mt-5" expand="block" shape="round" style="margin-top: 5%" @click="updateStaff">
          <ion-spinner :hidden="!is_btn_loading" name="circles"></ion-spinner>
          Update
        </ion-button>
      </ion-grid>
    </ion-content>
  </ion-modal>
</template>

<script>
import staff_api from "@/apis/modules/admin_apis/staff_apis";
import {
  IonModal,
  IonContent,
  IonToolbar,
  IonButton,
  IonTitle,
  IonItem,
  IonList,
  IonLabel,
  IonAvatar,
  IonImg,
  IonButtons,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  createAnimation
} from "@ionic/vue";

export default {
  components: {
    IonModal,
    IonContent,
    IonToolbar,
    IonButton,
    IonTitle,
    IonItem,
    IonList,
    IonLabel,
    IonAvatar,
    IonImg,
    IonButtons,
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonSpinner
  },
  name: "update_staff",
  setup() {
    const enterAnimation = (baseEl) => {
      const root = baseEl.shadowRoot;

      const backdropAnimation = createAnimation()
          .addElement(root.querySelector('ion-backdrop'))
          .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

      const wrapperAnimation = createAnimation()
          .addElement(root.querySelector('.modal-wrapper'))
          .keyframes([
            {offset: 0, opacity: '0', transform: 'scale(0)'},
            {offset: 1, opacity: '0.99', transform: 'scale(1)'},
          ]);

      return createAnimation()
          .addElement(baseEl)
          .easing('ease-out')
          .duration(500)
          .addAnimation([backdropAnimation, wrapperAnimation]);
    };

    const leaveAnimation = (baseEl) => {
      return enterAnimation(baseEl).direction('reverse');
    };
    return {enterAnimation, leaveAnimation};
  },
  data() {
    return {
      is_btn_loading: false,
      is_model_open: false,
      form: {
        _id:'',
        first_name: '',
        last_name: '',
        email: '',
        DOB: '',
        mobile: '',
        account_type: ''
      }
    }
  },
  methods: {
    dismiss() {
      this.is_model_open = !this.is_model_open
      this.$emit('closeModel')
    },
    async updateStaff() {
      try {
        this.is_btn_loading = true
        await staff_api.updateStaff(this.form)
        await this.successToast('Staff updated Successfully')
        this.dismiss()
      } catch (e) {
        await this.dangerToast(e)
      }
      this.is_btn_loading = false
    },

    openModal(data){
      this.is_model_open = !this.is_model_open
      this.form = data
      console.log(this.form)
    }
  },
}
</script>

<style scoped>

</style>
