<template>
  <ion-modal :enter-animation="enterAnimation" :is-open="is_model_open" :leave-animation="leaveAnimation">
    <ion-content fullscreen>
      <ion-loading
          :is-open="is_loading"
          cssClass="my-custom-class"
          message="Please wait..."
      />
      <ion-toolbar class="toolbar" style="padding-top: 10px; ">
        <ion-title>{{ Request1._id }}'s Details</ion-title>

        <ion-buttons slot="end">
          <ion-button style="--color: white;" @click="closeModel">X Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-card>
        <ion-card-header>
          <ion-card-title>{{ Request1._id }}</ion-card-title>
          <ion-card-subtitle>Request ID</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          <ion-row>
            <ion-col size="3">
              <ion-label>
                  Supplier ID
              </ion-label>
              <ion-text color="medium">
                <h6>{{ Request1.supplier_id }}</h6>
              </ion-text>

            </ion-col>
            <ion-col size="3">
              <ion-label>Status</ion-label>
              <ion-text color="medium">
                <h6>{{ Request1.status }}</h6>
              </ion-text>

            </ion-col>
            <ion-col size="6">
              <ion-label>Updated At</ion-label>
              <ion-text color="medium">
                <h6>{{ Request1.updated_at }}</h6>
              </ion-text>
            </ion-col>
            <ion-col size="3">
              <ion-label>Recived Date</ion-label>
              <ion-text color="medium">
                <h6>{{ Request1.created_at }}</h6>
              </ion-text>
            </ion-col>
            <ion-col size="3">
              <ion-label>Due Date</ion-label>
              <ion-text color="medium">
                <h6>{{ Request1.due_date }}</h6>
              </ion-text>
            </ion-col>
          </ion-row>
          <ion-text color="medium">
            <ion-label>Request Details</ion-label>
            {{ Request1.request }}
          </ion-text>

        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-item>
          <ion-label>Update Request</ion-label>
        </ion-item>

        <ion-card-content style="margin-top: 20px" v-if="Request1.status === 'Pending'">
          <ion-select v-model="selected_status" placeholder="Select Status">
            <ion-select-option value="Pending">Pending</ion-select-option>
            <ion-select-option value="Approved">Approved</ion-select-option>
            <ion-select-option value="Declined">Declined</ion-select-option>
          </ion-select>
        </ion-card-content>
        <ion-card-content style="margin-top: 20px" v-else>
          <ion-select v-model="selected_status" placeholder="Select Status" value="disabled" disabled>
            <ion-select-option value="Pending">Pending</ion-select-option>
            <ion-select-option value="Approved">Approved</ion-select-option>
            <ion-select-option value="Declined">Declined</ion-select-option>
          </ion-select>
        </ion-card-content>
      </ion-card>
    </ion-content>

  </ion-modal>
</template>

<script>
import SupplierApis from "@/apis/modules/supplier_apis/supplier_apis";
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
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonIcon,
  IonLoading,
  IonBackButton,
  IonText,
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
    IonCardSubtitle,
    IonIcon,
    IonLoading,
    IonBackButton,
    IonText
  },
  name: "single_shipping",
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
      is_model_open: false,
      Request1: {},
      is_loading: false,
      selected_status: '',
      data: {},
    }
  },
  watch: {
    'selected_status'(val) {
      if (val) {
        this.is_loading = true
        this.updateState()
      }
    }
  },
  methods: {
    handleModel(data) {
      if (data) {
        this.getSingleRequest(data)
      }
      this.is_model_open = true

    },

    async getSingleRequest(data) {
      try {
        this.is_loading = true
        this.data = data
        this.Request1 = (await SupplierApis.getRequest(data.request)).data.data.Request1
        this.selected_status = data.status
      } catch (e) {

      }
      this.is_loading = false
    },

    async updateState() {
      try {
        if (this.selected_status !== this.data.status) {
          this.is_loading = true
          let payload = {
            status: this.selected_status
          }
          await SupplierApis.updateRequest(this.data._id, payload)
          this.closeModel()
        }
      } catch (e) {

      }
      this.is_loading = false
    },

    closeModel() {
      this.is_model_open = !this.is_model_open
      this.$emit('closeSingleShippingModel')

    }
  }
}
</script>

<style scoped>

</style>
