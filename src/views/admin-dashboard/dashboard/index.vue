<template>
  <ion-page>
    <ion-header :translucent="true" collapse="fade">
      <ion-toolbar>
        <ion-title>Dash Board</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="main-container">
      <div class="">
        <ion-list>

          <ion-grid>
            <div class="small-header anim" style="--delay: .3s; margin-left: 5px">Overview</div>
            <ion-row>
              <ion-col size="12">
                <div class="main-blogs">
                  <div class="main-blog anim" style="--delay: .1s">
                    <div class="main-blog__title">TOTAL STAFF</div>
                    <div class="main-blog__title2">22</div>
                    <div class="main-blog__author">
                      <div class="author-detail">
                        <div class="author-name">Staff Management</div>
                        <div class="author-info">Live Count</div>
                      </div>
                    </div>

                  </div>
                  <div class="main-blog anim" style="--delay: .2s">
                    <div class="main-blog__title">TOTAL ITEMS</div>
                    <div class="main-blog__title2">54</div>
                    <div class="main-blog__author tips">
                      <div class="author-detail">
                        <div class="author-name">Stock Management</div>
                        <div class="author-info">Live Count</div>
                      </div>
                    </div>
                  </div>
                </div>
              </ion-col>
            </ion-row>
          </ion-grid>
          <ion-grid>
            <div class="small-header anim" style="--delay: .3s; margin-left: 5px">Analytics</div>
            <ion-row>
              <ion-col size="4">
                <div class="video anim" style="--delay: .5s">
                  <div class="video-wrapper">
                    <img src="https://i.postimg.cc/Qtk5bhM0/staff-c.jpg" type="">
                    <div class="author-img__wrapper video-author">
                      <svg class="feather feather-check" fill="none" stroke="currentColor" stroke-linecap="round"
                           stroke-linejoin="round"
                           stroke-width="3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      <img class="author-img" src="https://i.postimg.cc/0Nv7Jzkb/staff2.jpg"/>
                    </div>
                  </div>
                  <div class="video-by">Users</div>
                  <!--                <div class="video-name">TOTAL STAFF MEMBERS</div>-->
                  <div class="video-name2">10</div>
                </div>
              </ion-col>
              <ion-col size="4">
                <div class="video anim" style="--delay: .6s">
                  <div class="video-wrapper">
                    <img src="https://i.postimg.cc/RV3hCvzy/item.jpg" type="">
                    <div class="author-img__wrapper video-author">
                      <svg class="feather feather-check" fill="none" stroke="currentColor" stroke-linecap="round"
                           stroke-linejoin="round"
                           stroke-width="3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      <img class="author-img" src="https://i.postimg.cc/tRcPNSR0/item2.jpg"/>
                    </div>
                  </div>
                  <div class="video-by">Staff</div>
                  <!--                <div class="video-name">TOTAL STOCK MANAGERS</div>-->
                  <div class="video-name2">5</div>
                </div>
              </ion-col>
              <ion-col size="4">
                <div class="video anim" style="--delay: .4s">
                  <div class="video-wrapper">
                    <img src="https://i.postimg.cc/50HTYKN4/sup.jpg" type="">
                    <div class="author-img__wrapper video-author">
                      <svg class="feather feather-check" fill="none" stroke="currentColor" stroke-linecap="round"
                           stroke-linejoin="round"
                           stroke-width="3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      <img class="author-img" src="https://i.postimg.cc/cHX7WdN6/sup2.jpg"/>
                    </div>
                  </div>
                  <div class="video-by">Suppliers</div>
                  <!--                <div class="video-name">TOTAL SHIPPING ITEMS</div>-->
                  <div class="video-name2">2</div>
                </div>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import '@/assets/test.css'
import {
  IonAvatar,
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonLoading,
  IonNavLink,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonTitle,
  IonToolbar,
  IonButton,
  IonSelect,
  IonGrid,
  IonSelectOption,
} from '@ionic/vue';

export default {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonFooter,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonInfiniteScrollContent,
    IonInfiniteScroll,
    IonRefresher,
    IonRefresherContent,
    IonAvatar,
    IonRow,
    IonCol,
    IonNavLink,
    IonLoading,
    IonFab, IonFabButton, IonIcon, IonFabList, IonButton,
    IonSelect,
    IonGrid,
    IonSelectOption,
  },
  name: "index"
}
</script>

<style scoped>

</style>
