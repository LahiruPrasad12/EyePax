<template>
  <ion-modal :enter-animation="enterAnimation" :is-open="is_model_open" :leave-animation="leaveAnimation">
    <ion-content fullscreen>
      <ion-loading
          :is-open="is_loading"
          cssClass="my-custom-class"
          message="Please wait..."
      />
      <ion-toolbar class="toolbar" style="padding-top: 10px; ">
        <ion-title>{{ Item.name }}'s Details</ion-title>

        <ion-buttons slot="end">
          <ion-button @click="closeModel">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-card>
        <ion-card-header>
          <ion-card-title>{{ Item.name }}</ion-card-title>
          <ion-card-subtitle>{{ Item.item_code }}</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          <ion-row>
            <ion-col size="3">
              <ion-label>
                  Item Code
              </ion-label>
              <ion-text color="medium">
                <h6>{{ Item.item_code }}</h6>
              </ion-text>

            </ion-col>
            <ion-col size="3">
              <ion-label>Brand</ion-label>
              <ion-text color="medium">
                <h6>{{ Item.brand }}</h6>
              </ion-text>

            </ion-col>
            <ion-col size="6">
              <ion-label>Name</ion-label>
              <ion-text color="medium">
                <h6>{{ Item.name }}</h6>
              </ion-text>
            </ion-col>
            <ion-col size="3">
              <ion-label>Quantity</ion-label>
              <ion-text color="medium">
                <h6>{{ Item.qty }}</h6>
              </ion-text>
            </ion-col>
            <ion-col size="3">
              <ion-label>Price</ion-label>
              <ion-text color="medium">
                <h6>{{ Item.price }}</h6>
              </ion-text>
            </ion-col>
            <ion-col size="6">
              <ion-label>Shipping Date</ion-label>
              <ion-text color="medium">
                <h6>{{ new Date(Item.created_at).toDateString() }}</h6>
              </ion-text>
            </ion-col>
          </ion-row>
          <ion-text color="medium">
            {{ Item.description }}
          </ion-text>

        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-item>
          <ion-label>Update Shipping Item</ion-label>
        </ion-item>

        <ion-card-content style="margin-top: 20px">
          <ion-select v-model="selected_status" placeholder="Select status">
            <ion-select-option value="">None</ion-select-option>
            <ion-select-option value="draft">Draft</ion-select-option>
            <ion-select-option value="pending">Pending</ion-select-option>
            <ion-select-option value="shipped">Shipped</ion-select-option>
          </ion-select>
        </ion-card-content>
      </ion-card>
    </ion-content>

  </ion-modal>
</template>

<script>
import trackingAPI from "@/apis/modules/admin_apis/tracking";
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
      Item: {},
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
        this.getSingleItem(data)
      }
      this.is_model_open = true

    },

    async getSingleItem(data) {
      try {
        this.is_loading = true
        this.data = data
        this.Item = (await trackingAPI.getItem(data._id)).data.data.Item
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
          await trackingAPI.UpdateShippingItems(this.data._id, payload)
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
