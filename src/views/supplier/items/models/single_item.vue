<template>
  <ion-modal :is-open="is_model_open">
    <ion-content>
      <ion-toolbar>
        <ion-title >{{ item.item_code }}</ion-title>
        <ion-buttons slot="end">
          <ion-button style="--color: white;" @click="closeModel()">X Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-list>
        <ion-item style="text-align: center">
          <ion-row style="padding-top: 5%">
           <!-- <ion-col size="12">
             <ion-avatar style="display: flex;justify-content: center;">
               <ion-img src="https://i.postimg.cc/QMkZFG1K/layers-animat.gif"></ion-img>
             </ion-avatar>
           </ion-col> -->
            <ion-col size="6">
              <ion-label style="font-weight:500">Item Code</ion-label>
              <ion-text color="medium">
                <h6>{{ item.item_code }}</h6>
              </ion-text>
            </ion-col>
            <ion-col size="6">
              <ion-label style="font-weight:500">Item Name</ion-label>
              <ion-text color="medium">
                <h6> {{ item.name }}</h6>
              </ion-text>
            </ion-col>
            <ion-col size="6">
              <ion-label style="font-weight:500">Brand</ion-label>
              <ion-text color="medium">
                <h6>{{ item.brand }}</h6>
              </ion-text>
            </ion-col>
            <ion-col size="6">
              <ion-label style="font-weight:500">Price</ion-label>
              <ion-text color="medium">
                <h6>{{ item.price }}</h6>
              </ion-text>
            </ion-col>
            <ion-col size="6">
              <ion-label style="font-weight:500">Quantity</ion-label>
              <ion-text color="medium">
                <h6>{{ item.qty }}</h6>
              </ion-text>
            </ion-col>
            <ion-col size="6">
              <ion-label style="font-weight:500">Status</ion-label>
              <ion-text color="medium">
                <h6>{{ item.enabled?"Active":"Disable" }}</h6>
              </ion-text>
            </ion-col>
            <ion-col size="12">
              <ion-label style="font-weight:500">Description</ion-label>
              <ion-text color="medium">
                <h6>{{ item.description }}</h6>
              </ion-text>
            </ion-col>
            <ion-col size="6">
              <ion-button style="margin-top: 5%" color="secondary" expand="block" shape="round" @click="updateItem">
                Edit
              </ion-button>
            </ion-col>
            <ion-col size="6">
              <ion-button :disabled="is_btn_loading" color="danger" expand="block" shape="round" style="margin-top: 5%"
              @click="confirmRequest"        >
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
import SupplierApis from "@/apis/modules/supplier_apis/supplier_apis";
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
      is_btn_loading: false,
      item: {},
      is_model_open: false
    }
  },
  methods: {
    handleModel(data) {
      this.item = data
      this.is_model_open = !this.is_model_open
    },

    closeModel() {
      this.is_model_open = !this.is_model_open

    },

    updateItem() {
      this.$emit('openUpdateItemModal', this.item)
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
            handler: () => {
              this.deleteItem()
            }
          },
        ],
      });

      await alert.present();
    },

    async deleteItem() {
      try {
        console.log(this.item)
        this.is_btn_loading = true
        await SupplierApis.deleteItem(this.item._id)
        await this.successToast('Item Removed Successfully')
        this.$emit('closeModel')
        this.closeModel()
      } catch (e) {
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
