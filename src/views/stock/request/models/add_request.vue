<template>
  <ion-modal :enter-animation="enterAnimation" :is-open="is_open" :leave-animation="leaveAnimation">
    <ion-content fullscreen>
      <ion-toolbar class="toolbar" style="padding-top: 10px">
        <ion-title style="align-items: center;">CREATE REQUEST</ion-title>
        <ion-buttons slot="end">
          <ion-button style="--color: white;" @click="dismiss()">X Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-grid>
        <ion-row>
          <ion-col size="6">
            <ion-label position="floating">*Seller</ion-label>
            <ion-select :options="item" v-model="form.supplier_id" class="u-input" placeholder="Select a Seller"
                       ></ion-select>
          </ion-col>
          <ion-col size="6">
            <ion-label position="floating">*Due Date</ion-label>
            <ion-input class="u-input" v-model="form.due_date" clear-input required type="date" ></ion-input>
          </ion-col>
          <ion-col size="12">
            <ion-label position="floating">*Request</ion-label>
            <ion-textarea class="u-input" v-model="form.description" clear-input type="text" maxlength="1000" style="height:100px;" placeholder="e.g. Lorem Ipsum is simply dummy text of the printing and typesetting industry...." ></ion-textarea>
          </ion-col>
        </ion-row>

        <ion-button :disabled="is_btn_loading" class="mt-5" expand="block" shape="round" style="margin-top: 5%"
                    @click="saveData">
          <ion-spinner :hidden="!is_btn_loading" name="circles"></ion-spinner>
          Add
        </ion-button>
      </ion-grid>
    </ion-content>
  </ion-modal>
</template>

<script>
import SupplierApis from "@/apis/modules/supplier_apis/supplier_apis";
import {
  addCircleOutline,
  arrowDownCircleOutline,
  arrowForwardCircleOutline,
  arrowForwardOutline,
  cafeOutline,
  calendarOutline,
  removeCircleOutline,
  timeOutline,
  minusOutline,
} from 'ionicons/icons';
import {
  IonModal,
  IonText,
  IonIcon,
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
  IonTextarea,
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
    IonText,
    IonTextarea,
    IonIcon
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
    return {enterAnimation, leaveAnimation, calendarOutline};
  },

  data() {
    return {
      is_btn_loading: false,
      is_open: false,
      form: {
        item_code: '',
        name: '',
        qty: '',
        price: '',
        brand: '',
        description: '',
        enabled: ''
      }
    }
  },
  methods: {
    dismiss() {
      this.is_open = !this.is_open
      this.$emit('closeModel')
    },
    openAddRequestModel() {
      this.is_open = true
    },
    async saveData() {
      try {
        this.is_btn_loading = true
        await SupplierApis.createItem(this.form)
        await this.successToast('Request Sent Successfully')
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
