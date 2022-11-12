<template>
  <ion-modal :is-open="is_model_open" :enter-animation="enterAnimation" :leave-animation="leaveAnimation" >
    <ion-content fullscreen>
      <ion-toolbar class="toolbar" style="padding-top: 10px">
        <ion-title style="align-items: center;">Update {{item_code}}</ion-title>
        <ion-buttons slot="end">
          <ion-button style="--color: white;" @click="dismiss()">X Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-grid>
        <ion-row>
          <ion-col size="6">
            <ion-label position="floating">Item Code</ion-label>
            <ion-input class="u-input" v-model="item_code" name="item_code" autofocus clear-input spellcheck type="text" maxlength="10" placeholder="e.g. EP-XXXX" value="disabled" disabled></ion-input>
          </ion-col>
          <ion-col size="6">
            <ion-label position="floating">Item Name</ion-label>
            <ion-input class="u-input" v-model="name" name="name" clear-input type="text" maxlength="50" placeholder="e.g. Cement"></ion-input>
            <ion-row v-show="nameError" class="ion-text-start">
              <ion-col size="12">
                <ion-text color="danger">
                  <span>{{ nameError }}</span>
                </ion-text>
              </ion-col>
            </ion-row>
          </ion-col>
          <ion-col size="6">
            <ion-label position="floating">Brand</ion-label>
            <ion-input class="u-input" v-model="brand" name="brand" clear-input type="text" maxlength="30" placeholder="e.g. Ramco/S-lon"></ion-input>
            <ion-row v-show="brandError" class="ion-text-start">
              <ion-col size="12">
                <ion-text color="danger">
                  <span>{{ brandError }}</span>
                </ion-text>
              </ion-col>
            </ion-row>
          </ion-col>
          <ion-col size="6">
            <ion-label position="floating">Price</ion-label>
            <ion-input class="u-input" v-model="price" name="price" clear-input type="number" placeholder="e.g. 10,000LKR"></ion-input>
            <ion-row v-show="priceError" class="ion-text-start">
              <ion-col size="12">
                <ion-text color="danger">
                  <span>{{ priceError }}</span>
                </ion-text>
              </ion-col>
            </ion-row>
          </ion-col>
          <ion-col size="6">
            <ion-label position="floating">Quantity</ion-label>
            <ion-input class="u-input" v-model="qty" name="qty" clear-input type="number" maxlength="10" placeholder="e.g. 12"></ion-input>
            <ion-row v-show="qtyError" class="ion-text-start">
              <ion-col size="12">
                <ion-text color="danger">
                  <span>{{ qtyError }}</span>
                </ion-text>
              </ion-col>
            </ion-row>
          </ion-col>
          <ion-col size="6">
          <ion-label position="floating">Availabitlity</ion-label>
          <ion-select class="u-input" v-model="enabled" placeholder="Select Status">
            <ion-select-option value = "true" >Active</ion-select-option>
            <ion-select-option value = "false" > Disable</ion-select-option>
          </ion-select>
        </ion-col>
          <ion-col size="12">
            <ion-label position="floating">Description</ion-label>
            <ion-textarea class="u-input" v-model="description" clear-input type="text" maxlength="1000" style="height:100px;" placeholder="e.g. Lorem Ipsum is simply dummy text of the printing and typesetting industry...."></ion-textarea>
          </ion-col>
        </ion-row>

        <ion-button :disabled="is_btn_loading" class="mt-5" expand="block" shape="round" style="margin-top: 5%" @click="updateItem">
          <ion-spinner :hidden="!is_btn_loading" name="circles"></ion-spinner>
          Update
        </ion-button>
      </ion-grid>
    </ion-content>
  </ion-modal>
</template>

<script>
import SupplierApis from "@/apis/modules/supplier_apis/supplier_apis";
import { defineRule, useField, useForm } from "vee-validate";
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
    IonTextarea,
    IonSpinner
  },
  name: "update_staff",
  setup() {
    defineRule("requiredname", (value) => {
      if (!value || !value.length) {
        return "Item Name is required!";
      }
      return true;
    });

    defineRule("requiredbrand", (value) => {
      if (!value || !value.length) {
        return "Brand is required!";
      }
      return true;
    });

    defineRule("requiredprice", (value) => {
      if (!value || !value.length) {
        return "Price is required!";
      }
      return true;
    });

    defineRule("requiredqty", (value) => {
      if (!value || !value.length) {
        return "Quantity is required!";
      }
      return true;
    });

    function validation() {
      return theForm.validate();
    }

    const schema = {
      name: "requiredname",
      brand: "requiredbrand",
      price: "requiredprice",
      qty: "requiredqty"
    };

    const theForm = useForm({
      validationSchema: schema,
    });

    const { value: name, errorMessage: nameError } = useField("name");
    const { value: brand, errorMessage: brandError } = useField("brand");
    const { value: price, errorMessage: priceError } = useField("price");
    const { value: qty, errorMessage: qtyError } = useField("qty");

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
    return {enterAnimation, leaveAnimation, nameError, brandError, priceError, qtyError, name, brand, price, qty, theForm, validation};
  },
  data() {
    return {
      is_btn_loading: false,
      is_model_open: false,
      v:"",
      form: {
        _id:'',
        item_code:'',
        name: '',
        brand: '',
        price: '',
        qty: '',
        status: '',
        enabled: '',
        description: ''
      }
    }
  },
  methods: {
    dismiss() {

      this.is_model_open = !this.is_model_open
      this.$emit('closeModel')
    },
    async updateItem() {
      try {
        this.v = (await this.validation());
      if (this.v.valid) {
        let payload = {item_code:this.item_code,name:this.name,brand:this.brand,price:this.price,qty:this.qty,enabled:this.enabled,description:this.description}
        console.log(this.form)
        this.is_btn_loading = true
        await SupplierApis.updateItem(this.form._id, payload)
        await this.successToast('Item Updated Successfully')
        this.dismiss();
      }
        
      } catch (e) {
        await this.dangerToast(e)
      }
      this.is_btn_loading = false
    },

    openModal(data){
      this.is_model_open = !this.is_model_open
      this.form = data
      this.item_code = data.item_code
      this.name = data.name
      this.brand = data.brand
      this.price = data.price
      this.qty = data.qty
      this.enabled = data.enabled
      this.description = data.description
    }
  },
}
</script>

<style scoped>

</style>
