<template>
    <ion-modal :enter-animation="enterAnimation" :is-open="is_open" :leave-animation="leaveAnimation">
      <ion-content fullscreen>
        <ion-toolbar class="toolbar" style="padding-top: 10px">
          <ion-title style="align-items: center;">ADD STOCK</ion-title>
          <ion-buttons slot="end">
            <ion-button style="--color: white;" @click="dismiss()">X Close</ion-button>
          </ion-buttons>
        </ion-toolbar>
        <ion-grid>
          <ion-row>
            <ion-col size="12">
              <ion-label position="floating">Item</ion-label>
              <ion-select :options="item" v-model="form.item_code" class="u-input" placeholder="Select an Item"
                         ></ion-select>
            </ion-col>
            <ion-col size="6">
              <ion-label position="floating">Quantity</ion-label>
              <ion-input class="u-input" v-model="form.available_stock" clear-input required placeholder="e.g. 12" min="0"
                          type="number"></ion-input>
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
  import StockApis from "@/apis/modules/stock_apis/stock_apis";
  import SupplierApis from '@/apis/modules/supplier_apis/supplier_apis';
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
            available_stock: ''
        }
      }
    },
    methods: {
      dismiss() {
        this.is_open = !this.is_open
        this.$emit('closeModel')
      },
      openAddStockModel() {
        this.is_open = true
      },

      async getAllItems() {
      try {
        this.is_table_loading = true
        let respond = (await SupplierApis.getAll()).data.data.items
        this.item = respond.map((e, index) => ({
          value: e._id,
          label: e.name,
        }))
      } catch (e) {

      }
      this.is_table_loading = false
    },

      async saveData() {
        try {
          this.is_btn_loading = true
          await StockApis.createStock(this.form)
          await this.successToast('Stock Added Successfully')
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
  