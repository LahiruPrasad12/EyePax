<template>
    <ion-modal :is-open="is_model_open" :enter-animation="enterAnimation" :leave-animation="leaveAnimation">
        <ion-content fullscreen>
            <ion-toolbar class="toolbar" style="padding-top: 10px">
                <ion-title style="align-items: center;">Update</ion-title>
                <ion-buttons slot="end">
                    <ion-button style="--color: white;" @click="dismiss()">X Close</ion-button>
                </ion-buttons>
            </ion-toolbar>
            <ion-grid>
                <ion-row>
                    <ion-col size="6" style="text-align:center">
                        <ion-label>Order Id</ion-label>
                        <ion-input v-model="form.order_id" autofocus clear-input spellcheck type="text" maxlength="10"
                            :disabled="true"></ion-input>
                    </ion-col>
                    <ion-col size="6" style="text-align:center">
                        <ion-label position="floating">Item</ion-label>
                        <ion-input v-model="form.item" clear-input type="text" :disabled="true">
                        </ion-input>
                    </ion-col>
                    <ion-col size="6" style="text-align:center">
                        <ion-label position="floating">Quantity</ion-label>
                        <ion-input class="u-input" v-model="form.qty" clear-input type="number" required maxlength="10">
                        </ion-input>
                    </ion-col>
                    <ion-col size="6" style="text-align:center">
                        <ion-label position="floating">Status</ion-label>
                        <ion-input v-model="form.status" clear-input type="text" :disabled="true">
                        </ion-input>
                    </ion-col>
                    <ion-col size="12" style="text-align:center">
                        <ion-label position="floating">Date</ion-label>
                        <ion-input v-model="form.created_at" clear-input type="text" :disabled="true">
                        </ion-input>
                    </ion-col>
                </ion-row>

                <ion-button :disabled="is_btn_loading" class="mt-5" expand="block" shape="round" style="margin-top: 5%"
                    @click="updateOrder">
                    <ion-spinner :hidden="!is_btn_loading" name="circles"></ion-spinner>
                    Update
                </ion-button>
            </ion-grid>
        </ion-content>
    </ion-modal>
</template>
  
<script>
import SupplierApis from "@/apis/modules/supplier_apis/supplier_apis";
import CustomerApis from "@/apis/modules/customer_apis/customer_apis";
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
    name: "update_order",
    setup() {
        const enterAnimation = (baseEl) => {
            const root = baseEl.shadowRoot;

            const backdropAnimation = createAnimation()
                .addElement(root.querySelector('ion-backdrop'))
                .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

            const wrapperAnimation = createAnimation()
                .addElement(root.querySelector('.modal-wrapper'))
                .keyframes([
                    { offset: 0, opacity: '0', transform: 'scale(0)' },
                    { offset: 1, opacity: '0.99', transform: 'scale(1)' },
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
        return { enterAnimation, leaveAnimation };
    },
    data() {
        return {
            is_btn_loading: false,
            is_model_open: false,
            form: {
                order_id: '',
                item: '',
                qty: '',
                status: '',
                created_at: ''
            }
        }
    },
    methods: {
        dismiss() {
            this.is_model_open = !this.is_model_open
            this.$emit('closeModel')
        },

        async updateOrder() {
            try {
                this.is_btn_loading = true
                await CustomerApis.updateOrder({ data: this.form })
                await this.successToast('Order Updated Successfully')
                this.dismiss()
            } catch (e) {
                await this.dangerToast(e)
            }
            this.is_btn_loading = false
        },

        openModal(data) {
            this.is_model_open = !this.is_model_open
            this.form = data
        }
    },
}
</script>
  
<style scoped>

</style>
  