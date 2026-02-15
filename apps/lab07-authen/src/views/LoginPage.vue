<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="login-container">

        <ion-card>
          <ion-card-header>
            <ion-card-title class="title">Welcome Back</ion-card-title>
            <ion-card-subtitle>Sign in to continue</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>


            <ion-item>
              <ion-input
                v-model="email"
                label="Email"
                label-placement="floating"
                type="email"
              />
            </ion-item>

            <ion-item>
              <ion-input
                v-model="password"
                label="Password"
                label-placement="floating"
                type="password"
              />
            </ion-item>

            <ion-button expand="block" @click="loginEmail">
              Login Email / Password
            </ion-button>

            <div class="divider">OR</div>


            <ion-button expand="block" color="danger" @click="loginGoogle">
              Login with Google
            </ion-button>

            <div class="divider">OR</div>

            <ion-item>
              <ion-input
                v-model="phone"
                label="Phone Number"
                label-placement="floating"
                placeholder="+66xxxxxxxxx"
              />
            </ion-item>

            <ion-button expand="block" color="tertiary" @click="startPhone">
              Login by Phone
            </ion-button>

            <!-- OTP -->
            <div v-if="verificationId">
              <ion-item>
                <ion-input
                  v-model="code"
                  label="OTP Code"
                  label-placement="floating"
                />
              </ion-item>

              <ion-button expand="block" color="success" @click="confirmPhone">
                Confirm OTP
              </ion-button>
            </div>

            <div id="recaptcha-container"></div>

          </ion-card-content>
        </ion-card>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
} from '@ionic/vue'

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/auth/auth-service'

const router = useRouter()

const email = ref('')
const password = ref('')
const phone = ref('')
const code = ref('')
const verificationId = ref<string | null>(null)

async function loginEmail() {
  await authService.loginWithEmailPassword({
    email: email.value,
    password: password.value,
  })
  router.push('/tabs/tab1')
}

async function loginGoogle() {
  await authService.loginWithGoogle()
  router.push('/tabs/tab1')
}

async function startPhone() {
  const r = await authService.startPhoneLogin({
    phoneNumberE164: phone.value,
  })
  verificationId.value = r.verificationId
}

async function confirmPhone() {
  await authService.confirmPhoneCode({
    verificationId: verificationId.value!,
    verificationCode: code.value,
  })
  router.push('/tabs/tab1')
}
</script>

<style scoped>
.login-container {
  max-width: 420px;
  margin: auto;
  padding-top: 10vh;
}

.title {
  text-align: center;
  font-weight: bold;
}

.divider {
  text-align: center;
  margin: 16px 0;
  font-weight: 600;
  color: var(--ion-color-medium);
}
</style>