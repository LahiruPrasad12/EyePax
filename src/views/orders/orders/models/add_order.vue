<template>
    <ion-modal ref="modal" trigger="open-modal" :is-open="is_model_open">
        <ion-content>
            <ion-toolbar>
                <ion-title>Add Order</ion-title>
                <ion-buttons slot="end">
                    <ion-button style="--color: white;" @click="closeModel()">X Close</ion-button>
                </ion-buttons>
            </ion-toolbar>
            <v-form v-slot="{ values, errors }" @submit="saveData">
                <ion-list>
                    <ion-item>
                        <ion-label position="floating">Order Id</ion-label>
                        <ion-input :value="form.id" autofocus clear-input spellcheck type="text" :disabled="true">
                        </ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="floating">*Item</ion-label>
                        <v-field name="item" v-slot="{ field }" :rules="isRequired">
                            <ion-select v-bind="field" name="item" :interface-options="customAlertOptions"
                                interface="alert" placeholder="Select Item" :compareWith="compareWith"
                                @ionChange="form.item = $event.detail.value">
                                <ion-select-option v-for="items in item" :value="items">{{ items.label }}
                                </ion-select-option>
                            </ion-select>
                        </v-field>
                    </ion-item>
                    <v-error-message name="item" class="error" />
                    <ion-item>
                        <ion-label position="floating">*Qty</ion-label>
                        <v-field name="qty" v-slot="{ field }" :rules="isRequired">
                            <ion-input v-bind="field" name="qty" :value="form.qty"
                                @ionInput="form.qty = $event.target.value" type="number" min="0" maxlength="10"
                                placeholder="e.g. 12" @keydown="$event.key === '-' ? $event.preventDefault() : null">
                            </ion-input>
                        </v-field>
                    </ion-item>
                    <v-error-message name="qty" class="error" />

                </ion-list>
                <ion-button :disabled="is_btn_loading" class="mt-5" expand="block" shape="round" style="margin-top: 5%"
                    type="submit">
                    <ion-spinner :hidden="!is_btn_loading" name="circles"></ion-spinner>
                    Add
                </ion-button>
            </v-form>
        </ion-content>
    </ion-modal>
</template>
  
<script>
import SupplierApis from "@/apis/modules/supplier_apis/supplier_apis";
import CustomerApis from "@/apis/modules/customer_apis/customer_apis";
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
    IonSpinner,
    IonSelect, IonSelectOption
} from '@ionic/vue';
import { defineComponent } from 'vue';
import * as V from "vee-validate/dist/vee-validate";
import { defineRule } from "vee-validate/dist/vee-validate";
import { email } from "@vee-validate/rules";

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
        IonSpinner,
        IonSelect, IonSelectOption,
        VField: V.Field,
        VForm: V.Form,
        VErrorMessage: V.ErrorMessage,
    },
    setup() {
        const customAlertOptions = {
            header: 'Items',
            subHeader: 'Select Item',
            message: 'Choose only one',
            translucent: true
        };

        defineRule("email", email);

        const isRequired = (value) => {
            // console.log("isRequired", value);
            console.log(value)
            if (!value) {
                return "is a required field";
            }

            return true;

        };

        return {
            customAlertOptions,
            isRequired,
            email,
        }
    },
    data() {
        return {
            is_btn_loading: false,
            item: [],
            form: {
                id: '',
                item: '',
                qty: '',
            },
            is_model_open: false
        }
    },
    methods: {
        handleModel() {
            let randomNumber = Math.floor(Math.random() * 10000 + 1);
            let orderId = new Date().toISOString().slice(0, 10) + "-" + randomNumber;
            this.is_model_open = !this.is_model_open
            this.form.id = orderId
        },

        async getAllItems() {
            try {
                this.is_table_loading = true
                let respond = (await SupplierApis.getAll()).data.data.items

                this.item = respond.map((e, index) => ({
                    value: e._id,
                    label: e.name,
                }))

                console.log(this.item)
            } catch (e) {

            }
            this.is_table_loading = false
        },

        async saveData() {
            try {
                this.is_btn_loading = true
                await CustomerApis.createOrder({ order: this.form })
                await this.successToast('order Added Successfully')
                this.closeModel()
            } catch (e) {
                await this.dangerToast(e)
            }
            this.is_btn_loading = false
        },

        closeModel() {
            this.is_model_open = !this.is_model_open
            this.$emit('closeModel')
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
        },

        compareWith(o1, o2) {
            return o1 && o2 ? o1.value === o2.value : o1 === o2;
        }
    },

    async mounted() {
        await this.getAllItems()
    }
});
</script>
  
  
<style scoped>
.error {
    color: red;
    font-size: smaller;
    font-style: italic;
    font-weight: 500;
    margin-top: 4px;
    margin-left: 20px;
}

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