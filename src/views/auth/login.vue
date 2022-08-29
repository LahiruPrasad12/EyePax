<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button class="top-button">
            <ion-icon slot="icon-only" name="arrow-back"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div id="header">
<!--        <img class="logo" src="assets/Primed_icon_white@2x.png" />-->
      </div>
      <br />

      <div class="text-block">
        <h2>Welcome Back</h2>
        <p>Sign to Continue</p>
      </div>

      <div class="form-wrap">
        <form v-on:submit.prevent="login">
          <ion-item lines="full" style="border-radius: 25px">
            <ion-label class="required" position="floating">Email</ion-label>
            <ion-input v-model="form.email" required type="text"></ion-input>
          </ion-item>
          <br />
          <ion-item lines="full" style="border-radius: 25px">
            <ion-label
                class="required"
                placeholder="enter password"
                position="floating"
            >Password
            </ion-label>
            <ion-input
                v-model="form.password"
                class="password"
                required
                type="password"
            ></ion-input>
          </ion-item>

          <ion-row class="ion-justify-content-end ion-text-end ion-margin-top">
            <ion-col>
              <span
              ><a class="link primed" expand="block" href="/reset/password"
              >Forgot Password ?</a
              ></span
              >
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-button
                  class="login-btn"
                  color="primed"
                  expand="block"
                  type="submit"
              >Sign In
              </ion-button>
            </ion-col>
          </ion-row>

          <ion-row
              class="ion-justify-content-center ion-text-center ion-margin-top"
          >
          </ion-row>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>
<script>
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonToolbar,
  useBackButton,
  useIonRouter,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
// import auth from "@/APIs/auth";
import { Plugins } from "@capacitor/core";

const { App } = Plugins;

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  components: {
    IonItem,
    IonLabel,
    IonPage,
    IonContent,
    IonInput,
    IonToolbar,
    IonButton,
    IonButtons,
    IonHeader,
    IonRow,
    IonCol,
  },
  data() {
    return {
      form: {
        email: "admin@primed.com",
        password: "primed<2021>",
      },
    };
  },

  computed: {
    test() {
      return this.$store.getters.test;
    },
  },

  beforeCreate() {
    if (localStorage.token != null) {
      window.location.href = "/order-cart";
    }
  },

  setup() {
    const router = useRouter();

    const ionRouter = useIonRouter();
    useBackButton(-1, () => {
      if (!ionRouter.canGoBack()) {
        App.exitApp();
      }
    });

    function login() {

      // auth.login(this.form).then(function(response) {
      //   router.push("order-cart");
      // });
    }

    return {
      router,
      login,
    };
  },
});
</script>
<style scoped>
ion-toolbar {
  --background: #f5f5f3;
}

ion-button {
  text-transform: initial;
  font-size: 17px;
}

ion-content {
  --background: #f5f5f3;
}

.link {
  text-transform: initial;
  font-size: 18px;
  padding-left: 10px;
  float: "center";
}

.email {
  border-radius: 25px;
}

#header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-weight: 700;
  font-size: 26px;
  color: #010100;
  margin-bottom: 15%;
}

img {
  width: 270px;
  height: 100px;
  display: flex;
}

#form {
  margin-top: 15%;
  padding-left: 30px;
  padding-right: 30px;
}

ion-button {
  margin-top: 35px;
  height: 48px;
  font-size: 18px;
  text-transform: initial;
  border-radius: 50px;
  box-shadow: 1px 8px 8px 0px rgba(0, 0, 0, 0.05);
  --box-shadow: none;
}

.required:after {
  content: " *";
  color: red;
}

.bg-login {
  background: rgba(42, 49, 71, 0.6) !important;
}

h2 {
  color: #1a2a2d;
  font-size: 2rem;
  font-weight: 300;
}

p {
  margin: 0;
  color: #ddd;
  font-size: 0.9rem;
}

.text-block {
  display: flex;
  flex-direction: column;
  align-items: center;
}

ion-content,
ion-toolbar {
  --background: #2a314766;
}

.form-wrap {
  margin-top: 2.3em;
  padding: 0.8rem;
}

.link {
  color: #5260ff;
  font-size: 0.9rem;
}

ion-item {
  border-radius: 6px !important;
  --background: transparent;
}

.logo {
  max-width: 15%;
  height: auto;
  display: block;
}

ion-toolbar {
  height: 2em;
}

ion-input {
  --color: #fff !important;
}

ion-label {
  --color: #f4f6fb !important;
  text-transform: uppercase;
  font-weight: 200;
  letter-spacing: 0.1rem;
}

.login-btn {
  text-transform: uppercase;
  --border-radius: 3px !important;
  font-weight: 200;
  letter-spacing: 0.15rem;
}

.primed {
  color: #5260ff;
  text-decoration: underline;
}
</style>
