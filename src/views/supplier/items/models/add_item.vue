<template>
  <ion-modal :enter-animation="enterAnimation" :is-open="is_open" :leave-animation="leaveAnimation">
    <ion-content fullscreen>
      <ion-toolbar class="toolbar" style="padding-top: 10px">
        <ion-title style="align-items: center;">ADD ITEM</ion-title>
        <ion-buttons slot="end">
          <ion-button style="--color: white;" @click="dismiss()">X Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-grid>
        <ion-row>
          <ion-col size="6">
            <ion-label position="floating">*Item Code</ion-label>
            <ion-input v-model="item_code" name="item_code" class="u-input" maxlength="10" placeholder="e.g. EP-XXXX" type="text"></ion-input>
            <ion-row v-show="item_codeError" class="ion-text-start">
              <ion-col size="12">
                <ion-text color="danger">
                  <span>{{ item_codeError }}</span>
                </ion-text>
              </ion-col>
            </ion-row>
          </ion-col>
          <ion-col size="6">
            <ion-label position="floating">*Item Name</ion-label>
            <ion-input class="u-input" v-model="name" name="name" clear-input required type="text" maxlength="50" placeholder="e.g. Cement"></ion-input>
            <ion-row v-show="nameError" class="ion-text-start">
              <ion-col size="12">
                <ion-text color="danger">
                  <span>{{ nameError }}</span>
                </ion-text>
              </ion-col>
            </ion-row>
          </ion-col>
          <ion-col size="6">
            <ion-label position="floating">*Brand</ion-label>
            <ion-input class="u-input" v-model="brand" name="brand" clear-input required type="text" maxlength="30" placeholder="e.g. Ramco/S-lon"></ion-input>
            <ion-row v-show="brandError" class="ion-text-start">
              <ion-col size="12">
                <ion-text color="danger">
                  <span>{{ brandError }}</span>
                </ion-text>
              </ion-col>
            </ion-row>
          </ion-col>
          <ion-col size="6">
            <ion-label position="floating">*Price</ion-label>
            <ion-input class="u-input" v-model="price" name="price" clear-input required type="number" min="0" placeholder="e.g. 10,000LKR" @keydown="$event.key === '-' ? $event.preventDefault() : null"></ion-input>
            <ion-row v-show="priceError" class="ion-text-start">
              <ion-col size="12">
                <ion-text color="danger">
                  <span>{{ priceError }}</span>
                </ion-text>
              </ion-col>
            </ion-row>
          </ion-col>
          <ion-col size="6">
            <ion-label position="floating">*Quantity</ion-label>
            <ion-input class="u-input" v-model="qty" name="qty" clear-input required type="number" min="0" maxlength="10" placeholder="e.g. 12" @keydown="$event.key === '-' ? $event.preventDefault() : null"></ion-input>
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
            <ion-select class="u-input" v-model="enabled" name="enabled" placeholder="Select Status" required>
              <ion-select-option value="true">Active</ion-select-option>
              <ion-select-option value="false">Disable</ion-select-option>
            </ion-select>
            <ion-row v-show="enabledError" class="ion-text-start">
              <ion-col size="12">
                <ion-text color="danger">
                  <span>{{ enabledError }}</span>
                </ion-text>
              </ion-col>
            </ion-row>
          </ion-col>
          <ion-col size="12">
            <ion-label position="floating">Description</ion-label>
            <ion-textarea class="u-input" v-model="description" clear-input type="text" maxlength="1000" style="height:100px;" placeholder="e.g. Lorem Ipsum is simply dummy text of the printing and typesetting industry...." ></ion-textarea>
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
import { defineRule, useField, useForm } from "vee-validate";
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
    defineRule("requireditem_code", (value) => {
      if (!value || !value.length) {
        return "Item Code is required!";
      }
      return true;
    });

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

    defineRule("requiredenabled", (value) => {
      if (!value || !value.length) {
        return "Status is required!";
      }
      return true;
    });

    function validation() {
      return theForm.validate();
    }

    const schema = {
      item_code: "requireditem_code",
      name: "requiredname",
      brand: "requiredbrand",
      price: "requiredprice",
      qty: "requiredqty",
      enabled: "requiredenabled"
    };

    const theForm = useForm({
      validationSchema: schema,
    });

    const { value: item_code, errorMessage: item_codeError } = useField("item_code");
    const { value: name, errorMessage: nameError } = useField("name");
    const { value: brand, errorMessage: brandError } = useField("brand");
    const { value: price, errorMessage: priceError } = useField("price");
    const { value: qty, errorMessage: qtyError } = useField("qty");
    const { value: enabled, errorMessage: enabledError } = useField("enabled");

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
    return {enterAnimation, leaveAnimation, calendarOutline, item_codeError, nameError, brandError, priceError, qtyError, enabledError, item_code, name, brand, price, qty, enabled, theForm, validation};
  },

  data() {
    return {
      is_btn_loading: false,
      is_open: false,
      v:"",
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
        this.v = (await this.validation());
      if (this.v.valid) {
        let payload = {item_code:this.item_code,name:this.name,brand:this.brand,price:this.price,qty:this.qty,enabled:this.enabled,description:this.description}
        this.is_btn_loading = true
        await SupplierApis.createItem(payload)
        await this.successToast('Item Added Successfully')
        this.dismiss()
      }
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
