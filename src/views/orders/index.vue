<template>
    <ion-page>

        <ion-tabs>
            <ion-router-outlet></ion-router-outlet>
            <ion-tab-bar style="padding-bottom:20px; background-color: black" slot="bottom">

                <ion-tab-button href="/orders/home" tab="home" v-on:click="afterTabChange('home')"
                    style="background-color: black">
                    <ion-icon :icon="cubeOutline" />
                    <ion-label v-show="tabName === 'home'" style="color: #5bf5a8;">Orders</ion-label>
                    <ion-label v-show="tabName !== 'home'" style="color: #ffffff;">Orders</ion-label>
                </ion-tab-button>

                <ion-tab-button href="/orders/canceledOrders" tab="canceledorders"
                    v-on:click="afterTabChange('canceledorders')" style="background-color: black">
                    <ion-icon :icon="receiptOutline" />
                    <ion-label v-show="tabName === 'canceledorders'" style="color: #5bf5a8;">Canceled</ion-label>
                    <ion-label v-show="tabName !== 'canceledorders'" style="color: #ffffff;">Canceled</ion-label>

                </ion-tab-button>

                <ion-tab-button @click="confirmRequest()" tab="profile" v-on:click="afterTabChange('profile')"
                    style="background-color: black">
                    <ion-icon :icon="logOutOutline" />
                    <ion-label v-show="tabName === 'logout'" style="color: #5bf5a8">Logout</ion-label>
                    <ion-label v-show="tabName !== 'logout'" style="color: #ffffff">Logout</ion-label>
                </ion-tab-button>
            </ion-tab-bar>
        </ion-tabs>
    </ion-page>
</template>
  
<script>
import { IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, alertController } from '@ionic/vue';
import { cafeOutline, calendarOutline, homeOutline, timeOutline, peopleOutline, mapOutline, cubeOutline, logOutOutline, receiptOutline } from 'ionicons/icons';
import { useRouter } from "vue-router";
import { defineComponent } from "vue";

export default defineComponent({
    components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
    methods: {
        async beforeTabChange() {
            this.no -= 1;
            this.tab1 = "dash_board";
            this.tab2 = "staff";
            this.tab3 = "time_sheet";
            this.tab4 = "leaves";
        },
        async afterTabChange(tabName) {
            this.tabName = tabName;
        },
        async confirmRequest() {
            const alert = await alertController.create({
                header: 'Are you sure you want logout?',
                cssClass: 'custom-alert',
                buttons: [
                    {
                        text: 'Yes',
                        cssClass: 'alert-button-confirm',
                        handler: () => {
                            this.logout()
                        }
                    },
                    {
                        text: 'No',
                        cssClass: 'alert-button-cancel',
                    },

                ],
            });

            await alert.present();
        },
        logout() {
            localStorage.removeItem("token");
            this.router.push("/login");
        },
    },
    setup() {

        const router = useRouter();
        return {
            no: 1,
            calendarOutline,
            cafeOutline,
            homeOutline,
            mapOutline,
            peopleOutline,
            timeOutline,
            cubeOutline,
            logOutOutline,
            receiptOutline,
            router,
        }
    },
    data() {
        return {
            no: 1,
            tabName: "dash_board",
            tab1: "",
            tab2: "",
            tab3: "",
            tab4: "",
        };
    }
});
</script>
  