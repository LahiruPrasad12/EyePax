<template>
  <ion-page>
    <ion-content
        class="login-wrap">
      <div id="header">
        <ion-img style="
              width:100%;
              height:100%;"
                 src="https://i.postimg.cc/ZKKjz1yd/diseno-web.gif"></ion-img>
      </div>
      <div style="margin-top:8%" class="ion-text-center padding-header">
        <h1 style="font-weight:750">Welcome to IPax</h1>
        <h6 style="margin-top:0%">CONSTRUCTIONS</h6>
        <div
            class="lorem-header"
            style="
              font-style: normal;
              font-weight: normal;
              font-size: 13px;
              line-height: 20px;
              letter-spacing: 0.25px;">
          <p>
            <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore. -->
          </p>
        </div>

      </div>
      <div>
        <div>
          <ion-row
          >
            <ion-col>
              <ion-button
                  expand="block"
                  router-link="/login"
                  style="height: 50px;"
              >
                LOGIN
              </ion-button>
            </ion-col>

          </ion-row>
        </div>
        <br/>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonButton,
  IonCol,
  IonContent,
  IonImg,
  IonPage,
  IonRow,

} from '@ionic/vue';
import {defineComponent} from 'vue';

import {calendarOutline} from 'ionicons/icons';
import router from "../../router";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  components: {

    IonImg,
    IonContent,

    IonButton,

    IonCol,
    IonRow,
    IonPage,

  },
  data() {
    return {
      calendarOutline,
      hiddenPage:false


    };
  },

  // mounted() {
  //   if(localStorage.getItem('token')){
  //     router.push('/select-practices')
  //   }else {
  //     this.hiddenPage = false
  //   }
  // }
});
</script>

<style scoped>


.auth-form ion-grid,
.auth-form ion-row {
  height: 100%;
  justify-content: center;
}

.already {
  display: block;
  text-align: center;
  padding-bottom: 10px;
}

.lorem-header{
  padding-top: 5px;
  margin-left: 30px;
  margin-right: 30px;
}


.padding-header{
  padding-top: 15px;
  margin-left: 30px;
  margin-right: 30px;
}

ion-button {
  --background: #00C49A;
  height: 5vh;
  margin-top: 5px;
  margin-left: 40px;
  margin-right: 40px;
}
</style>
