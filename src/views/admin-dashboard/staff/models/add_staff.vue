<template>
  <ion-modal :enter-animation="enterAnimation" :is-open="is_open" :leave-animation="leaveAnimation" >
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
                <ion-text color="dark" v-model="form.first_name" autofocus clear-input required spellcheck type="text"></ion-text>
              </ion-col>
              <ion-col size="6">
                <ion-label position="floating">Last Name</ion-label>
                <ion-input v-model="form.last_name" clear-input required type="text"></ion-input>
              </ion-col>
              <ion-col size="6">
                <ion-label position="floating">Email</ion-label>
                <ion-input v-model="form.email" clear-input required type="email"></ion-input>
              </ion-col>
              <ion-col size="6">
                <ion-label position="floating">Mobile</ion-label>
                <ion-input v-model="form.mobile" clear-input required type="number"></ion-input>
              </ion-col>
              <ion-col size="6">
                <ion-label position="floating">Date Of Birth</ion-label>
                <ion-input v-model="form.DOB" clear-input required type="date"></ion-input>
              </ion-col>
              <ion-col size="6">
                <ion-select v-model="form.account_type" placeholder="Select role" required>
                  <ion-select-option value="stock-manager">Stock-Manager</ion-select-option>
                  <ion-select-option value="staff">Staff</ion-select-option>
                  <ion-select-option value="supplier">Supplier</ion-select-option>
                </ion-select>
              </ion-col>
            </ion-row>

            <ion-button :disabled="is_btn_loading" class="mt-5" expand="block" shape="round" style="margin-top: 5%"
                        @click="saveData">
              <ion-spinner :hidden="!is_btn_loading" name="circles"></ion-spinner>
              Save
            </ion-button>
          </ion-grid>
    </ion-content>
  </ion-modal>
</template>

<script>
import staff_api from "@/apis/modules/admin_apis/staff_apis";
import {
  IonModal,
    IonText,
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
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
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
    IonSpinner,
    IonPage,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonText
  },
  name: "add_student",
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
      is_open:false,
      form: {
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
      this.is_open = !this.is_open
      this.$emit('closeModel')
    },
    openAddStaffModel() {
      this.is_open = true
    },
    async saveData() {
      try {
        this.is_btn_loading = true
        await staff_api.saveStaff(this.form)
        await this.successToast('Staff Added Successfully')
        this.dismiss()
      } catch (e) {
        await this.dangerToast(e)
      }
      this.is_btn_loading = false
    },
  },
}
</script>

<style scoped>

</style>
