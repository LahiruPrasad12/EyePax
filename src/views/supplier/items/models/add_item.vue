<template>
  <ion-modal :enter-animation="enterAnimation" :is-open="is_open" :leave-animation="leaveAnimation">
    <ion-content fullscreen>
      <ion-toolbar class="toolbar" style="padding-top: 10px">
        <ion-title style="margin-left: 20%">ADD ITEM</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="dismiss()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-grid>
        <ion-row>
          <ion-col size="6">
            <ion-label position="floating">Item Code</ion-label>
            <ion-input v-model="form.item_code" class="u-input" maxlength="10" placeholder="e.g. EP-XXXX"
                       type="text"></ion-input>
          </ion-col>
          <ion-col size="6">
            <ion-label position="floating">Item Name</ion-label>
            <ion-input class="u-input" v-model="form.name" clear-input required type="text" maxlength="50" placeholder="e.g. Cement"></ion-input>
          </ion-col>
          <ion-col size="6">
            <ion-label position="floating">Brand</ion-label>
            <ion-input class="u-input" v-model="form.brand" clear-input required type="text" maxlength="30" placeholder="e.g. Ramco/S-lon"></ion-input>
          </ion-col>
          <ion-col size="6">
            <ion-label position="floating">Price</ion-label>
            <ion-input class="u-input" v-model="form.price" clear-input required type="number" placeholder="e.g. 10,000LKR"></ion-input>
          </ion-col>
          <ion-col size="6">
            <ion-label position="floating">Quantity</ion-label>
            <ion-input class="u-input" v-model="form.qty" clear-input required type="number" maxlength="10" placeholder="e.g. 12"></ion-input>
          </ion-col>
          <ion-col size="6">
            <ion-label position="floating">Availabitlity</ion-label>
            <ion-select class="u-input" v-model="form.enabled" placeholder="Select Status" required>
              <ion-select-option value="true">Active</ion-select-option>
              <ion-select-option value="false">Deactive</ion-select-option>
            </ion-select>
          </ion-col>
          <ion-col size="12">
            <ion-label position="floating">Description</ion-label>
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
    openAddItemModel() {
      this.is_open = true
    },
    async saveData() {
      try {
        this.is_btn_loading = true
        await SupplierApis.createItem(this.form)
        await this.successToast('Item Added Successfully')
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
